import { FC, useEffect } from "react";
import { useTypedDispatch } from "shared/hooks";

import { getBiddingIDFromLocation } from "../config";
import { openSocket } from "../model";

import s from "./style.module.scss";

const Bidding: FC = () => {
	const dispatch = useTypedDispatch();

	useEffect(() => {
		openSocket(getBiddingIDFromLocation(window.location))(dispatch);
	}, []);

	return (
		<main className={s.bidding}>
			<div className="container">
				<div className={s.bidding__container}>
					<section className={s.bidding__info}>
						<h1 className={s.bidding__title}>
							Bidding progress: <span>Test bidding</span>
						</h1>

						<p className={s.bidding__id}>
							<span>Bidding ID: </span>
							{getBiddingIDFromLocation(window.location)}
						</p>
					</section>
				</div>
			</div>
		</main>
	);
};

export default Bidding;
