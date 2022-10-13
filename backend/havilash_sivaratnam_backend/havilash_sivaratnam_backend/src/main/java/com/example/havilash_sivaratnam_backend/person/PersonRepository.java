package com.example.havilash_sivaratnam_backend.person;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Integer> {
    Person findByUsername(String username);
}