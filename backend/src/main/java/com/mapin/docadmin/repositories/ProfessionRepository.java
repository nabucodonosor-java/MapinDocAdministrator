package com.mapin.docadmin.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mapin.docadmin.entities.Profession;

public interface ProfessionRepository extends JpaRepository<Profession, Long> {
	
	@Query("SELECT DISTINCT obj FROM Profession obj WHERE "
			+ "(LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%')))")
	Page<Profession> findAllPaged(String name, Pageable pageable);

}
