package com.mapin.docadmin.dto;

import java.io.Serializable;

import org.springframework.data.domain.Page;

import com.mapin.docadmin.entities.PlaceService;

public class PlaceServiceDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	private String phone;
	private String cellPhone;
	private String cep;
	private String street;
	private String complement;
	private String district;
	private String city;
	private String state;

	public PlaceServiceDto() {
	}

	public PlaceServiceDto(PlaceService entity) {
		id = entity.getId();
		name = entity.getName();
		phone = entity.getPhone();
		cellPhone = entity.getCellPhone();
		cep = entity.getCep();
		street = entity.getStreet();
		complement = entity.getComplement();
		district = entity.getDistrict();
		city = entity.getCity();
		state = entity.getState();
	}
	
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCellPhone() {
		return cellPhone;
	}

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
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

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getComplement() {
		return complement;
	}

	public void setComplement(String complement) {
		this.complement = complement;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public static Page<PlaceServiceDto> converter(Page<PlaceService> page) {
		return page.map(PlaceServiceDto::new);
	}

}
