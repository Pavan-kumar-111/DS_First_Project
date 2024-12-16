package com.soul.hope.Controller;

import com.soul.hope.Entity.*;
import com.soul.hope.Repository.UserRepo;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

@CrossOrigin(origins ="http://localhost/3000")
@RestController
@RequestMapping("/api")
@Validated
public class UserController{
	
	@Autowired	
	private UserRepo userRepository;
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@Valid @RequestBody UserEntity user){
		
		if (userRepository.existsByEmail(user.getEmail())) {
			return ResponseEntity.badRequest().body("Email is already in use");
		}
		
		userRepository.save(user);
		return ResponseEntity.ok("User registered Succceefully !");		
	}
	
	
	
	
	
}
