import { connectToDatabase } from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';
import { getAuth, clerkClient } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function getCreatorInfo(userId) {
  const user = await User.findOne({ clerkId: userId }).lean();
  let displayName = user?.username || '';
  let email = user?.email || '';
  if (!displayName || !email) {
    try {
      const clerkUser = await clerkClient.users.getUser(userId);
      displayName ||= clerkUser?.username || `${clerkUser?.firstName || ''} ${clerkUser?.lastName || ''}`.trim() || 'Anonymous';
      email ||= clerkUser?.emailAddresses?.[0]?.emailAddress || '';
    } catch (err) {
      displayName ||= 'Anonymous';
    }
  }
  return { clerkId: userId, displayName: displayName || 'Anonymous', email };
}

// Normalise a draft course payload from the create-course form into a valid Course doc.
// Generates course-scoped lesson slugs to avoid global slug collisions.
function normaliseCourse(payload, creator, baseSlug) {
  const courseSlug = slugify(payload.slug || payload.title || `course-${Date.now()}`) || `course-${Date.now()}`;
  const finalSlug = baseSlug || courseSlug;

  const chapters = (payload.chapters || []).map((chapter, ci) => ({
    title: chapter.title || `Chapter ${ci + 1}`,
    description: chapter.description || '',
    order: ci + 1,
    lessons: (chapter.lessons || []).map((lesson, li) => {
      const lessonSlug = slugify(lesson.slug || lesson.title || `lesson-${ci + 1}-${li + 1}`);
      return {
        title: lesson.title || `Lesson ${li + 1}`,
        slug: `${finalSlug}-${lessonSlug || `lesson-${ci + 1}-${li + 1}`}`,
        description: lesson.description || '',
        order: li + 1,
        duration: Number(lesson.duration) || 15,
        parts: (lesson.parts || []).map((part, pi) => ({
          title: part.title || `Part ${pi + 1}`,
          content: part.content || '',
          order: pi + 1,
          duration: Number(part.duration) || 5,
          exercise: part.exercise && part.exercise.type ? part.exercise : undefined,
        })),
        endOfLessonQuiz: lesson.endOfLessonQuiz && (lesson.endOfLessonQuiz.questions || []).length > 0
          ? lesson.endOfLessonQuiz
          : undefined,
      };
    }),
    endOfChapterQuiz: chapter.endOfChapterQuiz && (chapter.endOfChapterQuiz.questions || []).length > 0
      ? chapter.endOfChapterQuiz
      : undefined,
  }));

  return {
    title: payload.title || 'Untitled Course',
    slug: finalSlug,
    description: payload.description || '',
    level: ['beginner', 'intermediate', 'advanced'].includes(payload.level) ? payload.level : 'beginner',
    tags: Array.isArray(payload.tags) ? payload.tags : [],
    book: {
      title: payload.book?.title || payload.title || 'Course Material',
      author: payload.book?.author || creator.displayName || 'Anonymous',
      coverUrl: payload.book?.coverUrl || '',
      amazonUrl: payload.book?.amazonUrl || '',
    },
    chapters,
    prerequisites: Array.isArray(payload.prerequisites) ? payload.prerequisites : [],
    learningOutcomes: Array.isArray(payload.learningOutcomes) ? payload.learningOutcomes : [],
    estimatedDuration: Number(payload.estimatedDuration) || chapters.reduce(
      (sum, c) => sum + c.lessons.reduce((s, l) => s + (l.duration || 0), 0), 0
    ) || 30,
    endOfCourseExam: payload.endOfCourseExam && (payload.endOfCourseExam.questions || []).length > 0
      ? payload.endOfCourseExam
      : undefined,
    isUserCreated: true,
    isPublished: payload.isPublished !== false,
    createdBy: creator,
  };
}

// GET /api/courses/user — list the caller's own courses.
export async function GET(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();
    const courses = await Course.find({ 'createdBy.clerkId': userId, isUserCreated: true })
      .sort({ updatedAt: -1 })
      .lean();
    return Response.json(courses);
  } catch (error) {
    console.error('GET /api/courses/user error:', error);
    return Response.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

// POST /api/courses/user — create a new course owned by the caller.
export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectToDatabase();
    const payload = await req.json();
    const creator = await getCreatorInfo(userId);

    // Find a unique course slug.
    let candidate = slugify(payload.slug || payload.title || `course-${Date.now()}`) || `course-${Date.now()}`;
    let attempt = 0;
    while (await Course.exists({ slug: candidate })) {
      attempt += 1;
      candidate = `${slugify(payload.slug || payload.title)}-${attempt + 1}`;
      if (attempt > 50) {
        candidate = `${slugify(payload.title)}-${Date.now()}`;
        break;
      }
    }

    const courseDoc = normaliseCourse(payload, creator, candidate);
    const course = new Course(courseDoc);
    await course.save();

    return Response.json(course, { status: 201 });
  } catch (error) {
    console.error('POST /api/courses/user error:', error);
    return Response.json({ error: error.message || 'Failed to create course' }, { status: 500 });
  }
}
