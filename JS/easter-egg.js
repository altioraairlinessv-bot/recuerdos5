/* ========================================
   1. PEQUEÑO SECRETO
======================================== */

const easterEggButton = document.getElementById("easter-egg-trigger");
const secretForm = document.getElementById("secret-form");
const secretDate = document.getElementById("secret-date");
const secretError = document.getElementById("secret-error");
const secretMessage = document.getElementById("secret-message");

let secretUnlocked = false;

if (easterEggButton) {
  easterEggButton.addEventListener("click", () => {
    if (!secretUnlocked) {
      showScene("scene-7");
    }
  });
}

if (secretForm && secretDate && secretError && secretMessage) {
  secretForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const enteredDate = secretDate.value;
    const correctDate = "2025-06-06";

    if (enteredDate === correctDate) {
      secretUnlocked = true;

      secretError.hidden = true;
      secretForm.hidden = true;
      secretMessage.hidden = false;

      secretMessage.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    } else {
      secretError.hidden = false;
      secretDate.value = "";
    }
  });
}


/* ========================================
   2. ÚLTIMA PUERTA - CONTRASEÑAS
======================================== */

const passwords = {
  recuerdos: "11:53",
  apoyo: "I love you very much 💛"
};


/* ========================================
   3. ELEMENTOS DEL HTML
======================================== */

const lockScreen = document.getElementById("lock-screen");
const lockIcon = document.getElementById("lock-icon");
const lockTitle = document.getElementById("lock-title");
const lockDescription = document.getElementById("lock-description");

const unlockLockButton = document.getElementById("unlock-lock-button");

const choiceScreen = document.getElementById("choice-screen");
const memoriesChoice = document.getElementById("memories-choice");
const supportChoice = document.getElementById("support-choice");

const passwordScreen = document.getElementById("password-screen");
const passwordTitle = document.getElementById("password-title");
const passwordDescription = document.getElementById("password-description");
const lastDoorForm = document.getElementById("last-door-form");
const lastDoorPassword = document.getElementById("last-door-password");
const lastDoorError = document.getElementById("last-door-error");
const returnLockButton = document.getElementById("return-lock-button");

const memoriesMessage = document.getElementById("memories-message");
const supportMessage = document.getElementById("support-message");

const scene8BackButton = document.querySelector(
  "#scene-8 .scene-content > .back-button"
);


/* ========================================
   4. CONTROL DE PANTALLAS
======================================== */

function hideDoorScreens() {
  if (lockScreen) lockScreen.hidden = true;
  if (choiceScreen) choiceScreen.hidden = true;
  if (passwordScreen) passwordScreen.hidden = true;
  if (memoriesMessage) memoriesMessage.hidden = true;
  if (supportMessage) supportMessage.hidden = true;
}

function showLockScreen() {
  hideDoorScreens();

  if (!lockScreen) return;

  lockScreen.hidden = false;

  if (lockIcon) {
    lockIcon.textContent = "🔒";
    lockIcon.classList.remove("lock-open");
  }

  if (lockTitle) {
    lockTitle.textContent = "Hay una última puerta...";
  }

  if (lockDescription) {
    lockDescription.textContent =
      "Todavía hay algo más que puedes descubrir.";
    lockDescription.hidden = false;
  }

  if (unlockLockButton) {
    unlockLockButton.hidden = false;
    unlockLockButton.disabled = false;
  }

  if (scene8BackButton) {
    scene8BackButton.hidden = false;
  }
}

function showChoiceScreen() {
  hideDoorScreens();

  if (choiceScreen) {
    choiceScreen.hidden = false;
  }

  if (scene8BackButton) {
    scene8BackButton.hidden = false;
  }
}

function showPasswordScreen(option) {
  if (!passwordScreen || !lastDoorPassword) return;

  hideDoorScreens();
  passwordScreen.hidden = false;

  passwordScreen.dataset.option = option;

  if (option === "recuerdos") {
    if (passwordTitle) {
      passwordTitle.textContent = "Recordar un poquito de nosotros";
    }

    if (passwordDescription) {
      passwordDescription.textContent =
        "Esta contraseña solo la tiene quien preparó este recuerdo. Si quieres entrar, tendrás que pedírsela.";
    }

  } else {
    if (passwordTitle) {
      passwordTitle.textContent = "Un espacio para los días difíciles";
    }

    if (passwordDescription) {
      passwordDescription.textContent =
        "Esta contraseña solo la tiene quien preparó este espacio. Si quieres entrar, tendrás que pedírsela.";
    }
  }

  if (lastDoorError) {
    lastDoorError.hidden = true;
  }

  lastDoorPassword.value = "";

  if (scene8BackButton) {
    scene8BackButton.hidden = true;
  }

  lastDoorPassword.focus();
}


/* ========================================
   5. ABRIR EL CANDADO
======================================== */

if (unlockLockButton) {
  unlockLockButton.addEventListener("click", () => {

    if (lockIcon) {
      lockIcon.classList.add("lock-open");
    }

    unlockLockButton.disabled = true;

    setTimeout(() => {
      showChoiceScreen();

      if (lockIcon) {
        lockIcon.classList.remove("lock-open");
      }

      unlockLockButton.disabled = false;

    }, 800);
  });
}


/* ========================================
   6. ELEGIR UNA PUERTA
======================================== */

function chooseOption(option) {
  showPasswordScreen(option);
}

if (memoriesChoice) {
  memoriesChoice.addEventListener("click", () => {
    chooseOption("recuerdos");
  });
}

if (supportChoice) {
  supportChoice.addEventListener("click", () => {
    chooseOption("apoyo");
  });
}


/* ========================================
   7. COMPROBAR CONTRASEÑA
======================================== */

if (lastDoorForm && lastDoorPassword) {
  lastDoorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const enteredPassword = lastDoorPassword.value.trim();
    const selectedOption = passwordScreen.dataset.option;

    const correctPassword = passwords[selectedOption];

    if (enteredPassword === correctPassword) {

      hideDoorScreens();

      let unlockedMessage = null;

      if (selectedOption === "recuerdos" && memoriesMessage) {
        memoriesMessage.hidden = false;
        unlockedMessage = memoriesMessage;

      } else if (selectedOption === "apoyo" && supportMessage) {
        supportMessage.hidden = false;
        unlockedMessage = supportMessage;
      }

      if (scene8BackButton) {
        scene8BackButton.hidden = true;
      }

      // Llevar el contenido desbloqueado a la parte superior.
      if (unlockedMessage) {
        requestAnimationFrame(() => {
          unlockedMessage.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });
      }

    } else {
      if (lastDoorError) {
        lastDoorError.hidden = false;
      }

      lastDoorPassword.value = "";
      lastDoorPassword.focus();
    }
  });
}


/* ========================================
   8. REGRESAR AL CANDADO
======================================== */

if (returnLockButton) {
  returnLockButton.addEventListener("click", () => {
    showLockScreen();
  });
}


/* ========================================
   9. FINALIZAR Y VOLVER
======================================== */

document.querySelectorAll(".finish-door-button").forEach((button) => {
  button.addEventListener("click", () => {
    showLockScreen();
  });
});


/* ========================================
   10. INICIALIZAR
======================================== */

const scene8Button = document.querySelector('[data-go="scene-8"]');

if (scene8Button) {
  scene8Button.addEventListener("click", () => {
    showLockScreen();
  });
}

showLockScreen();