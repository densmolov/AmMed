package com.ammed.AmMed.service;

import java.util.List;

import com.ammed.AmMed.entities.Patient;

public interface PatientService {
	
	public List<Patient> getAllPatients(int index);
	
	public Patient getPatientById (int patientId);
	public Patient getPatientBySSN (String SSN);
	public Patient getPatientByFirstName (String firstName);
	public Patient getPatientByLastName (String lastName);
	public Patient getPatientByPhoneNumber (String patientPhoneNumber);
	
	public int getPatientsCount();
	
	public void createPatient(Patient patient);
	public boolean isPatientValid(Patient patient);

	public void updatePatient(Patient patient);
     
	public List<Patient> findPatient(String value, int index);
	public List<Patient> findPatientForAutocomplete(String value);
	public int findPatientsQuantity();

}
