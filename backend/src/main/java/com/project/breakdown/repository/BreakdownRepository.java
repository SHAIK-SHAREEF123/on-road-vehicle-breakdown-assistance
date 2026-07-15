package com.project.breakdown.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.project.breakdown.model.BreakdownRequest;

public interface BreakdownRepository extends MongoRepository<BreakdownRequest, String>{
	
	List<BreakdownRequest> findByStatus(String status);

	List<BreakdownRequest> findByUserEmail(String userEmail);
}
