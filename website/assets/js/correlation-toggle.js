// wait for D3 charts to have rendered
document.addEventListener("DOMContentLoaded", () => {
  const btnD = document.getElementById("btn-depression");
  const btnA = document.getElementById("btn-anxiety");
  const corr1 = document.getElementById("correlation1");
  const corr2 = document.getElementById("correlation2");

  btnD.addEventListener("click", () => {
    // show depression, hide anxiety
    corr1.style.display = "block";
    corr2.style.display = "none";
    btnD.classList.add("active");
    btnA.classList.remove("active");
  });

  btnA.addEventListener("click", () => {
    // show anxiety, hide depression
    corr1.style.display = "none";
    corr2.style.display = "block";
    btnA.classList.add("active");
    btnD.classList.remove("active");
  });
});
