async function loginFormHandler(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email-login");
  const passwordInput = document.getElementById("password-login");

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
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
        if (object.type === "INVALID_PASS") {
          let instance = tippy(passwordInput);
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

document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
