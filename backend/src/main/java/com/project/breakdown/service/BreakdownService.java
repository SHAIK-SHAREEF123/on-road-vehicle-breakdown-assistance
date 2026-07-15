package com.project.breakdown.service;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.project.breakdown.model.BreakdownRequest;
import com.project.breakdown.repository.BreakdownRepository;
import com.project.breakdown.util.JwtUtil;

@Service
public class BreakdownService {
	
	private final BreakdownRepository repo;
//	private final SimpMessagingTemplate messagingTemplate;
	private final JwtUtil jwtUtil;
	
	public BreakdownService(BreakdownRepository repo, SimpMessagingTemplate messagingTemplate, JwtUtil jwtUtil) {
		this.repo = repo;
//		this.messagingTemplate = messagingTemplate;
		this.jwtUtil = jwtUtil;
	}

	public BreakdownRequest createRequest(BreakdownRequest request, String token) {
		String userEmail = jwtUtil.extractEmail(token);

		request.setUserEmail(userEmail);
		
		request.setStatus("PENDING");
		BreakdownRequest saved = repo.save(request);
		
//		System.out.println("🔥 Sending WebSocket message...");
//		messagingTemplate.convertAndSend("/topic/requests", saved);
		
		return saved;
		
	}
	
	public List<BreakdownRequest> getAllPendingRequests() {
		return repo.findByStatus("PENDING");
	}
	
	public List<BreakdownRequest> getAllRequests(String token) {
		String userEmail = jwtUtil.extractEmail(token);
		return repo.findByUserEmail(userEmail);
	}
	
	public BreakdownRequest getRequestById(String id) {
		
	    return repo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Request not found"));
	}
	
	public BreakdownRequest acceptRequest(String id, String mechanicEmail) {
		
		BreakdownRequest req = repo.findById(id).orElseThrow();
		
		req.setStatus("ACCEPTED");
		req.setMechanicEmail(mechanicEmail);
		
		BreakdownRequest saved = repo.save(req);
		
//		messagingTemplate.convertAndSend("/topic/accepted", saved);
		
		return saved;
	}

}
