package com.mapin.docadmin.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import org.springframework.data.domain.Page;

import com.mapin.docadmin.entities.Specialty;

public class SpecialtyDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	@NotBlank(message = "Campo obrigatório")
	private String name;

	public SpecialtyDto() {
	}

	public SpecialtyDto(Specialty entity) {
		id = entity.getId();
		name = entity.getName();
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

	public static Page<SpecialtyDto> converter(Page<Specialty> page) {
		return page.map(SpecialtyDto::new);
	}

}
