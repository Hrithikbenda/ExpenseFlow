package com.expensetracker.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.expensetracker.backend.model.User;
import com.expensetracker.backend.repository.UserRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String register(
            @RequestBody User user) {

        Optional<User> existingUser =
                userRepository.findByEmail(
                        user.getEmail());

        if (existingUser.isPresent()) {
            return "Email already exists";
        }

        userRepository.save(user);

        return "Registration successful";
    }

    @PostMapping("/login")
    public String login(
            @RequestBody User loginUser) {

        Optional<User> user =
                userRepository.findByEmail(
                        loginUser.getEmail());

        if (user.isEmpty()) {
            return "User not found";
        }

        if (!user.get()
                .getPassword()
                .equals(loginUser.getPassword())) {

            return "Invalid password";
        }

        return "Login successful";
    }
}