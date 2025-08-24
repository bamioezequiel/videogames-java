package com.api.videogames.repositories;

import com.api.videogames.models.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CategoryRepository extends MongoRepository<Category, String> {
    List<Category> findByType(String type);
    boolean existsByType(String type);
}
