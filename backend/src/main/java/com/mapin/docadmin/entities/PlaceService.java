package com.mapin.docadmin.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.mapin.docadmin.dto.PlaceServiceDto;
import com.mapin.docadmin.dto.PlaceServiceShortDto;

@Entity
@Table(name = "tb_place_service")
public class PlaceService implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true)
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
	
	@Column(columnDefinition = "TEXT")
	private String description;

	@OneToMany(mappedBy = "placeService")
	private List<HealthProfessional> healthPro = new ArrayList<>();

	@OneToMany(mappedBy = "placeService")
	private List<SocialAssistence> socialPro = new ArrayList<>();

	@OneToMany(mappedBy = "placeService")
	private List<Secretary> secretaries = new ArrayList<>();
	
	public PlaceService() {}
	
	public PlaceService(Long id, String name, String phone, String cellPhone, String cep, String logradouro,
			String complemento, String bairro, String localidade, String uf, boolean clinic, boolean hospital,
			boolean medicalCenter, boolean cir, boolean cityHall,
			boolean apae, String description) {
		this.id = id;
		this.name = name;
		this.phone = phone;
		this.cellPhone = cellPhone;
		this.cep = cep;
		this.logradouro = logradouro;
		this.complemento = complemento;
		this.bairro = bairro;
		this.localidade = localidade;
		this.uf = uf;
		this.clinic = clinic;
		this.hospital = hospital;
		this.medicalCenter = medicalCenter;
		this.cir = cir;
		this.cityHall = cityHall;
		this.apae = apae;
		this.description = description;
	}

	public PlaceService(PlaceServiceShortDto dto) {
		id = dto.getId();
		name = dto.getName();
		phone = dto.getPhone();
		cellPhone = dto.getCellPhone();
		cep = dto.getCep();
		logradouro = dto.getLogradouro();
		complemento = dto.getComplemento();
		bairro = dto.getBairro();
		localidade = dto.getLocalidade();
		uf = dto.getUf();
		clinic = dto.isClinic();
		hospital = dto.isHospital();
		medicalCenter = dto.isMedicalCenter();
		cir = dto.isCir();
		cityHall = dto.isCityHall();
		apae = dto.isApae();
		description = dto.getDescription();
	}
	
	public PlaceService(PlaceServiceDto dto) {
		id = dto.getId();
		name = dto.getName();
		phone = dto.getPhone();
		cellPhone = dto.getCellPhone();
		cep = dto.getCep();
		logradouro = dto.getLogradouro();
		complemento = dto.getComplemento();
		bairro = dto.getBairro();
		localidade = dto.getLocalidade();
		uf = dto.getUf();
		clinic = dto.isClinic();
		hospital = dto.isHospital();
		medicalCenter = dto.isMedicalCenter();
		cir = dto.isCir();
		cityHall = dto.isCityHall();
		apae = dto.isApae();
		description = dto.getDescription();
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

	public List<HealthProfessional> getHealthPro() {
		return healthPro;
	}

	public List<SocialAssistence> getSocialPro() {
		return socialPro;
	}
	
	public List<Secretary> getSecretaries() {
		return secretaries;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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
