package com.expensetracker.service;

import com.expensetracker.model.Expense;
import java.util.List;

public interface ExpenseService {
    Expense saveExpense(Expense expense);
    List<Expense> getAllExpenses();
    Expense updateExpense(Long id, Expense expense);
    void deleteExpense(Long id);
}
