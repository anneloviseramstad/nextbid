function createListingElement(listing) {
  const { id, title, description, media, seller, created, bids } = listing;

  const listingElement = document.createElement("div");
  listingElement.classList.add(
    "flex",
    "flex-col",
    "bg-[#F7F7F7]",
    "rounded-lg",
    "shadow",
    "gap-2",
    "md:max-w-xl"
  );

  // Bilde
  if (media && media.length > 0) {
    const image = document.createElement("img");
    image.src = media[0].url;
    image.alt = media[0].alt || "Listing Image";
    image.classList.add("w-full", "h-48", "object-cover", "rounded-t-lg");
    listingElement.appendChild(image);
  }

  // Tittel
  const heading = document.createElement("h5");
  heading.textContent = title;
  heading.classList.add("text-lg", "p-2", "font-bold", "text-[#454545]");
  listingElement.appendChild(heading);

  // Publisert av
  const sellerInfo = document.createElement("p");
  sellerInfo.textContent = `Published by ${seller?.name || "Unknown"}`;
  sellerInfo.classList.add("text-sm", "px-2", "text-gray-600");
  listingElement.appendChild(sellerInfo);

  // Dato publisert
  const date = document.createElement("p");
  const formattedDate = new Date(created).toLocaleDateString();
  date.textContent = `Published on ${formattedDate}`;
  date.classList.add("text-sm", "px-2", "text-gray-600");
  listingElement.appendChild(date);

  // Beskrivelse
  const descriptionP = document.createElement("p");
  descriptionP.textContent = description;
  descriptionP.classList.add("text-sm", "px-2", "text-[#454545]");
  listingElement.appendChild(descriptionP);

  // Recent bids
  const bidsHeading = document.createElement("h6");
  bidsHeading.textContent = "Recent bids";
  bidsHeading.classList.add("font-semibold", "px-2", "mt-2", "text-sm");
  listingElement.appendChild(bidsHeading);

  const bidsContainer = document.createElement("div");
  if (bids && bids.length > 0) {
    const sortedBids = [...bids].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
    sortedBids.slice(0, 3).forEach((bid) => {
      const bidItem = document.createElement("p");
      bidItem.textContent = `${bid.bidder.name}: $${bid.amount}`;
      bidItem.classList.add("text-xs", "px-2", "text-gray-700");
      bidsContainer.appendChild(bidItem);
    });
  } else {
    const noBids = document.createElement("p");
    noBids.textContent = "No bids yet.";
    noBids.classList.add("text-xs", "px-2", "text-gray-500");
    bidsContainer.appendChild(noBids);
  }
  listingElement.appendChild(bidsContainer);

  // Don't miss out
  const hype = document.createElement("p");
  hype.textContent = "Don't miss out!";
  hype.classList.add(
    "mt-2",
    "text-sm",
    "px-2",
    "font-semibold",
    "text-[#2a2a2a]"
  );
  listingElement.appendChild(hype);

  // Bid-knapp (dummy-knapp her)
  const bidButton = document.createElement("button");
  bidButton.textContent = "Bid";
  bidButton.classList.add(
    "bg-[#D54B01]",
    "text-white",
    "px-1",
    "py-1",
    "rounded-lg",
    "mt-1"
  );
  listingElement.appendChild(bidButton);

  // View Details-knapp
  const detailLink = document.createElement("a");
  detailLink.href = `/listings/index.html?id=${id}`;
  detailLink.textContent = "View Details";
  detailLink.classList.add(
    "bg-[#928B8B]",
    "text-white",
    "px-4",
    "py-2",
    "mt-2",
    "rounded-lg",
    "flex",
    "items-center",
    "justify-center",
    "flex-end"
  );
  listingElement.appendChild(detailLink);

  return listingElement;
}

export function renderListings(container, listings) {
  const listingData = listings?.data || listings;

  if (!Array.isArray(listingData) || listingData.length === 0) {
    container.innerHTML = `<p class="text-center">No listings found.</p>`;
    return;
  }

  container.innerHTML = "";

  const listingElements = listingData.map((listing) => {
    const listingElement = createListingElement(listing);
    return listingElement;
  });

  listingElements.forEach((listingElement) => {
    container.appendChild(listingElement);
  });
}
