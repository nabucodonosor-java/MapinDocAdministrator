package com.mapin.docadmin.dto;

import com.mapin.docadmin.entities.User;
import com.mapin.docadmin.services.validations.UserUpdateValid;

@UserUpdateValid
public class UserUpdateDto extends UserDto {
	private static final long serialVersionUID = 1L;
	
	public UserUpdateDto(User entity) {
		super(entity);
	}

}
