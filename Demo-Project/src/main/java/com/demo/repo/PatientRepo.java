package com.demo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.demo.model.Patient;

public interface PatientRepo extends MongoRepository<Patient, String> {
  Patient  findByEmail(String email);
}
