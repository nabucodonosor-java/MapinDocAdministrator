package com.mapin.docadmin.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mapin.docadmin.dto.SpecializationDto;
import com.mapin.docadmin.entities.Specialization;
import com.mapin.docadmin.repositories.SpecializationRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class SpecializationService {

	@Autowired
	private SpecializationRepository repository;

	@Transactional(readOnly = true)
	public Page<SpecializationDto> findAllPaged(PageRequest pageRequest) {
		Page<Specialization> page = repository.findAll(pageRequest);
		return SpecializationDto.converter(page);
	}

	@Transactional(readOnly = true)
	public SpecializationDto findById(Long id) {
		Optional<Specialization> optional = repository.findById(id);
		Specialization entity = optional
				.orElseThrow(() -> new ResourceNotFoundException("Especialização não encontrada!"));
		return new SpecializationDto(entity);
	}

	@Transactional
	public SpecializationDto insert(SpecializationDto dto) {
		Specialization entity = new Specialization();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new SpecializationDto(entity);
	}

	@Transactional
	public SpecializationDto update(Long id, SpecializationDto dto) {
		try {
			Specialization entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);
			return new SpecializationDto(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Especialização não encontrada!");
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Especialização não encontrada!");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade do DB");
		}
	}

}
