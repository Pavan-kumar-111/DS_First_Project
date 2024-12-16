package com.demo.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.demo.model.Appointment;

import java.time.LocalDate;


public interface AppointmentRepo extends MongoRepository<Appointment, String> {
  List<Appointment> findByDoctorIdAndAppointmentDate(String doctorId, LocalDate date);
}
