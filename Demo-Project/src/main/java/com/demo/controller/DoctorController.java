package com.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.model.Doctor;
import com.demo.service.DoctorService;

@RestController
@RequestMapping("/doctors")
public class DoctorController {
	@Autowired
	private DoctorService doctorService;
	
	@PostMapping("/register")
	public Doctor register(@RequestBody Doctor doctor) {
		return doctorService.registerDoctor(doctor);
	}
	
	@GetMapping("/specialization/{specialization}")
	public List<Doctor> findbySpecialization(@PathVariable("specialization") String specialization){
		return doctorService.findBySpecialization(specialization);
	}

}
