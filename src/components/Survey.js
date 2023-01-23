import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';

const Survey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useLocalStorage('surveyAnswers', []);
  const [sessionId, setSessionId] = useLocalStorage('sessionId', null);
  const [completed, setCompleted] = useLocalStorage('completed', false);

  const questions = [    { id: 1, question: 'How satisfied are you with our products?', type: 'rating', options: [1, 2, 3, 4, 5] },
    { id: 2, question: 'How fair are the prices compared to similar retailers?', type: 'rating', options: [1, 2, 3, 4, 5] },
    { id: 3, question: 'How satisfied are you with the value for money of your purchase?', type: 'rating', options: [1, 2, 3, 4, 5] },
    { id: 4, question: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { id: 5, question: 'What could we do to improve our service?', type: 'text' },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  if (!sessionId) {
    setSessionId(Date.now());
  }

  if (completed) {
    return (
      <div className="survey-container">
        <h1>Thank you for your time!</h1>
        <button onClick={() => setCompleted(false)}>Take survey again</button>
      </div>
    );
  }

  return (
    <div className="survey-container">
      <h1>Welcome to the survey!</h1>
      <button onClick={() => setCurrentQuestionIndex(0)}>Start</button>

      {currentQuestion && (
        <div>
          <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
          <p>{currentQuestion.question}</p>

          {currentQuestion.type === 'rating' ? (
            <div>
              {currentQuestion.options.map((option) => (
                <button key={option} onClick={() => {
                    setAnswers([...answers, { questionId: currentQuestion.id, answer: option }]);
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                  }
                }>
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div>
              <textarea
                onChange={(event) => {
                    setAnswers([...answers, { questionId: currentQuestion.id, answer: event.target.value }]);
                  }
                }
              />
              <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Next</button>
            </div>
          )}

          <button disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>Previous</button>
            <button disabled={currentQuestionIndex === questions.length - 1} onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Next</button>
            <button onClick={() => setAnswers([...answers, { questionId: currentQuestion.id, answer: null }])}>Skip</button>
        </div>
        )}
{currentQuestionIndex === questions.length && (
    <div>
      <h2>Survey Complete</h2>
      <button onClick={() => setCompleted(true)}>Submit</button>
    </div>
  )}
</div>
);
};

export default Survey;
