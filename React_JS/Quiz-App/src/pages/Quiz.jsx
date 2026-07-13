import { useState, useEffect, useRef } from 'react';
import Category from '../components/Category';
import { useQuizQuestions } from '../hooks/useQuizQuestions';
import { toast } from "react-hot-toast";
import Result from './Result';
import { useQuizScore } from '../context/useQuizScore';
import { Link } from 'react-router-dom';

const Quiz = () => {
    const [category, setCategory] = useState("");
    const loadMoreRef = useRef(null);
    
    const { addCorrectAnswer, addIncorrectAnswer, resetQuiz } = useQuizScore();

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,    
        hasNextPage,      
        isFetchingNextPage 
    } = useQuizQuestions(category);

    useEffect(() => {
        resetQuiz();
    }, [category]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        )
        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleAnswerSelection = (chosenAnswer, correctAnswer) => {
        if (chosenAnswer === correctAnswer) {
            toast.success("Correct! 🎉");
            addCorrectAnswer(); 
        } else {
            toast.error("Wrong! ❌");
            addIncorrectAnswer();
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Trivia Quiz</h2>
            <Category category={category} setCategory={setCategory} />
            
            <Link to="/result">Check Result</Link>

            {isError && <p style={{ color: 'red' }}>Failed to load questions. Retrying...</p>}
            {isLoading && <p>Loading questions...</p>}

            {!isLoading && data && (
                <div style={{ marginTop: '20px' }}>
                    {data.pages.map((page, pageIndex) => (
                        <div key={pageIndex}>
                            {page.map((q, qIndex) => {
                                const globalQuestionNumber = pageIndex * 10 + qIndex + 1;

                                return (
                                    <div key={globalQuestionNumber} style={{ marginBottom: '25px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                        <h3>Q{globalQuestionNumber}: {q.question}</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {q.answers.map((answer, aIndex) => (
                                                <button
                                                    key={aIndex}
                                                    onClick={() => handleAnswerSelection(answer, q.correctAnswer)}
                                                    style={{ padding: '10px', textAlign: 'left', cursor: 'pointer' }}
                                                >
                                                    {answer}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                    <div ref={loadMoreRef} style={{ height: '20px', margin: '20px 0', textAlign: 'center' }}>
                        {isFetchingNextPage && <p>Loading 10 more questions...</p>}
                        {!hasNextPage && <p>You have reached the end of the quiz!</p>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz;