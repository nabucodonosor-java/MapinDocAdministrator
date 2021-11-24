package com.mapin.docadmin.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mapin.docadmin.entities.Specialization;

public interface SpecializationRepository extends JpaRepository<Specialization, Long> {
	
	@Query("SELECT DISTINCT obj FROM Specialization obj WHERE "
			+ "(LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%')))")
	Page<Specialization> findAllPaged(String name, Pageable pageable);

}
