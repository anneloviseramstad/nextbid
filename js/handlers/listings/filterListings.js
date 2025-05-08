export function filterListings(listings) {
  const sortByTitle = document.getElementById("sortByTitle").value;
  const sortByTag = document.getElementById("sortByTag").value;
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const searchUsernameInput = document
    .getElementById("searchUsernameInput")
    .value.toLowerCase();

  let filteredListings = listings;

  if (searchUsernameInput) {
    filteredListings = filteredListings.filter((listing) =>
      listing.username.toLowerCase().includes(searchUsernameInput)
    );
  }

  if (searchInput) {
    filteredListings = filteredListings.filter((listing) =>
      listing.title.toLowerCase().includes(searchInput)
    );
  }

  if (sortByTag && sortByTag !== "all") {
    filteredListings = filteredListings.filter((listing) =>
      listing.tags.includes(sortByTag)
    );
  }

  if (sortByTitle) {
    filteredListings = filteredListings.sort((a, b) => {
      if (sortByTitle === "a-z") {
        return a.title.localeCompare(b.title);
      } else if (sortByTitle === "z-a") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });
  }

  return filteredListings;
}
