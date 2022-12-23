import clsx from "clsx";
import { FC } from "react";

import s from "./style.module.scss";

interface IInputProps {
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	placeholder?: string;
	className?: string;
}

const Input: FC<IInputProps> = ({
	value,
	setValue,
	placeholder,
	className,
}) => {
	return (
		<input
			className={clsx(s.input, className)}
			type="text"
			value={value}
			onChange={(e) => setValue(e.target.value)}
			placeholder={placeholder}
		/>
	);
};

export default Input;
