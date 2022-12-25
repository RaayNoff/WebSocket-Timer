import { FC } from "react";

import { Participant } from "entities/Participant";
import { useBiddingActions } from "entities/bidding";
import { Button, Error, useTypedSelector } from "shared";

import { getBiddingIDFromLocation } from "../lib";

import s from "./style.module.scss";

const Bidding: FC = () => {
	const { openSocket } = useBiddingActions();

	const { isCreated, clientsList, error, willBeCreated, timer } =
		useTypedSelector((state) => state.bidding);

	const startBiddingHandler = () => {
		openSocket(getBiddingIDFromLocation(window.location));
	};

	const enterBiddingHandler = () => {
		openSocket(getBiddingIDFromLocation(window.location), true);
	};

	return (
		<main className={s.bidding}>
			<div className="container">
				<div className={s.bidding__container}>
					<section className={s.bidding__info}>
						<h1 className={s.bidding__title}>
							Bidding progress: <span>Test bidding</span>
						</h1>

						{!isCreated && willBeCreated && (
							<Button callback={startBiddingHandler}>Begin</Button>
						)}
						{!willBeCreated && (
							<Button callback={enterBiddingHandler}>Connect</Button>
						)}

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
