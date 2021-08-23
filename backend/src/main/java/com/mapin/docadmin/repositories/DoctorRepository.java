package com.mapin.docadmin.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.Doctor;
import com.mapin.docadmin.entities.Specialization;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
	
	@Query("SELECT DISTINCT obj FROM Doctor obj INNER JOIN obj.specializations esp WHERE "
			+ "(COALESCE(:specializations) IS NULL OR esp IN :specializations) AND "
			+ "(LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%'))) ")
	Page<Doctor> find(List<Specialization> specializations, String name, Pageable pageable);
	
	@Query("SELECT obj FROM Doctor obj JOIN FETCH obj.specializations WHERE obj IN :doctors")
	List<Doctor> find(List<Doctor> doctors);
	
}
