package com.project.breakdown.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.breakdown.model.User;
import com.project.breakdown.repository.UserRepository;

@Service
public class UserService {
	
	private final BCryptPasswordEncoder encoder;
	private final UserRepository userRepo;
	
	public UserService(UserRepository userRepo, BCryptPasswordEncoder encoder) {
		this.userRepo = userRepo;
		this.encoder = encoder;
	}
	
	public User signup(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		return userRepo.save(user);
	}
	
	public User login(String email, String password) {
		User user = userRepo.findByEmail(email);
		
		if(user!=null && encoder.matches(password, user.getPassword())) {
			return user;
		}
		
		return null;
	}
}
