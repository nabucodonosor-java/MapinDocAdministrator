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

import com.mapin.docadmin.dto.OfficeHoursDto;
import com.mapin.docadmin.entities.OfficeHours;
import com.mapin.docadmin.entities.PlaceService;
import com.mapin.docadmin.repositories.OfficeHoursRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class OfficeHoursService {
	
	@Autowired
	private OfficeHoursRepository repository;
	
	@Transactional(readOnly = true)
	public Page<OfficeHoursDto> findAllPaged(PageRequest pageRequest) {
		Page<OfficeHours> page = repository.findAll(pageRequest);
		return OfficeHoursDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public Page<OfficeHoursDto> findAllMonday(PageRequest pageRequest) {
		Page<OfficeHours> page = repository.findMonday(pageRequest);
		return OfficeHoursDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public Page<OfficeHoursDto> findAllTuesday(PageRequest pageRequest) {
		Page<OfficeHours> page = repository.findTuesday(pageRequest);
		return OfficeHoursDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public Page<OfficeHoursDto> findAllWednesday(PageRequest pageRequest) {
		Page<OfficeHours> page = repository.findWednesday(pageRequest);
		return OfficeHoursDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public Page<OfficeHoursDto> findAllThursday(PageRequest pageRequest) {
		Page<OfficeHours> page = repository.findThursday(pageRequest);
		return OfficeHoursDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public Page<OfficeHoursDto> findAllFriday(PageRequest pageRequest) {
		Page<OfficeHours> page = repository.findFriday(pageRequest);
		return OfficeHoursDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public OfficeHoursDto findById(Long id) {
		Optional<OfficeHours> optional = repository.findById(id);
		OfficeHours entity = optional.orElseThrow(() -> new ResourceNotFoundException("Horário de atendimento não encontrado!"));
		return new OfficeHoursDto(entity);
	}
	
	@Transactional
	public OfficeHoursDto insert(OfficeHoursDto dto) {
		OfficeHours entity = new OfficeHours();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new OfficeHoursDto(entity);
	}
	
	@Transactional
	public OfficeHoursDto update(Long id, OfficeHoursDto dto) {
		
		try {
			
			OfficeHours entity = new OfficeHours();
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new OfficeHoursDto(entity);
			
		} catch (EntityNotFoundException e) {
			
			throw new ResourceNotFoundException("Horário de atendimento não encontrado!");
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Horário de atendimento não encontrado!");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação no DB");
		}
	}

	private void copyDtoToEntity(OfficeHoursDto dto, OfficeHours entity) {
		
		entity.setSeg(dto.isSeg());
		entity.setTer(dto.isTer());
		entity.setQua(dto.isQua());
		entity.setQui(dto.isQui());
		entity.setSex(dto.isSex());
		entity.setDescription(dto.getDescription());
		entity.setPlaceService(new PlaceService(dto.getPlaceService()));
		
	}

}
