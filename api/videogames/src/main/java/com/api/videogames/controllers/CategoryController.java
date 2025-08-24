package com.api.videogames.controllers;

import com.api.videogames.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/platforms")
    public ResponseEntity<List<String>> getPlatforms() {
        return ResponseEntity.ok(categoryService.getPlatforms());
    }

    @GetMapping("/genres")
    public ResponseEntity<List<String>> getGenres() {
        return ResponseEntity.ok(categoryService.getGenres());
    }

    @GetMapping("/tags")
    public ResponseEntity<List<String>> getTags() {
        return ResponseEntity.ok(categoryService.getTags());
    }
}

