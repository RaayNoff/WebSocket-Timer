import { Route } from "pages";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input } from "shared";

import s from "./style.module.scss";

const Home: FC = () => {
	const [inputValue, setInputValue] = useState("");
	const navigate = useNavigate();

	const startBiddingHandler = () => {
		navigate(Route.BIDDING + `/${`f${(+new Date()).toString(16)}`}`);
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
						<Button>Enter bidding</Button>
					</section>
				</div>
			</div>
		</main>
	);
};

export default Home;
