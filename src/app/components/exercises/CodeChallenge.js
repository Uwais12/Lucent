import { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeChallenge({ exercise, onComplete }) {
  const [code, setCode] = useState(exercise.content.initialCode || '');
  const [output, setOutput] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [syntaxErrors, setSyntaxErrors] = useState([]);

  const validateCode = useCallback(() => {
    try {
      // Basic syntax check
      new Function(code);
      setSyntaxErrors([]);
      return true;
    } catch (error) {
      setSyntaxErrors([{
        line: error.lineNumber || 1,
        message: error.message
      }]);
      return false;
    }
  }, [code]);

  const runTests = async () => {
    if (!validateCode()) {
      setFeedback('Please fix the syntax errors before running the tests.');
      return;
    }

    setIsRunning(true);
    setOutput(null);
    setAttempts(prev => prev + 1);

    try {
      // Create a function from the user's code
      const userFunction = new Function(code);
      
      // Run test cases
      const testResults = exercise.content.testCases.map(testCase => {
        try {
          const result = userFunction(...testCase.input);
          return {
            passed: JSON.stringify(result) === JSON.stringify(testCase.expectedOutput),
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: result,
          };
        } catch (error) {
          return {
            passed: false,
            input: testCase.input,
            error: error.message,
          };
        }
      });

      const allPassed = testResults.every(result => result.passed);
      setIsCorrect(allPassed);
      setOutput(testResults);

      if (allPassed) {
        setFeedback(getSuccessFeedback(attempts));
        if (onComplete) {
          const score = Math.max(
            exercise.points - (hintsUsed * 2),
            Math.floor(exercise.points * 0.6)
          );
          onComplete(score);
        }
      } else {
        setFeedback(getIncorrectFeedback(attempts, testResults));
      }
    } catch (error) {
      setOutput([{
        passed: false,
        error: 'Syntax error: ' + error.message,
      }]);
      setIsCorrect(false);
      setFeedback('There was an error running your code. Check for syntax errors.');
    } finally {
      setIsRunning(false);
    }
  };

  const getSuccessFeedback = (attempts) => {
    if (attempts === 1) return 'Perfect! All tests passed on your first try! 🎉';
    if (attempts <= 3) return 'Great job! You got all tests passing! 🌟';
    return 'Well done! Your persistence paid off - all tests are passing! ⭐';
  };

  const getIncorrectFeedback = (attempts, results) => {
    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;
    const progress = Math.round((passedCount / totalCount) * 100);

    const baseMessage = `Progress: ${progress}% (${passedCount}/${totalCount} tests passing). `;
    
    if (attempts === 1) return baseMessage + 'Keep going! Check the failed test cases for clues.';
    if (attempts === 2) return baseMessage + 'Getting closer! Look at the patterns in the test cases.';
    return baseMessage + 'Consider using a hint if you need help.';
  };

  const getHint = () => {
    setHintsUsed(prev => prev + 1);
    setShowHint(true);
    
    // Get a relevant hint based on the current state
    let hint = '';
    if (output && output.some(result => !result.passed)) {
      const failedTest = output.find(result => !result.passed);
      hint = `Hint: For input ${JSON.stringify(failedTest.input)}, your code returned ${
        failedTest.error 
          ? 'an error'
          : JSON.stringify(failedTest.actual)
      }. Expected: ${JSON.stringify(failedTest.expected)}`;
    } else {
      hint = exercise.content.hints?.[hintsUsed] || 'Try breaking down the problem into smaller steps.';
    }
    
    setFeedback(hint);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{exercise.title}</h3>
      <p className="text-gray-600 mb-6">{exercise.description}</p>

      <div className="space-y-6">
        {/* Instructions */}
        <div className="prose prose-violet max-w-none">
          <div dangerouslySetInnerHTML={{ __html: exercise.content.instructions }} />
        </div>

        {/* Code Editor */}
        <div className="border rounded-lg overflow-hidden">
          <Editor
            height="300px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={setCode}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              suggest: {
                showKeywords: true,
                showSnippets: true,
              },
            }}
          />
        </div>

        {/* Syntax Errors */}
        {syntaxErrors.length > 0 && (
          <div className="space-y-2">
            {syntaxErrors.map((error, index) => (
              <div key={index} className="p-3 bg-red-50 text-red-700 rounded-lg">
                <div className="font-medium">Syntax Error:</div>
                <div className="text-sm">{error.message}</div>
              </div>
            ))}
          </div>
        )}

        {/* Test Cases */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Test Cases</h4>
          <div className="space-y-2">
            {exercise.content.testCases.map((testCase, index) => (
              <div
                key={index}
                className={`p-3 border rounded-lg text-sm transition-colors ${
                  output && output[index]
                    ? output[index].passed
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="font-mono">
                  Input: {JSON.stringify(testCase.input)}
                </div>
                <div className="font-mono">
                  Expected: {JSON.stringify(testCase.expectedOutput)}
                </div>
                {output && output[index] && (
                  <div className={`mt-2 p-2 rounded ${
                    output[index].passed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {output[index].passed
                      ? '✓ Passed'
                      : output[index].error
                        ? `✗ Error: ${output[index].error}`
                        : `✗ Got: ${JSON.stringify(output[index].actual)}`}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={runTests}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isRunning
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-violet-600 text-white hover:bg-violet-700'
              }`}
            >
              {isRunning ? 'Running Tests...' : 'Run Tests'}
            </button>

            <button
              onClick={getHint}
              disabled={isCorrect || hintsUsed >= 3}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isCorrect || hintsUsed >= 3
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'border border-violet-300 text-violet-700 hover:bg-violet-50'
              }`}
            >
              {hintsUsed >= 3 ? 'No More Hints' : 'Get Hint'}
              {hintsUsed > 0 && hintsUsed < 3 && ` (${3 - hintsUsed} left)`}
            </button>
          </div>

          {feedback && (
            <div
              className={`p-3 rounded-lg ${
                isCorrect ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-700'
              }`}
            >
              {feedback}
            </div>
          )}

          {hintsUsed > 0 && (
            <div className="text-sm text-gray-500">
              Note: Using hints reduces the points earned for this exercise.
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 