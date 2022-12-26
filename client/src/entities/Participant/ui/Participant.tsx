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
				<div
					className={clsx(
						s.participant__timer,
						timerCount && s.participant__timer_active,
					)}
				>
					Time to move:<span>{timerCount}</span>
				</div>

				{timerCount ? (
					<Client data={data} index={index} isCurrent={Boolean(timerCount)} />
				) : (
					<Client data={data} index={index} />
				)}
			</div>
		);
	},
);

export default Participant;
