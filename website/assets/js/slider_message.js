const slider = document.getElementById("music-slider");
const hypothesisHeaderEl = document.getElementById("hypothesis-header");
const hypothesisEl = document.getElementById("hypothesis");
const hypothesisFollowupEl = document.getElementById("hypothesis-followup");

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("hypothesis-content").style.opacity = 1;
  }, 4000);
});

const messages = [
    "You believe music says nothing about mental health.",
    "You think there's minimal insight.",
    "You think some aspects of mental health are reflected in music.",
    "You believe a lot can be inferred from music.",
    "You think everything about mental health is mirrored in music taste!"
];

slider.addEventListener("input", () => {
    // TODO: does nothing for the moment, but maybe add smthn later
});


slider.addEventListener("change", () => {
    const snapped = Math.round(parseFloat(slider.value));
    slider.value = snapped;

    hypothesisEl.style.opacity = 0;

    // If this is the first time displaying a message, no need to wait for the fade-out
    // to finish, since the text is already empty
    if (hypothesisHeaderEl.textContent != "Your hypothesis:") {

        hypothesisHeaderEl.textContent = "Your hypothesis:";
        hypothesisEl.textContent = messages[snapped];

        hypothesisEl.style.opacity = 1;
        hypothesisFollowupEl.style.opacity = 1;
    } else {
        // Waits 2 seconds for the fade-out to finish before updating the hypothesis text
        setTimeout(() => {
            hypothesisEl.textContent = messages[snapped];

            hypothesisEl.style.opacity = 1;

        }, 2000);
    }

});