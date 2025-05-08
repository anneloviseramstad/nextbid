import { getListings } from "../../api/listings/getListings.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { filterListings } from "./filterListings.js";
import { renderListings } from "../../components/listings/renderListings.js";

export async function displayListings(
  searchQuery,
  sortByDate,
  sortByTitle,
  sortByTag
) {
  const container = document.querySelector("#listingsContainer");

  try {
    const response = await getListings();

    const filteredListings = filterListings(
      response,

      searchQuery,
      sortByDate,
      sortByTitle,
      sortByTag
    );

    renderListings(container, filteredListings);
    console.log(filteredListings);
  } catch (error) {
    displayMessage("#message-container", "warning", error.message);
  }
}
