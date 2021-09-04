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

	private boolean seg;
	private boolean ter;
	private boolean qua;
	private boolean qui;
	private boolean sex;

	private String officeHours;

	private List<SpecializationDto> specializations = new ArrayList<>();

	private SpecialtyDto specialty;

	private PlaceServiceDto placeService;

	public DoctorDto() {
	}

	public DoctorDto(Doctor entity) {
		id = entity.getId();
		imgUrl = entity.getImgUrl();
		crm = entity.getCrm();
		name = entity.getName();
		cardName = entity.getName();

		String[] cardNameArray = name.split(" ");

		for (int i = 0; i < cardNameArray.length; i++) {
			cardName = cardNameArray[0] + " " + cardNameArray[cardNameArray.length - 1];
		}

		phone = entity.getPhone();
		email = entity.getEmail();
		birthDate = entity.getBirthDate();
		resume = entity.getResume();
		seg = entity.isSeg();
		ter = entity.isTer();
		qua = entity.isQua();
		qui = entity.isQui();
		sex = entity.isSex();
		officeHours = entity.getOfficeHours();
		specialty = new SpecialtyDto(entity.getSpecialty());
		placeService = new PlaceServiceDto(entity.getPlaceService());
	}

	public DoctorDto(Doctor entity, Set<Specialization> specializations) {
		this(entity);
		specializations.forEach(specialization -> this.specializations.add(new SpecializationDto(specialization)));
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

	public String getOfficeHours() {
		return officeHours;
	}

	public void setOfficeHours(String officeHours) {
		this.officeHours = officeHours;
	}

	public SpecialtyDto getSpecialty() {
		return specialty;
	}

	public void setSpecialty(SpecialtyDto specialty) {
		this.specialty = specialty;
	}

	public PlaceServiceDto getPlaceService() {
		return placeService;
	}

	public void setPlaceService(PlaceServiceDto placeService) {
		this.placeService = placeService;
	}

	public List<SpecializationDto> getSpecializations() {
		return specializations;
	}

}
