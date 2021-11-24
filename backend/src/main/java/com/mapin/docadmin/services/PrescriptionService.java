package com.mapin.docadmin.services;

import java.time.LocalDate;
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

import com.mapin.docadmin.dto.PrescriptionDto;
import com.mapin.docadmin.dto.PrescriptionTotalDto;
import com.mapin.docadmin.entities.HealthProfessional;
import com.mapin.docadmin.entities.Prescription;
import com.mapin.docadmin.entities.Product;
import com.mapin.docadmin.repositories.PrescriptionRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class PrescriptionService {
	
	@Autowired
	private PrescriptionRepository repository;
	
	@Transactional(readOnly = true)
	public List<PrescriptionTotalDto> totalPrescriptionGroupedByProfessional() {
		return repository.totalPrescriptionGroupedByProfessional();
	}
	
	@Transactional(readOnly = true)
	public List<PrescriptionTotalDto> prescriptionByProductGroupedByProfessional() {
		return repository.prescriptionByWeightGroupedByProfessional();
	}
	
	@Transactional(readOnly = true)
	public Page<PrescriptionDto> findAllWithFilters(String profession, String name, String productName, Pageable pageable) {
		Page<Prescription> page = repository.findAllWithFilters(profession, name, productName, pageable);
		return PrescriptionDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public Page<PrescriptionDto> findAllByPeriod(LocalDate first, LocalDate second, String profession, String name, String productName, Pageable pageable) {
		Page<Prescription> page = repository.findByPeriodWithFilters(first, second, profession, name, productName, pageable);
		return PrescriptionDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public PrescriptionDto findById(Long id) {
		Optional<Prescription> obj = repository.findById(id);
		Prescription entity = obj.orElseThrow(() -> new ResourceNotFoundException("Prescrição não encontrada!"));
		return new PrescriptionDto(entity);
	}
	
	@Transactional
	public PrescriptionDto insert(PrescriptionDto dto) {
		Prescription entity = new Prescription();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new PrescriptionDto(entity);
	}
	

	@Transactional
	public PrescriptionDto update(Long id, PrescriptionDto dto) {
		
		try {
			
		Prescription entity = repository.getOne(id);
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new PrescriptionDto(entity);
		
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Prescrição não encontrada!");
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Prescrição não enconrada!");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação no DB");
		}
	}
	
	
	private void copyDtoToEntity(PrescriptionDto dto, Prescription entity) {
		
		entity.setHealthPro(new HealthProfessional(dto.getHealthPro()));
		entity.setPrescriptionDate(dto.getPrescriptionDate());
		entity.setQtde(dto.getQtde());
		entity.setProduct(new Product(dto.getProduct()));
		
	}

}
