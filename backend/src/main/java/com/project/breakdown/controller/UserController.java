package com.project.breakdown.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.breakdown.model.User;
import com.project.breakdown.service.UserService;
import com.project.breakdown.util.JwtUtil;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private final UserService userService;
	private final JwtUtil jwtUtil;
	
	public UserController(UserService userService, JwtUtil jwtUtil) {
		this.userService = userService;
		this.jwtUtil = jwtUtil;
		
	}
	
	@PostMapping("/signup")
	public User signup(@RequestBody User user) {
		
		return userService.signup(user);
	}
	
	@PostMapping("/login")
	public Map<String,String> login(@RequestBody User user) {
		
		User existing = userService.login(user.getEmail(), user.getPassword());
		
		Map<String,String> response = new HashMap<>();
		
		if(existing!=null) {
			String token = jwtUtil.generateToken(existing.getEmail());
			response.put("token", token);
		} else {
			response.put("error", "Invalid Credentials");
		}
		return response;
	}

	@GetMapping("/")
	public List<User> getAllUsers() {
//		userService.getAllUsers();
		return new ArrayList<>();
	}
}
