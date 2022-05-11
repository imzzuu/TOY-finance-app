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
  const toToday = dateData.filter((el) => el.date <= today);

  /* 일간 레포트 (bar) */

  // 일간 합계 구하기
  let dailySum = [];
  let day = [];
  for (let i = 0; i < toToday.length; i++) {
    let total = 0;
    toToday[i].data.map((el) => {
      if (el.income === "out") {
        total += el.price;
      }
    });
    dailySum.push(total);
    day.push(toToday[i].date.split("2022-05-")[1]);
  }

  // bar 그래프
  const dailyChart = document.getElementById("daily-chart");
  const barChart = new Chart(dailyChart, {
    type: "bar",
    data: {
      labels: day,
      datasets: [
        {
          label: "일간 지출 금액",
          data: dailySum,
          backgroundColor: ["rgba(75, 192, 192, 0.2)"],
          borderColor: ["rgba(75, 192, 192, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  /*   6월 지출 패턴 (도넛) */

  // 변수 준비
  let eatOut = 0;
  let health = 0;
  let oiling = 0;
  let mart = 0;
  let shopping = 0;

  // 합계 구하기
  for (let i = 0; i < toToday.length; i++) {
    let toTodayData = toToday[i].data;

    for (let j = 0; j < toTodayData.length; j++) {
      switch (toTodayData[j].classify) {
        case "eatout":
          eatOut += toTodayData[j].price;
          break;
        case "health":
          health += toTodayData[j].price;
          break;
        case "oiling":
          oiling += toTodayData[j].price;
          break;
        case "shopping":
          shopping += toTodayData[j].price;
          break;
        case "mart":
          mart += toTodayData[j].price;
          break;
      }
    }
  }

  // 총 합계 구하기
  const total = (eatOut + health + oiling + mart + shopping)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  document.querySelector(".total").textContent = `${total}원`;

  // 도넛 차트
  const ctx = document.getElementById("doughnutChart");
  const doughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["주유비", "건강관리비", "외식비", "장보기", "상점"],
      datasets: [
        {
          data: [oiling, health, eatOut, mart, shopping],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(153, 102, 255, 0.2)", //보라
            "rgba(255, 206, 86, 0.2)", // 노랑
            "rgba(54, 162, 235, 0.2)", // 파랑
            "rgba(75, 192, 192, 0.2)", // 초록
          ],
        },
      ],
    },
    options: {
      cutoutPercentage: 80,
    },
  });

  // html 에 뿌리기
  document.querySelector(".oiling").textContent = `${Math.abs(oiling)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`;
  document.querySelector(".health").textContent = `${Math.abs(health)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`;
  document.querySelector(".eatout").textContent = `${Math.abs(eatOut)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`;
  document.querySelector(".mart").textContent = `${Math.abs(mart)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`;
  document.querySelector(".shopping").textContent = `${Math.abs(shopping)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원`;
}
getTodayData();
