package com.mapin.docadmin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.Specialty;

@Repository
public interface SpecialtyRepository extends JpaRepository<Specialty, Long> {
	
}
