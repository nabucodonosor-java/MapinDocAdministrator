package com.mapin.docadmin.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.OfficeHours;

@Repository
public interface OfficeHoursRepository extends JpaRepository<OfficeHours, Long> {
	
	@Query("SELECT obj FROM OfficeHours obj WHERE obj.seg = true ")
	Page<OfficeHours> findMonday(Pageable pageable);
	
	@Query("SELECT obj FROM OfficeHours obj WHERE obj.ter = true ")
	Page<OfficeHours> findTuesday(Pageable pageable);
	
	@Query("SELECT obj FROM OfficeHours obj WHERE obj.qua = true ")
	Page<OfficeHours> findWednesday(Pageable pageable);
	
	@Query("SELECT obj FROM OfficeHours obj WHERE obj.qui = true ")
	Page<OfficeHours> findThursday(Pageable pageable);
	
	@Query("SELECT obj FROM OfficeHours obj WHERE obj.sex = true ")
	Page<OfficeHours> findFriday(Pageable pageable);
	
}
