package com.api.videogames.dtos;

import lombok.*;

@Getter @Setter @AllArgsConstructor
public class AuthRequest {
    private String email;
    private String password;
}
