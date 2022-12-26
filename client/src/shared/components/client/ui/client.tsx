import clsx from "clsx";
import { FC, memo } from "react";

import s from "./style.module.scss";

interface IClientProps {
	isCurrent?: boolean;
	index?: number;
	data: string;
	className?: string;
}

const Client: FC<IClientProps> = memo(
	({ isCurrent, index, data, className }) => {
		return (
			<>
				<article
					className={clsx(s.client, isCurrent && s.client_active, className)}
				>
					<header className={s.client__header}>
						Participant <span>{index}</span>
					</header>

					<main className={s.client__main}>OOO Test Client</main>
					<footer className={s.client__footer}>{data}</footer>
				</article>
			</>
		);
	},
);

export default Client;
