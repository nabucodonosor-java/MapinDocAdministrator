package com.mapin.docadmin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.Specialization;

@Repository
public interface SpecializationRepository extends JpaRepository<Specialization, Long> {
	
}
