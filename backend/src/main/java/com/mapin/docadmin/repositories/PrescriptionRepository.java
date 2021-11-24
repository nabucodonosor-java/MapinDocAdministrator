package com.mapin.docadmin.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mapin.docadmin.dto.PrescriptionTotalDto;
import com.mapin.docadmin.entities.Prescription;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
	
	@Query("SELECT new com.mapin.docadmin.dto.PrescriptionTotalDto(obj.healthPro, SUM(obj.qtde)) "
			+ " FROM Prescription AS obj GROUP BY obj.healthPro")
	List<PrescriptionTotalDto> totalPrescriptionGroupedByProfessional();
	
	@Query("SELECT new com.mapin.docadmin.dto.PrescriptionTotalDto(obj.healthPro, SUM(obj.qtde) * obj.product.weight) "
			+ " FROM Prescription AS obj GROUP BY obj.healthPro, obj.product.weight")
	List<PrescriptionTotalDto> prescriptionByWeightGroupedByProfessional();
	
	@Query("SELECT obj FROM Prescription obj WHERE "
			+ "(LOWER(obj.healthPro.profession.name) LIKE LOWER(CONCAT('%',:profession,'%'))) AND "
			+ "(LOWER(obj.healthPro.name) LIKE LOWER(CONCAT('%',:name,'%'))) AND "
			+ "(LOWER(obj.product.name) LIKE LOWER(CONCAT('%',:productName,'%')))")
	Page<Prescription> findAllWithFilters(String profession, String name, String productName, Pageable pageable);
	
	@Query("SELECT obj FROM Prescription obj WHERE obj.prescriptionDate >= :first AND obj.prescriptionDate <= :second AND "
			+ "(LOWER(obj.healthPro.profession.name) LIKE LOWER(CONCAT('%',:profession,'%'))) AND "
			+ "(LOWER(obj.healthPro.name) LIKE LOWER(CONCAT('%',:name,'%'))) AND "
			+ "(LOWER(obj.product.name) LIKE LOWER(CONCAT('%',:productName,'%')))")
	Page<Prescription> findByPeriodWithFilters(LocalDate first, LocalDate second, String profession, String name, String productName, Pageable pageable);
	 
}
