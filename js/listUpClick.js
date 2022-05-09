const upBtn = document.querySelector(".up-btn");
upBtn.addEventListener("click", () => {
  document.querySelector(".account-history").classList.toggle("active");
  document.querySelector(".recent").classList.toggle("active");
});
