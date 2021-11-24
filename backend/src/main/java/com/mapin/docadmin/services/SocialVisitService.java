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

import com.mapin.docadmin.dto.SocialVisitDto;
import com.mapin.docadmin.entities.SocialAssistence;
import com.mapin.docadmin.entities.SocialVisit;
import com.mapin.docadmin.repositories.SocialVisitRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class SocialVisitService {
	
	@Autowired
	private SocialVisitRepository repository;
	
	@Transactional(readOnly = true)
	public Page<SocialVisitDto> findAllWithFilters(String profession, String name, String localidade, Pageable pageable) {
		Page<SocialVisit> page = repository.findAllWithFilters(profession, name, localidade, pageable);
		return SocialVisitDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public Page<SocialVisitDto> findAllByPeriod(LocalDate first, LocalDate second, Pageable pageable) {
		
		Page<SocialVisit> page = repository.findByPeriod(first, second, pageable);
		
		return SocialVisitDto.converter(page);
		
	}
	
	@Transactional(readOnly = true)
	public SocialVisitDto findById(Long id) {
		Optional<SocialVisit> obj = repository.findById(id);
		SocialVisit entity = obj.orElseThrow(() -> new ResourceNotFoundException("Visita não encontrada!"));
		return new SocialVisitDto(entity);
	}
	
	@Transactional
	public SocialVisitDto insert(SocialVisitDto dto) {
		SocialVisit entity = new SocialVisit();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new SocialVisitDto(entity);
	}
	
	@Transactional
	public SocialVisitDto update(Long id, SocialVisitDto dto) {
		
		try {
			
		SocialVisit entity = repository.getOne(id);
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new SocialVisitDto(entity);
		
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

	private void copyDtoToEntity(SocialVisitDto dto, SocialVisit entity) {
		
		entity.setVisitDate(dto.getVisitDate());
		entity.setSocialPro(new SocialAssistence(dto.getSocialPro()));
		entity.setSuccess(dto.isSuccess());
		entity.setDescription(dto.getDescription());
	}
}