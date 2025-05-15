import { bidOnListing } from "../../api/profile/bid.js";

export const handleBidOnListing = async (id, amount) => {
  try {
    const response = await bidOnListing(id, amount);
    return response;
  } catch (error) {
    console.error("Error placing bid:", error.message);
    throw error;
  }
};
