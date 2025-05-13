import { getListings } from "../../api/listings/getListings.js";
import { displayMessage } from "../../ui/common/displayMessage.js";
import { filterListings } from "./filterListings.js";
import { createListingElement } from "../../components/listings/listingElement.js";

export async function displayListings() {
  const container = document.querySelector("#listingsContainer");

  try {
    const response = await getListings();

    const filteredListings = filterListings(response);

    // Rens containeren før vi legger til nye oppføringer
    container.innerHTML = "";

    // Bruk createListingElement for å lage HTML for hver oppføring
    filteredListings.forEach((listing) => {
      const listingElement = createListingElement(listing); // Bruk funksjonen til å lage elementet
      container.appendChild(listingElement); // Legg til elementet i containeren
    });
  } catch (error) {
    displayMessage("#message-container", "warning", error.message);
  }
}
