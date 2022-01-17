package com.mapin.docadmin.services;

import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.mapin.docadmin.dto.HealthProfessionalDto;
import com.mapin.docadmin.dto.SpecializationDto;
import com.mapin.docadmin.dto.UriDto;
import com.mapin.docadmin.entities.HealthProfessional;
import com.mapin.docadmin.entities.PlaceService;
import com.mapin.docadmin.entities.Profession;
import com.mapin.docadmin.entities.Specialization;
import com.mapin.docadmin.repositories.HealthProfessionalRepository;
import com.mapin.docadmin.repositories.PlaceServiceRepository;
import com.mapin.docadmin.repositories.ProfessionRepository;
import com.mapin.docadmin.repositories.SpecializationRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class HealthProfessionalService {
	
	 private static Logger logger = org.slf4j.LoggerFactory.getLogger(HealthProfessionalService.class);
	
	@Autowired
	private HealthProfessionalRepository repository;
	
	@Autowired
	private S3Service s3Service;
	
	@Autowired
	private SpecializationRepository specializationRepository;
	
	@Autowired
	private PlaceServiceRepository placeRepository;
	
	@Autowired
	private ProfessionRepository professionRepository;
	
	@Transactional(readOnly = true)
	public Page<HealthProfessionalDto> findAllPagedProStatus(Long specializationId, String profession, String localidade,
		Boolean partner, Boolean strategic, Boolean potencial, String name, Pageable pageable) {
		List<Specialization> specialization = (specializationId == 0) ? null : Arrays.asList(specializationRepository.getOne(specializationId));
		Page<HealthProfessional> page = repository.findAllPagedProStatus(specialization, profession, localidade, partner, strategic, potencial, name, pageable);
		repository.find(page.getContent());
		return page.map(x -> new HealthProfessionalDto(x, x.getSpecializations()));
	}
	
	@Transactional(readOnly = true)
	public Page<HealthProfessionalDto> findAllPaged(Long specializationId, String profession, String localidade,
			String name, Pageable pageable) {
		List<Specialization> specialization = (specializationId == 0) ? null : Arrays.asList(specializationRepository.getOne(specializationId));
		Page<HealthProfessional> page = repository.findAllPaged(specialization, profession, localidade, name, pageable);
		repository.find(page.getContent());
		return page.map(x -> new HealthProfessionalDto(x, x.getSpecializations()));
	}
	
	@Transactional(readOnly = true)
	public Page<HealthProfessionalDto> findAllProApaePaged(Long specializationId, String profession, String localidade, 
			String name, Pageable pageable) {
		List<Specialization> specialization = (specializationId == 0) ? null : Arrays.asList(specializationRepository.getOne(specializationId));
		Page<HealthProfessional> page = repository.findAllProApaePaged(specialization, profession, localidade, name, pageable);
		repository.find(page.getContent());
		return page.map(x -> new HealthProfessionalDto(x, x.getSpecializations()));
	}
	
	@Transactional(readOnly = true)
	public Page<HealthProfessionalDto> findAllByMonday(Long specializationId, String profession, String localidade, 
			String segPeriod, Pageable pageable) {
		List<Specialization> specialization = (specializationId == 0) ? null : Arrays.asList(specializationRepository.getOne(specializationId));
		Page<HealthProfessional> page = repository.findByMonday(specialization, profession, localidade, segPeriod, pageable);
		repository.find(page.getContent());
		return page.map(x -> new HealthProfessionalDto(x, x.getSpecializations()));
	}
	
	@Transactional(readOnly = true)
	public Page<HealthProfessionalDto> findAllByTuesday(Long specializationId, String profession, String localidade, 
			String terPeriod, Pageable pageable) {
		List<Specialization> specialization = (specializationId == 0) ? null : Arrays.asList(specializationRepository.getOne(specializationId));
		Page<HealthProfessional> page = repository.findByTuesday(specialization, profession, localidade, terPeriod, pageable);
		repository.find(page.getContent());
		return page.map(x -> new HealthProfessionalDto(x, x.getSpecializations()));
	}
	
	@Transactional(readOnly = true)
	public Page<HealthProfessionalDto> findAllByWednesday(Long specializationId, String profession, String localidade, 
			String quaPeriod, Pageable pageable) {
		List<Specialization> specialization = (specializationId == 0) ? null : Arrays.asList(specializationRepository.getOne(specializationId));
		Page<HealthProfessional> page = repository.findByWednesday(specialization, profession, localidade, quaPeriod, pageable);
		repository.find(page.getContent());
		return page.map(x -> new HealthProfessionalDto(x, x.getSpecializations()));
	}
	
	@Transactional(readOnly = true)
	public Page<HealthProfessionalDto> findAllByThursday(Long specializationId, String profession, String localidade, 
			String quiPeriod, Pageable pageable) {
		List<Specialization> specialization = (specializationId == 0) ? null : Arrays.asList(specializationRepository.getOne(specializationId));
		Page<HealthProfessional> page = repository.findByThursday(specialization, profession, localidade, quiPeriod, pageable);
		repository.find(page.getContent());
		return page.map(x -> new HealthProfessionalDto(x, x.getSpecializations()));
	}
	
	@Transactional(readOnly = true)
	public Page<HealthProfessionalDto> findAllByFriday(Long specializationId, String profession, String localidade, 
			String sexPeriod, Pageable pageable) {
		List<Specialization> specialization = (specializationId == 0) ? null : Arrays.asList(specializationRepository.getOne(specializationId));
		Page<HealthProfessional> page = repository.findByFriday(specialization, profession, localidade, sexPeriod, pageable);
		repository.find(page.getContent());
		return page.map(x -> new HealthProfessionalDto(x, x.getSpecializations()));
	}
	
	@Transactional(readOnly = true)
	public Page<HealthProfessionalDto> findAllBySaturday(Long specializationId, String profession, String localidade, 
			String sabPeriod, Pageable pageable) {
		List<Specialization> specialization = (specializationId == 0) ? null : Arrays.asList(specializationRepository.getOne(specializationId));
		Page<HealthProfessional> page = repository.findBySaturday(specialization, profession, localidade, sabPeriod, pageable);
		repository.find(page.getContent());
		return page.map(x -> new HealthProfessionalDto(x, x.getSpecializations()));
	}
	
	@Transactional(readOnly = true)
	public HealthProfessionalDto findById(Long id) {
		Optional<HealthProfessional> optional = repository.findById(id);
		HealthProfessional entity = optional.orElseThrow(() -> new ResourceNotFoundException("Profissional não encontrado!"));
		return new HealthProfessionalDto(entity, entity.getSpecializations());
	}
	
	@Transactional
	public HealthProfessionalDto insert(HealthProfessionalDto dto) {
		HealthProfessional entity = new HealthProfessional();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new HealthProfessionalDto(entity);
	}
	
	@Transactional
	public HealthProfessionalDto update(Long id, HealthProfessionalDto dto) {
		
		try {
			
		HealthProfessional entity = repository.getOne(id);
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new HealthProfessionalDto(entity);
		
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Profissional não enconrado!");
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Profissional não enconrado!");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação no DB");
		}
	}
	
	public UriDto uploadFile(MultipartFile file) {
		
		URL url = s3Service.uploadFile(file);
		
		return new UriDto(url.toString());
	}

	private void copyDtoToEntity(HealthProfessionalDto dto, HealthProfessional entity) {
		
		if (entity.getImgUrl() == null) {
			entity.setImgUrl("https://doc-admin-jacomo.s3.sa-east-1.amazonaws.com/padrao-M.png");
		} else {
			entity.setImgUrl(dto.getImgUrl());
		}
		
		entity.setRegister(dto.getRegister());
		entity.setName(dto.getName().toUpperCase());
		
		String cardName = dto.getName();

		String[] cardNameArray = cardName.split(" ");

		for (int i = 0; i < cardNameArray.length; i++) {
			cardName = cardNameArray[0] + " " + cardNameArray[cardNameArray.length - 1];
		}
		
		entity.setCardName(cardName);
		
		entity.setPhone(dto.getPhone());
		entity.setEmail(dto.getEmail());
		entity.setBirthDate(dto.getBirthDate());
		entity.setResume(dto.getResume());
		entity.setByScheduling(dto.isByScheduling());
		entity.setSeg(dto.isSeg());
		entity.setSegPeriod(dto.getSegPeriod());
		entity.setTer(dto.isTer());
		entity.setTerPeriod(dto.getTerPeriod());
		entity.setQua(dto.isQua());
		entity.setQuaPeriod(dto.getQuaPeriod());
		entity.setQui(dto.isQui());
		entity.setQuiPeriod(dto.getQuiPeriod());
		entity.setSex(dto.isSex());
		entity.setSexPeriod(dto.getSexPeriod());
		entity.setSab(dto.isSab());
		entity.setSabPeriod(dto.getSabPeriod());
		entity.setOfficeHours(dto.getOfficeHours());
		
		entity.setPartner(dto.isPartner());
		entity.setStrategic(dto.isStrategic());
		entity.setPotencial(dto.isPotencial());
		entity.setSchedulingDate(dto.getSchedulingDate());
		
		if (dto.getProfession() == null) {
			Profession s = professionRepository.getOne(1L);
			entity.setProfession(s);
		} else {
			entity.setProfession(new Profession(dto.getProfession()));
		}
		
		if (dto.getPlaceService() == null) {
			PlaceService ps = placeRepository.getOne(1L);
			entity.setPlaceService(ps);
		} else {
			entity.setPlaceService(new PlaceService(dto.getPlaceService()));
		}
		
		
		entity.getSpecializations().clear();
		
		for (SpecializationDto speDto : dto.getSpecializations()) {
			Specialization entitySpe = specializationRepository.getOne(speDto.getId());
			entity.getSpecializations().add(entitySpe);
		}
		
	}
	
}
