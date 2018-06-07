package com.bob.jamserver.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bob.jamserver.model.Window;

@Repository
public interface WindowRepository extends CrudRepository<Window,Long> {
	List<Window> findAll();
	}