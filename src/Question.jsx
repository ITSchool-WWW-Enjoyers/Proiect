import React, { useState } from 'react';

const Question = ({ question, answer, onAnswerChange, onNextButtonClick, onResetButtonClick }) => {

  return (
    <form>
      <div className="quiz-container">

        <div className="question">
          <p className="size-question">{question && question.text}</p>
          <div className="options">
              {question &&
                question.options.map((option, optionIndex) => (
                <label >
                  <input
                    type="radio"
                    name="answer"
                    value={optionIndex}
                    checked={answer === optionIndex.toString()}
                    onChange={() => onAnswerChange(optionIndex.toString())}
                  />
                  <p className="optiuni" key={optionIndex} className={answer === optionIndex.toString() ? 'selected-answer' : ''}>{option}</p>
                </label>
              ))}
          </div>
        </div>
        <div className="button">
          {question && (
            <>
              <button
                type="button"
                onClick={onNextButtonClick}
                disabled={answer === ''} 
                 className='next-button'
              >
                Următoarea întrebare
              </button>
              <button type="button" onClick={onResetButtonClick} className="reset-button">
                Resetează formularul
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default Question;