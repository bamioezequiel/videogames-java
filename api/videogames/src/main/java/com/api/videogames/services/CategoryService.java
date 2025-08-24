package com.api.videogames.services;

import com.api.videogames.config.CategoriesData;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {

    public List<String> getPlatforms() {
        return CategoriesData.PLATFORMS;
    }

    public List<String> getGenres() {
        return CategoriesData.GENRES;
    }

    public List<String> getTags() {
        return CategoriesData.TAGS;
    }
}
