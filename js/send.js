const input = document.querySelector(".amount");
const nextBtn = document.querySelector(".next-btn");
const userImg = document.querySelector(".account-item");
const main1 = document.querySelector(".accout-list-page");
const main2 = document.querySelector(".send-money");
const main3 = document.querySelector(".complete-send");
const totalSendMoney = document.querySelector(".total-send-money");
// 숫자 누를 때, 추가
let result = "";
function addNum(num) {
  document.querySelector(".next-btn").style.opacity = 1;
  result = result + num;
  input.innerHTML = Math.abs(result)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
// 화살표 누르면 삭제
function delNum() {
  let a = result.length - 1;
  result = result.slice(0, a);
  input.innerHTML = Math.abs(result)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
userImg.addEventListener("click", () => {
  main1.style.display = "none";
  main2.style.display = "block";
  main1.style.display = "none";
});
nextBtn.addEventListener("click", () => {
  main1.style.display = "none";
  main2.style.display = "none";
  main3.style.display = "block";
  totalSendMoney.innerHTML = Math.abs(result)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
});
