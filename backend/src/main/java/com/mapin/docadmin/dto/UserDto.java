package com.mapin.docadmin.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.mapin.docadmin.entities.User;

public class UserDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	@NotBlank(message = "Campo obrigatório")
	private String name;

	private String imgUrl;

	@Email(message = "Digitar email válido!")
	@NotBlank(message = "Campo obrigatório")
	private String email;

	private Set<RoleDto> roles = new HashSet<>();
	
	public UserDto() {}

	public UserDto(User entity) {
		id = entity.getId();
		name = entity.getName();
		imgUrl = entity.getImgUrl();
		email = entity.getEmail();
		entity.getRoles().forEach(r -> this.roles.add(new RoleDto(r)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<RoleDto> getRoles() {
		return roles;
	}

}
