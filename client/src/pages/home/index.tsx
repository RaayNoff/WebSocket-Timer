import { FC, useState } from "react";
import { Button, Input } from "shared";

import s from "./style.module.scss";

const Home: FC = () => {
	const [inputValue, setInputValue] = useState("");

	const startBiddingHandler = () => {
		console.log("Started bidding");
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
