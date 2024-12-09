package com.contact.demo.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.contact.demo.model.Contact;

@Repository
public interface ContactRepo extends JpaRepository<Contact, String>{
	Optional<Contact> findById(String id);
}
