let now = moment();
let today = now.format("YYYY-MM-DD");
let yesterday = now.subtract(1, "days").format("YYYY-MM-DD");

async function getTodayData() {
  // 데이터 가져오기
  const obj = await axios.get(
    "https://raw.githubusercontent.com/jusunjo/bank-json/main/bank.json"
  );

  /* 노드 준비 */

  // 날짜 div
  const recentHeader = document.querySelector(".recent-header");
  // ul
  const recentList = document.querySelector(".recent-list");

  /* 데이터 필터 */

  //   오늘 날짜만 새로운 배열로
  const todayData = obj.data.filter((el) => el.date === today);

  // 총액 구하기
  let total = 0;
  for (let i = 0; i < todayData.length; i++) {
    total +=
      todayData[i].income === "in" ? todayData[i].price : -todayData[i].price;
  }
  const totalPrice = total
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  if (total > 0) {
    const totalP = document.createElement("p");
    totalP.className = "total-expense";
    totalP.textContent = `${totalPrice}원 수입`;
    recentHeader.appendChild(totalP);
  } else {
    const totalP = document.createElement("p");
    totalP.className = "total-expense";
    totalP.textContent = `${totalPrice}원 지출`;
    recentHeader.appendChild(totalP);
  }

  //    // 배열 돌면서 날짜 찍고 붙이기
  //   if (obj.data.date === today) {
  //     const recentDate = document.createElement("p");
  //     recentDate.className = "recent-date";
  //     recentDate.textContent = "오늘";
  //     return recentHeader.appendChild(recentDate);
  //   } else if (obj.data.date === yesterday) {
  //   }

  /* ul 에 li item 넣어주기 */
  for (let i = 0; i < todayData.length; i++) {
    const recentItem = document.createElement("li");
    const itemP = document.createElement("p");
    const priceP = document.createElement("p");
    recentItem.className = "recent-item";
    itemP.className = "item";
    todayData[i].income === "in"
      ? (priceP.classList = "price plus")
      : (priceP.classList = "price");
    const price = todayData[i].price
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    itemP.textContent = `${todayData[i].history}`;
    todayData[i].income === "in"
      ? (priceP.textContent = `+${price}`)
      : (priceP.textContent = `${price}`);
    recentItem.appendChild(itemP);
    recentItem.appendChild(priceP);
    recentList.appendChild(recentItem);
  }
}
getTodayData();
