package com.mapin.docadmin.repositories;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mapin.docadmin.entities.SocialVisit;

public interface SocialVisitRepository extends JpaRepository<SocialVisit, Long> {
	
	@Query("SELECT obj FROM SocialVisit obj WHERE obj.visitDate >= :first AND obj.visitDate <= :second AND "
			+ "(LOWER(obj.socialPro.profession.name) LIKE LOWER(CONCAT('%',:profession,'%'))) AND "
			+ "(LOWER(obj.socialPro.placeService.localidade) LIKE LOWER(CONCAT('%',:localidade,'%'))) AND "
			+ "(LOWER(obj.socialPro.name) LIKE LOWER(CONCAT('%',:name,'%')))")
	Page<SocialVisit> findByPeriodWithFilters(LocalDate first, LocalDate second, String profession, String localidade, String name, Pageable pageable);
	
	@Query("SELECT obj FROM SocialVisit obj WHERE "
			+ "(LOWER(obj.socialPro.profession.name) LIKE LOWER(CONCAT('%',:profession,'%'))) AND "
			+ "(LOWER(obj.socialPro.placeService.localidade) LIKE LOWER(CONCAT('%',:localidade,'%'))) AND "
			+ "(LOWER(obj.socialPro.name) LIKE LOWER(CONCAT('%',:name,'%')))")
	Page<SocialVisit> findAllWithFilters(String profession, String name, String localidade, Pageable pageable);
	
	@Query("SELECT obj FROM SocialVisit obj WHERE obj.visitDate >= :first AND obj.visitDate <= :second")
	Page<SocialVisit> findByPeriod(LocalDate first, LocalDate second, Pageable pageable);
	
}
