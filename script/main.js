"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const firstName = document.querySelector("#firstName"),
    lastName = document.querySelector("#lastName"),
    email = document.querySelector("#email"),
    password = document.querySelector("#password"),
    register = document.querySelector("#btn-register"),
    sigInbutton = document.querySelector("#btn-sign-in"),
    profileExitBtn = document.querySelector("#btn-exit");

  const validationForm = () => {
    const state = {
      firstName: {
        valid: true,
      },
      lastName: {
        valid: true,
      },
      email: {
        valid: true,
      },
      password: {
        valid: true,
      },
    };

    register.addEventListener("click", () => {
      if (firstName.value === "") {
        state.firstName.valid = false;
      } else if (!firstName.value.match(/^[a-zA-Z]{1,20}$/)) {
        state.firstName.valid = false;
      } else {
        state.firstName.valid = true;
      }

      if (lastName.value === "") {
        state.lastName.valid = false;
      } else if (!lastName.value.match(/^[a-zA-Z]{1,20}$/)) {
        state.lastName.valid = false;
      } else {
        state.lastName.valid = true;
      }

      if (email.value === "") {
        state.email.valid = false;
      } else if (
        !email.value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        state.email.valid = false;
      } else {
        state.email.valid = true;
      }

      if (password.value === "") {
        state.password.valid = false;
      } else if (!password.value.match(/^[a-zA-z0-9]{8,15}$/)) {
        state.password.valid = false;
      } else {
        state.password.valid = true;
      }

      render(state);
    });
  };

  const authData = [];
  const render = (state) => {
    if (state.firstName.valid) {
      firstName.classList.remove("red");
      firstName.classList.add("green");
      document.querySelector("#firstName-good").style.display = "block";
      document.querySelector("#firstName-bad").style.display = "none";
      document.querySelector("#incorrect-firstName").style.display = "none";
    } else {
      firstName.classList.add("red");
      firstName.classList.remove("green");
      document.querySelector("#firstName-bad").style.display = "block";
      document.querySelector("#firstName-good").style.display = "none";
      document.querySelector("#incorrect-firstName").style.display = "block";
    }

    if (state.lastName.valid) {
      lastName.classList.remove("red");
      lastName.classList.add("green");
      document.querySelector("#lastName-good").style.display = "block";
      document.querySelector("#lastName-bad").style.display = "none";
      document.querySelector("#incorrect-lastName").style.display = "none";
    } else {
      lastName.classList.add("red");
      lastName.classList.remove("green");
      document.querySelector("#lastName-bad").style.display = "block";
      document.querySelector("#lastName-good").style.display = "none";
      document.querySelector("#incorrect-lastName").style.display = "block";
    }

    if (state.email.valid) {
      email.classList.remove("red");
      email.classList.add("green");
      document.querySelector("#email-good").style.display = "block";
      document.querySelector("#email-bad").style.display = "none";
      document.querySelector("#incorrect-email").style.display = "none";
    } else {
      email.classList.add("red");
      email.classList.remove("green");
      document.querySelector("#email-bad").style.display = "block";
      document.querySelector("#email-good").style.display = "none";
      document.querySelector("#incorrect-email").style.display = "block";
    }

    if (state.password.valid) {
      password.classList.remove("red");
      password.classList.add("green");
      document.querySelector("#password-good").style.display = "block";
      document.querySelector("#password-bad").style.display = "none";
      document.querySelector("#incorrect-password").style.display = "none";
    } else {
      password.classList.add("red");
      password.classList.remove("green");
      document.querySelector("#password-bad").style.display = "block";
      document.querySelector("#password-good").style.display = "none";
      document.querySelector("#incorrect-password").style.display = "block";
    }

    if (
      state.firstName.valid &&
      state.lastName.valid &&
      state.email.valid &&
      state.password.valid
    ) {
      setTimeout(() => {
        modal.style.display = "block";

        const information = {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          pw: password.value,
        };

        authData.push(information);
        localStorage.setItem("auth-data", JSON.stringify(authData));
      }, 700);
    }
  };

  validationForm();

  const signIn = document.querySelector(".sign-in"),
    logIn = document.querySelector(".log-in");

  logIn.addEventListener("click", () => {
    document.querySelector(".container").style.display = "none";
    document.querySelector(".second-container").style.display = "flex";
  });

  signIn.addEventListener("click", () => {
    document.querySelector("#incorrectUser").style.display = "none";
    document.querySelector("#localNull").style.display = "none";
    document.querySelector(".container").style.display = "flex";
    document.querySelector(".second-container").style.display = "none";
  });

  sigInbutton.addEventListener("click", (e) => {
    e.preventDefault();

    const storedData = JSON.parse(localStorage.getItem("auth-data")),
      userEmail = document.getElementById("email2"),
      userPassword = document.getElementById("password2"),
      fullName = document.querySelector(".full-name"),
      profileEmail = document.querySelector(".profile-email");

    if (localStorage.getItem('auth-data') !== null) {
      const data = storedData.find((data) => {
        return data.email === userEmail.value && data.pw === userPassword.value;
      });

      if (data) {
        sigInbutton.style.backgroundColor = "#28a745";
        sigInbutton.textContent = "Successful";
        document.querySelector("#incorrectUser").style.display = "none";
        document.querySelector("#localNull").style.display = "none";
        setTimeout(() => {
          document.querySelector(".wrapper").style.display = "flex";
          document.querySelector(".second-container").style.display = "none";
          fullName.innerHTML = `${data.firstName} ${data.lastName}`;
          profileEmail.innerHTML = `${data.email}`;
          document.querySelector("#localNull").style.display = "none";
          document.querySelector("#incorrectUser").style.display = "none";
        }, 1200);
      } else {
        document.querySelector("#incorrectUser").style.display = "block";
        document.querySelector("#localNull").style.display = "none";
      }
    } else {
      document.querySelector("#incorrectUser").style.display = "none";
      document.querySelector("#localNull").style.display = "block";
    }

  });

  profileExitBtn.addEventListener("click", () => {
    document.querySelector(".wrapper").style.display = "none";
    document.querySelector(".second-container").style.display = "flex";
    document.querySelector("#email2").value = "";
    document.querySelector("#password2").value = "";
    sigInbutton.style.backgroundColor = "";
    sigInbutton.textContent = "Sign In";
  });

  const closeModal = document.querySelectorAll("[data-close]"),
    modal = document.querySelector("#modal"),
    allInput = document.querySelectorAll("input"),
    validImages = document.querySelectorAll("[data-images]");

  window.addEventListener("click", (e) => {
    const target = e.target;
    if (target === modal) {
      modal.style.display = "none";
      allInput.forEach((item) => {
        item.value = "";
        item.classList.remove("red");
        item.classList.remove("green");
      });
      validImages.forEach((item) => (item.style.display = "none"));
    }
  });

  closeModal.forEach((item) => {
    item.addEventListener("click", () => {
      modal.style.display = "none";
      allInput.forEach((item) => {
        item.value = "";
        item.classList.remove("red");
        item.classList.remove("green");
      });
      validImages.forEach((item) => (item.style.display = "none"));
    });
  });
});