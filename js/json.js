let today = moment().format("YYYY-MM-DD");
let yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
let twoDaysAgo = moment().subtract(2, "days").format("YYYY-MM-DD");

async function getTodayData() {
  /* JSON 데이터 가져오기 */
  const obj = await axios.get(
    "https://raw.githubusercontent.com/jusunjo/bank-json/main/bank.json"
  );

  /* 날짜별로 데이터 나누기 (REDUCE) */
  const newData = obj.data.reduce((acc, current) => {
    acc[current.date] = acc[current.date] || [];
    acc[current.date].push(current);
    return acc;
  }, {});

  const dateData = Object.keys(newData).map((key) => {
    return {
      date: key,
      data: newData[key],
    };
  });

  /* 오늘 이전 날짜만 모은 data */
  const toToday = dateData.filter((el) => el.date <= today).reverse();

  /* 노드 준비 */
  // 부모 div
  const recent = document.querySelector(".recent");

  /* 노드 붙이기 */
  // for 문 돌려서 날짜별 div 만들기
  for (let i = 0; i < toToday.length; i++) {
    // 노드 준비
    const recentDiv = document.createElement("div");
    const recentHeader = document.createElement("div");
    recentDiv.className = "recent-item-wrapper";
    recentHeader.className = "recent-header";

    // 오늘
    if (toToday[i].date === today) {
      let toTodayData = toToday[i].data;
      // 날짜 넣어주기
      const today = "오늘";
      appendDateDiv(today);

      // 총액 넣어주기
      let total = 0;
      calcTotal(total, toTodayData);

      // list 넣어주기
      addList(recentDiv, toTodayData);
    }
    // 어제
    else if (toToday[i].date === yesterday) {
      // 날짜 넣어주기
      const yesterday = "어제";
      appendDateDiv(yesterday);

      // 총액 넣어주기
      let total = 0;
      let toTodayData = toToday[i].data;
      calcTotal(total, toTodayData);

      // list 넣어주기
      addList(recentDiv, toTodayData);
    }
    // 그저께
    else if (toToday[i].date === twoDaysAgo) {
      // 날짜 넣어주기
      const yesterday = "2일 전";
      appendDateDiv(yesterday);

      // 총액 넣어주기
      let total = 0;
      let toTodayData = toToday[i].data;
      calcTotal(total, toTodayData);

      // list 넣어주기
      addList(recentDiv, toTodayData);
    }
    // 그 이전
    else {
      // 날짜 넣어주기
      appendDateDiv(toToday[i].date);

      // 총액 넣어주기
      let total = 0;
      let toTodayData = toToday[i].data;
      calcTotal(total, toTodayData);

      // list 넣어주기
      addList(recentDiv, toTodayData);
    }
    recent.appendChild(recentDiv);

    /* 함수 모음 */

    /* 날짜 붙이기 함수 */
    function appendDateDiv(date) {
      const recentDate = document.createElement("p");
      recentDate.className = "recent-date";
      recentDate.textContent = `${date}`;
      recentHeader.appendChild(recentDate);
      recentDiv.appendChild(recentHeader);
    }

    /* 총액 구하기 함수 */
    function calcTotal(total, toTodayData) {
      for (let j = 0; j < toTodayData.length; j++) {
        total +=
          toTodayData[j].income === "in"
            ? toTodayData[j].price
            : -toTodayData[j].price;
      }
      const totalPrice = Math.abs(total)
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
    }
  }

  /* ul 에 li item 넣어주는 함수 */
  function addList(recentDiv, toTodayData) {
    const recentUl = document.createElement("ul");
    recentUl.className = "recent-list";
    for (let z = 0; z < toTodayData.length; z++) {
      const recentli = document.createElement("li");
      const itemP = document.createElement("p");
      const priceP = document.createElement("p");
      recentli.className = "recent-item";
      itemP.className = "item";
      toTodayData[z].income === "in"
        ? (priceP.classList = "price plus")
        : (priceP.classList = "price");
      const price = toTodayData[z].price
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      itemP.textContent = `${toTodayData[z].history}`;
      toTodayData[z].income === "in"
        ? (priceP.textContent = `+${price}`)
        : (priceP.textContent = `${price}`);
      recentli.appendChild(itemP);
      recentli.appendChild(priceP);
      recentUl.appendChild(recentli);
    }
    recentDiv.appendChild(recentUl);
  }
}
getTodayData();
