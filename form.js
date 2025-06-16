document.addEventListener('DOMContentLoaded', () => {
  // Get the transaction type from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type');
  
  // Set the type in the hidden input
  document.getElementById('type').value = type;
  
  // Update the page title based on type
  document.querySelector('h2').textContent = `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`;

  const form = document.getElementById('entry-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const transaction = {
      type: document.getElementById('type').value,
      date: document.getElementById('date').value,
      amount: document.getElementById('amount').value,
      medium: document.getElementById('medium').value,
      remarks: document.getElementById('remarks').value
    };

    // Get existing transactions from localStorage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    // Add new transaction
    transactions.push(transaction);
    
    // Save back to localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // Redirect back to main page
    window.location.href = 'index.html';
  });
}); 