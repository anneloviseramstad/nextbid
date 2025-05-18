import { bidOnListing } from "../../api/profile/bid.js";

/**
 * Handles placing a bid on a specific listing.
 *
 * Calls the `bidOnListing` API function and returns the response.
 * Logs and rethrows any errors encountered during the bid process.
 *
 * @param {string} id - The ID of the listing to bid on.
 * @param {number} amount - The amount to bid.
 * @returns {Promise<Object>} The response data from the bid API.
 * @throws Will throw an error if the bid submission fails.
 */
export const handleBidOnListing = async (id, amount) => {
  try {
    const response = await bidOnListing(id, amount);
    return response;
  } catch (error) {
    console.error("Error placing bid:", error.message);
    throw error;
  }
};
