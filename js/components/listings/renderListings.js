import { createListingElement } from "./listingElement.js";

let currentPage = 1; // Starter på første side
const postsPerPage = 12;

export function renderListings(container, listings) {
  const listingData = listings?.data || listings;

  if (!Array.isArray(listingData) || listingData.length === 0) {
    container.innerHTML = `<p class="text-center">No listings found.</p>`;
    return;
  }

  container.innerHTML = "";

  // Kalkulerer hvilke elementer som skal vises
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const listingsToShow = listingData.slice(startIndex, endIndex);

  // Lager de valgte listingene
  const listingElements = listingsToShow.map((listing) => {
    const listingElement = createListingElement(listing);
    return listingElement;
  });

  listingElements.forEach((listingElement) => {
    container.appendChild(listingElement);
  });

  // Legg til navigasjon for sider
  addPagination(container, listingData.length, listings);
}

function addPagination(container, totalItems, listings) {
  const totalPages = Math.ceil(totalItems / postsPerPage);

  const paginationWrapper = document.createElement("div");
  paginationWrapper.classList.add("flex", "justify-left", "gap-2", "mt-4");

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.classList.add(
    "px-4",
    "py-1",
    "bg-[#454545]",
    "text-white",
    "rounded-lg",
    "disabled:opacity-50"
  );
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderListings(container, listings);
    }
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.classList.add(
    "px-4",
    "py-1",
    "bg-[#454545]",
    "text-white",
    "rounded-lg",
    "disabled:opacity-50"
  );
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderListings(container, listings);
    }
  });

  paginationWrapper.appendChild(prevButton);
  paginationWrapper.appendChild(nextButton);

  container.appendChild(paginationWrapper);
}
