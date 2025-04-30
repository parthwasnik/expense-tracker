import axios from 'axios';

const API_URL = "http://localhost:8080/api/expenses";

export const getExpenses = () => axios.get(API_URL);
export const addExpense = (expense) => axios.post(API_URL, expense);
export const updateExpense = (id, expense) => axios.put(`${API_URL}/${id}`, expense);
export const deleteExpense = (id) => axios.delete(`${API_URL}/${id}`);
export const getByCategory = (category) => axios.get(`${BASE_URL}/category/${category}`);