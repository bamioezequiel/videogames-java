package com.api.videogames.services;

import com.api.videogames.models.User;
import com.api.videogames.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // Obtener todos los usuarios
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Obtener usuario por id
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    // Modificar usuario (actualiza datos básicos)
    public Optional<User> updateUser(String id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setLastname(userDetails.getLastname());
            user.setPicture(userDetails.getPicture());

            return userRepository.save(user);
        });
    }

    // Cambiar rol del usuario
    public Optional<User> changeUserRole(String id, String newRole) {
        return userRepository.findById(id).map(user -> {
            user.setRole(newRole);
            return userRepository.save(user);
        });
    }

    // Buscar usuario por token (ejemplo: token guardado en usuario)
    public Optional<User> getUserByToken(String token) {

        return userRepository.findByToken(token);
    }
}

