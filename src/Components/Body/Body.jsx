import React, { useState, useEffect } from 'react';
import './Body.css';
import { db } from '../../Firebase';
import { getDocs, collection } from 'firebase/firestore'

const Body = () => {
    const [Count, setCount] = useState(0)
    const [IsItCorrect, setIsItCorrect] = useState(false)
    const [Questions, setQuestions] = useState([])
    const [FilteredQuestions, setFilteredQuestions] = useState([])
    const [CorrectAnswers, setCorrectAnswers] = useState(1)
    const [ShowIntro, setShowIntro] = useState(true)
    const [ShowResults, setShowResults] = useState(false)

    // Functions to change question and add a counter to the correct answers.
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
        if (Questions.length - 1 === Count) {
            setShowResults(true);
        }
    }

    const ShowQuiz = () => {
        setShowIntro(false);
        FilterQuestions()
    }

    const handleRepeat = () => {
        setCount(0);
        setCorrectAnswers(0);
        setShowResults(false);
    }

    // Function to get all the questions from the database. 
    const getQuestions = () => {
        const QuestionsCollectionRef = collection(db, 'questions')
        getDocs(QuestionsCollectionRef).then(response => {
            const data = response.docs.map(doc => ({ data: doc.data(), id: doc.id }));
            setQuestions(data)
        })
    }

    // Function to filter the questions stored in the Questions useState in order to only show 1 question at time.
    const FilterQuestions = () => {
        const Filter = Questions.filter(filter => filter.data.Id === Count)
        setFilteredQuestions(Filter)
    }


    useEffect(() => {
        getQuestions()
    }, [])

    useEffect(() => {
        FilterQuestions()
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

    if (ShowResults) {
        return (
            <>
                <div className="body_container">
                    <div className="body_content">
                        <div className="results_container">
                            <div className="results_header">
                                <p>Your results were:</p>
                                <h1><span>{CorrectAnswers}</span> correct out of {Questions.length}</h1>
                            </div>
                            <div className="results_footer">
                                <button onClick={handleRepeat}>Repeat the test</button>
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
                {FilteredQuestions.map((data) => (
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