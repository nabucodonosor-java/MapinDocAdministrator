package com.mapin.docadmin.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.mapin.docadmin.entities.Product;

public class ProductDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	private String name;
	private Long weight;
	
	public ProductDto() {}

	public ProductDto(Product entity) {
		id = entity.getId();
		name = entity.getName();
		if (entity.getWeight() == null) {
			weight = 1L;
		} else {
		weight = entity.getWeight();
		}
	}
	
	public Long getWeight() {
		return weight;
	}

	public void setWeight(Long weight) {
		this.weight = weight;
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
