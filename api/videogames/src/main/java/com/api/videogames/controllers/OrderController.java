package com.api.videogames.controllers;

import com.api.videogames.models.Order;
import com.api.videogames.services.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        return orderService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable String userId) {
        return ResponseEntity.ok(orderService.findByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.save(order));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Order> changeStatus(
            @PathVariable String id,
            @RequestParam String status) {
        Order updatedOrder = orderService.changeOrderStatus(id, status);
        return ResponseEntity.ok(updatedOrder);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        orderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
