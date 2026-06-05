package com.expensetracker.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.expensetracker.backend.model.Expense;

public interface ExpenseRepository
        extends JpaRepository<Expense, Long> {

    List<Expense> findByUserEmail(
            String userEmail);
}