package com.demo.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.model.Appointment;
import com.demo.service.AppointmentService;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
	@Autowired
	private AppointmentService appointmentService;
	
	@PostMapping("/book")
	public Appointment bookAppointment(@RequestBody Appointment appointment) {
		return appointmentService.bookAppointment(appointment);
	}
	
	@GetMapping("/doctor/{doctorId}/date/{date}")
	public ResponseEntity<?> getAppointmentsByDoctorAndDate(
	        @PathVariable("doctorId") String doctorId,
	        @PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
	    try {
	        List<Appointment> appointments = appointmentService.getAppointmentByDoctorAndDate(doctorId, date);
	        return ResponseEntity.ok(appointments);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching appointments.");
	    }
	}

}
