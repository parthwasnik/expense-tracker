package com.expensetracker.service;

import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository repository;

    @Override
    public Expense saveExpense(Expense expense) {
        return repository.save(expense);
    }

    @Override
    public List<Expense> getAllExpenses() {
        return repository.findAll();
    }

    @Override
    public Expense updateExpense(Long id, Expense expense) {
        Expense existing = repository.findById(id).orElseThrow();
        existing.setTitle(expense.getTitle());
        existing.setAmount(expense.getAmount());
        existing.setCategory(expense.getCategory());
        existing.setDate(expense.getDate());
        return repository.save(existing);
    }

    @Override
    public void deleteExpense(Long id) {
        repository.deleteById(id);
    }
}
