"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Plus, Trash, Save, BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";

const blankPart = () => ({
  title: "",
  content: "",
  duration: 5,
  exercise: null,
});

const blankLesson = () => ({
  title: "",
  description: "",
  duration: 15,
  parts: [blankPart()],
});

const blankChapter = () => ({
  title: "",
  description: "",
  lessons: [blankLesson()],
});

const blankCourse = () => ({
  title: "",
  description: "",
  level: "beginner",
  tags: [],
  book: { title: "", author: "", coverUrl: "", amazonUrl: "" },
  prerequisites: [],
  learningOutcomes: [],
  estimatedDuration: 0,
  chapters: [blankChapter()],
  isPublished: true,
});

const exerciseTemplates = {
  "multiple-choice": {
    type: "multiple-choice",
    title: "Quick Check",
    description: "Pick the correct answer.",
    points: 10,
    content: { question: "", options: ["", "", ""], correctAnswer: "", explanation: "" },
  },
  "fill-in-blanks": {
    type: "fill-in-blanks",
    title: "Fill in the Blanks",
    description: "Drop the right word into each blank.",
    points: 10,
    content: { text: "The capital of France is [1].", blanks: [{ id: "1", answer: "Paris", hint: "" }] },
  },
  "drag-and-drop": {
    type: "drag-and-drop",
    title: "Match the Pairs",
    description: "Drag each item onto its matching target.",
    points: 10,
    content: {
      items: [{ id: "a", text: "" }, { id: "b", text: "" }],
      targets: [{ id: "1", text: "" }, { id: "2", text: "" }],
      correctPairs: [["a", "1"], ["b", "2"]],
    },
  },
  "code-challenge": {
    type: "code-challenge",
    title: "Code Challenge",
    description: "Implement the function so all tests pass.",
    points: 20,
    content: {
      instructions: "<p>Write a function called <code>solution</code>.</p>",
      initialCode: "function solution(x) {\n  return x;\n}",
      testCases: [{ input: [1], expectedOutput: 1, description: "" }],
      hints: [],
      functionName: "solution",
    },
  },
};

