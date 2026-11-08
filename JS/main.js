/* ========================================
   1. CONFIGURACIÓN DE ESCENAS
======================================== */

const scenes = document.querySelectorAll(".scene");

let currentScene = "scene-1";

/* ========================================
   2. CAMBIAR DE ESCENA
======================================== */

function showScene(sceneId) {
  const targetScene = document.getElementById(sceneId);

  if (!targetScene) {
    return;
  }

  scenes.forEach((scene) => {
    scene.classList.remove("active");
    scene.hidden = true;
  });

  targetScene.hidden = false;
  targetScene.classList.add("active");

  currentScene = sceneId;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* ========================================
   3. BOTONES DE NAVEGACIÓN
======================================== */

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    showScene(button.dataset.go);
  });
});

/* ========================================
   4. VOLVER A LA ESCENA ANTERIOR
======================================== */

function goBack() {
  const sceneNumber = Number(
    currentScene.replace("scene-", "")
  );

  if (sceneNumber > 1) {
    showScene(`scene-${sceneNumber - 1}`);
  }
}

/* ========================================
   5. GALERÍA DE FOTOGRAFÍAS
======================================== */

const photoCards = document.querySelectorAll(".photo-card");

photoCards.forEach((card, index) => {

  card.addEventListener("click", () => {

    const alreadyFlipped = card.classList.contains("is-flipped");

    if (!alreadyFlipped) {
      card.classList.add("is-flipped");

      card.setAttribute("aria-pressed", "true");

      card.setAttribute(
        "aria-label",
        `Fotografía ${index + 1} revelada`
      );
    }

  });

});

/* ========================================
   6. CONTROL DE MÚSICA DE FONDO
======================================== */

const music = document.getElementById("background-music");
const musicButton = document.getElementById("music-button");

let musicPlaying = false;

if (music && musicButton) {

  musicButton.addEventListener("click", async () => {

    if (!musicPlaying) {

      try {
        await music.play();

      } catch (error) {
        console.log("No se pudo reproducir la música:", error);
      }

    } else {

      music.pause();

    }

  });

  music.addEventListener("ended", () => {
    musicPlaying = false;

    musicButton.textContent = "♫";
    musicButton.setAttribute("aria-pressed", "false");
    musicButton.setAttribute("aria-label", "Activar música");
  });

  music.addEventListener("pause", () => {
    musicPlaying = false;

    musicButton.textContent = "♫";
    musicButton.setAttribute("aria-pressed", "false");
    musicButton.setAttribute("aria-label", "Activar música");
  });

  music.addEventListener("play", () => {
    musicPlaying = true;

    musicButton.textContent = "Ⅱ";
    musicButton.setAttribute("aria-pressed", "true");
    musicButton.setAttribute("aria-label", "Pausar música");
  });

}

/* ========================================
   7. REPRODUCTOR DE AUDIO ESPECIAL
======================================== */

const specialAudio = document.getElementById("special-audio");
const specialAudioButton = document.getElementById("special-audio-button");
const audioButtonLabel = document.getElementById("audio-button-label");
const audioPlayIcon = document.getElementById("audio-play-icon");

if (specialAudio && specialAudioButton) {

  specialAudioButton.addEventListener("click", async () => {

    if (specialAudio.paused) {

      try {

        await specialAudio.play();

      } catch (error) {

        console.log("No se pudo reproducir el audio especial:", error);

      }

    } else {

      specialAudio.pause();

    }

  });

  specialAudio.addEventListener("play", () => {

    if (audioButtonLabel) {
      audioButtonLabel.textContent = "Pausar";
    }

    if (audioPlayIcon) {
      audioPlayIcon.textContent = "Ⅱ";
    }

    specialAudioButton.setAttribute("aria-pressed", "true");

  });

  specialAudio.addEventListener("pause", () => {

    if (audioButtonLabel) {
      audioButtonLabel.textContent = "Reproducir";
    }

    if (audioPlayIcon) {
      audioPlayIcon.textContent = "▶";
    }

    specialAudioButton.setAttribute("aria-pressed", "false");

  });

  specialAudio.addEventListener("ended", () => {

    if (audioButtonLabel) {
      audioButtonLabel.textContent = "Reproducir";
    }

    if (audioPlayIcon) {
      audioPlayIcon.textContent = "▶";
    }

    specialAudioButton.setAttribute("aria-pressed", "false");

  });

}

/* ========================================
   8. INICIALIZAR PÁGINA
======================================== */

document.addEventListener("DOMContentLoaded", () => {

  showScene("scene-1");

  if (music) {
    music.pause();
  }

  if (specialAudio) {
    specialAudio.pause();
  }

  console.log("Página de recuerdos iniciada correctamente.");

});