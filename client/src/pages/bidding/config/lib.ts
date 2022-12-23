import { Route } from "pages";

const getBiddingIDFromLocation = (location: Location) => {
	if (!location) return "";

	return location.pathname.replace(`${Route.BIDDING}/`, "");
};

export { getBiddingIDFromLocation };
