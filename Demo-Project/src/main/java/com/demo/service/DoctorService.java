package com.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.model.Doctor;
import com.demo.repo.DoctorRepo;

@Service
public class DoctorService {
	@Autowired
	private DoctorRepo doctorRepo;
	
	public Doctor registerDoctor(Doctor doctor) {
		return doctorRepo.save(doctor);
	}

	public List<Doctor> findBySpecialization(String specialization){
		return doctorRepo.findBySpecialization(specialization);
	}

}
