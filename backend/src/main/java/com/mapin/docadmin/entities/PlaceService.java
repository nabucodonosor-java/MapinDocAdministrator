package com.mapin.docadmin.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.mapin.docadmin.dto.PlaceServiceDto;

@Entity
@Table(name = "tb_place_service")
public class PlaceService implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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

	@OneToMany(mappedBy = "placeService")
	private List<Doctor> doctors = new ArrayList<>();

	public PlaceService() {
	}

	public PlaceService(PlaceServiceDto dto) {
		id = dto.getId();
		name = dto.getName();
		phone = dto.getPhone();
		cellPhone = dto.getCellPhone();
		cep = dto.getCep();
		street = dto.getStreet();
		complement = dto.getComplement();
		district = dto.getDistrict();
		city = dto.getCity();
		state = dto.getState();
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

	public List<Doctor> getDoctors() {
		return doctors;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PlaceService other = (PlaceService) obj;
		return Objects.equals(id, other.id);
	}

}
