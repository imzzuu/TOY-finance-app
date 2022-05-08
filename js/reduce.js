// 날짜별로 새로운 price 객체 생성
const priceValues = obj.data.reduce((acc, current) => {
  acc[current.date] = acc[current.date] || [];
  acc[current.date].push(current.price);
  return acc;
}, {});
console.log(priceValues);

const prices = Object.keys(priceValues).map((key) => {
  return {
    date: key,
    price: priceValues[key],
  };
});

// 날짜별로 새로운 hisory 객체 생성
const historyValues = obj.data.reduce((acc, current) => {
  acc[current.date] = acc[current.date] || [];
  acc[current.date].push(current.history);
  return acc;
}, {});

const historys = Object.keys(historyValues).map((key) => {
  return {
    date: key,
    history: historyValues[key],
  };
});

const todayHistory = historys.filter((el) => {
  return el.date === dateString;
});

console.log(todayHistory);

// 오늘 찍기
for (let i = 0; i < prices.length; i++) {
  if (prices[i].date === dateString) {
    const recentDate = document.createElement("p");
    recentDate.className = "recent-date";
    recentDate.textContent = "오늘";
    recentHeader.appendChild(recentDate);
  }
}
// 총액 찍기

//   const recentItem = document.createElement("li");
//   for (let i = 0; i < prices.length; i++) {
//     for (let j = 0; j < prices[i].price.length; j++) {
//       const itemP = document.createElement("p");
//       itemP.className = "price";
//       itemP.textContent = `${prices[i].price[j]}`;
//       recentItem.appendChild(itemP);
//       //   console.log(itemP);
//     }
//   }
//   recentList.appendChild(recentItem);
