package com.demo.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.model.Appointment;
import com.demo.repo.AppointmentRepo;

@Service
public class AppointmentService {

	@Autowired
	private AppointmentRepo appointmentRepo;
	
	public Appointment bookAppointment(Appointment appointment) {
		return appointmentRepo.save(appointment);
	}
	
	public List<Appointment> getAppointmentByDoctorAndDate(String doctorId,LocalDate date){
		return appointmentRepo.findByDoctorIdAndAppointmentDate(doctorId, date);
	}
}
