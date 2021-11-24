package com.mapin.docadmin.dto;

import com.mapin.docadmin.entities.HealthProfessional;

public class PrescriptionTotalDto {

	private String healthPro;
	private Long totalServicos;

	public PrescriptionTotalDto() {
	}

	public PrescriptionTotalDto(HealthProfessional helthPro, Long totalServicos) {
		healthPro = helthPro.getName();
		this.totalServicos = totalServicos;
	}

	public String getHealthPro() {
		return healthPro;
	}

	public void setHealthPro(String healthPro) {
		this.healthPro = healthPro;
	}

	public Long getTotalServicos() {
		return totalServicos;
	}

	public void setTotalServicos(Long totalServicos) {
		this.totalServicos = totalServicos;
	}

}

