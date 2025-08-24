package com.api.videogames.services;

import com.api.videogames.dtos.AuthRequest;
import com.api.videogames.dtos.AuthResponse;
import com.api.videogames.dtos.RegisterRequest;
import com.api.videogames.models.User;
import com.api.videogames.repositories.UserRepository;
import com.api.videogames.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public Optional<User> authenticateStatus(String token) {
        return userRepository.findByToken(token);
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!BCrypt.checkpw(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        user.setToken(token);
        userRepository.save(user);
        return new AuthResponse(token);
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        String hashedPassword = BCrypt.hashpw(request.getPassword(), BCrypt.gensalt());

        User newUser = User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .lastname(request.getLastname())
                .password(hashedPassword)
                .role("USER")
                .build();
        String token = jwtUtil.generateToken(newUser.getEmail());
        newUser.setToken(token);

        userRepository.save(newUser);

        return new AuthResponse(token);
    }
}
