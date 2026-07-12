import { useInfiniteQuery } from '@tanstack/react-query';
import {toast} from "react-hot-toast";

const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const fetchQuizQuestions = async (categoryID,pageParam=1) => {
  const categoryParam = categoryID ? `&category=${categoryID}` : '';
  const response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple${categoryParam}`);
  
  if (!response.ok) {
    toast.error('Network response failed');
  }
  
  const result = await response.json();

  if (!result.results) return [];

  return result.results.map((q) => {
    const allAnswers = [...q.incorrect_answers, q.correct_answer].map(ans => decodeHTML(ans));
    
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
    return {
      question: decodeHTML(q.question),
      correctAnswer: decodeHTML(q.correct_answer),
      answers: shuffledAnswers
    };
  });
};

export const useQuizQuestions = (category) => {
  return useInfiniteQuery({
    queryKey: ['questions', category],
    
    queryFn: ({ pageParam = 1 }) => fetchQuizQuestions(category, pageParam),
    
    initialPageParam: 1,
    
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};