package com.mapin.docadmin.services;

import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.mapin.docadmin.dto.DoctorDto;
import com.mapin.docadmin.dto.SpecializationDto;
import com.mapin.docadmin.dto.UriDto;
import com.mapin.docadmin.entities.Doctor;
import com.mapin.docadmin.entities.PlaceService;
import com.mapin.docadmin.entities.Specialization;
import com.mapin.docadmin.entities.Specialty;
import com.mapin.docadmin.repositories.DoctorRepository;
import com.mapin.docadmin.repositories.PlaceServiceRepository;
import com.mapin.docadmin.repositories.SpecializationRepository;
import com.mapin.docadmin.repositories.SpecialtyRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class DoctorService {
	
	@Autowired
	private DoctorRepository repository;
	
	@Autowired
	private S3Service s3Service;
	
	@Autowired
	private SpecializationRepository specializationRepository;
	
	@Autowired
	private PlaceServiceRepository placeRepository;
	
	@Autowired
	private SpecialtyRepository specialtyRepository;
	
	@Transactional(readOnly = true)
	public Page<DoctorDto> findAllPaged(Long specializationId, String name, Pageable pageable) {
		List<Specialization> specialization = (specializationId == 0) ? null : Arrays.asList(specializationRepository.getOne(specializationId));
		Page<Doctor> page = repository.find(specialization, name, pageable);
		repository.findDoctorsWithSpecializations(page.getContent());
		return page.map(x -> new DoctorDto(x, x.getSpecializations()));
	}
	
	@Transactional(readOnly = true)
	public DoctorDto findById(Long id) {
		Optional<Doctor> obj = repository.findById(id);
		Doctor entity = obj.orElseThrow(() -> new ResourceNotFoundException("Médico não encontrado!"));
		return new DoctorDto(entity, entity.getSpecializations());
	}
	
	@Transactional
	public DoctorDto insert(DoctorDto dto) {
		Doctor entity = new Doctor();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new DoctorDto(entity);
	}
	
	@Transactional
	public DoctorDto update(Long id, DoctorDto dto) {
		
		try {
			
		Doctor entity = new Doctor();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new DoctorDto(entity);
		
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Médico não enconrado!");
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Médico não enconrado!");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação no DB");
		}
	}
	
	public UriDto uploadFile(MultipartFile file) {
		
		URL url = s3Service.uploadFile(file);
		
		return new UriDto(url.toString());
	}

	private void copyDtoToEntity(DoctorDto dto, Doctor entity) {
		
		entity.setImgUrl(dto.getImgUrl());
		entity.setCrm(dto.getCrm());
		entity.setName(dto.getName());
		entity.setCardName(dto.getCardName());
		entity.setPhone(dto.getPhone());
		entity.setEmail(dto.getEmail());
		entity.setBirthDate(dto.getBirthDate());
		entity.setResume(dto.getResume());
		entity.setSeg(dto.isSeg());
		entity.setTer(dto.isTer());
		entity.setQua(dto.isQua());
		entity.setQui(dto.isQui());
		entity.setSex(dto.isSex());
		entity.setOfficeHours(dto.getOfficeHours());
		
		if (dto.getSpecialty() == null) {
			Specialty s = specialtyRepository.getOne(1L);
			entity.setSpecialty(s);
		} else {
			entity.setSpecialty(new Specialty(dto.getSpecialty()));
		}
		
		if (dto.getPlaceServices() == null) {
			PlaceService ps = placeRepository.getOne(1L);
			entity.setPlaceServices(ps);
		} else {
			entity.setPlaceServices(new PlaceService(dto.getPlaceServices()));
		}
		
		entity.getSpecializations().clear();
		
		for (SpecializationDto speDto : dto.getSpecializations()) {
			Specialization entitySpe = specializationRepository.getOne(speDto.getId());
			entity.getSpecializations().add(entitySpe);
		}
		
	}

}
