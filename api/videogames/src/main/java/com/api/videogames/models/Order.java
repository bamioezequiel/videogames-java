package com.api.videogames.models;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    private String id;

    @NotNull(message = "El ID del usuario es obligatorio")
    private String userId;

    @NotNull(message = "Debe contener al menos un juego")
    private List<String> gameIds; // Enviados desde frontend

    private List<OrderItem> items; // Generados en backend

    private LocalDateTime createdAt;

    @NotNull(message = "El estado es obligatorio")
    private String status; // PENDING, PAID, CANCELLED

    private double total;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItem {
        private String gameId;
        private String name;
        private double price; // Precio al momento de la compra
        private int quantity;
    }
}