export default function CreateCoursePage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [course, setCourse] = useState(blankCourse());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [openChapters, setOpenChapters] = useState({ 0: true });

  const toggleChapter = (i) => setOpenChapters((s) => ({ ...s, [i]: !s[i] }));

  const updateCourse = (patch) => setCourse((c) => ({ ...c, ...patch }));
  const updateChapter = (ci, patch) =>
    setCourse((c) => ({
      ...c,
      chapters: c.chapters.map((ch, i) => (i === ci ? { ...ch, ...patch } : ch)),
    }));
  const updateLesson = (ci, li, patch) =>
    updateChapter(ci, {
      lessons: course.chapters[ci].lessons.map((l, i) => (i === li ? { ...l, ...patch } : l)),
    });
  const updatePart = (ci, li, pi, patch) =>
    updateLesson(ci, li, {
      parts: course.chapters[ci].lessons[li].parts.map((p, i) =>
        i === pi ? { ...p, ...patch } : p
      ),
    });

  const handleSave = async () => {
    if (!course.title.trim()) {
      setError("Give your course a title before saving.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/courses/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save course");
      router.push(`/course-details/${data.slug}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 text-center text-gray-500">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 text-center">
          <p className="text-gray-700">Sign in to create a course.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0" />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Create a Course</h1>
              <p className="text-gray-500 mt-1">Share what you know. Build chapters, lessons, and interactive exercises.</p>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving…" : "Publish Course"}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">{error}</div>
          )}

          {/* Course basics */}
          <div className="card p-6 mb-6 space-y-4 bg-white rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-600" /> Course Basics
            </h2>
            <input
              className="input"
              placeholder="Title"
              value={course.title}
              onChange={(e) => updateCourse({ title: e.target.value })}
            />
            <textarea
              className="input min-h-[100px]"
              placeholder="Short description"
              value={course.description}
              onChange={(e) => updateCourse({ description: e.target.value })}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                className="input"
                value={course.level}
                onChange={(e) => updateCourse({ level: e.target.value })}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <input
                className="input"
                placeholder="Tags (comma-separated)"
                value={course.tags.join(", ")}
                onChange={(e) => updateCourse({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="input"
                placeholder="Reference book / resource title (optional)"
                value={course.book.title}
                onChange={(e) => updateCourse({ book: { ...course.book, title: e.target.value } })}
              />
              <input
                className="input"
                placeholder="Author (optional)"
                value={course.book.author}
                onChange={(e) => updateCourse({ book: { ...course.book, author: e.target.value } })}
              />
            </div>
          </div>

          {/* Chapters */}
          <div className="space-y-4">
            {course.chapters.map((chapter, ci) => (
              <div key={ci} className="card bg-white rounded-2xl shadow-sm">
                <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between gap-2">
                  <button onClick={() => toggleChapter(ci)} className="flex items-center gap-2 text-left flex-1">
                    {openChapters[ci] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <span className="font-semibold text-gray-900">
                      Chapter {ci + 1}: {chapter.title || <span className="text-gray-400">Untitled</span>}
                    </span>
                  </button>
                  <button
                    onClick={() => updateCourse({ chapters: course.chapters.filter((_, i) => i !== ci) })}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    aria-label="Delete chapter"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>

                {openChapters[ci] && (
                  <div className="p-4 sm:p-6 space-y-4">
                    <input
                      className="input"
                      placeholder="Chapter title"
                      value={chapter.title}
                      onChange={(e) => updateChapter(ci, { title: e.target.value })}
                    />
                    <textarea
                      className="input"
                      placeholder="Chapter description"
                      value={chapter.description}
                      onChange={(e) => updateChapter(ci, { description: e.target.value })}
                    />

                    {chapter.lessons.map((lesson, li) => (
                      <div key={li} className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-medium text-gray-700">Lesson {li + 1}</h4>
                          <button
                            onClick={() =>
                              updateChapter(ci, {
                                lessons: chapter.lessons.filter((_, i) => i !== li),
                              })
                            }
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                            aria-label="Delete lesson"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          className="input"
                          placeholder="Lesson title"
                          value={lesson.title}
                          onChange={(e) => updateLesson(ci, li, { title: e.target.value })}
                        />
                        <textarea
                          className="input"
                          placeholder="Lesson description"
                          value={lesson.description}
                          onChange={(e) => updateLesson(ci, li, { description: e.target.value })}
                        />

                        {lesson.parts.map((part, pi) => (
                          <PartEditor
                            key={pi}
                            part={part}
                            partNumber={pi + 1}
                            onChange={(patch) => updatePart(ci, li, pi, patch)}
                            onDelete={() =>
                              updateLesson(ci, li, {
                                parts: lesson.parts.filter((_, i) => i !== pi),
                              })
                            }
                          />
                        ))}

                        <button
                          onClick={() =>
                            updateLesson(ci, li, { parts: [...lesson.parts, blankPart()] })
                          }
                          className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" /> Add part
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={() => updateChapter(ci, { lessons: [...chapter.lessons, blankLesson()] })}
                      className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add lesson
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => {
                const next = course.chapters.length;
                updateCourse({ chapters: [...course.chapters, blankChapter()] });
                setOpenChapters((s) => ({ ...s, [next]: true }));
              }}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-violet-400 hover:text-violet-600 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add chapter
            </button>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving…" : "Publish Course"}
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          background: white;
          font-size: 0.95rem;
          color: #111827;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.input:focus) {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
        }
      `}</style>
    </div>
  );
}

