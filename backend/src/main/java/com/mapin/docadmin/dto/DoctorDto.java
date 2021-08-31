package com.mapin.docadmin.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.mapin.docadmin.entities.Doctor;
import com.mapin.docadmin.entities.Specialization;

public class DoctorDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	private String imgUrl;

	private String crm;

	@NotBlank(message = "Campo obrigatório")
	private String name;

	private String cardName;

	private String phone;

	@Email(message = "Digitar email válido!")
	private String email;

	private LocalDate birthDate;

	private String resume;

	private List<SpecializationDto> specializations = new ArrayList<>();

	private SpecialtyDto specialty;
	
	private OfficeHoursDto officeHours;

	public DoctorDto() {
	}

	public DoctorDto(Doctor entity) {
		id = entity.getId();
		imgUrl = entity.getImgUrl();
		crm = entity.getCrm();
		name = entity.getName();
		cardName = entity.getName();
		phone = entity.getPhone();
		email = entity.getEmail();
		birthDate = entity.getBirthDate();
		resume = entity.getResume();
		specialty = new SpecialtyDto(entity.getSpecialty());
		officeHours = new OfficeHoursDto(entity.getOfficeHours());
	}

	public DoctorDto(Doctor entity, Set<Specialization> specializations) {
		this(entity);
		specializations.forEach(specialization -> this.specializations.add(new SpecializationDto(specialization)));
	}
	
	public OfficeHoursDto getOfficeHours() {
		return officeHours;
	}

	public void setOfficeHours(OfficeHoursDto officeHours) {
		this.officeHours = officeHours;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getCrm() {
		return crm;
	}

	public void setCrm(String crm) {
		this.crm = crm;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCardName() {
		return cardName;
	}

	public void setCardName(String cardName) {
		this.cardName = cardName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

	public SpecialtyDto getSpecialty() {
		return specialty;
	}

	public void setSpecialty(SpecialtyDto specialty) {
		this.specialty = specialty;
	}

	public List<SpecializationDto> getSpecializations() {
		return specializations;
	}

}
