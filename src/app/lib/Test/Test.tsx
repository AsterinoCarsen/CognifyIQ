import Question from "../Question/Question";
import React, { use } from "react";
import { useState } from "react";

interface TestProps {
    questions: React.ReactNode[];
}

export default function Test({ questions }: TestProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [results, setResults] = useState<boolean[]>(Array(questions.length).fill(false));
    const [isCompleted, setCompleteStatus] = useState(false);
    const [correctCount, setCorrectCount] = useState(-1);

    const handleNextQuestion = (isCorrect: boolean) => {
        const newResults = [...results];
        newResults[currentQuestionIndex] = isCorrect;
        setResults(newResults);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCorrectCount(newResults.filter(value => value).length);
            setCompleteStatus(true);
        }
    }

    return (
        <div className="flex justify-center w-full">
            {!isCompleted ? (
                <div className="fade-container h-screen pb-10 pt-10 transition-opacity duration-500 opacity-100">
                    <p className="text-center mb-2 text-black font-semibold">Question {currentQuestionIndex + 1} / {questions.length}</p>
                    <div className="flex w-full mb-2 h-8 bg-offWhite rounded-md relative">
                        <div
                            className="bg-paleBlue h-full rounded-md"
                            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                    {React.cloneElement(questions[currentQuestionIndex] as React.ReactElement, {
                        onNext: handleNextQuestion,
                    })}
                </div>
            ): (
                <div>
                    <h1 className="text-5xl font-darkBlue font-extrabold">Test completed!</h1>
                    <p>You got {correctCount} / {results.length} correct!</p>
                </div>
            )}
        </div>
    );
}