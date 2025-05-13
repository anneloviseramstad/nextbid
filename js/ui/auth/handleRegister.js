import { registerUser } from "../../api/auth/register.js";
import { displayMessage } from "../common/displayMessage.js";

export async function handleRegister(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const formFields = Object.fromEntries(formData);

  const data = {
    name: formFields.name,
    email: formFields.email,
    password: formFields.password,
    bio: formFields.bio,
  };

  if (formFields.avatar_url) {
    data.avatar = {
      url: formFields.avatar_url,
      alt: formFields.avatar_alt || "",
    };
  }

  if (formFields.banner_url) {
    data.banner = {
      url: formFields.banner_url,
      alt: formFields.banner_alt || "",
    };
  }

  try {
    await registerUser(data);
    displayMessage(
      "#message-container",
      "success",
      "Registration successful. Please log in."
    );
    form.reset();
    window.location.href = "/login.html";
  } catch (error) {
    displayMessage("#message-container", "warning", error.message);
  }
}
