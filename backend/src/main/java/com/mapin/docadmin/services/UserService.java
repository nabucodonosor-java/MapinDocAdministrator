package com.mapin.docadmin.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mapin.docadmin.dto.UserDto;
import com.mapin.docadmin.dto.UserInsertDto;
import com.mapin.docadmin.dto.UserUpdateDto;
import com.mapin.docadmin.entities.Role;
import com.mapin.docadmin.entities.User;
import com.mapin.docadmin.repositories.UserRepository;
import com.mapin.docadmin.services.exception.DatabaseException;
import com.mapin.docadmin.services.exception.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService {
	
	private static Logger logger = org.slf4j.LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserRepository repository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Transactional(readOnly = true)
	public Page<UserDto> findAllPaged(PageRequest pageRequest) {
		Page<User> page = repository.findAll(pageRequest);
		return UserDto.converter(page);
	}

	@Transactional(readOnly = true)
	public UserDto findById(Long id) {
		Optional<User> optional = repository.findById(id);
		User user = optional.orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado!"));
		return new UserDto(user);
	}

	@Transactional
	public @Valid UserInsertDto insert(UserInsertDto dto) {
		User entity = new User();
		copyDtoToEntity(dto, entity);
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity = repository.save(entity);
		return new UserInsertDto(entity);
	}

	@Transactional
	public @Valid UserUpdateDto update(Long id, UserUpdateDto dto) {
		try {
			User user = repository.getOne(id);
			copyDtoToEntity(dto, user);
			user = repository.save(user);
			return new UserUpdateDto(user);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id de usuário não encontrado! " + id);
		}
	}

	public void delete(Long id) {
		try {

			repository.deleteById(id);

		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id de usuário não encontrado! " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de Integridade do DB");
		}
	}

	private void copyDtoToEntity(UserDto dto, User entity) {

		entity.setName(dto.getName());
		entity.setEmail(dto.getEmail());
		entity.getRoles().clear();
		entity.getRoles().add(new Role(1L, "ROLE_OPERATOR"));

	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repository.findByEmail(username);

		if (user == null) {
			logger.error("Usuário não encontrado: " + username);
			throw new UsernameNotFoundException("Email não encontrado!");
		}
		logger.info("Usuário encontrado: " + username);
		return user;
	}
}
