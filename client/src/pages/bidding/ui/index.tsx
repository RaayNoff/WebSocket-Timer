import { FC } from "react";
import { useNavigate } from "react-router";
import { Route } from "pages";

import { Participant } from "entities/Participant";
import { useBiddingActions } from "entities/bidding";
import { Button, Error, useTypedSelector } from "shared";

import { closeSocket, getBiddingIDFromLocation } from "../lib";

import s from "./style.module.scss";

const Bidding: FC = () => {
	const { openSocket, resetState } = useBiddingActions();
	const navigate = useNavigate();

	const { isCreated, clientsList, error, timer, willConnect, webSocket } =
		useTypedSelector((state) => state.bidding);

	const startBiddingHandler = () => {
		openSocket(getBiddingIDFromLocation(window.location), false);
	};

	const enterBiddingHandler = () => {
		openSocket(getBiddingIDFromLocation(window.location), true);
	};

	const leaveBiddingHandler = () => {
		if (webSocket) closeSocket(webSocket);

		resetState();
		navigate(Route.HOME);
	};

	return (
		<main className={s.bidding}>
			<div className="container">
				<div className={s.bidding__container}>
					<section className={s.bidding__info}>
						<h1 className={s.bidding__title}>
							Bidding progress: <span>Test bidding</span>
						</h1>

						{!isCreated && !willConnect && (
							<Button callback={startBiddingHandler}>Begin</Button>
						)}
						{willConnect && <Button callback={enterBiddingHandler}>Connect</Button>}
						<Button callback={leaveBiddingHandler}>Leave</Button>

						<p className={s.bidding__id}>
							<span>Bidding ID: </span>
							{getBiddingIDFromLocation(window.location)}
						</p>
					</section>

					{error && <Error text={error} />}

					<ul className={s.clients}>
						{clientsList?.map((cl, i) => {
							const isCurrent = timer?.currentClient === cl;

							if (isCurrent)
								return (
									<li key={cl} className={s.clients__item}>
										<Participant data={cl} index={i} timerCount={timer.count} />
									</li>
								);

							return (
								<li key={cl} className={s.clients__item}>
									<Participant data={cl} index={i} />
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</main>
	);
};

export default Bidding;
