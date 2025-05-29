document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("bg-music");
    const toggleBtn = document.getElementById("toggle-music");
    const icon = document.getElementById("music-icon");

    function updateMusicIcon() {
        icon.textContent = music.paused ? "🔇" : "🔊";
    }

    function tryStartMusicOnce() {
        if (!music.paused) return;

        music.volume = 1;
        music.play().then(() => {
            console.log("Music started successfully.");
            icon.textContent = "🔊";
            document.removeEventListener("click", tryStartMusicOnce);
        }).catch(e => {
            console.log("Autoplay blocked:", e);
            // Don't remove the listener, since starting the sound failed, probably due to autoplay restrictions.
        });
    }

    document.addEventListener("click", tryStartMusicOnce);

    toggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
    });

    music.addEventListener("play", updateMusicIcon);
    music.addEventListener("pause", updateMusicIcon);
});
