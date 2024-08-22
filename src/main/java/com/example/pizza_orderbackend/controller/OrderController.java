package com.example.pizza_orderbackend.controller;

import com.example.pizza_orderbackend.model.Order;
import com.example.pizza_orderbackend.service.OrderService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders")
    public String placeOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }

    @GetMapping("/orders/{code}")
    public Order getOrder(@PathVariable String code) {
        return orderService.getOrder(code);
    }
}
