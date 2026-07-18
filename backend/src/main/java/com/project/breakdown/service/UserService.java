package com.project.breakdown.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.breakdown.model.User;
import com.project.breakdown.repository.UserRepository;
import com.project.breakdown.util.JwtUtil;

@Service
public class UserService {
	
	private final BCryptPasswordEncoder encoder;
	private final UserRepository userRepo;
	private final JwtUtil jwtUtil;
	
	public UserService(UserRepository userRepo, BCryptPasswordEncoder encoder, JwtUtil jwtUtil) {
		this.userRepo = userRepo;
		this.encoder = encoder;
		this.jwtUtil = jwtUtil;
	}
	
	public User signup(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
//		System.out.println("Service layer User Check : " + user);
		return userRepo.save(user);
	}
	
	public User login(String email, String password) {
		User user = userRepo.findByEmail(email);
		
		if(user!=null && encoder.matches(password, user.getPassword())) {
			return user;
		}
		
		return null;
	}

	public User getProfile(String token) {
		
		String email = jwtUtil.extractEmail(token);

	    return userRepo.findByEmail(email);
	}

	public User updateProfile(String token, User updatedUser){

	    String email = jwtUtil.extractEmail(token);

	    User user = userRepo.findByEmail(email);

	    user.setName(updatedUser.getName());
	    user.setPhoneNumber(updatedUser.getPhoneNumber());

	    return userRepo.save(user);

	}
}
