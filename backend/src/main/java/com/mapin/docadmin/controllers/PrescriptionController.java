package com.mapin.docadmin.controllers;

import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mapin.docadmin.dto.PrescriptionDto;
import com.mapin.docadmin.dto.PrescriptionTotalDto;
import com.mapin.docadmin.services.PrescriptionService;

@RestController
@RequestMapping("/prescriptions")
public class PrescriptionController {
	
	@Autowired
	private PrescriptionService service;	
	
	@GetMapping
	public ResponseEntity<Page<PrescriptionDto>> findAll(
			@RequestParam(value = "profession", defaultValue = "") String profession,
			@RequestParam(value = "name", defaultValue = "") String name,
			@RequestParam(value = "productName", defaultValue = "") String productName,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "1000") Integer size,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction,
			@RequestParam(value = "sort", defaultValue = "visitDate") String sort) {
				
		PageRequest pageRequest = PageRequest.of(page, size, Direction.valueOf(direction), sort);
		Page<PrescriptionDto> list = service.findAllWithFilters(profession, name, productName, pageRequest);
		
		return ResponseEntity.ok().body(list);

	}
	
	@GetMapping("/byPeriod")
	public ResponseEntity<Page<PrescriptionDto>> findAllByPeriod(	
			@RequestParam(value = "profession", defaultValue = "") String profession,
			@RequestParam(value = "name", defaultValue = "") String name,
			@RequestParam(value = "productName", defaultValue = "") String productName,
			@RequestParam(value = "first", defaultValue = "") String first,
			@RequestParam(value = "second", defaultValue = "") String second,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "1000") Integer size,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction,
			@RequestParam(value = "sort", defaultValue = "visitDate") String sort) {
		
		LocalDate ld1 = LocalDate.parse(first, DateTimeFormatter.ofPattern("yyyy-MM-dd"));	
		LocalDate ld2 = LocalDate.parse(second, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		
		PageRequest pageRequest = PageRequest.of(page, size, Direction.valueOf(direction), sort);
		Page<PrescriptionDto> list = service.findAllByPeriod(ld1, ld2, profession.trim(), name.trim(), productName.trim(), pageRequest);
		
		return ResponseEntity.ok().body(list);

	}
	
	@GetMapping("/totalByProfessional")
	public ResponseEntity<List<PrescriptionTotalDto>> totalServicoGroupedByFuncionario() {
		List<PrescriptionTotalDto> list = service.totalPrescriptionGroupedByProfessional();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/averageByProductPro")
	public ResponseEntity<List<PrescriptionTotalDto>> prescriptionByProductGroupedByProfessional() {
		List<PrescriptionTotalDto> list = service.prescriptionByProductGroupedByProfessional();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<PrescriptionDto> findById(@PathVariable Long id) {
		PrescriptionDto entity = service.findById(id);
		return ResponseEntity.ok().body(entity);
	}
	
	@PostMapping
	public ResponseEntity<PrescriptionDto> insert(@Valid @RequestBody PrescriptionDto dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<PrescriptionDto> update(@PathVariable Long id, @Valid @RequestBody PrescriptionDto dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}