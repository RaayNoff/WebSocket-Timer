import { createStore } from "app/store";
import React from "react";
import { Provider } from "react-redux";

export const withStore = (component: () => React.ReactNode) => () =>
	<Provider store={createStore()}>{component()}</Provider>;
