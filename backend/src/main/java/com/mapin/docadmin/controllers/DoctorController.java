package com.mapin.docadmin.controllers;

import java.net.URI;

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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mapin.docadmin.dto.DoctorDto;
import com.mapin.docadmin.dto.UriDto;
import com.mapin.docadmin.services.DoctorService;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

	@Autowired
	private DoctorService service;	

	@GetMapping
	public ResponseEntity<Page<DoctorDto>> findAll(
			@RequestParam(value = "specializationId", defaultValue = "0") Long specializationId,
			@RequestParam(value = "name", defaultValue = "") String name,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "1000") Integer size,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "sort", defaultValue = "name") String sort) {
				
		PageRequest pageRequest = PageRequest.of(page, size, Direction.valueOf(direction), sort);
		Page<DoctorDto> list = service.findAllPaged(specializationId, name.trim(), pageRequest);
		
		return ResponseEntity.ok().body(list);

	}
	
	@GetMapping("/byMonday")
	public ResponseEntity<Page<DoctorDto>> findAllDoctorMonday(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "1000") Integer size,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "sort", defaultValue = "name") String sort) {
				
		PageRequest pageRequest = PageRequest.of(page, size, Direction.valueOf(direction), sort);
		Page<DoctorDto> list = service.findAllDoctorMonday(pageRequest);
		
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/byTuesday")
	public ResponseEntity<Page<DoctorDto>> findAllDoctorTuesday(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "1000") Integer size,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "sort", defaultValue = "name") String sort) {
				
		PageRequest pageRequest = PageRequest.of(page, size, Direction.valueOf(direction), sort);
		Page<DoctorDto> list = service.findAllDoctorTuesday(pageRequest);
		
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/byWednesday")
	public ResponseEntity<Page<DoctorDto>> findAllDoctorWednesday(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "1000") Integer size,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "sort", defaultValue = "name") String sort) {
				
		PageRequest pageRequest = PageRequest.of(page, size, Direction.valueOf(direction), sort);
		Page<DoctorDto> list = service.findAllDoctorWednesday(pageRequest);
		
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/byThursday")
	public ResponseEntity<Page<DoctorDto>> findAllDoctorThursday(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "1000") Integer size,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "sort", defaultValue = "name") String sort) {
				
		PageRequest pageRequest = PageRequest.of(page, size, Direction.valueOf(direction), sort);
		Page<DoctorDto> list = service.findAllDoctorThursday(pageRequest);
		
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/byFriday")
	public ResponseEntity<Page<DoctorDto>> findAllDoctorFriday(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "size", defaultValue = "1000") Integer size,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "sort", defaultValue = "name") String sort) {
				
		PageRequest pageRequest = PageRequest.of(page, size, Direction.valueOf(direction), sort);
		Page<DoctorDto> list = service.findAllDoctorFriday(pageRequest);
		
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<DoctorDto> findById(@PathVariable Long id) {
		DoctorDto entity = service.findById(id);
		return ResponseEntity.ok().body(entity);
	}
	
	@PostMapping
	public ResponseEntity<DoctorDto> insert(@Valid @RequestBody DoctorDto dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PostMapping("/image")
	public ResponseEntity<UriDto> uploadFile(@RequestParam("file") MultipartFile file) {
		UriDto dto = service.uploadFile(file);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<DoctorDto> update(@PathVariable Long id, @Valid @RequestBody DoctorDto dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
