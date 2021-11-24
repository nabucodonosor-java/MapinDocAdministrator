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

import com.mapin.docadmin.dto.ProductDto;
import com.mapin.docadmin.entities.Product;
import com.mapin.docadmin.repositories.ProductRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	@Transactional(readOnly = true)
	public Page<ProductDto> findAllPaged(String name, Pageable pageable) {
		Page<Product> page = repository.findAllPaged(name, pageable);
		return page.map(x -> new ProductDto(x));
	}
	
	@Transactional(readOnly = true)
	public ProductDto findById(Long id) {
		Optional<Product> optional = repository.findById(id);
		Product entity = optional.orElseThrow(() -> new ResourceNotFoundException("Receita não encontrada!"));
		return new ProductDto(entity);
	}
	
	@Transactional
	public ProductDto insert(ProductDto dto) {
		Product entity = new Product();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new ProductDto(entity);
	}
	
	@Transactional
	public ProductDto update(Long id, ProductDto dto) {
		
		try {
			
		Product entity = repository.getOne(id);
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new ProductDto(entity);
		
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Receita não encontrada!");
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Receita não encontrada!");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação no DB");
		}
	}

	private void copyDtoToEntity(ProductDto dto, Product entity) {
		
		entity.setName(dto.getName());
		entity.setWeight(dto.getWeight());
	}

}
