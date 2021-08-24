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

import com.mapin.docadmin.dto.SpecialtyDto;
import com.mapin.docadmin.entities.Specialty;
import com.mapin.docadmin.repositories.SpecialtyRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class SpecialtyService {
	
	@Autowired
	private SpecialtyRepository repository;
	
	@Transactional(readOnly = true)
	public Page<SpecialtyDto> findAllPaged(PageRequest pageRequest) {
		Page<Specialty> page = repository.findAll(pageRequest);
		return SpecialtyDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public SpecialtyDto findById(Long id) {
		Optional<Specialty> optional = repository.findById(id);
		Specialty entity = optional.orElseThrow(() -> new ResourceNotFoundException("Especialidade não encontrada!"));
		return new SpecialtyDto(entity);
	}
	
	@Transactional
	public SpecialtyDto insert(SpecialtyDto dto) {
		Specialty entity = new Specialty();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new SpecialtyDto(entity);
	}
	
	@Transactional
	public SpecialtyDto update(Long id, SpecialtyDto dto) {
		try {
			Specialty entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);
			return new SpecialtyDto(entity);
			
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Especialidade não encontrada!");
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Especialidade não encontrada!");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade do DB");
		}
	}
}
