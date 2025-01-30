import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeChallenge({ exercise, onComplete }) {
  const [code, setCode] = useState(exercise.content.initialCode || '');
  const [output, setOutput] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    setOutput(null);

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

      if (allPassed && onComplete) {
        onComplete(exercise.points);
      }
    } catch (error) {
      setOutput([{
        passed: false,
        error: 'Syntax error: ' + error.message,
      }]);
      setIsCorrect(false);
    } finally {
      setIsRunning(false);
    }
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
            }}
          />
        </div>

        {/* Test Cases */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Test Cases</h4>
          <div className="space-y-2">
            {exercise.content.testCases.map((testCase, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm"
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

        {/* Run Button */}
        <div>
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

          {isCorrect !== null && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {isCorrect
                ? 'All tests passed! Great job!'
                : 'Some tests failed. Check the output and try again.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 