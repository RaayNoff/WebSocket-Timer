import { Route } from "pages";
import { useBiddingActions } from "entities/bidding";
import { Button, Input } from "shared";

import { FC, useState } from "react";
import { useNavigate } from "react-router";

import { getRandomRoom } from "./lib";

import s from "./style.module.scss";

const Home: FC = () => {
	const [inputValue, setInputValue] = useState("");
	const navigate = useNavigate();
	const { setIsCreated, setWillBeCreated } = useBiddingActions();

	const startBiddingHandler = () => {
		navigate(Route.BIDDING + `/${getRandomRoom()}`);
	};

	const enterBiddingHandler = () => {
		setIsCreated(true);
		setWillBeCreated(false);
		navigate(Route.BIDDING + `/${inputValue}`);
	};

	return (
		<main className={s.home}>
			<div className="container">
				<div className={s.home__container}>
					<h1 className={s.home__title}>Welcome to trading platform</h1>
					<Input
						value={inputValue}
						setValue={setInputValue}
						placeholder="Bidding ID"
						className={s.home__input}
					/>
					<section className={s.home__buttons}>
						<Button callback={startBiddingHandler}>Start bidding</Button>
						<Button callback={enterBiddingHandler}>Enter bidding</Button>
					</section>
				</div>
			</div>
		</main>
	);
};

export default Home;
