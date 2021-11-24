package com.mapin.docadmin.dto;

import java.io.Serializable;
import java.time.LocalDate;

import javax.validation.constraints.NotBlank;

import com.mapin.docadmin.entities.Secretary;

public class SecretaryDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	private String name;
	private LocalDate birthDate;
	private String description;
	private PlaceServiceDto placeService;
	
	public SecretaryDto() {}
	
	public SecretaryDto(Secretary entity) {
		id = entity.getId();
		name = entity.getName();
		birthDate = entity.getBirthDate();
		description = entity.getDescription();
		placeService = new PlaceServiceDto(entity.getPlaceService());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public PlaceServiceDto getPlaceService() {
		return placeService;
	}

	public void setPlaceService(PlaceServiceDto placeService) {
		this.placeService = placeService;
	}
	
}
