import { lazy } from "react";
import { Route as Path, Routes, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("./home"));
const BiddingPage = lazy(() => import("./bidding"));

export enum Route {
	HOME = "/home",
	BIDDING = "/bidding",
}

export const Routing = () => {
	return (
		<Routes>
			<Path path={Route.HOME} element={<HomePage />} />
			<Path path={Route.BIDDING + "/:id"} element={<BiddingPage />} />
			<Path path="*" element={<Navigate to={Route.HOME} />} />
		</Routes>
	);
};
