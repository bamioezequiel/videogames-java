package com.api.videogames.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter @AllArgsConstructor
public class RegisterRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String lastname;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}