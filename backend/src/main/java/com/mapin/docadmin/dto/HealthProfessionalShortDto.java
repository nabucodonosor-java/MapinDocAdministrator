package com.mapin.docadmin.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.mapin.docadmin.entities.HealthProfessional;

public class HealthProfessionalShortDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String imgUrl;
	@NotBlank(message = "Campo obrigatório")
	private String register;
	@NotBlank(message = "Campo obrigatório")
	private String name;
	private ProfessionShortDto profession;
	
	public HealthProfessionalShortDto() {}

	public HealthProfessionalShortDto(HealthProfessional entity) {
		id = entity.getId();
		imgUrl = entity.getImgUrl();
		register = entity.getRegister();
		name = entity.getName();
		profession = new ProfessionShortDto(entity.getProfession());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getRegister() {
		return register;
	}

	public void setRegister(String register) {
		this.register = register;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ProfessionShortDto getProfession() {
		return profession;
	}

	public void setProfession(ProfessionShortDto profession) {
		this.profession = profession;
	}

}
