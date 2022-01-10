package com.mapin.docadmin.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.mapin.docadmin.entities.HealthProfessional;
import com.mapin.docadmin.entities.Specialization;

public class HealthProfessionalDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String imgUrl;
	@NotBlank(message = "Campo obrigatório")
	private String register;
	@NotBlank(message = "Campo obrigatório")
	private String name;
	private String cardName;
	private String phone;
	@Email(message = "Digitar email válido!")
	private String email;
	private LocalDate birthDate;
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
	private String officeHours;
	private boolean partner;
	private boolean strategic;
	private boolean potencial;
	private LocalDate schedulingDate;
	private ProfessionDto profession;
	private PlaceServiceShortDto placeService;
	
	private List<SpecializationDto> specializations = new ArrayList<>();
	
	public HealthProfessionalDto() {}

	public HealthProfessionalDto(HealthProfessional entity) {
		id = entity.getId();
		imgUrl = entity.getImgUrl();
		register = entity.getRegister();
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
		byScheduling = entity.isByScheduling();
		
		seg = entity.isSeg();
		
		if (entity.isSeg() == false) {
			segPeriod = "N/A";
		} else {
			segPeriod = entity.getSegPeriod();
		}
		
		ter = entity.isTer();
		
		if (entity.isTer() == false) {
			terPeriod = "N/A";
		} else {
			terPeriod = entity.getTerPeriod();
		}
		
		qua = entity.isQua();
		
		if (entity.isQua() == false) {
			quaPeriod = "N/A";
		} else {
			quaPeriod = entity.getQuaPeriod();
		}
		
		qui = entity.isQui();
		
		if (entity.isQui() == false) {
			quiPeriod = "N/A";
		} else {
			quiPeriod = entity.getQuiPeriod();
		}
		
		sex = entity.isSex();
		
		if (entity.isSex() == false) {
			sexPeriod = "N/A";
		} else {
			sexPeriod = entity.getSexPeriod();
		}
		
		sab = entity.isSab();
		
		if (entity.isSab() == false) {
			sabPeriod = "N/A";
		} else {
			sabPeriod = entity.getSabPeriod();
		}
		
		officeHours = entity.getOfficeHours();
		partner = entity.isPartner();
		strategic = entity.isStrategic();
		potencial = entity.isPotencial();
		schedulingDate = entity.getSchedulingDate();
		
		profession = new ProfessionDto(entity.getProfession());
		placeService = new PlaceServiceShortDto(entity.getPlaceService());
		
	}
	
	public HealthProfessionalDto(HealthProfessional entity, Set<Specialization> specializations) {
		this(entity);
		specializations.forEach(s -> this.specializations.add(new SpecializationDto(s)));
	}
	
	public boolean isStrategic() {
		return strategic;
	}

	public void setStrategic(boolean strategic) {
		this.strategic = strategic;
	}

	public boolean isPotencial() {
		return potencial;
	}

	public void setPotencial(boolean potencial) {
		this.potencial = potencial;
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

	public boolean isByScheduling() {
		return byScheduling;
	}

	public void setByScheduling(boolean byScheduling) {
		this.byScheduling = byScheduling;
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

	public ProfessionDto getProfession() {
		return profession;
	}

	public void setProfession(ProfessionDto profession) {
		this.profession = profession;
	}

	public PlaceServiceShortDto getPlaceService() {
		return placeService;
	}

	public void setPlaceService(PlaceServiceShortDto placeService) {
		this.placeService = placeService;
	}

	public List<SpecializationDto> getSpecializations() {
		return specializations;
	}

}
