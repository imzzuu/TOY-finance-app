# TYO-finance-app

## 개요

---

```
 본인 뿐만아니라 은행 계좌를 관리하기 어려운 미성년자나, 부모님의 계좌도 함께 관리할 수 있는 어플
```

- 일간 지출/수입 내역을 합산하여 관리
- 카테고리별로 계산하여 지출내역을 chart로 제공
- 일간 지출 내역 계산하여 chart 로 제공

## 주요 기능

---

### 사용 언어 : HTML, CSS, JS

<br/>

```
1. 사용 내역 JSON data 를 날짜별로 listing
```

- json 생성한 후 axios를 통해 받아오기
- momont.js 를 통해 현재 날짜를 받아서 실제로 오늘 data를 찾아 반영할 수 있도록 구성
- html에 뿌리기 좋도록 data 가공하기 <br/>
  날짜별로 모은 새로운 객체를 생성하여, 오늘까지의 사용처와 금액, 일간 총액을 표시
  <br/>
  <br/>
  ![list](https://user-images.githubusercontent.com/98930796/167677203-4f101db7-2173-4c7d-b2af-939382443d8b.gif)

```
2. 사용 내역 list 길게 보기
```

- click 이벤트를 통해 구현
  <br/>
  <br/>
  ![toggle](https://user-images.githubusercontent.com/98930796/167681154-ca1bef60-4c14-41f7-9c12-18c334f17546.gif)

```
3. slider 구현
```

- swiper.js 사용
  <br/>
  <br/>
  ![swiper](https://user-images.githubusercontent.com/98930796/167681118-7291570e-bd1d-486f-a812-3cdf168c1bd0.gif)

```
4. 일간 지출 총액, 지출 카테고리별 총액 분석 chart 제공
```

- 실제 json 파일에서 오늘까지의 data 값들을 가져와 사용하여 chart를 hover 하면 해당 실제 금액을 조회 가능
- chart.js 사용
  <br/>
  <br/>
  ![chart](https://user-images.githubusercontent.com/98930796/167680820-bdbe5a79-c738-40d8-977a-361cccc134c0.gif)

```
5. 이체 number-pad
```

- 이체를 원하는 금액을 입력 후, 다음 버튼을 누르면 해당 금액이 이체 완료 페이지에도 출력
  <br/>
  <br/>
  ![이체](https://user-images.githubusercontent.com/98930796/167682035-44f9803b-0e1d-44ce-ac16-eef2aabac741.gif)
