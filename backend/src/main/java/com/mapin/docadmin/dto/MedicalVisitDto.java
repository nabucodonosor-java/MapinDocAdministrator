package com.mapin.docadmin.dto;

import java.io.Serializable;
import java.time.LocalDate;

import org.springframework.data.domain.Page;

import com.mapin.docadmin.entities.MedicalVisit;

public class MedicalVisitDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;

	private LocalDate visitDate;

	private HealthProfessionalDto healthPro;

	private boolean success;

	private String description;

	public MedicalVisitDto() {
	}

	public MedicalVisitDto(MedicalVisit entity) {
		id = entity.getId();
		visitDate = entity.getVisitDate();
		healthPro = new HealthProfessionalDto(entity.getHealthPro());
		success = entity.isSuccess();
		description = entity.getDescription();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getVisitDate() {
		return visitDate;
	}

	public void setVisitDate(LocalDate visitDate) {
		this.visitDate = visitDate;
	}

	public HealthProfessionalDto getHealthPro() {
		return healthPro;
	}

	public void setHealthPro(HealthProfessionalDto healthPro) {
		this.healthPro = healthPro;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public static Page<MedicalVisitDto> converter(Page<MedicalVisit> page) {
		return page.map(MedicalVisitDto::new);
	}
}
