package com.project.breakdown.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.breakdown.model.BreakdownRequest;
import com.project.breakdown.service.BreakdownService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/breakdown")
public class BreakdownController {
	
	private final BreakdownService service;
	
	public BreakdownController(BreakdownService service) {
		this.service = service;
	}
	
	@PostMapping("/create")
	public BreakdownRequest create(@RequestBody BreakdownRequest request, HttpServletRequest httpRequest) {
		
		String authHeader = httpRequest.getHeader("Authorization");
		
		String token = null;
		if(authHeader != null && authHeader.startsWith("Bearer ")) {
			token = authHeader.substring(7);
		}
		
		return service.createRequest(request, token);
	}
	
	@GetMapping("/pending")
	public List<BreakdownRequest> getPendingRequest() {
		return service.getAllPendingRequests();
	}
	
	@GetMapping("/my-requests")
	public List<BreakdownRequest> getAllRequests(HttpServletRequest httpRequest) {
		
		String authHeader = httpRequest.getHeader("Authorization");
		String token = null;
		
		if(authHeader!=null && authHeader.startsWith("Bearer ")){
			token = authHeader.substring(7);
		}
		
		return service.getAllRequests(token);
	}
	
	@GetMapping("/{id}")
	public BreakdownRequest getRequestById(@PathVariable String id) {
		
	    return service.getRequestById(id);
	}
	
	@PutMapping("/accept/{id}")
	public BreakdownRequest accept(@PathVariable String id, @RequestParam String mechanicEmail) {
		return service.acceptRequest(id,mechanicEmail);
	}
}
