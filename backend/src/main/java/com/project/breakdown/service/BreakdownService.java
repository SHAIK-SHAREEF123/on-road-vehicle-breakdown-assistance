package com.project.breakdown.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.project.breakdown.model.BreakdownRequest;
import com.project.breakdown.model.BreakdownRequest.RequestStatus;
import com.project.breakdown.repository.BreakdownRepository;
import com.project.breakdown.util.JwtUtil;

@Service
public class BreakdownService {
	
	private final BreakdownRepository repo;
	private final SimpMessagingTemplate messagingTemplate;
	private final JwtUtil jwtUtil;
	
	public BreakdownService(BreakdownRepository repo, SimpMessagingTemplate messagingTemplate, JwtUtil jwtUtil) {
		this.repo = repo;
		this.messagingTemplate = messagingTemplate;
		this.jwtUtil = jwtUtil;
	}

	public BreakdownRequest createRequest(BreakdownRequest request, String token) {
		String userEmail = jwtUtil.extractEmail(token);

		request.setUserEmail(userEmail);
		request.setCreatedAt(LocalDateTime.now());
		
		request.setStatus(RequestStatus.PENDING);
		BreakdownRequest saved = repo.save(request);
		
		request.setStatus(RequestStatus.SEARCHING_MECHANIC);
		saved = repo.save(request);
//		System.out.println("🔥 Sending WebSocket message...");
//		messagingTemplate.convertAndSend("/topic/requests", saved);
		
		return saved;
		
	}
	
	public List<BreakdownRequest> getAllPendingRequests() {
		return repo.findByStatusNot("COMPLETED");
	}
	
	public List<BreakdownRequest> getAllRequests(String token) {
		String userEmail = jwtUtil.extractEmail(token);
//		System.out.println("UserEmail: " + userEmail);
		return repo.findByUserEmail(userEmail);
	}
	
	public BreakdownRequest getRequestById(String id) {
		
	    return repo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Request not found"));
	}
	
	public BreakdownRequest updateRequest(String id, BreakdownRequest updatedRequest) {

	    BreakdownRequest request = repo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Request not found"));

	    if (!request.getStatus().equals(RequestStatus.PENDING)) {
	        throw new RuntimeException("Request cannot be edited now");
	    }

	    request.setVehicleType(updatedRequest.getVehicleType());
	    request.setIssue(updatedRequest.getIssue());
	    request.setDescription(updatedRequest.getDescription());
	    request.setLocation(updatedRequest.getLocation());

	    return repo.save(request);
	}
	
	public String cancelRequest(String id) {

	    BreakdownRequest request = repo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Request not found"));

	    if (!(request.getStatus().equals(RequestStatus.PENDING)
	            || request.getStatus().equals(RequestStatus.SEARCHING_MECHANIC))) {

	        throw new RuntimeException("Request cannot be cancelled");
	    }

	    request.setStatus(RequestStatus.CANCELLED);
	    repo.save(request);

	    return "Request Cancelled Successfully";
	}
	
	
	
	public BreakdownRequest acceptRequest(String id, String token) {
		
		String mechanicEmail = jwtUtil.extractEmail(token);
		BreakdownRequest req = repo.findById(id).orElseThrow();
		
		req.setStatus(RequestStatus.MECHANIC_ASSIGNED);
		req.setMechanicEmail(mechanicEmail);
		
		BreakdownRequest saved = repo.save(req);
		
//		System.out.println(saved.getStatus());
		messagingTemplate.convertAndSend("/topic/request/" + saved.getId(),saved);
	
		return saved;
	}

	public List<BreakdownRequest> getAllPendingRequestsForMechanic() {
		return repo.findByStatusIn(
					List.of(
							RequestStatus.PENDING,
							RequestStatus.SEARCHING_MECHANIC
					)
				);
	}
	
	public List<BreakdownRequest> getAcceptedRequests(String token) {

	    String mechanicEmail = jwtUtil.extractEmail(token);
	    
	    System.out.println("Mechanic Email : " + mechanicEmail);
	    
	    List<BreakdownRequest> saved = repo.findByMechanicEmail(mechanicEmail);
	    
	    System.out.println("Accepted Requests : " + saved);
	    return saved;

	}
	
	public BreakdownRequest updateStatus(
	        String id,
	        RequestStatus status,
	        String token) {

	    String mechanicEmail = jwtUtil.extractEmail(token);

	    BreakdownRequest request = repo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Request not found"));

	    // Only assigned mechanic can update
	    if (!mechanicEmail.equals(request.getMechanicEmail())) {
	        throw new RuntimeException("You are not assigned to this request");
	    }

	    request.setStatus(status);

	    BreakdownRequest saved =  repo.save(request);
	    
	    messagingTemplate.convertAndSend("/topic/request/" + saved.getId(),saved);
	    
	    return saved;
	}	

}
