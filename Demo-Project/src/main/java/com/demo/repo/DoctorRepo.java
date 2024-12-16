package com.demo.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.demo.model.Doctor;

public interface DoctorRepo extends MongoRepository<Doctor, String> {
 List<Doctor> findBySpecialization(String specialization);
}