function PartEditor({ part, partNumber, onChange, onDelete }) {
  const [showExercise, setShowExercise] = useState(Boolean(part.exercise));

  const setExerciseType = (type) => {
    if (!type) {
      onChange({ exercise: null });
      setShowExercise(false);
      return;
    }
    onChange({ exercise: JSON.parse(JSON.stringify(exerciseTemplates[type])) });
    setShowExercise(true);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Part {partNumber}</span>
        <button onClick={onDelete} className="p-1 text-red-500 hover:bg-red-50 rounded" aria-label="Delete part">
          <Trash className="w-3.5 h-3.5" />
        </button>
      </div>
      <input
        className="input"
        placeholder="Part title"
        value={part.title}
        onChange={(e) => onChange({ title: e.target.value })}
      />
      <textarea
        className="input min-h-[120px] font-mono text-sm"
        placeholder="Part content (Markdown supported)"
        value={part.content}
        onChange={(e) => onChange({ content: e.target.value })}
      />
      <div className="flex items-center gap-3">
        <label className="text-xs text-gray-500">Duration (min)</label>
        <input
          type="number"
          className="input max-w-[100px]"
          value={part.duration}
          onChange={(e) => onChange({ duration: Number(e.target.value) || 0 })}
        />
      </div>

      {!showExercise && !part.exercise && (
        <div className="pt-2">
          <select
            className="input max-w-xs"
            defaultValue=""
            onChange={(e) => setExerciseType(e.target.value)}
          >
            <option value="">+ Add interactive exercise (optional)</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="fill-in-blanks">Fill in the Blanks</option>
            <option value="drag-and-drop">Drag and Drop</option>
            <option value="code-challenge">Code Challenge</option>
          </select>
        </div>
      )}

      {part.exercise && <ExerciseEditor exercise={part.exercise} onChange={(ex) => onChange({ exercise: ex })} onRemove={() => setExerciseType(null)} />}
    </div>
  );
}

