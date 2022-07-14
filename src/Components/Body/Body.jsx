import React, { useState, useEffect } from 'react';
import './Body.css';
import { db } from '../../Firebase';
import { getDocs, collection, query, where } from 'firebase/firestore'

const Body = () => {
    const [Count, setCount] = useState(0)
    const [IsItCorrect, setIsItCorrect] = useState(false)
    const [Questions, setQuestions] = useState([])
    const [CorrectAnswers, setCorrectAnswers] = useState(0)
    const [ShowIntro, setShowIntro] = useState(true)

    const handleCorrect = () => {
        setIsItCorrect(true)
    }

    const handleIncorrect = () => {
        setIsItCorrect(false);
    }

    const handleSubmit = () => {
        setCount(Count + 1)
        if (IsItCorrect) {
            setCorrectAnswers(CorrectAnswers + 1)
        }
        console.log(Count)
    }

    const ShowQuiz = () => {
        setShowIntro(false);
    }

    useEffect(() => {
        const getQuestions = () => {
            const q = query(collection(db, 'questions'), where("Id", "==", Count))
            getDocs(q).then(response => {
                const data = response.docs.map(doc => ({ data: doc.data(), id: doc.id }));
                setQuestions(data)
            })
        }

        getQuestions()
    }, [Count])

    if (ShowIntro) {
        return (
            <>
                <div className="body_container">
                    <div className="body_content">
                        <div className="intro_container">
                            <div className="header">
                                <h1>React Programming Quiz</h1>
                                <p>This is a programming quiz designed to further increase the general knowledge of <span>React</span>/<span>Javascript</span> of those who visit this site.</p>
                            </div>
                            <div className="footer">
                                <button onClick={ShowQuiz}>Start Quiz</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
        <div className="body_container">
            <div className="body_content">
                {Questions.map((data) => (
                    <div className="question_container" key="1">
                        <div className="question_header">
                            <div className="question_title">
                                <h1>{data.data.Title}</h1>
                            </div>
                            <div className="question_type">
                                <p style={{ color: data.data.Type === 'React' ? '#00D8FF' : '#EFD81D' }}>{data.data.Type}</p>
                            </div>
                        </div>
                        <div className="question_answers_container">
                            {data.data.Answers.map((object, id) => (
                                <div className="question_answer" key={id}>
                                    <button className="answer_button" onClick={object.IsCorrect ? handleCorrect : handleIncorrect}>{object.Answer}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="question_answer_submit">
                    <button onClick={handleSubmit} className="submit_answer">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Body