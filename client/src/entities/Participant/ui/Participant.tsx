import clsx from "clsx";
import { FC, memo } from "react";
import { Client } from "shared";

import s from "./style.module.scss";

interface IParticipantProps {
	timerCount?: number;
	index?: number;
	data: string;
}

const Participant: FC<IParticipantProps> = memo(
	({ timerCount, index, data }) => {
		return (
			<div className={s.participant}>
				{timerCount && (
					<div className={s.participant__timer}>
						Time to move:<span>{timerCount}</span>
					</div>
				)}

				<Client
					data={data}
					index={index}
					className={clsx(s.participant__notactive)}
				/>
			</div>
		);
	},
);

export default Participant;
