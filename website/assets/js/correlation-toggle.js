const btnDepression = document.getElementById("btn-depression");
const btnAnxiety = document.getElementById("btn-anxiety");
const corr1 = document.getElementById("correlation1");
const corr2 = document.getElementById("correlation2");

btnDepression.addEventListener("click", () => {
  corr1.style.display = "block";
  corr2.style.display = "none";
  btnDepression.classList.add("active");
  btnAnxiety.classList.remove("active");
});

btnAnxiety.addEventListener("click", () => {
  corr1.style.display = "none";
  corr2.style.display = "block";
  btnAnxiety.classList.add("active");
  btnDepression.classList.remove("active");
});