import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import * as ActionCreators from "../../../entities/bidding/model/bidding.actions";

const useBiddingActions = () => {
	const dispatch = useDispatch<AppDispatch>();
	return bindActionCreators(ActionCreators, dispatch);
};

export { useBiddingActions };
