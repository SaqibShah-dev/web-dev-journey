import { useState, useEffect } from 'react';
import Category from '../components/Category';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
                const categoryParam = category ? `&category=${category}` : '';
                const response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple${categoryParam}`);
                const result = await response.json();

                if (result.results) {
                    const formattedQuestions = result.results.map((q) => {
                        const allAnswers = [...q.incorrect_answers, q.correct_answer].map(ans => decodeHTML(ans));
                        const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

                        return {
                            question: decodeHTML(q.question),
                            correctAnswer: decodeHTML(q.correct_answer),
                            answers: shuffledAnswers
                        };
                    });

                    setQuestions(formattedQuestions);
                }
            }
        catch (error) {
            console.error("Error fetching trivia data:", error);
        } finally {
            setLoading(false);
        }
    }

        fetchData();
    }, [category])


    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Trivia Quiz</h2>
            <Category category={category} setCategory={setCategory} />
            {loading ? (
                <p>Loading questions...</p>
            ) : (
                <div style={{ marginTop: '20px' }}>
                    {questions.map((q, qIndex) => (
                        <div key={qIndex} style={{ marginBottom: '25px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                            <h3>Q{qIndex + 1}: {q.question}</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {q.answers.map((answer, aIndex) => (
                                    <button
                                        key={aIndex}
                                        onClick={() => alert(answer === q.correctAnswer ? "Correct! 🎉" : "Wrong! ❌")}
                                        style={{ padding: '10px', textAlign: 'left', cursor: 'pointer' }}
                                    >
                                        {answer}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Quiz;
