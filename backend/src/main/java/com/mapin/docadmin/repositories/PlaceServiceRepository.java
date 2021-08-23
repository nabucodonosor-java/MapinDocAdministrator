package com.mapin.docadmin.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.PlaceService;

@Repository
public interface PlaceServiceRepository extends JpaRepository<PlaceService, Long> {
	
	@Query("SELECT obj FROM PlaceService obj WHERE (LOWER(obj.street) LIKE LOWER(CONCAT('%',:street,'%'))) ")
	Page<PlaceService> findStreet(String street, Pageable pageable);
	
}
