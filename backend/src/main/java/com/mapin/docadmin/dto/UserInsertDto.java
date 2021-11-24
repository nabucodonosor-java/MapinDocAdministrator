package com.mapin.docadmin.dto;

import com.mapin.docadmin.entities.User;
import com.mapin.docadmin.services.validations.UserInsertValid;

@UserInsertValid
public class UserInsertDto extends UserDto {
	private static final long serialVersionUID = 1L;

	private String password;

	public UserInsertDto() {
	}

	public UserInsertDto(String password) {
		super();
		this.password = password;
	}
	
	public UserInsertDto(User entity) {
		super(entity);
		password = entity.getPassword();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}