package com.example.pizza_orderbackend.model;

public class Ingredient {
    private String name;
    private String image;

    // Constructors
    public Ingredient() {}

    public Ingredient(String name, String image) {
        this.name = name;
        this.image = image;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
