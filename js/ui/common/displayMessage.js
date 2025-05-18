/**
 * Displays a styled alert message inside a container element.
 * Removes any existing alert messages before adding the new one.
 *
 * @param {string|Element} container - Selector or DOM element to contain the message.
 * @param {"info"|"success"|"warning"|"error"} [type="info"] - Type of alert for styling.
 * @param {string} [message=""] - The message text to display.
 * @throws Will throw an error if the container is invalid or not found.
 */
export function displayMessage(container, type = "info", message = "") {
  const parent =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!parent || !(parent instanceof Element)) {
    throw new Error(`Invalid container: ${container}`);
  }

  parent.querySelectorAll(".custom-alert").forEach((el) => el.remove());

  const div = document.createElement("div");

  const baseStyles = "custom-alert rounded-md p-3 text-sm mb-2";
  const typeStyles = {
    info: "bg-blue-100 text-blue-800 border border-blue-300",
    success: "bg-green-100 text-green-800 border border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    error: "bg-red-100 text-red-800 border border-red-300",
  };

  div.className = `${baseStyles} ${typeStyles[type] || typeStyles.info}`;
  div.textContent = message;

  parent.appendChild(div);
}
