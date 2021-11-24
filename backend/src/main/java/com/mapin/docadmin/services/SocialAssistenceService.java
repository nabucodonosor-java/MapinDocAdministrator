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

import com.mapin.docadmin.dto.SocialAssistenceDto;
import com.mapin.docadmin.entities.PlaceService;
import com.mapin.docadmin.entities.Profession;
import com.mapin.docadmin.entities.SocialAssistence;
import com.mapin.docadmin.repositories.SocialAssistenceRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class SocialAssistenceService {
	
	@Autowired
	private SocialAssistenceRepository repository;
	
	@Transactional(readOnly = true)
	public Page<SocialAssistenceDto> findAllPaged(String profession, String localidade, String name, Pageable pageable) {
		Page<SocialAssistence> page = repository.findAllPaged(profession, localidade, name, pageable);
		return page.map(x -> new SocialAssistenceDto(x));
	}
	
	@Transactional(readOnly = true)
	public SocialAssistenceDto findById(Long id) {
		Optional<SocialAssistence> optional = repository.findById(id);
		SocialAssistence entity = optional.orElseThrow(() -> new ResourceNotFoundException("Profissional não encontrado!"));
		return new SocialAssistenceDto(entity);
	}
	
	@Transactional
	public SocialAssistenceDto insert(SocialAssistenceDto dto) {
		SocialAssistence entity = new SocialAssistence();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new SocialAssistenceDto(entity);
	}
	
	@Transactional
	public SocialAssistenceDto update(Long id, SocialAssistenceDto dto) {
		
		try {
			
		SocialAssistence entity = repository.getOne(id);
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new SocialAssistenceDto(entity);
		
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

	private void copyDtoToEntity(SocialAssistenceDto dto, SocialAssistence entity) {
		
		entity.setName(dto.getName());
		entity.setCellPhone(dto.getCellPhone());
		entity.setEmail(dto.getEmail());
		entity.setDescription(dto.getDescription());
		
		entity.setProfession(new Profession(dto.getProfession()));
		entity.setPlaceService(new PlaceService(dto.getPlaceService()));
		
	}

}
