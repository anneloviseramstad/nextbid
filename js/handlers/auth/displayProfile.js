import { getProfile } from "../../api/profile/getProfile.js";
import { retrieveUsername } from "../../utils/storage.js";
import { createListingElement } from "../../components/listings/listingElement.js"; // Importer createListingElement
import { renderProfile } from "../../components/listings/renderProfile.js";
import { listingsByUser } from "../../api/listings/listingsByUser.js";

export async function displayProfile() {
  console.log(">>> Checking username in displayProfile:");
  console.log("From localStorage (raw):", localStorage.getItem("username"));
  console.log("Parsed via retrieveUsername():", retrieveUsername());

  const username = retrieveUsername();

  if (!username) {
    return;
  }

  try {
    const profileData = await getProfile(username);

    if (!profileData) {
      throw new Error("Profile data not found");
    }

    renderProfile(profileData.data);

    const container = document.getElementById("listingContainer");

    const listings = await listingsByUser(username);

    console.log("Listings fetched:", listings);

    if (listings && Array.isArray(listings.data)) {
      const listingsArray = listings.data;
      console.log("Listings data:", listingsArray);

      container.innerHTML = "";

      listingsArray.forEach((listing) => {
        const listingElement = createListingElement(listing);
        container.appendChild(listingElement);
      });
    } else {
      console.error("Error: listings.data is not an array.");
    }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
}
