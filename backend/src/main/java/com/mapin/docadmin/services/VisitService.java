package com.mapin.docadmin.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mapin.docadmin.dto.VisitDto;
import com.mapin.docadmin.entities.Doctor;
import com.mapin.docadmin.entities.Visit;
import com.mapin.docadmin.repositories.VisitRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class VisitService {
	
	@Autowired
	private VisitRepository repository;
	
	@Transactional(readOnly = true)
	public Page<VisitDto> findAllPaged(Pageable pageable) {
		Page<Visit> page = repository.findAll(pageable);
		return VisitDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public VisitDto findById(Long id) {
		Optional<Visit> obj = repository.findById(id);
		Visit entity = obj.orElseThrow(() -> new ResourceNotFoundException("Visita não encontrada!"));
		return new VisitDto(entity);
	}
	
	@Transactional
	public VisitDto insert(VisitDto dto) {
		Visit entity = new Visit();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new VisitDto(entity);
	}
	
	@Transactional
	public VisitDto update(Long id, VisitDto dto) {
		
		try {
			
		Visit entity = repository.getOne(id);
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new VisitDto(entity);
		
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

	private void copyDtoToEntity(VisitDto dto, Visit entity) {
		
		entity.setVisitDate(dto.getVisitDate());
		entity.setDoctor(new Doctor(dto.getDoctor()));
		entity.setSuccess(dto.isSuccess());
		entity.setDescription(dto.getDescription());
	}

}
