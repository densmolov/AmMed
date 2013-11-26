package com.ammed.AmMed.service;

import java.util.List;

import com.ammed.AmMed.entities.Patient;

public interface PatientService {
	
	public List<Patient> getAllPatients(int index);
	
	public Patient getPatientBySSN (String SSN);
	public Patient getPatientByFirstName (String firstName);
	public Patient getPatientByLastName (String lastName);
	public Patient getPatientByPhoneNumber (String patientPhoneNumber);
	
	public int getPatientsCount();

}
