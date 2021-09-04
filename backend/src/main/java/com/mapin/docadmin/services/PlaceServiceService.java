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

import com.mapin.docadmin.dto.PlaceServiceDto;
import com.mapin.docadmin.entities.PlaceService;
import com.mapin.docadmin.repositories.PlaceServiceRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class PlaceServiceService {
	
	@Autowired
	private PlaceServiceRepository repository;
	
	@Transactional(readOnly = true)
	public Page<PlaceServiceDto> findAllPaged(PageRequest pageRequest) {
		Page<PlaceService> page = repository.findAll(pageRequest);
		return PlaceServiceDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public PlaceServiceDto findById(Long id) {
		Optional<PlaceService> optional = repository.findById(id);
		PlaceService entity = optional.orElseThrow(() -> new ResourceNotFoundException("Local não encontrado!"));
		return new PlaceServiceDto(entity);
	}
	
	@Transactional
	public PlaceServiceDto insert(PlaceServiceDto dto) {
		PlaceService entity = new PlaceService();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new PlaceServiceDto(entity);
	}
	
	@Transactional
	public PlaceServiceDto update(Long id, PlaceServiceDto dto) {
		
		try {
			
			PlaceService entity = new PlaceService();
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new PlaceServiceDto(entity);
			
		} catch (EntityNotFoundException e) {
			
			throw new ResourceNotFoundException("Local não encontrado!");
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Local não encontrado!");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação no DB");
		}
	}

	private void copyDtoToEntity(PlaceServiceDto dto, PlaceService entity) {
		
		entity.setName(dto.getName());
		entity.setCep(dto.getCep());
		entity.setStreet(dto.getStreet());
		entity.setComplement(dto.getComplement());
		entity.setDistrict(dto.getDistrict());
		entity.setCity(dto.getCity());
		entity.setState(dto.getState());
		
	}

}
