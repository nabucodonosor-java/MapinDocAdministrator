package com.mapin.docadmin.dto;

import java.io.Serializable;
import java.time.LocalDate;

import org.springframework.data.domain.Page;

import com.mapin.docadmin.entities.Visit;

public class VisitDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	private LocalDate visitDate;

	private DoctorDto doctor;

	private boolean success;

	private String description;

	public VisitDto() {
	}

	public VisitDto(Visit entity) {
		id = entity.getId();
		visitDate = entity.getVisitDate();
		doctor = new DoctorDto(entity.getDoctor());
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

	public DoctorDto getDoctor() {
		return doctor;
	}

	public void setDoctor(DoctorDto doctor) {
		this.doctor = doctor;
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

	public static Page<VisitDto> converter(Page<Visit> page) {
		return page.map(VisitDto::new);
	}

}
