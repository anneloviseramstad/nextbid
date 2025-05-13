export function filterListings(listings) {
  const listingData = listings?.data || listings; // Få riktig liste

  const sortByTag = document.getElementById("sortByTag").value;
  const searchInputElement = document.getElementById("searchInput");
  const searchInput = searchInputElement?.value?.trim().toLowerCase() || "";
  console.log(searchInput);
  const searchUsernameInput = document
    .getElementById("searchUsernameInput")
    .value.toLowerCase();
  let filteredListings = listingData;

  if (searchUsernameInput?.length > 0) {
    filteredListings = filteredListings.filter((listing) =>
      listing.seller?.name.toLowerCase().includes(searchUsernameInput)
    );
  }

  if (searchInput?.length > 0) {
    filteredListings = filteredListings.filter((listing) =>
      listing.title.toLowerCase().includes(searchInput)
    );
  }

  if (sortByTag && sortByTag !== "all") {
    filteredListings = filteredListings.filter((listing) =>
      (listing.tags || []).includes(sortByTag)
    );
  }

  return filteredListings;
}
