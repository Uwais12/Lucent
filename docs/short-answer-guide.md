# Short Answer Exercise Guide

The enhanced Short Answer component allows for more flexible answer matching and better user experience. This guide explains how to structure your short answer questions to take advantage of these features.

## Basic Structure

Here's an example of a short answer question using the new format:

```javascript
{
  type: "short-answer",
  title: "Design Principles",
  description: "Test your knowledge of the SOLID principles.",
  points: 15,
  difficulty: "intermediate",
  content: {
    question: "What does the 'S' in SOLID stand for?",
    correctAnswer: "Single Responsibility Principle",
    acceptableAnswers: [
      "Single Responsibility Principle", 
      "Single Responsibility", 
      "SRP"
    ],
    formatHint: "Enter the full name of the principle",
    explanation: "The Single Responsibility Principle states that a class should have only one reason to change, meaning it should have only one responsibility or job."
  }
}
```

## Key Features

### Multiple Acceptable Answers

The `acceptableAnswers` array allows you to define multiple correct answers. This is useful for:
- Different ways of phrasing the same concept
- Common abbreviations
- Including/excluding articles ("the", "a", etc.)
- Variations in capitalization (the component does case-insensitive matching)

### Format Hints

The `formatHint` field provides guidance to users about the expected format of their answer:
- "Enter the full name of the principle"
- "One word answer expected"
- "Answer with True or False"
- "Enter the exact formula (e.g., 'F = ma')"

### Progressive Feedback

The component now provides:
- Different feedback based on the number of attempts
- Scoring that decreases with multiple attempts
- Ability to clear and retry without refreshing the page
- Explanation that serves as a hint for incorrect answers

## Backwards Compatibility

The enhanced component is backward compatible with the older format:

```javascript
{
  type: "short-answer",
  question: "What OO principle involves hiding implementation details?",
  correctAnswer: "Abstraction",
  points: 10,
  explanation: "Abstraction hides implementation details behind a simpler interface."
}
```

However, to take full advantage of the new features, we recommend using the new structure with the `content` object.

## Best Practices

1. **Be clear about what you're asking for**
   - Is it a specific term, a complete sentence, or specific formatting?

2. **Provide helpful format hints**
   - Include examples of what an answer might look like (without giving away the answer)

3. **Include common variations in acceptable answers**
   - Think about how students might phrase their answers differently

4. **Write helpful explanations**
   - Don't just explain why the answer is correct, but also provide guidance that helps students find the answer

5. **Test your questions**
   - Try entering different variations to ensure the matching works as expected 