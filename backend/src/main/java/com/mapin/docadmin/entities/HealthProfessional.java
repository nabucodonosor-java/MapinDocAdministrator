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

import com.mapin.docadmin.dto.HealthProfessionalDto;

@Entity
@Table(name = "tb_health_professional")
public class HealthProfessional implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(columnDefinition = "TEXT")
	private String imgUrl;
	
	@Column(unique = true)
	private String register;
	
	@Column(unique = true)
	private String name;
	private String cardName;
	private String phone;
	private String email;
	private LocalDate birthDate;
	
	@Column(columnDefinition = "TEXT")
	private String resume;
	
	private boolean byScheduling;
	private boolean seg;
	private String segPeriod;
	private boolean ter;
	private String terPeriod;
	private boolean qua;
	private String quaPeriod;
	private boolean qui;
	private String quiPeriod;
	private boolean sex;
	private String sexPeriod;
	private boolean sab;
	private String sabPeriod;
	
	@Column(columnDefinition = "TEXT")
	private String officeHours;
	
	private boolean partner;
	
	private LocalDate schedulingDate;
	
	private Integer countOrto;
	
	@ManyToMany
	@JoinTable(name = "tb_professional_specialization", joinColumns = @JoinColumn(name = "professional_id"), 
	inverseJoinColumns = @JoinColumn(name = "specialization_id"))
	private Set<Specialization> specializations = new HashSet<>();
	
	@ManyToOne
	@JoinColumn(name = "profession_id")
	private Profession profession;
	
	@ManyToOne
	@JoinColumn(name = "place_service_id")
	private PlaceService placeService;
	
	public HealthProfessional() {}

	public HealthProfessional(HealthProfessionalDto dto) {
		id = dto.getId();
		imgUrl = dto.getImgUrl();
		register = dto.getRegister();
		name = dto.getName();
		cardName = dto.getCardName();
		
		String[] cardNameArray = name.split(" ");

		for (int i = 0; i < cardNameArray.length; i++) {
			cardName = cardNameArray[0] + " " + cardNameArray[cardNameArray.length - 1];
		}
		
		phone = dto.getPhone();
		email = dto.getEmail();
		birthDate = dto.getBirthDate();
		resume = dto.getResume();
		seg = dto.isSeg();
		segPeriod = dto.getSegPeriod();
		ter = dto.isTer();
		terPeriod = dto.getTerPeriod();
		qua = dto.isQua();
		quaPeriod = dto.getQuaPeriod();
		qui = dto.isQui();
		quiPeriod = dto.getQuiPeriod();
		sex = dto.isSex();
		sexPeriod = dto.getSexPeriod();
		sab = dto.isSab();
		sabPeriod = dto.getSabPeriod();
		officeHours = dto.getOfficeHours();
		partner = dto.isPartner();
		schedulingDate = dto.getSchedulingDate();
		profession = new Profession(dto.getProfession());
		if (profession.getName().equalsIgnoreCase("ortopedista")) {
			countOrto = 1;
		} else {
			countOrto = 0;
		}
		placeService = new PlaceService(dto.getPlaceService());
	}
	
	public HealthProfessional(HealthProfessionalDto dto, Set<Specialization> specializations) {
		this(dto);
		specializations.forEach(s -> this.specializations.add(s));
	}
	
	public Integer getCountOrto() {
		return countOrto;
	}

	public void setCountOrto(Integer countOrto) {
		this.countOrto = countOrto;
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

	public String getRegister() {
		return register;
	}

	public void setRegister(String register) {
		this.register = register;
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

	public String getSegPeriod() {
		return segPeriod;
	}

	public void setSegPeriod(String segPeriod) {
		this.segPeriod = segPeriod;
	}

	public boolean isTer() {
		return ter;
	}

	public void setTer(boolean ter) {
		this.ter = ter;
	}

	public String getTerPeriod() {
		return terPeriod;
	}

	public void setTerPeriod(String terPeriod) {
		this.terPeriod = terPeriod;
	}

	public boolean isQua() {
		return qua;
	}

	public void setQua(boolean qua) {
		this.qua = qua;
	}

	public String getQuaPeriod() {
		return quaPeriod;
	}

	public void setQuaPeriod(String quaPeriod) {
		this.quaPeriod = quaPeriod;
	}

	public boolean isQui() {
		return qui;
	}

	public void setQui(boolean qui) {
		this.qui = qui;
	}

	public String getQuiPeriod() {
		return quiPeriod;
	}

	public void setQuiPeriod(String quiPeriod) {
		this.quiPeriod = quiPeriod;
	}

	public boolean isSex() {
		return sex;
	}

	public void setSex(boolean sex) {
		this.sex = sex;
	}

	public String getSexPeriod() {
		return sexPeriod;
	}

	public void setSexPeriod(String sexPeriod) {
		this.sexPeriod = sexPeriod;
	}
	
	public boolean isSab() {
		return sab;
	}

	public void setSab(boolean sab) {
		this.sab = sab;
	}

	public String getSabPeriod() {
		return sabPeriod;
	}

	public void setSabPeriod(String sabPeriod) {
		this.sabPeriod = sabPeriod;
	}

	public String getOfficeHours() {
		return officeHours;
	}

	public void setOfficeHours(String officeHours) {
		this.officeHours = officeHours;
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

	public Set<Specialization> getSpecializations() {
		return specializations;
	}
	
	public boolean isPartner() {
		return partner;
	}

	public void setPartner(boolean partner) {
		this.partner = partner;
	}
	
	public LocalDate getSchedulingDate() {
		return schedulingDate;
	}

	public void setSchedulingDate(LocalDate schedulingDate) {
		this.schedulingDate = schedulingDate;
	}

	public boolean isByScheduling() {
		return byScheduling;
	}

	public void setByScheduling(boolean byScheduling) {
		this.byScheduling = byScheduling;
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
		HealthProfessional other = (HealthProfessional) obj;
		return Objects.equals(id, other.id);
	}

}
