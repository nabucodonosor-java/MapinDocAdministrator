package com.mapin.docadmin.dto;

import java.io.Serializable;
import java.time.LocalDate;

import org.springframework.data.domain.Page;

import com.mapin.docadmin.entities.SocialVisit;

public class SocialVisitDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;

	private LocalDate visitDate;

	private SocialAssistenceDto socialPro;

	private boolean success;

	private String description;

	public SocialVisitDto() {
	}

	public SocialVisitDto(SocialVisit entity) {
		id = entity.getId();
		visitDate = entity.getVisitDate();
		socialPro = new SocialAssistenceDto(entity.getSocialPro());
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

	public SocialAssistenceDto getSocialPro() {
		return socialPro;
	}

	public void setSocialPro(SocialAssistenceDto socialPro) {
		this.socialPro = socialPro;
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

	public static Page<SocialVisitDto> converter(Page<SocialVisit> page) {
		return page.map(SocialVisitDto::new);
	}
}
