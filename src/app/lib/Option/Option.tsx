import Image from "next/image"
import "./Option.css";
import { useState, FC } from "react";

interface OptionProps {
    src: string,
    isPressed?: boolean,
    onPress?: () => void;
}

const Option: FC<OptionProps> = ({ src, isPressed=false, onPress }) => {
    return (
        <button onClick={onPress} className={`${isPressed ? `ring-8` : ``} relative flex justify-center items-center rounded-lg hover:ring-8 ring-lightBlue transition duration-300 ease-in-out`}>
            <Image className="p-2 relative z-10" alt="Option Image" src={src} height={100} width={100} />
        </button>
    )
}

export default Option;