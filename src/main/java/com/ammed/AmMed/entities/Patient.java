package com.ammed.AmMed.entities;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PATIENT")
public class Patient implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int patientId;
	
	private String SSN;
	private String firstName;
	private String lastName;
	private Date dateOfBirth;
	private Gender gender;
	private MaritalStatus maritalStatus;
	private Race race;
	private String religion;
	private String language;
	
	//Patient contacts:
	private String patientAddress;
	private String patientCity;
	private State patientState;
	private String patientZip;
	private String patientPhoneNumber;
	
	//Employer contacts:
	private String employerName;
	private String employerAddress;
	private String employerCity;
	private State employerState;
	private String employerZip;
	private String employerPhoneNumber;
	
	public Patient() { }
	
	public Patient(String firstName, String lastName, String SSN, Date dateOfBirth, Gender gender,
				MaritalStatus maritalStatus, Race race, String religion, String language,
				String patientAddress, String patientCity, State patientState, String patientZip, String patientPhoneNumber,
				String employerName, String employerAddress, String employerCity, State employerState,
				String employerZip, String employerPhoneNumber) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.SSN = SSN;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
		this.maritalStatus = maritalStatus;
		this.race = race;
		this.religion = religion;
		this.language = language;
		
		this.patientAddress = patientAddress;
		this.patientCity = patientCity;
		this.patientState = patientState;
		this.patientZip = patientZip;
		this.patientPhoneNumber = patientPhoneNumber;
		
		this.employerName = employerName;
		this.employerAddress = employerAddress;
		this.employerCity = employerCity;
		this.employerState = employerState;
		this.employerZip = employerZip;
		this.employerPhoneNumber = employerPhoneNumber;
	}
	
	@Override
	public String toString() {
		return "	Patient: [SSN: " + SSN + ", name: " + firstName + " " + lastName + ", phone number: " + patientPhoneNumber + "]";
	}

	
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public String getSSN() {
		return SSN;
	}
	public void setSSN(String SSN) {
		this.SSN = SSN;
	}

	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	/*public String getGender() {
		return gender.toString().toLowerCase();
	}*/
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}

	/*public String getMaritalStatus() {
		return maritalStatus.toString().toLowerCase();
	}*/
	public MaritalStatus getMaritalStatus() {
		return maritalStatus;
	}
	public void setMaritalStatus(MaritalStatus maritalStatus) {
		this.maritalStatus = maritalStatus;
	}

	/*public String getRace() {
		return race.toString().toLowerCase();
	}*/
	public Race getRace() {
		return race;
	}
	public void setRace(Race race) {
		this.race = race;
	}

	public String getReligion() {
		return religion;
	}
	public void setReligion(String religion) {
		this.religion = religion;
	}

	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}

	public String getPatientAddress() {
		return patientAddress;
	}
	public void setPatientAddress(String patientAddress) {
		this.patientAddress = patientAddress;
	}

	public String getPatientCity() {
		return patientCity;
	}
	public void setPatientCity(String patientCity) {
		this.patientCity = patientCity;
	}

	public State getPatientState() {
		return patientState;
	}
	public void setPatientState(State patientState) {
		this.patientState = patientState;
	}

	public String getPatientZip() {
		return patientZip;
	}
	public void setPatientZip(String patientZip) {
		this.patientZip = patientZip;
	}

	public String getPatientPhoneNumber() {
		return patientPhoneNumber;
	}
	public void setPatientPhoneNumber(String patientPhoneNumber) {
		this.patientPhoneNumber = patientPhoneNumber;
	}

	public String getEmployerName() {
		return employerName;
	}
	public void setEmployerName(String employerName) {
		this.employerName = employerName;
	}

	public String getEmployerAddress() {
		return employerAddress;
	}
	public void setEmployerAddress(String employerAddress) {
		this.employerAddress = employerAddress;
	}

	public String getEmployerCity() {
		return employerCity;
	}
	public void setEmployerCity(String employerCity) {
		this.employerCity = employerCity;
	}

	public State getEmployerState() {
		return employerState;
	}
	public void setEmployerState(State employerState) {
		this.employerState = employerState;
	}

	public String getEmployerZip() {
		return employerZip;
	}
	public void setEmployerZip(String employerZip) {
		this.employerZip = employerZip;
	}

	public String getEmployerPhoneNumber() {
		return employerPhoneNumber;
	}
	public void setEmployerPhoneNumber(String employerPhoneNumber) {
		this.employerPhoneNumber = employerPhoneNumber;
	}
	
}
