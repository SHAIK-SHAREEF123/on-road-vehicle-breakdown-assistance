package com.project.breakdown.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.breakdown.model.BreakdownRequest;
import com.project.breakdown.model.LiveLocationRequest;
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
	public List<BreakdownRequest> getPendingRequests() {
		return service.getAllPendingRequests();
	}
	
	@GetMapping("/pendingForMechanic")
	public List<BreakdownRequest> getPendingRequestsForMechanic() {
		return service.getAllPendingRequestsForMechanic();
	}
	
	
	@GetMapping("/my-requests")
	public List<BreakdownRequest> getAllRequests(HttpServletRequest httpRequest) {
		
		String authHeader = httpRequest.getHeader("Authorization");
		String token = null;
		
		if(authHeader!=null && authHeader.startsWith("Bearer ")){
			token = authHeader.substring(7);
		}
		
//		System.out.println(token);
		
		return service.getAllRequests(token);
	}
	
	@GetMapping("/{id}")
	public BreakdownRequest getRequestById(@PathVariable String id) {
		
	    return service.getRequestById(id);
	}
	
	@PutMapping("/{id}")
	public BreakdownRequest updateRequest(@PathVariable String id, @RequestBody BreakdownRequest requestBody) {
		
		return service.updateRequest(id, requestBody);
	}
	
	@DeleteMapping("/{id}")
	public String deleteRequest(@PathVariable String id) {
		
		return service.cancelRequest(id);
	}
	
	@PutMapping("/accept/{id}")
	public BreakdownRequest accept(@PathVariable String id, HttpServletRequest httpRequest) {
		String authHeader = httpRequest.getHeader("Authorization");

	    String token = null;

	    if (authHeader != null && authHeader.startsWith("Bearer ")) {
	        token = authHeader.substring(7);
	    }
	    
		
		return service.acceptRequest(id,token);
	}
	
	@GetMapping("/mechanicAccepted-requests")
	public List<BreakdownRequest> getAcceptedRequests(HttpServletRequest httpRequest) {

	    String authHeader = httpRequest.getHeader("Authorization");

	    String token = null;

	    if (authHeader != null && authHeader.startsWith("Bearer ")) {
	        token = authHeader.substring(7);
	    }

	    System.out.println("Token : " + token);
	    
	    return service.getAcceptedRequests(token);

	}
	
	@PutMapping("/update-status/{id}")
	public BreakdownRequest updateStatus(
	        @PathVariable String id,
	        @RequestParam BreakdownRequest.RequestStatus status,
	        HttpServletRequest httpRequest) {

	    String authHeader = httpRequest.getHeader("Authorization");

	    String token = null;

	    if (authHeader != null && authHeader.startsWith("Bearer ")) {
	        token = authHeader.substring(7);
	    }

	    return service.updateStatus(id, status, token);
	}
	
	@PostMapping("/update-location")
	public BreakdownRequest updateLocation(

	        @RequestBody LiveLocationRequest request,

	        @RequestHeader("Authorization") String token) {

	    token = token.substring(7);

	    return service.updateMechanicLocation(

	            request.getRequestId(),

	            request.getLatitude(),

	            request.getLongitude(),

	            token
	    );
	}
}
