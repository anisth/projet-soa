package com.example.employe.repository;

import com.example.employe.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<user, Long> {
    // Ajouter la méthode pour chercher un utilisateur par son nom d'utilisateur
    Optional<user> findByUsername(String username);
}
