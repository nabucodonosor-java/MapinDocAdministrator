package com.mapin.docadmin.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.mapin.docadmin.dto.SocialAssistenceDto;

@Entity
@Table(name = "tb_social_assistence")
public class SocialAssistence implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String cellPhone;
	private String email;
	private String description;

	@ManyToOne
	@JoinColumn(name = "profession_id")
	private Profession profession;

	@ManyToOne
	@JoinColumn(name = "place_service_id")
	private PlaceService placeService;
	
	public SocialAssistence() {}

	public SocialAssistence(SocialAssistenceDto socialPro) {
		id = socialPro.getId();
		name = socialPro.getName();
		cellPhone = socialPro.getCellPhone();
		email = socialPro.getEmail();
		description = socialPro.getDescription();
		profession = new Profession(socialPro.getProfession());
		placeService = new PlaceService(socialPro.getPlaceService());
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Profession getProfession() {
		return profession;
	}

	public void setProfession(Profession profession) {
		this.profession = profession;
	}

	public PlaceService getPlaceService() {
		return placeService;
	}

	public void setPlaceService(PlaceService placeService) {
		this.placeService = placeService;
	}
	
	public String getCellPhone() {
		return cellPhone;
	}

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
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
		SocialAssistence other = (SocialAssistence) obj;
		return Objects.equals(id, other.id);
	}

}
