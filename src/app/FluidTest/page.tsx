"use client"
import { FC } from "react";
import Test from "../lib/Test/Test";
import Option from "../lib/Option/Option";
import Question from "../lib/Question/Question";
import FluidTest from '../lib/json/FluidTest.json';

interface OptionData {
    src: string;
}

interface QuestionData {
    questionType: string;
    text: string;
    src: string;
    correctIndex: number;
    options: OptionData[];
}

interface TestData {
    questions: QuestionData[];
}

const FluidTestPage: FC = () => {
    const { questions }: TestData = FluidTest;

    const questionComponents = questions.map((question: QuestionData, index: number) => {
        const options = question.options.map((option: OptionData, optionIndex: number) => (
            <Option key={optionIndex} src={questions[index].options[optionIndex].src} />
        ));

        return (
            <Question
                key={index}
                text={question.text}
                correctIndex={question.correctIndex}
                options={options}
                src={question.src}
                questionType={question.questionType}
            />
        );
    });

    return (
        <div className="flex">
            <Test questions={questionComponents} />
        </div>
    )
}

export default FluidTestPage;