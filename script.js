document.addEventListener('DOMContentLoaded', () => {
  // Load and display transactions
  loadTransactions();
});

function loadTransactions() {
  // Get transactions from localStorage
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
  // Clear existing lists
  document.getElementById('credit-list').innerHTML = '';
  document.getElementById('debit-list').innerHTML = '';
  
  // Initialize totals
  let creditTotal = 0;
  let debitTotal = 0;
  
  // Sort transactions by date (newest first)
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Display each transaction
  transactions.forEach(transaction => {
    const transactionElement = createTransactionElement(transaction);
    
    if (transaction.type === 'credit') {
      document.getElementById('credit-list').appendChild(transactionElement);
      creditTotal += parseFloat(transaction.amount);
    } else {
      document.getElementById('debit-list').appendChild(transactionElement);
      debitTotal += parseFloat(transaction.amount);
    }
  });
  
  // Update totals
  document.getElementById('credit-total').textContent = creditTotal.toFixed(2);
  document.getElementById('debit-total').textContent = debitTotal.toFixed(2);
}

function createTransactionElement(transaction) {
  const div = document.createElement('div');
  div.className = 'transaction';
  
  const date = new Date(transaction.date).toLocaleDateString();
  const amount = parseFloat(transaction.amount).toFixed(2);
  
  div.innerHTML = `
    <div class="transaction-info">
      <div class="info-row">
        <span class="info-label">Date | তারিখ:</span>
        <span class="info-value">${date}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Amount | পরিমাণ:</span>
        <span class="info-value">${amount}/=</span>
      </div>
      ${transaction.type === 'credit' ? `
        ${transaction.transactionMedium ? `
          <div class="info-row">
            <span class="info-label">Transaction Medium | লেনদেনের মাধ্যম:</span>
            <span class="info-value">${transaction.transactionMedium}</span>
          </div>
        ` : ''}
        ${transaction.bankName ? `
          <div class="info-row">
            <span class="info-label">Bank Name | ব্যাংকের নাম:</span>
            <span class="info-value">${transaction.bankName}</span>
          </div>
        ` : ''}
      ` : ''}
      ${transaction.type === 'debit' && transaction.productCount ? `
        <div class="info-row">
          <span class="info-label">Product Count | পণ্যের সংখ্যা:</span>
          <span class="info-value">${transaction.productCount}</span>
        </div>
      ` : ''}
      ${transaction.remarks ? `
        <div class="info-row">
          <span class="info-label">Remarks | মন্তব্য:</span>
          <span class="info-value">${transaction.remarks}</span>
        </div>
      ` : ''}
    </div>
  `;
  
  return div;
}
