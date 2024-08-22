package com.example.pizza_orderbackend.model;

import java.util.List;

public class Pizza {
    private List<String> ingredients;
    private double price;

    // Constructors
    public Pizza() {}

    public Pizza(List<String> ingredients, double price) {
        this.ingredients = ingredients;
        this.price = price;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    // Getters and Setters
    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }
}
