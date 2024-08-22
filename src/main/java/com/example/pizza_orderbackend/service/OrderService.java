package com.example.pizza_orderbackend.service;

import com.example.pizza_orderbackend.model.Order;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class OrderService {
    private final Map<String, Order> orders = new HashMap<>();

    public String saveOrder(Order order) {
        String code = UUID.randomUUID().toString();
        order.setCode(code);
        orders.put(code, order);
        return code;
    }

    public Order getOrder(String code) {
        return orders.get(code);
    }
}
