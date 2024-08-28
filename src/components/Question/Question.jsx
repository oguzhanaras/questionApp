import { useState, useEffect } from 'react';
import './Question.css';

const Question = ({ questions }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [trueAnswer, setTrueAnswer] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [timer, setTimer] = useState(30);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]); 

    useEffect(() => {
        let countdown;
        if (isTimerActive) {
            countdown = setInterval(() => {
                if (timer > 0) {
                    setTimer((prevTimer) => prevTimer - 1);
                } else {
                    clearInterval(countdown);
                    handleNextQuestion(); 
                }
            }, 1000); 
        }
        return () => clearInterval(countdown);
    }, [timer, isTimerActive, questionIndex]);

    useEffect(() => {
        const showOptionsTimer = setTimeout(() => {
            setShowOptions(true);
            setIsTimerActive(true);
        }, 4000);

        return () => clearTimeout(showOptionsTimer);
    }, [questionIndex]);

    const handleNextQuestion = (event) => {
        if (event) {
            event.preventDefault();
        }

        const userAnswer = {
            question: questions[questionIndex].question,
            selectedAnswer: selectedAnswer,
            correctAnswer: questions[questionIndex].answer,
        };
        setUserAnswers((prevAnswers) => [...prevAnswers, userAnswer]);

        if (selectedAnswer === questions[questionIndex].answer) {
            setTrueAnswer((prevTrueAnswer) => prevTrueAnswer + 1);
        }

        if (questionIndex + 1 === questions.length) {
            setIsFinished(true);
        } else {
            setQuestionIndex((prevIndex) => prevIndex + 1);
            setShowOptions(false);
            setTimer(30);
            setIsTimerActive(false);
        }
        setSelectedAnswer(null);
    };

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    if (isFinished) {
        return (
            <div className='question-finish'>
                <h2 className='finish-title'>Test Bitti!</h2>
                <p className='finish-result'>Sonuç: {trueAnswer} doğru cevap.</p>
                <h3 className='finish-answers-title'>Cevaplarınız:</h3>
                <ul className='finish-answers-list'>
                    {userAnswers.map((answer, index) => (
                        <li key={index} className='finish-answer-item'>
                            <strong>Soru:</strong> {answer.question} <br />
                            <strong>Verilen Cevap:</strong> {answer.selectedAnswer || "Cevap verilmedi"} <br />
                            <strong>Doğru Cevap:</strong> {answer.correctAnswer}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className='question-area'>
            <img className='question-image' src={"/pictures/" + questions[questionIndex].media} alt="" />
            <h2 className='question-title'>{questions[questionIndex].question}</h2>
            {showOptions && (
                <>
                    <div className='question-body'>
                        <div className='timer'>
                            <p>Geri Sayım: {timer} saniye</p>
                        </div>
                        <div>
                            <form onSubmit={handleNextQuestion}>
                                {questions[questionIndex].options.map((option, index) => (
                                    <label className='question-label' key={index}>
                                        <input
                                            className='question-radio'
                                            type="radio" 
                                            name="question" 
                                            value={option} 
                                            onChange={handleAnswerChange} 
                                            checked={selectedAnswer === option}
                                        />
                                        {option}
                                    </label>
                                ))}
                                <button type="submit">Gönder</button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Question;
