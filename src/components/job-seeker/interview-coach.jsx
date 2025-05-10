import React, { useState } from 'react';
import './interview-coach.css';

const InterviewCoach = () => {
  const [step, setStep] = useState(1); // لتحديد المرحلة في التدريب
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    // تحليل الإجابة وتقديم ملاحظات (يمكن تحسينها لاحقاً لتكون أكثر تطوراً)
    if (answer.trim() === '') {
      setFeedback('Please provide an answer!');
    } else {
      setFeedback('Good answer! Here are some tips to improve it...');
    }
    setAnswer('');
    setStep(step + 1);
  };

  const renderQuestion = () => {
    switch (step) {
      case 1:
        return (
          <div className="question-box">
            <h3>Tell me about yourself.</h3>
            <textarea
              value={answer}
              onChange={handleAnswerChange}
              placeholder="Your answer here..."
            />
            <button onClick={handleSubmitAnswer} className="btn btn-primary">
              Submit Answer
            </button>
          </div>
        );
      case 2:
        return (
          <div className="question-box">
            <h3>Why should we hire you?</h3>
            <textarea
              value={answer}
              onChange={handleAnswerChange}
              placeholder="Your answer here..."
            />
            <button onClick={handleSubmitAnswer} className="btn btn-primary">
              Submit Answer
            </button>
          </div>
        );
      case 3:
        return (
          <div className="feedback-box">
            <h3>Your Feedback</h3>
            <p>{feedback}</p>
            <button onClick={() => setStep(1)} className="btn btn-secondary">
              Restart Interview
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="interview-coach-container">
      <h1 className="text-center">AI Interview Coach</h1>
      {renderQuestion()}
    </div>
  );
};

export default InterviewCoach;
