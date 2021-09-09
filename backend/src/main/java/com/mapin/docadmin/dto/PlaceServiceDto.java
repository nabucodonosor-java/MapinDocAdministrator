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
	private String logradouro;
	private String complemento;
	private String bairro;
	private String localidade;
	private String uf;

	public PlaceServiceDto() {
	}

	public PlaceServiceDto(PlaceService entity) {
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

	public static Page<PlaceServiceDto> converter(Page<PlaceService> page) {
		return page.map(PlaceServiceDto::new);
	}

}
