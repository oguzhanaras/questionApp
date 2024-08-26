import { useState, useEffect } from 'react';
import './Question.css';

const Question = ({ questions }) => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [trueAnswer, setTrueAnswer] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [timer, setTimer] = useState(30); // 30 saniye geri sayma
    const [isTimerActive, setIsTimerActive] = useState(false); // timer aktif mi kontrol et

    useEffect(() => {
        // timerı başlat
        let countdown;
        if (isTimerActive) {
            countdown = setInterval(() => {
                if (timer > 0) {
                    setTimer((prevTimer) => prevTimer - 1);
                } else {
                    clearInterval(countdown);
                    handleNextQuestion(); // süre bitince sıradaki sorya geç
                }
            }, 1000); // geri sasyım için her saniye guncelleme
        }

        // geri sayım temizleme
        return () => clearInterval(countdown);
    }, [timer, isTimerActive, questionIndex]);

    useEffect(() => {
        // cevapları ve butonu belirtilen sure sonunda goster
        const showOptionsTimer = setTimeout(() => {
            setShowOptions(true);
            setIsTimerActive(true); // timerı baslat
        }, 4000);

        return () => clearTimeout(showOptionsTimer);
    }, [questionIndex]);

    const handleNextQuestion = (event) => {
        if (event) {
            event.preventDefault();
        }

        // doğru cevab kontrol
        if (selectedAnswer === questions[questionIndex].answer) {
            setTrueAnswer((prevTrueAnswer) => prevTrueAnswer + 1);
        }

        // son soruya gelince finished true olur ve test biter
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
                <h2>Test Bitti!</h2>
                <p>Sonuç: {trueAnswer} doğru cevap.</p>
            </div>
        );
    }

    return (
        <div className='question-area'>
            <img className='question-image' src={ "/pictures/" + questions[questionIndex].media} alt="" />
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