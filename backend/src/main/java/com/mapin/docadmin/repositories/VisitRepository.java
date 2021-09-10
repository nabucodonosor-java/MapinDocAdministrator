package com.mapin.docadmin.repositories;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.Visit;

@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {
	
	@Query("SELECT obj FROM Visit obj WHERE obj.visitDate >= :first AND obj.visitDate <= :second")
	Page<Visit> findByPeriod(LocalDate first, LocalDate second, Pageable pageable);
	
}
