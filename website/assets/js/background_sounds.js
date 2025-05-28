document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("toggle-music");
  const icon = document.getElementById("music-icon");

  document.addEventListener("mousemove", () => {
    if (music.paused) {
      music.volume = 0.6;
      music.play().catch(e => console.log("Autoplay blocked:", e));
      icon.textContent = "🔊";
    }
  }, { once: true });

  toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (music.paused) {
      music.play();
      icon.textContent = "🔊";
    } else {
      music.pause();
      icon.textContent = "🔇";
    }
  });
});
