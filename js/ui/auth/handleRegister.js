import { registerUser } from "../../api/auth/register.js";
import { displayMessage } from "../common/displayMessage.js";
import { redirectTo } from "../../router.js";

export async function handleRegister(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const formFields = Object.fromEntries(formData);
  console.log(formFields);

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

  // Bare legg til banner hvis det faktisk er oppgitt en URL
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
    redirectTo("/login");
  } catch (error) {
    displayMessage("#message-container", "warning", error.message);
  }
}
