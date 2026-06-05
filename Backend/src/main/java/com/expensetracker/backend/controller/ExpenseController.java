package com.expensetracker.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.expensetracker.backend.model.Expense;
import com.expensetracker.backend.repository.ExpenseRepository;

@RestController
@RequestMapping("/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/{userEmail}")
    public List<Expense> getExpensesByUser(
            @PathVariable String userEmail) {

        return expenseRepository.findByUserEmail(
                userEmail);
    }

    @PostMapping
    public Expense addExpense(
            @RequestBody Expense expense) {

        return expenseRepository.save(expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(
            @PathVariable Long id) {

        expenseRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @RequestBody Expense updatedExpense) {

        Expense expense =
                expenseRepository.findById(id)
                        .orElseThrow();

        expense.setAmount(
                updatedExpense.getAmount());

        expense.setCategory(
                updatedExpense.getCategory());

        expense.setDate(
                updatedExpense.getDate());
        
        expense.setNote(
                updatedExpense.getNote());

        expense.setUserEmail(
                updatedExpense.getUserEmail());

        return expenseRepository.save(
                expense);
    }
}