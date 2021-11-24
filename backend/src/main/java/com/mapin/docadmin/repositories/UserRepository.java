package com.mapin.docadmin.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.Role;
import com.mapin.docadmin.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByEmail(String email);
	
	@Query("SELECT DISTINCT obj FROM User obj INNER JOIN obj.roles role WHERE "
			+ "(COALESCE(:roles) IS NULL OR role IN :roles) AND "
			+ "(LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%'))) ")
	Page<User> find(List<Role> roles, String name, Pageable pageable);
	
	@Query("SELECT obj FROM User obj JOIN FETCH obj.roles WHERE obj IN :users")
	List<User> find(List<User> users);

}
