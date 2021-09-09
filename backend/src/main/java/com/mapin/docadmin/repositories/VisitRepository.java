package com.mapin.docadmin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.Visit;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {
	
	
	
}
