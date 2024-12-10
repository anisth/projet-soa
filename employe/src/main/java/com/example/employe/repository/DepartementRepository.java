package com.example.employe.repository;

import com.example.employe.entity.Departement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartementRepository extends JpaRepository<Departement, Long> {
    // Méthodes personnalisées si nécessaire
}
