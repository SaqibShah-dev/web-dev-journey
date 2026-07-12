import { useState, useEffect, useRef } from 'react';
import Category from '../components/Category';
import { useQuizQuestions } from '../hooks/useQuizQuestions';

const Quiz = () => {
    const [category, setCategory] = useState("");
    const loadMoreRef = useRef(null);
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,    // Function to load the next 10 questions
        hasNextPage,      // Boolean tracking if there are more items to load
        isFetchingNextPage // Boolean tracking if the background fetch is active
    } = useQuizQuestions(category);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        )
        console.log("load more ref",loadMoreRef)
        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Trivia Quiz</h2>
            <Category category={category} setCategory={setCategory} />
            {isError && <p style={{ color: 'red' }}>Failed to load questions. Retrying...</p>}
            {isLoading && <p>Loading questions...</p>}

            {!isLoading && data && (
                <div style={{ marginTop: '20px' }}>
                    {/* useInfiniteQuery changes the structure: data is now grouped inside data.pages arrays */}
                    {data.pages.map((page, pageIndex) => (
                        <div key={pageIndex}>
                            {page.map((q, qIndex) => {
                                // Calculate actual continuous question number (e.g., 1 to 20 instead of resetting at 10)
                                const globalQuestionNumber = pageIndex * 10 + qIndex + 1;

                                return (
                                    <div key={globalQuestionNumber} style={{ marginBottom: '25px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                        <h3>Q{globalQuestionNumber}: {q.question}</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {q.answers.map((answer, aIndex) => (
                                                <button
                                                    key={aIndex}
                                                    onClick={() => answer === q.correctAnswer ? toast.success("Correct! 🎉") : toast.error("Wrong! ❌")}
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

                    {/* The magic scroll target element */}
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
