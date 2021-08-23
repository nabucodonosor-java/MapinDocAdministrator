package com.mapin.docadmin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.PlaceService;

@Repository
public interface PlaceServiceRepository extends JpaRepository<PlaceService, Long> {
	
}
