import { getProfile } from "../../api/profile/getProfile.js";
import { retrieveUsername } from "../../utils/storage.js";
import { createListingElement } from "../../components/listings/listingElement.js";
import { renderProfile } from "../../components/listings/renderProfile.js";
import { listingsByUser } from "../../api/listings/listingsByUser.js";
import { deleteListingHandler } from "../listings/deleteListing.js";

export async function displayProfile() {
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

    if (listings && Array.isArray(listings.data)) {
      const listingsArray = listings.data;
      container.innerHTML = "";

      listingsArray.forEach((listing) => {
        const listingElement = createListingElement(listing);

      
        if (listing.seller?.name === username) {
          const deleteButton = createDeleteButton(listing.id);
          const editButton = createEditButton(listing.id); 
          listingElement.appendChild(deleteButton);
          listingElement.appendChild(editButton);
        }

        container.appendChild(listingElement);
      });
    } else {
      console.error("Error: listings.data is not an array.");
    }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
}

export function createDeleteButton(listingId) {
  const button = document.createElement("button");
  button.textContent = "Delete";
  button.classList.add("bg-red-500", "text-white", "p-2", "mt-2", "w-full");
  button.dataset.listingId = listingId;
  button.addEventListener("click", (event) => {
    deleteListingHandler(listingId);
  });
  return button;
}

export function createEditButton(listingId) {
  const button = document.createElement("button");
  button.textContent = "Edit";
  button.classList.add(
    "bg-gray-500",
    "text-white",
    "p-2",
    "w-full",
    "rounded-b-lg"
  );
  button.dataset.listingId = listingId;
  button.addEventListener("click", () => {
    window.location.href = `/edit/index.html?id=${listingId}`;
  });

  return button;
}
