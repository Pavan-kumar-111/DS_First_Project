package com.contact.demo.controller;




import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.contact.demo.model.Contact;
import com.contact.demo.service.ContactService;

import lombok.RequiredArgsConstructor;

@CrossOrigin("http:localhost:5173")
@RestController
@RequestMapping("/contacts")
@RequiredArgsConstructor
public class ContactController {
	private static final String PHOTO_DIRECTORY = "C:\\Users\\Pavan\\Downloads\\Uploads\\";
	private final ContactService contactService;
	
	@PostMapping
	public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
	    Contact createdContact = contactService.createContact(contact);
	    return ResponseEntity.created(URI.create("/contacts/userID" + createdContact.getId())).body(createdContact);
	}

	@GetMapping
	public ResponseEntity<org.springframework.data.domain.Page<Contact>> getContacts(
			@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "10") int size){
		return ResponseEntity.ok().body(contactService.getAllContacts(page, size));
	}
	@GetMapping("/{id}")
	public ResponseEntity<Contact> getContacts (@PathVariable(value = "id") String id){
		return ResponseEntity.ok().body(contactService.getContact(id));
	}
	@PutMapping("/photo")
	public ResponseEntity<String> uploadPhoto(
	        @RequestParam(value = "id", required = true) String id, 
	        @RequestParam(value = "file", required = true) MultipartFile file) {
	    if (id == null || id.isEmpty()) {
	        return ResponseEntity.badRequest().body("Missing 'id' parameter");
	    }
	    if (file == null || file.isEmpty()) {
	        return ResponseEntity.badRequest().body("Missing 'file' parameter");
	    }
	    String photoUrl = contactService.uploadPhoto(id, file);
	    return ResponseEntity.ok().body(photoUrl);
	}
    @GetMapping(path = "/image/{filename}",produces = org.springframework.http.MediaType.IMAGE_PNG_VALUE)
    public byte[] getPhoto(@PathVariable("filename") String filename) throws IOException {
    	return Files.readAllBytes(Paths.get(PHOTO_DIRECTORY +filename));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteContact(@PathVariable String id) {
        try {
            contactService.deleteContact(id);
            return ResponseEntity.status(HttpStatus.OK).body("Contact deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(
        @PathVariable("id") String id,
        @RequestBody Contact contact) {
        try {
            Contact updatedContact = contactService.updateContact(id, contact);
            return ResponseEntity.ok(updatedContact);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    
    
    
   
}
