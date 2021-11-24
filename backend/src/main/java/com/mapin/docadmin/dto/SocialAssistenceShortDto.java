package com.mapin.docadmin.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.mapin.docadmin.entities.SocialAssistence;

public class SocialAssistenceShortDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	@NotBlank(message = "Campo obrigatório")
	private String name;
	
	private ProfessionDto profession;
	
	public SocialAssistenceShortDto() {}
	
	public SocialAssistenceShortDto(SocialAssistence entity) {
		id = entity.getId();
		name = entity.getName();
		profession = new ProfessionDto(entity.getProfession());
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

}
