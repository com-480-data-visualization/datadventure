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
];

const note = document.getElementById("note-icon");
const container = document.getElementById("staff-slider-container");

let isDragging = false;

note.addEventListener("mousedown", (e) => {
    isDragging = true;
    note.style.cursor = "grabbing";
});

window.addEventListener("mouseup", () => {
    console.log(slider.value)
    isDragging = false;
    note.style.cursor = "grab";

    const snapped = Math.round(parseFloat(slider.value));

    if (slider.value != snapped) {
        slider.value = snapped;

        console.log(snapped)

        // Snap the note to the slider value
        const rect = container.getBoundingClientRect();
        const percent = (snapped - slider.min) / (slider.max - slider.min);
        const staff = document.querySelector(".staff-lines");
        const staffHeight = 80;
        // Move the note horizontally
        const x = percent * (rect.width - 35);
        // Raise the note as it moves right
        const y = percent * (staffHeight - note.offsetHeight) + note.offsetHeight;
        note.style.transform = `translate(${x}px, -${y}px)`;
        note.style.transition = "transform 0.2s ease-out";
        note.style.cursor = "grab";

        hypothesisEl.style.opacity = 0;

        // If this is the first time displaying a message, no need to wait for the fade-out
        // to finish, since the text is already empty
        if (hypothesisHeaderEl.textContent != "Your hypothesis:") {

            hypothesisHeaderEl.textContent = "Your hypothesis:"; // Change the header
            hypothesisFollowupEl.style.opacity = 1; // Show the follow-up text ("Scroll down to see more")

            hypothesisEl.textContent = messages[snapped];
            hypothesisEl.style.opacity = 1;
        } else {
            updateHypothesis(snapped)
        }
    }
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const rect = container.getBoundingClientRect();
    const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    slider.value = percent * (slider.max - slider.min) + Number(slider.min); // rounds automatically

    const staff = document.querySelector(".staff-lines");
    const staffHeight = 80;

    const x = percent * (rect.width - 35);

    const y = percent * (staffHeight - note.offsetHeight) + note.offsetHeight;

    note.style.transform = `translate(${x}px, -${y}px)`;
});

window.addEventListener("DOMContentLoaded", () => {
    const note = document.getElementById("note-icon");
    const staff = document.querySelector(".staff-lines");
    const container = document.getElementById("staff-slider-container");

    if (!note || !staff || !container) {
        console.error("Element not found");
        return;
    }

    const staffRect = staff.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const top = staffRect.bottom - containerRect.top;
    note.style.left = `0px`;
    note.style.top = `${top}px`;
    note.style.transform = `translateY(-100%)`;
});

let isFading = false;
let nextSnappedValue = null;

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
        }, 2000); // match your fade-in duration
    }, 2000); // match your fade-out duration
}


