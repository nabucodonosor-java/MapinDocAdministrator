package com.mapin.docadmin.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mapin.docadmin.entities.Secretary;

public interface SecretaryRepository extends JpaRepository<Secretary, Long> {
	
	@Query("SELECT DISTINCT obj FROM Secretary obj WHERE "
			+ "(LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%')))")
	Page<Secretary> findAllPaged(String name, Pageable pageable);

}
