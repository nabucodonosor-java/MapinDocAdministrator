package com.mapin.docadmin.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.mapin.docadmin.entities.Secretary;

public class SecretaryShortDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	private String name;
	
	public SecretaryShortDto() {}
	
	public SecretaryShortDto(Secretary entity) {
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

}
