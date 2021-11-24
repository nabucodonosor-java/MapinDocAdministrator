package com.mapin.docadmin.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.mapin.docadmin.entities.PlaceService;

public class PlaceServiceShortDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	private String name;
	private String phone;
	private String cellPhone;
	private String cep;
	private String logradouro;
	private String complemento;
	private String bairro;
	private String localidade;
	private String uf;
	private boolean clinic;
	private boolean hospital;
	private boolean medicalCenter;
	private boolean cir;
	private boolean cityHall;
	private boolean apae;
	private String description;
	
	
	public PlaceServiceShortDto() {}
	
	public PlaceServiceShortDto(PlaceService entity) {
		id = entity.getId();
		name = entity.getName();
		phone = entity.getPhone();
		cellPhone = entity.getCellPhone();
		cep = entity.getCep();
		logradouro = entity.getLogradouro();
		complemento = entity.getComplemento();
		bairro = entity.getBairro();
		localidade = entity.getLocalidade();
		uf = entity.getUf();
		clinic = entity.isClinic();
		hospital = entity.isHospital();
		medicalCenter = entity.isMedicalCenter();
		cir = entity.isCir();
		cityHall = entity.isCityHall();
		apae = entity.isApae();
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

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getLocalidade() {
		return localidade;
	}

	public void setLocalidade(String localidade) {
		this.localidade = localidade;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public boolean isClinic() {
		return clinic;
	}

	public void setClinic(boolean clinic) {
		this.clinic = clinic;
	}

	public boolean isHospital() {
		return hospital;
	}

	public void setHospital(boolean hospital) {
		this.hospital = hospital;
	}

	public boolean isMedicalCenter() {
		return medicalCenter;
	}

	public void setMedicalCenter(boolean medicalCenter) {
		this.medicalCenter = medicalCenter;
	}

	public boolean isCir() {
		return cir;
	}

	public void setCir(boolean cir) {
		this.cir = cir;
	}

	public boolean isCityHall() {
		return cityHall;
	}

	public void setCityHall(boolean cityHall) {
		this.cityHall = cityHall;
	}

	public boolean isApae() {
		return apae;
	}

	public void setApae(boolean apae) {
		this.apae = apae;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
