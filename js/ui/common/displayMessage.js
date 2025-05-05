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
  div.className = `custom-alert custom-alert--${type}`;
  div.textContent = message;
  parent.appendChild(div);
}
