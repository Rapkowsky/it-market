import {
	BASE_API_URL,
	state,
	searchInputEl,
	searchFormEl,
	jobListSearchEl,
	numberEl,
	sortingBtnRecentEl,
	sortingBtnRelevantEl,
	getData,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";

const submitHandler = async (e) => {
	// prevent default behavior
	e.preventDefault();

	// get search text
	const searchText = searchInputEl.value;

	// validation (regular expression example)
	const forbiddenPattern = /[0-9]/;
	const patternMatch = forbiddenPattern.test(searchText);
	if (patternMatch) {
		renderError("Your search may not contain numbers");
		return;
	}

	// blur input (not focused)
	searchInputEl.blur();

	// remove previous jobItems search
	jobListSearchEl.innerHTML = "";

	// reset sorting buttons
	sortingBtnRecentEl.classList.remove("sorting__button--active");
	sortingBtnRelevantEl.classList.add("sorting__button--active");

	// render spinner
	renderSpinner("search");

	try {
		// fetch search results
		const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

		// extract job items
		const { jobItems } = data;

		// update state
		state.searchJobItems = jobItems;
		state.currentPage = 1;

		// remove spinner
		renderSpinner("search");

		// render number of results
		numberEl.textContent = jobItems.length;

		// render pagination buttons
		renderPaginationButtons();

		// render job items in search job list (for first 7 elements)
		renderJobList();
	} catch (error) {
		// network problem or other errors
		renderSpinner("search");
		renderError(error.message);
	}
};

searchFormEl.addEventListener("submit", submitHandler);
