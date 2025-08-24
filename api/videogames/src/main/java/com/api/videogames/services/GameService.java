package com.api.videogames.services;

import com.api.videogames.models.Game;
import com.api.videogames.repositories.GameRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public List<Game> findAll() {
        return gameRepository.findAll();
    }

    public List<Game> findAllActive() {
        return gameRepository.findByActiveTrue();
    }

    public Optional<Game> findById(String id) {
        return gameRepository.findById(id);
    }

    public Game save(Game game) {
        return gameRepository.save(game);
    }

    public void delete(String id) {
        gameRepository.deleteById(id);
    }

    public Optional<Game> updateGame(String id, Game updatedGame) {
        return gameRepository.findById(id)
                .map(existingGame -> {
                    existingGame.setName(updatedGame.getName());
                    existingGame.setDescription(updatedGame.getDescription());
                    existingGame.setReleased(updatedGame.getReleased());
                    existingGame.setMainImage(updatedGame.getMainImage());
                    existingGame.setShortScreenshots(updatedGame.getShortScreenshots());
                    existingGame.setRating(updatedGame.getRating());
                    existingGame.setPrice(updatedGame.getPrice());
                    existingGame.setPriceWithSale(updatedGame.getPriceWithSale());
                    existingGame.setOnSale(updatedGame.getOnSale());
                    existingGame.setActive(updatedGame.isActive());
                    existingGame.setFeatured(updatedGame.isFeatured());
                    existingGame.setNew(updatedGame.isNew());
                    existingGame.setGenres(updatedGame.getGenres());
                    existingGame.setTags(updatedGame.getTags());
                    existingGame.setPlatforms(updatedGame.getPlatforms());
                    return gameRepository.save(existingGame);
                });
    }
}
