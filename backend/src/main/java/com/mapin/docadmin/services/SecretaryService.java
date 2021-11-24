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

import com.mapin.docadmin.dto.SecretaryDto;
import com.mapin.docadmin.entities.PlaceService;
import com.mapin.docadmin.entities.Secretary;
import com.mapin.docadmin.repositories.SecretaryRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class SecretaryService {
	
	@Autowired
	private SecretaryRepository repository;
	
	@Transactional(readOnly = true)
	public Page<SecretaryDto> findAllPaged(String name, Pageable pageable) {
		Page<Secretary> page = repository.findAllPaged(name, pageable);
		return page.map(x -> new SecretaryDto(x));
	}
	
	@Transactional(readOnly = true)
	public SecretaryDto findById(Long id) {
		Optional<Secretary> optional = repository.findById(id);
		Secretary entity = optional.orElseThrow(() -> new ResourceNotFoundException("Secretária não encontrada!"));
		return new SecretaryDto(entity);
	}
	
	@Transactional
	public SecretaryDto insert(SecretaryDto dto) {
		Secretary entity = new Secretary();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new SecretaryDto(entity);
	}
	
	@Transactional
	public SecretaryDto update(Long id, SecretaryDto dto) {
		
		try {
			
		Secretary entity = repository.getOne(id);
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new SecretaryDto(entity);
		
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Secretária não enconrada!");
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

	private void copyDtoToEntity(SecretaryDto dto, Secretary entity) {
		
		entity.setName(dto.getName());
		entity.setBirthDate(dto.getBirthDate());
		entity.setDescription(dto.getDescription());
		entity.setPlaceService(new PlaceService(dto.getPlaceService()));
		
	}

}
