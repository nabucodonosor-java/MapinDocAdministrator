package com.mapin.docadmin.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotBlank;

import com.mapin.docadmin.entities.HealthProfessional;
import com.mapin.docadmin.entities.Specialization;

public class SpecializationDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	@NotBlank(message = "Campo obrigatório")
	private String name;
	
	private List<HealthProfessionalDto> healthPro = new ArrayList<>();

	public SpecializationDto() {
	}

	public SpecializationDto(Specialization entity) {
		id = entity.getId();
		name = entity.getName();
	}
	
	public SpecializationDto(Specialization entity, Set<HealthProfessional> healthPro) {
		this(entity);
		healthPro.forEach(s -> this.healthPro.add(new HealthProfessionalDto(s)));
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

}
