document.addEventListener('DOMContentLoaded', () => {
  // Get the transaction type from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type');
  
  // Set the type in the hidden input
  document.getElementById('type').value = type;
  
  // Show/hide appropriate fields based on type
  if (type === 'credit') {
    document.getElementById('credit-fields').style.display = 'block';
    document.getElementById('debit-fields').style.display = 'none';
    document.querySelector('h2').textContent = 'Add New Credit | নতুন জমা যোগ করুন';
    
    // Add event listener for transaction medium change
    document.getElementById('transaction-medium').addEventListener('change', function() {
      const bankFields = document.getElementById('bank-fields');
      const bankName = document.getElementById('bank-name');
      
      if (this.value === 'BANK TRANSFER' || this.value === 'CHEQUE') {
        bankFields.style.display = 'block';
        bankName.required = true;
      } else {
        bankFields.style.display = 'none';
        bankName.required = false;
        bankName.value = '';
      }
    });
  } else {
    document.getElementById('debit-fields').style.display = 'block';
    document.getElementById('credit-fields').style.display = 'none';
    document.querySelector('h2').textContent = 'Add New Debit | নতুন খরচ যোগ করুন';
  }

  const form = document.getElementById('entry-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate required fields
    const date = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;
    
    if (!date || !amount) {
      alert('Please fill in all required fields | দয়া করে সমস্ত প্রয়োজনীয় ক্ষেত্র পূরণ করুন');
      return;
    }

    if (type === 'credit') {
      const medium = document.getElementById('transaction-medium').value;
      if (!medium) {
        alert('Please select a transaction medium | দয়া করে লেনদেনের মাধ্যম নির্বাচন করুন');
        return;
      }
      if ((medium === 'BANK TRANSFER' || medium === 'CHEQUE') && !document.getElementById('bank-name').value) {
        alert('Please select a bank | দয়া করে ব্যাংক নির্বাচন করুন');
        return;
      }
    } else {
      // Validate product count for debit
      const productCount = document.getElementById('product-count').value;
      if (!productCount) {
        alert('Please enter product count | দয়া করে পণ্যের সংখ্যা লিখুন');
        return;
      }
    }
    
    const transaction = {
      type: type,
      date: date,
      amount: parseFloat(amount),
      remarks: document.getElementById('remarks').value || ''
    };

    // Add type-specific fields
    if (type === 'credit') {
      transaction.transactionMedium = document.getElementById('transaction-medium').value;
      
      // Add bank name if applicable
      if (transaction.transactionMedium === 'BANK TRANSFER' || transaction.transactionMedium === 'CHEQUE') {
        transaction.bankName = document.getElementById('bank-name').value;
      }
    } else {
      const productCount = document.getElementById('product-count').value;
      const productUnit = document.getElementById('product-unit').value;
      transaction.productCount = `${productCount} ${productUnit}`;
    }

    try {
      // Get existing transactions from localStorage
      let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      
      // Add new transaction
      transactions.push(transaction);
      
      // Save back to localStorage
      localStorage.setItem('transactions', JSON.stringify(transactions));
      
      // Redirect back to main page
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Error saving transaction. Please try again.');
    }
  });
}); 