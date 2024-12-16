package com.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.model.Patient;
import com.demo.service.PatientService;

@RestController
@RequestMapping("/patients")
public class PatientController {
	
	@Autowired
	private PatientService patientService;
	
	@PostMapping("/register")
	public Patient register(@RequestBody Patient patient) {
		return patientService.registerPatient(patient);
	}

}
