package com.contact.demo.service;

import java.nio.file.CopyOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.contact.demo.model.Contact;
import com.contact.demo.repo.ContactRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class ContactService {
    private static final CopyOption REPLACE_EXISTING = StandardCopyOption.REPLACE_EXISTING;
    private static final String PHOTO_DIRECTORY = "C:\\Users\\Pavan\\Downloads\\Uploads\\";
    private final ContactRepo contactRepo;

    public Page<Contact> getAllContacts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return contactRepo.findAll(pageable);
    }

    public Contact getContact(String id) {
        return contactRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact Not Found!"));
    }

    public Contact createContact(Contact contact) {
        return contactRepo.save(contact);
    }

    @Transactional
    public Contact updateContact(String id, Contact updatedContact) {
        Contact existingContact = getContact(id);
        existingContact.setName(updatedContact.getName());
        existingContact.setEmail(updatedContact.getEmail());
        existingContact.setPhone(updatedContact.getPhone());
        existingContact.setAddress(updatedContact.getAddress());
        existingContact.setStatus(updatedContact.getStatus());
        existingContact.setTitle(updatedContact.getTitle());
        return contactRepo.save(existingContact);
    }

    @Transactional
    public void deleteContact(String id) {
        if (!contactRepo.existsById(id)) {
            throw new RuntimeException("Contact not found with id: " + id);
        }
        contactRepo.deleteById(id);
    }

    public String uploadPhoto(String id, MultipartFile file) {
        log.info("Saving Picture For User: {}", id);
        Contact contact = getContact(id);
        String photoUrl = photoFunction.apply(id, file);
        contact.setPhotoUrl(photoUrl);
        contactRepo.save(contact);
        return photoUrl;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename)
            .filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1))
            .orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/contacts/image/" + filename)
                    .toUriString();
        } catch (Exception e) {
            throw new RuntimeException("Unable to Save Image!", e);
        }
    };
}
