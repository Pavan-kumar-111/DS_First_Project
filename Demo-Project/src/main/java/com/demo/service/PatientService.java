package com.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.model.Patient;
import com.demo.repo.PatientRepo;

@Service
public class PatientService {

	@Autowired
	private PatientRepo patientRepo;
	
	public Patient registerPatient(Patient patient) {
		return patientRepo.save(patient);
	}
	public Patient findbyEmail(String email) {
		return patientRepo.findByEmail(email);
	}
}
