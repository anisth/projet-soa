package com.example.employe.repository;

import com.example.employe.entity.Employe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeRepository extends JpaRepository<Employe, Long> {
    // Méthodes personnalisées si nécessaire
}
