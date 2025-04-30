import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [currentView, setCurrentView] = useState('add');
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [output, setOutput] = useState('');
  const [deleteId, setDeleteId] = useState('');


  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    axios.get('http://localhost:8080/api/expenses')
      .then(response => setExpenses(response.data))
      .catch(err => console.error('Error fetching expenses:', err));
  };

  const handleAddExpense = () => {
    const newExpense = { title, amount, category, date };
    axios.post('http://localhost:8080/api/expenses', newExpense)
      .then(response => {
        setOutput('Expense Added Successfully');
        setExpenses(prev => [...prev, response.data]);
        setTitle('');
        setAmount('');
        setCategory('');
        setDate('');
      })
      .catch(() => setOutput('Failed to Add Expense'));
  };

  const handleFindById = () => {
    const idNum = parseInt(searchId);
    if (isNaN(idNum)) {
      setOutput('Please enter a valid numeric ID');
      return;
    }

    axios.get(`http://localhost:8080/api/expenses`)
      .then(response => {
        const result = response.data.find(exp => exp.id === idNum);
        if (result) {
          setSearchResults([result]);
          setOutput(`Found expense with ID: ${searchId}`);
        } else {
          setSearchResults([]);
          setOutput('No expense found with that ID');
        }
      })
      .catch(() => setOutput('Failed to fetch expenses'));
  };

  const handleUpdateExpense = () => {
    const idNum = parseInt(searchId);
    if (isNaN(idNum)) {
      setOutput('Please enter a valid numeric ID');
      return;
    }

    const updatedExpense = { title, amount, category, date };

    axios.put(`http://localhost:8080/api/expenses/${idNum}`, updatedExpense)
      .then(response => {
        setOutput('Expense Updated Successfully');
        fetchExpenses(); // refresh the expense list
        setTitle('');
        setAmount('');
        setCategory('');
        setDate('');
      })
      .catch(() => setOutput('Failed to Update Expense'));
  };

  const handleDeleteExpense = () => {
    const idNum = parseInt(deleteId);
    if (isNaN(idNum)) {
      setOutput('Please enter a valid numeric ID to delete');
      return;
    }
  
    axios.delete(`http://localhost:8080/api/expenses/${idNum}`)
      .then(() => {
        setOutput(`Expense with ID ${idNum} deleted successfully`);
        setExpenses(prev => prev.filter(exp => exp.id !== idNum));
        setDeleteId('');
      })
      .catch(() => setOutput('Failed to delete expense'));
  };
  


  return (
    <div style={{ padding: '20px' }}>
      <h1>Expense Tracker</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setCurrentView('add')}>Add Expense</button>
        <button onClick={() => setCurrentView('find')}>Find Expense</button>
        <button onClick={() => setCurrentView('update')}>Update Expense</button>
        <button onClick={() => setCurrentView('delete')}>Delete Expense</button>
      </div>

      {currentView === 'add' && (
        <div>
          <h3>Add Expense</h3>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
          <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
          <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
          <input value={date} onChange={e => setDate(e.target.value)} type="date" />
          <button onClick={handleAddExpense}>Add</button>
        </div>
      )}

      {currentView === 'delete' && (
        <div>
          <h3>Delete Expense</h3>
          <input
          value={deleteId}
          onChange={e => setDeleteId(e.target.value)}
          placeholder="Expense ID to Delete"
          />
    <button onClick={handleDeleteExpense}>Delete</button>
  </div>
)}


      {currentView === 'find' && (
        <div>
          <h3>Find Expense</h3>
          <input value={searchId} onChange={e => setSearchId(e.target.value)} placeholder="Enter ID" />
          <button onClick={handleFindById}>Search by ID</button>
        </div>
      )}

      {currentView === 'update' &&(
        <div>
          <h3>Update Expense</h3>
          <input value={searchId} onChange={e => setSearchId(e.target.value)} placeholder="Expense Id To Update"/>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
          <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
          <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category"/>
          <input value={date} onChange={e => setDate(e.target.value)} type="date"/>
          <button onClick={handleUpdateExpense}>Update</button>

        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {output && <p><strong>{output}</strong></p>}
        {(currentView === 'find' || currentView === 'add') && (
          <table border="1" cellPadding="5" style={{ marginTop: '10px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>ID</th><th>Title</th><th>Amount</th><th>Category</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {(currentView === 'find' ? searchResults : expenses).map(exp => (
                <tr key={exp.id}>
                  <td>{exp.id}</td>
                  <td>{exp.title}</td>
                  <td>{exp.amount}</td>
                  <td>{exp.category}</td>
                  <td>{exp.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
