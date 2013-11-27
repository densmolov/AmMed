package com.ammed.AmMed.dao;

import java.util.List;
import com.ammed.AmMed.entities.Patient;

public interface PatientDAO {
	
	public List<Patient> getAllPatients(int index);
	
	public Patient getPatientById(int patientId);
	public Patient getPatientBySSN (String SSN);
	public Patient getPatientByFirstName (String firstName);
	public Patient getPatientByLastName (String lastName);
	public Patient getPatientByPhoneNumber (String patientPhoneNumber);
	
	public int getPatientsCount();	

}
