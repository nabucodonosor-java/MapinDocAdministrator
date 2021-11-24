package com.mapin.docadmin.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mapin.docadmin.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
	
	@Query("SELECT DISTINCT obj FROM Product obj WHERE "
			+ "(LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%')))")
	Page<Product> findAllPaged(String name, Pageable pageable);

}
