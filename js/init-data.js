// js/init-data.js
(function() {
  if (!localStorage.getItem('budget')) {
    localStorage.setItem('budget', '1050000'); // 예산: 1,050,000원
  }

  if (!localStorage.getItem('expenses')) {
    const initialExpenses = [
      // { desc: '기차 예매', amount: 54000 },
      { desc: '펜션 예약', amount: 620000 }
    ];
    localStorage.setItem('expenses', JSON.stringify(initialExpenses));
  }
})();
