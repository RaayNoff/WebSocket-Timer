import clsx from "clsx";
import { FC, memo } from "react";

import s from "./style.module.scss";

interface IButtonProps {
	disabled?: boolean;
	children?: React.ReactNode;
	className?: string;
	callback?: () => void;
}

const Button: FC<IButtonProps> = memo(
	({ children, className, disabled, callback }) => {
		return (
			<button
				disabled={disabled}
				onClick={callback}
				className={clsx(s.button, className)}
			>
				{children}
			</button>
		);
	},
);

export default Button;
