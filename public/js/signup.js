async function signupFormHandler(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email-signup");
  const usernameInput = document.getElementById("username-signup");

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && email && password) {
    await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      if (response.ok) {
        document.location.replace("/dashboard");
      }
      if (response.status === 400) {
        return response.json();
      }
    })
    .then(function (object) {
      if (object === undefined) {
        return;
      }
      console.log(object.message);
      if (object.type === "INVALID_EMAIL") {
        let instance = tippy(emailInput);
        instance.setProps({
          arrow: true,
          placement: "bottom",
          content: object.message,
          trigger: "none",
          theme: "error",
        });
        instance.show();
      }
      if (object.type === "INVALID_USER") {
        let instance = tippy(usernameInput);
        instance.setProps({
          arrow: true,
          placement: "bottom",
          content: object.message,
          trigger: "none",
          theme: "error",
        });
        instance.show();
      }
    })
    .catch((error) => {
      alert(error);
    });
  }
}

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
