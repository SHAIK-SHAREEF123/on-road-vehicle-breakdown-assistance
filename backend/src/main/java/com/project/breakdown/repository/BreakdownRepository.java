package com.project.breakdown.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.project.breakdown.model.BreakdownRequest;
import com.project.breakdown.model.BreakdownRequest.RequestStatus;

public interface BreakdownRepository extends MongoRepository<BreakdownRequest, String>{
	
	List<BreakdownRequest> findByStatus(String status);

	List<BreakdownRequest> findByUserEmail(String userEmail);

	List<BreakdownRequest> findByStatusNot(String string);

	List<BreakdownRequest> findByStatusIn(List<RequestStatus> statuses);
	
	List<BreakdownRequest> findByMechanicEmail(String mechanicEmail);
}
