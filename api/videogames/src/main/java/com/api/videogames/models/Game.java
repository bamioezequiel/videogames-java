package com.api.videogames.models;

import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "games")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    @Id
    private String id;

    @NotBlank(message = "El nombre del juego es obligatorio")
    private String name;

    @NotBlank(message = "La descripción es obligatoria")
    private String description;

    @NotNull(message = "La fecha de lanzamiento es obligatoria")
    private LocalDate released;

    @NotBlank(message = "La imagen principal es obligatoria")
    private String mainImage;

    @NotEmpty(message = "Debe contener al menos una screenshot")
    private List<@NotBlank String> shortScreenshots;

    @DecimalMin(value = "0.0", message = "El rating no puede ser negativo")
    private double rating;

    @DecimalMin(value = "0.0", message = "El precio no puede ser negativo")
    private double price;

    @DecimalMin(value = "0.0", message = "El precio con descuento no puede ser negativo")
    private double priceWithSale;

    @DecimalMin(value = "0.0", message = "El descuento no puede ser negativo")
    private double onSale;

    private boolean active;
    private boolean featured;
    private boolean isNew;

    @NotEmpty(message = "Debe tener al menos un género")
    private List<@NotBlank String> genres;

    @NotNull
    private List<@NotBlank String> tags;

    @NotEmpty(message = "Debe tener al menos una plataforma")
    private List<@NotBlank String> platforms;
}
