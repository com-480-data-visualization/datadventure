  const music = document.getElementById("bg-music");
  const btn = document.getElementById("toggle-music");

  document.addEventListener("click", () => {
    if (music.paused) {
      music.volume = 0.4;
      music.play().catch(e => {
        console.log("Autoplay blocked:", e);
      });
    }
  }, { once: true });

  btn.addEventListener("click", () => {
    console.log("Toggle background music button clicked");
    if (music.paused) {
      console.log("Playing background music");
      music.play();
    } else {
      music.pause();
    }
  });

