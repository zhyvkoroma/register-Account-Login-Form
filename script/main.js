"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const firstName = document.querySelector("#firstName"),
    lastName = document.querySelector("#lastName"),
    email = document.querySelector("#email"),
    password = document.querySelector("#password"),
    register = document.querySelector("#btn-register"),
    sigInbutton = document.querySelector("#btn-sign-in"),
    profileExitBtn = document.querySelector("#btn-exit");

    const showOrHide = (selector, param = 'block') => document.querySelector(selector).style.display = param;

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
      showOrHide('#firstName-good');
      showOrHide('#firstName-bad', 'none');
      showOrHide('#incorrect-firstName', 'none');
    } else {
      firstName.classList.add("red");
      firstName.classList.remove("green");
      showOrHide('#firstName-good', 'none');
      showOrHide('#firstName-bad');
      showOrHide('#incorrect-firstName');
    }

    if (state.lastName.valid) {
      lastName.classList.remove("red");
      lastName.classList.add("green");
      showOrHide('#lastName-good');
      showOrHide('#lastName-bad', 'none');
      showOrHide('#incorrect-lastName', 'none');
    } else {
      lastName.classList.add("red");
      lastName.classList.remove("green");
      showOrHide('#lastName-good', 'none');
      showOrHide('#lastName-bad');
      showOrHide('#incorrect-lastName');
    }

    if (state.email.valid) {
      email.classList.remove("red");
      email.classList.add("green");
      showOrHide('#email-good');
      showOrHide('#email-bad', 'none');
      showOrHide('#incorrect-email', 'none');
    } else {
      email.classList.add("red");
      email.classList.remove("green");
      showOrHide('#email-good', 'none');
      showOrHide('#email-bad');
      showOrHide('#incorrect-email');
    }

    if (state.password.valid) {
      password.classList.remove("red");
      password.classList.add("green");
      showOrHide('#password-good');
      showOrHide('#password-bad', 'none');
      showOrHide('#incorrect-password', 'none');
    } else {
      password.classList.add("red");
      password.classList.remove("green");
      showOrHide('#password-good', 'none');
      showOrHide('#password-bad');
      showOrHide('#incorrect-password');
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
    showOrHide('.container', 'none');
    showOrHide('.second-container', 'flex');
  });

  signIn.addEventListener("click", () => {
    showOrHide('#incorrectUser', 'none');
    showOrHide('#localNull', 'none');
    showOrHide('.container', 'flex');
    showOrHide('.second-container', 'none');
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
        showOrHide('#incorrectUser', 'none');
        showOrHide('#localNull', 'none');
        setTimeout(() => {
          showOrHide('.wrapper', 'flex');
          showOrHide('.second-container', 'none');
          fullName.innerHTML = `${data.firstName} ${data.lastName}`;
          profileEmail.innerHTML = `${data.email}`;
          showOrHide('#incorrectUser', 'none');
          showOrHide('#localNull', 'none');
        }, 1200);
      } else {
        showOrHide('#incorrectUser', 'block');
        showOrHide('#localNull', 'none');
      }
    } else {
      showOrHide('#incorrectUser', 'none');
      showOrHide('#localNull', 'block');
    }

  });

  profileExitBtn.addEventListener("click", () => {
    showOrHide('.wrapper', 'none');
    showOrHide('.second-container', 'flex');
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