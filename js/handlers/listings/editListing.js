import { editListing } from "../../api/listings/editListing.js";

export async function editListingHandler(event, id) {
  event.preventDefault();

  try {
    const title = event.target.title.value.trim();
    const description = event.target.description.value.trim();
    const tags = event.target.tags.value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const mediaUrl = event.target.image.value.trim();

    const media = mediaUrl ? [{ url: mediaUrl, alt: "" }] : [];

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    await editListing(id, { title, description, tags, media });
    alert("Post updated successfully!");

    window.location.href = `/profile/index.html`;
  } catch (error) {
    console.error("Error updating post:", error.message);
    alert(`Error updating post: ${error.message}`);
  }
}
