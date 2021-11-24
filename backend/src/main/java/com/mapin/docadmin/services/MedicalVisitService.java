package com.mapin.docadmin.services;


import java.time.LocalDate;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mapin.docadmin.dto.MedicalVisitDto;
import com.mapin.docadmin.entities.HealthProfessional;
import com.mapin.docadmin.entities.MedicalVisit;
import com.mapin.docadmin.repositories.MedicalVisitRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class MedicalVisitService {
	
	@Autowired
	private MedicalVisitRepository repository;
	
	@Transactional(readOnly = true)
	public Page<MedicalVisitDto> findAllWithFilters(String profession, String name, String localidade, Pageable pageable) {
		Page<MedicalVisit> page = repository.findAllWithFilters(profession, name, localidade, pageable);
		return MedicalVisitDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public Page<MedicalVisitDto> findAllByPeriod(LocalDate first, LocalDate second, String profession, String localidade, String name, Pageable pageable) {
		
		Page<MedicalVisit> page = repository.findByPeriodWithFilters(first, second, profession, localidade, name, pageable);
		
		return MedicalVisitDto.converter(page);
		
	}
	
	@Transactional(readOnly = true)
	public MedicalVisitDto findById(Long id) {
		Optional<MedicalVisit> obj = repository.findById(id);
		MedicalVisit entity = obj.orElseThrow(() -> new ResourceNotFoundException("Visita não encontrada!"));
		return new MedicalVisitDto(entity);
	}
	
	@Transactional
	public MedicalVisitDto insert(MedicalVisitDto dto) {
		MedicalVisit entity = new MedicalVisit();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new MedicalVisitDto(entity);
	}
	
	@Transactional
	public MedicalVisitDto update(Long id, MedicalVisitDto dto) {
		
		try {
			
		MedicalVisit entity = repository.getOne(id);
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new MedicalVisitDto(entity);
		
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Visita não encontrada!");
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Visita não enconrada!");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação no DB");
		}
	}

	private void copyDtoToEntity(MedicalVisitDto dto, MedicalVisit entity) {
		
		entity.setVisitDate(dto.getVisitDate());
		entity.setHealthPro(new HealthProfessional(dto.getHealthPro()));
		entity.setSuccess(dto.isSuccess());
		entity.setDescription(dto.getDescription());
	}
}