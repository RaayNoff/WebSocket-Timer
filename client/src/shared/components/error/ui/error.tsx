import { FC } from "react";

import s from "./style.module.scss";

interface IErrorProps {
	text: string;
}

const Error: FC<IErrorProps> = ({ text }) => {
	return <p className={s.error}>{text}</p>;
};

export default Error;
