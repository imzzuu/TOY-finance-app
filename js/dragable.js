const historySection = document.querySelector(".account-history");
let isDown = false;
let startY;
let scrollTop;

historySection.addEventListener("mousedown", (e) => {
  isDown = true;
  startY = e.pageY - historySection.offsetHeight;
  scrollTop = historySection.scrollTop;
});
historySection.addEventListener("mouseleave", () => {
  isDown = false;
});
historySection.addEventListener("mouseup", () => {
  isDown = false;
});
historySection.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const y = e.pageY - historySection.offsetHeight;
  const walk = startY - y;
  console.log(walk);
  historySection.scrollTop = scrollTop - walk;
});
