package com.contact.demo.model;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude
@Table(name = "Contacts")
public class Contact {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", unique = true, updatable = false)
    private String id;
    
    private String name;
    private String email;
    private String title;
    private String phone;
    private String address;
    private String status;
    private String photoUrl;
}
