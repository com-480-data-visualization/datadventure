const slider = document.getElementById("music-slider");
const note = document.getElementById("note-icon");
const staff = document.querySelector(".staff-lines");
const container = document.getElementById("staff-slider-container");
const hypothesisHeaderEl = document.getElementById("hypothesis-header");
const hypothesisEl = document.getElementById("hypothesis");
const hypothesisFollowupEl = document.getElementById("hypothesis-followup");
const staffHeight = 80;
const clefOffset = 60;

let lastSnappedValue = null;
let isDragging = false;
let isFading = false;
let nextSnappedValue = null;

const messages = [
    "You believe music says nothing about mental health.",
    "You think there's minimal insight.",
    "You think some aspects of mental health are reflected in music.",
    "You believe a lot can be inferred from music.",
];


note.addEventListener("mousedown", (e) => {
    isDragging = true;
    note.style.cursor = "grabbing";
});

window.addEventListener("mouseup", () => {
    isDragging = false;
    note.style.cursor = "grab";

    const snapped = Math.round(parseFloat(slider.value));

    slider.value = snapped;

    // Snap the note to the slider value
    const rect = container.getBoundingClientRect();
    const percent = (snapped - slider.min) / (slider.max - slider.min);

    const {x, y} = calculateNotePosition(container, percent);
    note.style.transform = `translate(${x}px, -${y}px)`;
    note.style.transition = "transform 0.2s ease-out";
    note.style.cursor = "grab";

    // If the new snapped value is the same as the last one don' change the hypothesis position
    if (snapped != lastSnappedValue) {

        hypothesisEl.style.opacity = 0;

        // If this is the first time displaying a message, no need to wait for the fade-out
        // to finish, since the text is already empty
        if (hypothesisHeaderEl.textContent != "Your hypothesis:") {

            hypothesisHeaderEl.textContent = "Your hypothesis:"; // Change the header

            setTimeout(() => {
                hypothesisFollowupEl.style.opacity = 1; // Show the follow-up text ("Scroll down to see more")
            }, 1400); // Wait for the hypothesis fade-in to be done, so the two fade in animations happen sequentially

            hypothesisEl.textContent = messages[snapped];
            hypothesisEl.style.opacity = 1;
        } else {
            updateHypothesis(snapped)
        }
    }
    playNoteSound(snapped);
    lastSnappedValue = snapped;

});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const rect = container.getBoundingClientRect();
    const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    slider.value = percent * (slider.max - slider.min) + Number(slider.min); // rounds automatically

    const {x, y} = calculateNotePosition(container, percent);
    note.style.transform = `translate(${x}px, -${y}px)`;
});

window.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {
        document.getElementById("hypothesis-content").style.opacity = 1;
    }, 5000);


    if (!note || !staff || !container) {
        console.error("Element not found");
        return;
    }

    const staffRect = staff.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const top = staffRect.bottom - containerRect.top;
    note.style.left = `${clefOffset}px`;
    note.style.top = `${top}px`;
    note.style.transform = `translateY(-100%)`;
});

function updateHypothesis(snapped) {
    // If already fading, store the next desired value and return
    if (isFading) {
        nextSnappedValue = snapped;
        return;
    }

    isFading = true;
    hypothesisEl.style.opacity = 0;

    setTimeout(() => {
        const finalValue = nextSnappedValue !== null ? nextSnappedValue : snapped;
        nextSnappedValue = null;

        hypothesisEl.textContent = messages[finalValue];
        hypothesisEl.style.opacity = 1;

        // Wait for fade-in to complete before allowing another update
        setTimeout(() => {
            isFading = false;

            // If a new value snuck in during fade-in, trigger again
            if (nextSnappedValue !== null) {
                updateHypothesis(nextSnappedValue);
            }
        }, 2000);
    }, 2000);
}

function calculateNotePosition(container, percent) {
    const usableWidth = container.getBoundingClientRect().width - clefOffset - note.offsetWidth;
    const x = percent * usableWidth;
    const y = percent * (staffHeight - note.offsetHeight) + note.offsetHeight;
    return { x, y };
}

function playNoteSound(index) {
    console.log("Playing sound for note:", index);
    const audio = document.getElementById(`note-sound-${index}`);
    if (audio) {
        audio.volume = 0.6;
        audio.currentTime = 0; // rewind to start in case it's still playing
        audio.play().catch(e => console.log("Note sound blocked:", e));
    }
}

