import { Routing } from "pages";

import "./index.scss";
import { withProviders } from "./providers";

const App = () => {
	return <Routing />;
};

export default withProviders(App);
