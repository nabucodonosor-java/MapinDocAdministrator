package com.mapin.docadmin.repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.PlaceService;

@Repository
public interface PlaceServiceRepository extends JpaRepository<PlaceService, Long> {
	
	@Query("SELECT DISTINCT obj FROM PlaceService obj WHERE (LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%'))) ")
	Page<PlaceService> find(String name, Pageable pageable);
	
	
}
