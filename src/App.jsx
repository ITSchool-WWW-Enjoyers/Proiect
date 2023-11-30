import React, { useState, useEffect } from 'react';
import Question from './Question';
import questionsData from './questionsData';


const App = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(questionsData.length).fill(''));
  const [showResults, setShowResults] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswerChange = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleNextButtonClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Dacă am ajuns la ultima întrebare, calculăm rezultatele
      const correct = answers.filter(
        (answer, index) => questions[index].correctAnswer === parseInt(answer)
      ).length;
      const incorrect = answers.length - correct;

      setCorrectCount(correct);
      setIncorrectCount(incorrect);
      setShowResults(true);
    }
  };

  const handleResetButtonClick = () => {
    setShowResults(false);
    setAnswers(Array(questionsData.length).fill(''));
    setCorrectCount(0);
    setIncorrectCount(0);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="container">
      {showResults ? (
        <div className="result">
          <h2>Rezultate</h2>
          <p>Întrebări Corecte: {correctCount}</p>
          <p>Întrebări Greșite: {incorrectCount}</p>
          <button type="button" onClick={handleResetButtonClick} className="reset-button">
            Incearca din nou </button>
        </div>
      ) : (
        <Question
          question={questions.length > 0 ? questions[currentQuestionIndex] : null}
          answer={answers[currentQuestionIndex]}
          onAnswerChange={handleAnswerChange}
          onNextButtonClick={handleNextButtonClick}
          onResetButtonClick={handleResetButtonClick}
        />
      )}
    </div>
  );
};

export default App;
