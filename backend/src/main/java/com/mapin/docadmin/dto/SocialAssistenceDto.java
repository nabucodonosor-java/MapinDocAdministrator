package com.mapin.docadmin.dto;

import java.io.Serializable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.mapin.docadmin.entities.SocialAssistence;

public class SocialAssistenceDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	@NotBlank(message = "Campo obrigatório")
	private String name;
	private String cellPhone;
	@Email(message = "Digitar email válido!")
	private String email;
	private String description;
	
	private ProfessionDto profession;
	private PlaceServiceDto placeService;
	
	// private ProfessionShortDto profession;
	// private PlaceServiceShortDto placeService;
	
	public SocialAssistenceDto() {}
	
	public SocialAssistenceDto(SocialAssistence entity) {
		id = entity.getId();
		name = entity.getName();
		cellPhone = entity.getCellPhone();
		email = entity.getEmail();
		description = entity.getDescription();
		profession = new ProfessionDto(entity.getProfession());
		placeService = new PlaceServiceDto(entity.getPlaceService());
	}
	
	public String getCellPhone() {
		return cellPhone;
	}

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public ProfessionDto getProfession() {
		return profession;
	}

	public void setProfession(ProfessionDto profession) {
		this.profession = profession;
	}

	public PlaceServiceDto getPlaceService() {
		return placeService;
	}

	public void setPlaceService(PlaceServiceDto placeService) {
		this.placeService = placeService;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}
