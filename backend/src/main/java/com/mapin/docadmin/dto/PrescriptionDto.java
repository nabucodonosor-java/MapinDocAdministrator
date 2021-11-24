package com.mapin.docadmin.dto;

import java.io.Serializable;
import java.time.LocalDate;

import org.springframework.data.domain.Page;

import com.mapin.docadmin.entities.Prescription;

public class PrescriptionDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private LocalDate prescriptionDate;
	private HealthProfessionalDto healthPro;
	private ProductDto product;
	private Integer qtde;
	
	public PrescriptionDto() {}
	
	public PrescriptionDto(Prescription entity) {
		id = entity.getId();
		prescriptionDate = entity.getPrescriptionDate();
		healthPro = new HealthProfessionalDto(entity.getHealthPro());
		product = new ProductDto(entity.getProduct());
		qtde = entity.getQtde();
	}
	
	public LocalDate getPrescriptionDate() {
		return prescriptionDate;
	}

	public void setPrescriptionDate(LocalDate prescriptionDate) {
		this.prescriptionDate = prescriptionDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public HealthProfessionalDto getHealthPro() {
		return healthPro;
	}

	public void setHealthPro(HealthProfessionalDto healthPro) {
		this.healthPro = healthPro;
	}

	public ProductDto getProduct() {
		return product;
	}

	public void setProduct(ProductDto product) {
		this.product = product;
	}

	public Integer getQtde() {
		return qtde;
	}

	public void setQtde(Integer qtde) {
		this.qtde = qtde;
	}

	public static Page<PrescriptionDto> converter(Page<Prescription> page) {
		return page.map(PrescriptionDto::new);
	}

}
