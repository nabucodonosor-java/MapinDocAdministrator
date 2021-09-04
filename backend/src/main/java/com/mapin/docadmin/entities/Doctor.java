package com.mapin.docadmin.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tb_doctor")
public class Doctor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(columnDefinition = "TEXT")
	private String imgUrl;

	@Column(unique = true)
	private String crm;

	@Column(unique = true)
	private String name;

	private String cardName;

	private String phone;

	private String email;

	private LocalDate birthDate;

	@Column(columnDefinition = "TEXT")
	private String resume;
	
	private boolean seg;
	private boolean ter;
	private boolean qua;
	private boolean qui;
	private boolean sex;

	@Column(columnDefinition = "TEXT")
	private String officeHours;

	@ManyToMany
	@JoinTable(name = "tb_doctor_specialization", joinColumns = @JoinColumn(name = "doctor_id"), inverseJoinColumns = @JoinColumn(name = "specialization_id"))
	private Set<Specialization> specializations = new HashSet<>();

	@ManyToOne
	@JoinColumn(name = "specialty_id")
	private Specialty specialty;
	
	@ManyToOne
	@JoinColumn(name = "place_service_id")
	private PlaceService placeServices;
	
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

	public Specialty getSpecialty() {
		return specialty;
	}

	public void setSpecialty(Specialty specialty) {
		this.specialty = specialty;
	}

	public PlaceService getPlaceServices() {
		return placeServices;
	}

	public void setPlaceServices(PlaceService placeServices) {
		this.placeServices = placeServices;
	}

	public Set<Specialization> getSpecializations() {
		return specializations;
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
		Doctor other = (Doctor) obj;
		return Objects.equals(id, other.id);
	}

}
