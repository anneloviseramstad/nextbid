export function createListingElement(listing) {
  const { id, title, description, media, seller, created, bids, endsAt } =
    listing;

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


  const endsAtDate = new Date(endsAt);
  const endsAtElement = document.createElement("p");

  let interval;
  function updateCountdown() {
    const now = new Date();
    const distance = endsAtDate - now;

    if (distance <= 0) {
      endsAtElement.textContent = "Ended";
      clearInterval(interval);
      return;
    }

    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);
    endsAtElement.textContent = `Ends in: ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown();
  interval = setInterval(updateCountdown, 1000);


  if (media?.length > 0) {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add(
      "relative",
      "w-full",
      "h-48",
      "overflow-hidden",
      "rounded-t-lg"
    );

    const image = document.createElement("img");
    image.src = media[0].url;
    image.alt = media[0].alt || "Listing Image";
    image.classList.add("w-full", "h-full", "object-cover");

    endsAtElement.classList.add(
      "absolute",
      "bottom-0",
      "right-0",
      "text-sm",
      "m-2",
      "px-2",
      "py-1",
      "text-white",
      "bg-black/50",
      "rounded-lg"
    );

    imageContainer.appendChild(image);
    imageContainer.appendChild(endsAtElement);
    contentWrapper.appendChild(imageContainer);
  } else {
  
    endsAtElement.classList.add("text-sm", "px-2", "py-1", "text-gray-600");
    contentWrapper.appendChild(endsAtElement);
  }


  const heading = document.createElement("h5");
  heading.textContent = title;
  heading.classList.add(
    "text-lg",
    "px-2",
    "font-bold",
    "text-[#454545]",
    "mt-2"
  );
  contentWrapper.appendChild(heading);

  const sellerInfo = document.createElement("p");
  sellerInfo.textContent = `Published by ${seller?.name || "Unknown"}`;
  sellerInfo.classList.add("text-xs", "px-2", "text-gray-400");
  contentWrapper.appendChild(sellerInfo);

  const date = document.createElement("p");
  const formattedDate = new Date(created).toLocaleDateString();
  date.textContent = formattedDate;
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
  if (bids?.length > 0) {
    const sortedBids = [...bids].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
    sortedBids.slice(0, 3).forEach((bid) => {
      const bidItem = document.createElement("p");
      bidItem.textContent = `$${bid.amount} - by ${bid.bidder.name}`;
      bidItem.classList.add(
        "text-xs",
        "px-2",
        "text-gray-700",
        "p-2",
        "mt-1",
        "mx-2",
        "mb-4",
        "relative",
        "overflow-hidden"
      );
      bidItem.style.backgroundImage =
        "linear-gradient(to right, white 97%, #D54B01 85%)";
      bidsContainer.appendChild(bidItem);
    });
  } else {
    const noBids = document.createElement("p");
    noBids.textContent = "No bids yet.";
    noBids.classList.add("text-xs", "px-2", "text-gray-500");
    bidsContainer.appendChild(noBids);
  }
  contentWrapper.appendChild(bidsContainer);


  const hypeContainer = document.createElement("div");
  hypeContainer.classList.add(
    "flex",
    "items-center",
    "justify-between",
    "px-2",
    "mt-2",
    "gap-2"
  );

  const bidInput = document.createElement("input");
  bidInput.type = "number";
  bidInput.placeholder = "Enter bid amount";
  bidInput.classList.add(
    "border",
    "rounded-lg",
    "px-2",
    "py-1",
    "text-sm",
    "w-full",
    "bid-input"
  );
  bidInput.dataset.listingId = id;

  const bidButton = document.createElement("button");
  bidButton.textContent = "Bid!";
  bidButton.classList.add(
    "bg-[#D54B01]",
    "text-white",
    "px-3",
    "py-1",
    "rounded-lg",
    "text-sm",
    "bid-button"
  );
  bidButton.dataset.listingId = id;

  hypeContainer.appendChild(bidInput);
  hypeContainer.appendChild(bidButton);
  contentWrapper.appendChild(hypeContainer);


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
  listingElement.appendChild(contentWrapper);
  listingElement.appendChild(detailLink);

  return listingElement;
}