function ExerciseEditor({ exercise, onChange, onRemove }) {
  const update = (patch) => onChange({ ...exercise, ...patch });
  const updateContent = (patch) => onChange({ ...exercise, content: { ...exercise.content, ...patch } });

  return (
    <div className="mt-2 p-3 border border-violet-200 bg-violet-50/50 rounded-lg space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-violet-700 uppercase">{exercise.type.replace(/-/g, ' ')}</span>
        <button onClick={onRemove} className="text-xs text-red-600 hover:underline">Remove exercise</button>
      </div>
      <input
        className="input"
        placeholder="Exercise title"
        value={exercise.title}
        onChange={(e) => update({ title: e.target.value })}
      />
      <input
        className="input"
        placeholder="Description / prompt"
        value={exercise.description}
        onChange={(e) => update({ description: e.target.value })}
      />

      {exercise.type === "multiple-choice" && (
        <>
          <textarea
            className="input"
            placeholder="Question"
            value={exercise.content.question}
            onChange={(e) => updateContent({ question: e.target.value })}
          />
          {exercise.content.options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="radio"
                checked={exercise.content.correctAnswer === opt && opt !== ""}
                onChange={() => updateContent({ correctAnswer: opt })}
                title="Mark as correct"
              />
              <input
                className="input"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => {
                  const options = [...exercise.content.options];
                  const oldVal = options[i];
                  options[i] = e.target.value;
                  const patch = { options };
                  if (exercise.content.correctAnswer === oldVal) patch.correctAnswer = e.target.value;
                  updateContent(patch);
                }}
              />
              <button
                onClick={() => {
                  const options = exercise.content.options.filter((_, idx) => idx !== i);
                  updateContent({ options });
                }}
                className="text-red-500 p-1 hover:bg-red-50 rounded"
              >
                <Trash className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => updateContent({ options: [...exercise.content.options, ""] })}
            className="text-xs text-violet-600 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add option
          </button>
        </>
      )}

      {exercise.type === "fill-in-blanks" && (
        <>
          <textarea
            className="input"
            placeholder="Text with [1], [2] placeholders for blanks"
            value={exercise.content.text}
            onChange={(e) => updateContent({ text: e.target.value })}
          />
          {exercise.content.blanks.map((b, i) => (
            <div key={i} className="grid grid-cols-3 gap-2">
              <input
                className="input"
                placeholder="Blank id"
                value={b.id}
                onChange={(e) => {
                  const blanks = [...exercise.content.blanks];
                  blanks[i] = { ...b, id: e.target.value };
                  updateContent({ blanks });
                }}
              />
              <input
                className="input col-span-2"
                placeholder="Correct answer"
                value={b.answer}
                onChange={(e) => {
                  const blanks = [...exercise.content.blanks];
                  blanks[i] = { ...b, answer: e.target.value };
                  updateContent({ blanks });
                }}
              />
            </div>
          ))}
          <button
            onClick={() =>
              updateContent({
                blanks: [
                  ...exercise.content.blanks,
                  { id: String(exercise.content.blanks.length + 1), answer: "", hint: "" },
                ],
              })
            }
            className="text-xs text-violet-600 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add blank
          </button>
        </>
      )}

      {exercise.type === "drag-and-drop" && (
        <>
          <p className="text-xs text-gray-500">Edit items, targets, and the correct pairs (item → target).</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <p className="text-xs font-semibold">Items</p>
              {exercise.content.items.map((it, i) => (
                <input
                  key={i}
                  className="input"
                  placeholder={`Item ${i + 1}`}
                  value={it.text}
                  onChange={(e) => {
                    const items = [...exercise.content.items];
                    items[i] = { ...it, text: e.target.value };
                    updateContent({ items });
                  }}
                />
              ))}
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold">Targets</p>
              {exercise.content.targets.map((tg, i) => (
                <input
                  key={i}
                  className="input"
                  placeholder={`Target ${i + 1}`}
                  value={tg.text}
                  onChange={(e) => {
                    const targets = [...exercise.content.targets];
                    targets[i] = { ...tg, text: e.target.value };
                    updateContent({ targets });
                  }}
                />
              ))}
            </div>
          </div>
          <p className="text-xs font-semibold mt-2">Correct pairs (item id → target id)</p>
          {exercise.content.correctPairs.map((pair, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <select
                className="input"
                value={pair[0]}
                onChange={(e) => {
                  const pairs = [...exercise.content.correctPairs];
                  pairs[i] = [e.target.value, pair[1]];
                  updateContent({ correctPairs: pairs });
                }}
              >
                <option value="">— item —</option>
                {exercise.content.items.map((it) => (
                  <option key={it.id} value={it.id}>{it.text || it.id}</option>
                ))}
              </select>
              <select
                className="input"
                value={pair[1]}
                onChange={(e) => {
                  const pairs = [...exercise.content.correctPairs];
                  pairs[i] = [pair[0], e.target.value];
                  updateContent({ correctPairs: pairs });
                }}
              >
                <option value="">— target —</option>
                {exercise.content.targets.map((tg) => (
                  <option key={tg.id} value={tg.id}>{tg.text || tg.id}</option>
                ))}
              </select>
            </div>
          ))}
        </>
      )}

      {exercise.type === "code-challenge" && (
        <>
          <textarea
            className="input min-h-[80px]"
            placeholder="Instructions (HTML allowed)"
            value={exercise.content.instructions}
            onChange={(e) => updateContent({ instructions: e.target.value })}
          />
          <textarea
            className="input font-mono text-sm min-h-[120px]"
            placeholder="Starter code"
            value={exercise.content.initialCode}
            onChange={(e) => updateContent({ initialCode: e.target.value })}
          />
          <input
            className="input"
            placeholder="Function name (e.g. solution)"
            value={exercise.content.functionName || ""}
            onChange={(e) => updateContent({ functionName: e.target.value })}
          />
          <p className="text-xs font-semibold mt-1">Test cases</p>
          {exercise.content.testCases.map((tc, i) => (
            <div key={i} className="grid grid-cols-2 gap-2">
              <input
                className="input font-mono text-xs"
                placeholder='Input as JSON array, e.g. [1, 2]'
                value={JSON.stringify(tc.input)}
                onChange={(e) => {
                  const tests = [...exercise.content.testCases];
                  try {
                    tests[i] = { ...tc, input: JSON.parse(e.target.value) };
                  } catch {
                    return;
                  }
                  updateContent({ testCases: tests });
                }}
              />
              <input
                className="input font-mono text-xs"
                placeholder="Expected output as JSON"
                value={JSON.stringify(tc.expectedOutput)}
                onChange={(e) => {
                  const tests = [...exercise.content.testCases];
                  try {
                    tests[i] = { ...tc, expectedOutput: JSON.parse(e.target.value) };
                  } catch {
                    return;
                  }
                  updateContent({ testCases: tests });
                }}
              />
            </div>
          ))}
          <button
            onClick={() =>
              updateContent({
                testCases: [
                  ...exercise.content.testCases,
                  { input: [], expectedOutput: null, description: "" },
                ],
              })
            }
            className="text-xs text-violet-600 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add test
          </button>
        </>
      )}
    </div>
  );
}
