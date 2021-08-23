package com.mapin.docadmin.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.Specialization;

@Repository
public interface SpecializationRepository extends JpaRepository<Specialization, Long> {
	
	@Query("SELECT obj FROM Specialization obj WHERE (LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%'))) ")
	Page<Specialization> find(String name, Pageable pageable);
	
}
