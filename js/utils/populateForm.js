/**
 * Populates the registration form fields with provided user data.
 * @param {Object} data - User data to fill the form.
 * */
export function populateForm(data) {
  const form = document.querySelector("#registerForm");

  if (!form) return;

  form.name.value = data.name;
  form.email.value = data.email;
  form.password.value = data.password;
  form.bio.value = data.bio;
  form.avatar_url.value = data.avatar.url;
  form.avatar_alt.value = data.avatar.alt;
  form.banner_url.value = data.banner.url;
  form.banner_alt.value = data.banner.alt;
}
