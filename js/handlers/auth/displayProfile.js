import { getProfile } from "../../api/profile/getProfile.js";
import { retrieveUsername } from "../../utils/storage.js";
import { createListingElement } from "../../components/listings/listingElement.js";
import { renderProfile } from "../../components/listings/renderProfile.js";
import { listingsByUser } from "../../api/listings/listingsByUser.js";
import { deleteListingHandler } from "../listings/deleteListing.js";
import { bidsByUser } from "../../api/listings/bidsByUser.js";

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

    const myBidsContainer = document.getElementById("myBidsContainer");

    try {
      const bidsResponse = await bidsByUser(username);

      if (bidsResponse && Array.isArray(bidsResponse.data)) {
        myBidsContainer.innerHTML = "";

        // Bruk et Map for å unngå duplikate listings om du har bydd flere ganger på samme
        const uniqueListingsMap = new Map();

        bidsResponse.data.forEach((bid) => {
          const listing = bid.listing;
          if (listing && !uniqueListingsMap.has(listing.id)) {
            uniqueListingsMap.set(listing.id, listing);
          }
        });

        const uniqueListings = Array.from(uniqueListingsMap.values());

        if (uniqueListings.length === 0) {
          myBidsContainer.innerHTML =
            "<p class='text-sm text-gray-500'>You haven't placed any bids yet.</p>";
        } else {
          uniqueListings.forEach((listing) => {
            const card = createListingElement(listing);
            myBidsContainer.appendChild(card);
          });
        }
      }
    } catch (err) {
      console.error("Error loading user bids:", err);
      myBidsContainer.innerHTML =
        "<p class='text-sm text-red-500'>Failed to load your bids.</p>";
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
