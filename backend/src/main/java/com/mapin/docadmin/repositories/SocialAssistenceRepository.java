package com.mapin.docadmin.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mapin.docadmin.entities.SocialAssistence;

public interface SocialAssistenceRepository extends JpaRepository<SocialAssistence, Long> {
	
	@Query("SELECT DISTINCT obj FROM SocialAssistence obj WHERE "
			+ "(LOWER(obj.profession.name) LIKE LOWER(CONCAT('%',:profession,'%'))) AND "
			+ "(LOWER(obj.placeService.localidade) LIKE LOWER(CONCAT('%',:localidade,'%'))) AND "
			+ "(LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%')))")
	Page<SocialAssistence> findAllPaged(String profession, String localidade, 
			String name, Pageable pageable);

}
