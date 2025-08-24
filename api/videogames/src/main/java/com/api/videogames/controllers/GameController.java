package com.api.videogames.controllers;

import com.api.videogames.models.Game;
import com.api.videogames.services.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public ResponseEntity<List<Game>> getAllGames(
            @RequestParam(required = false, defaultValue = "false") boolean activeOnly) {

        List<Game> games;

        if (activeOnly) {
            games = gameService.findAllActive(); // Solo juegos activos
        } else {
            games = gameService.findAll(); // Todos los juegos
        }

        return ResponseEntity.ok(games);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable String id) {
        return gameService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Game> createGame(@RequestBody Game game) {
        return ResponseEntity.ok(gameService.save(game));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable String id) {
        gameService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable String id, @RequestBody Game updatedGame) {
        return gameService.updateGame(id, updatedGame)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
