import React, { useState, useEffect } from 'react';
import './Body.css';
import { db } from '../../Firebase';
import { getDocs, collection, query, where } from 'firebase/firestore'

const Body = () => {
    const [Count, setCount] = useState(0)
    const [IsItCorrect, setIsItCorrect] = useState(false)
    const [Questions, setQuestions] = useState([])
    const [CorrectAnswers, setCorrectAnswers] = useState(0)

    const handleCorrect = () => {
        setIsItCorrect(true)
    }

    const handleIncorrect = () => {
        setIsItCorrect(false);
    }

    const handleSubmit = () => {
        const newCount = Count + 1
        setCount(newCount)
        if (IsItCorrect) {
            setCorrectAnswers(CorrectAnswers + 1)
        }
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