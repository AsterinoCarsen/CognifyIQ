import "./Question.css";
import Image from "next/image";
import Option from "../Option/Option";
import { FC, useState } from "react";

interface OptionProps {
    src: string;
}

interface QuestionProps {
    text: string,
    description?: string,
    src: string,
    questionType: string,
    options: React.ReactNode[],
    correctIndex: number,
    onNext?: (isCorrect: boolean) => void,
}

const Question: FC<QuestionProps> = ({ text, options = [], correctIndex, src, questionType, description, onNext }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    /*
    answered = 0 is unanswered
    answered = 1 is answered
    answered = 2 is correctly answered
    */
    const [answered, setAnswered] = useState(0);

    const handlePress = (index: number) => {
        setSelectedIndex(index);
        if (index == correctIndex) {
            setAnswered(2);
        } else {
            setAnswered(1);
        }
    }

    const handleNext = () => {
        if (answered != 0 && onNext) {
            onNext(answered == 2);
        }
    }

    return (
        <div className="flex parent relative flex flex-col w-full h-full rounded-lg">
            <p className="font-bold text-lightBlue">{questionType}</p>
            <h1 className="text-5xl font-extrabold text-darkBlue">{text}</h1>
            <p className="pt-5 text-xl text-paleBlue">{description}</p>

            <div className="flex w-full justify-center mb-4">
                <Image alt="" src={src} width={500} height={500} />
            </div>

            <div className="w-full grid grid-cols-3 grid-rows-2 gap-4">
                {options.map((option, index) => (
                    <Option key={index} src={option.props.src} isPressed={selectedIndex == index} onPress={() => handlePress(index) } />
                ))}
            </div>

            <button onClick={handleNext} disabled={selectedIndex == null} className="bg-white rounded-lg hover:bg-lightBlue disabled:bg-darkBlue disabled:text-offWhite h-20 mt-5 mb-5 text-3xl font-extrabold text-darkBlue transition duration-300 ease-in-out">Next</button>

            <div className="absolute bottom-0 right-10 left-10 h-0.5 bg-darkBlue"></div>
        </div>
    );
};

export default Question;