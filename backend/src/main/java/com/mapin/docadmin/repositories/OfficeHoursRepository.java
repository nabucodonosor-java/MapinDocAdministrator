package com.mapin.docadmin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.OfficeHours;

@Repository
public interface OfficeHoursRepository extends JpaRepository<OfficeHours, Long> {
	
}
