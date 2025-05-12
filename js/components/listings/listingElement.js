export function createListingElement(listing) {
  const { id, title, description, media, seller, created, bids } = listing;

  const listingElement = document.createElement("div");
  listingElement.classList.add(
    "flex",
    "flex-col",
    "justify-between",
    "h-full",
    "bg-[#F7F7F7]",
    "rounded-lg",
    "shadow",
    "gap-1",
    "md:max-w-xl"
  );

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("flex", "flex-col", "flex-grow");

  if (media && media.length > 0) {
    const image = document.createElement("img");
    image.src = media[0].url;
    image.alt = media[0].alt || "Listing Image";
    image.classList.add("w-full", "h-48", "object-cover", "rounded-t-lg");
    contentWrapper.appendChild(image);
  }

  const heading = document.createElement("h5");
  heading.textContent = title;
  heading.classList.add("text-lg", "px-2", "font-bold", "text-[#454545]");
  contentWrapper.appendChild(heading);

  const sellerInfo = document.createElement("p");
  sellerInfo.textContent = `Published by ${seller?.name || "Unknown"}`;
  sellerInfo.classList.add("text-xs", "px-2", "text-gray-400");
  contentWrapper.appendChild(sellerInfo);

  const date = document.createElement("p");
  const formattedDate = new Date(created).toLocaleDateString();
  date.textContent = `${formattedDate}`;
  date.classList.add("text-xs", "px-2", "text-gray-400", "mb-2");
  contentWrapper.appendChild(date);

  const descriptionP = document.createElement("p");
  descriptionP.textContent = description;
  descriptionP.classList.add(
    "text-sm",
    "px-2",
    "mb-2",
    "text-[#454545]",
    "line-clamp-2",
    "overflow-hidden",
    "text-ellipsis"
  );
  contentWrapper.appendChild(descriptionP);

  const bidsHeading = document.createElement("h6");
  bidsHeading.textContent = "Recent bids:";
  bidsHeading.classList.add("font-semibold", "px-2", "mt-2", "text-sm");
  contentWrapper.appendChild(bidsHeading);

  const bidsContainer = document.createElement("div");
  if (bids && bids.length > 0) {
    const sortedBids = [...bids].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
    sortedBids.slice(0, 3).forEach((bid) => {
      const bidItem = document.createElement("p");
      bidItem.textContent = `$${bid.amount} - by ${bid.bidder.name} `;
      bidItem.classList.add(
        "text-xs",
        "px-2",
        "text-gray-700",
        "bg-white",
        "p-2",
        "mt-1",
        "mx-2",
        "mb-4"
      );
      bidsContainer.appendChild(bidItem);
    });
  } else {
    const noBids = document.createElement("p");
    noBids.textContent = "No bids yet.";
    noBids.classList.add("text-xs", "px-2", "text-gray-500");
    bidsContainer.appendChild(noBids);
  }
  contentWrapper.appendChild(bidsContainer);

  listingElement.appendChild(contentWrapper);

  const detailLink = document.createElement("a");
  detailLink.href = `/details/index.html?id=${id}`;
  detailLink.textContent = "View Details";
  detailLink.classList.add(
    "bg-[#928B8B]",
    "text-white",
    "px-4",
    "py-1",
    "m-2",
    "rounded-lg",
    "text-center"
  );

  const hypeContainer = document.createElement("div");
  hypeContainer.classList.add(
    "flex",
    "items-center",
    "justify-between",
    "px-2",
    "mt-2",
    "gap-2"
  );

  const hype = document.createElement("p");
  hype.textContent = "Don't miss out!";
  hype.classList.add("text-xs", "text-gray-400");

  const bidButton = document.createElement("button");
  bidButton.textContent = "Bid";
  bidButton.classList.add(
    "bg-[#D54B01]",
    "text-white",
    "px-3",
    "py-1",
    "rounded-lg",
    "text-sm"
  );

  hypeContainer.appendChild(hype);
  hypeContainer.appendChild(bidButton);

  listingElement.appendChild(hypeContainer);

  listingElement.appendChild(detailLink);

  return listingElement;
}
