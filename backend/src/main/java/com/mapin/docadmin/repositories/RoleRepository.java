package com.mapin.docadmin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mapin.docadmin.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	
}
