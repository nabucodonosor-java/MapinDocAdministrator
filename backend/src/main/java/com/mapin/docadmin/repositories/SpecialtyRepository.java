package com.mapin.docadmin.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.Specialty;

@Repository
public interface SpecialtyRepository extends JpaRepository<Specialty, Long> {
	
	@Query("SELECT obj FROM Specialty obj WHERE (LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%'))) ")
	Page<Specialty> find(String name, Pageable pageable);
	
}
