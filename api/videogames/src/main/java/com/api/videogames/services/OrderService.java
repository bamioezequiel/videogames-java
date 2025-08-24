package com.api.videogames.services;

import com.api.videogames.models.Game;
import com.api.videogames.models.Order;
import com.api.videogames.repositories.GameRepository;
import com.api.videogames.repositories.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final GameRepository gameRepository;

    public OrderService(OrderRepository orderRepository, GameRepository gameRepository) {
        this.orderRepository = orderRepository;
        this.gameRepository = gameRepository;
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Optional<Order> findById(String id) {
        return orderRepository.findById(id);
    }

    public List<Order> findByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order changeOrderStatus(String id, String newStatus) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        List<String> validStatuses = List.of("PENDING", "PAID", "CANCELLED");
        if (!validStatuses.contains(newStatus.toUpperCase())) {
            throw new IllegalArgumentException("Estado inválido: " + newStatus);
        }

        order.setStatus(newStatus.toUpperCase());
        return orderRepository.save(order);
    }

    public Order save(Order order) {
        // Crear los items con nombre y precio actuales
        List<Order.OrderItem> items = order.getGameIds().stream()
                .map(gameId -> {
                    var game = gameRepository.findById(gameId).orElse(null);
                    if (game != null) {
                        return Order.OrderItem.builder()
                                .gameId(game.getId())
                                .name(game.getName())
                                .price(game.getPriceWithSale() > 0 ? game.getPriceWithSale() : game.getPrice())
                                .quantity(1)
                                .build();
                    }
                    return null;
                })
                .filter(item -> item != null)
                .toList();

        double total = items.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();

        order.setItems(items);          // Guardamos los detalles completos
        order.setTotal(total);          // Guardamos el total
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus(order.getStatus() != null ? order.getStatus() : "PENDING");

        return orderRepository.save(order);
    }


    public void delete(String id) {
        orderRepository.deleteById(id);
    }
}
