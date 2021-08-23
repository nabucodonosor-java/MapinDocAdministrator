package com.mapin.docadmin.dto;

import java.io.Serializable;

import com.mapin.docadmin.entities.OfficeHours;

public class OfficeHoursDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private boolean seg;
	private boolean ter;
	private boolean qua;
	private boolean qui;
	private boolean sex;
	private String description;

	private PlaceServiceDto placeService;

	public OfficeHoursDto() {
	}

	public OfficeHoursDto(OfficeHours entity) {
		id = entity.getId();
		seg = entity.isSeg();
		ter = entity.isTer();
		qua = entity.isQua();
		qui = entity.isQui();
		sex = entity.isSex();
		description = entity.getDescription();
		placeService = new PlaceServiceDto(entity.getPlaceService());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isSeg() {
		return seg;
	}

	public void setSeg(boolean seg) {
		this.seg = seg;
	}

	public boolean isTer() {
		return ter;
	}

	public void setTer(boolean ter) {
		this.ter = ter;
	}

	public boolean isQua() {
		return qua;
	}

	public void setQua(boolean qua) {
		this.qua = qua;
	}

	public boolean isQui() {
		return qui;
	}

	public void setQui(boolean qui) {
		this.qui = qui;
	}

	public boolean isSex() {
		return sex;
	}

	public void setSex(boolean sex) {
		this.sex = sex;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public PlaceServiceDto getPlaceService() {
		return placeService;
	}

	public void setPlaceService(PlaceServiceDto placeService) {
		this.placeService = placeService;
	}

}
