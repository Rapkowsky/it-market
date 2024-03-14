import { spinnerSearchEl, spinnerJobDetailsEl } from "../common.js";

const renderSpinner = (spinnerType) => {
	const spinnerEl =
		spinnerType === "search" ? spinnerSearchEl : spinnerJobDetailsEl;
	spinnerEl.classList.toggle("spinner--visible");
};

export default renderSpinner;
