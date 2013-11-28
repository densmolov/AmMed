package com.ammed.AmMed.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ammed.AmMed.dao.PatientDAO;
import com.ammed.AmMed.entities.Patient;


@Service
public class PatientServiceImpl implements PatientService {

        @Autowired
        private PatientDAO patientDAO;
        
        @Transactional
        public List<Patient> getAllPatients(int index) {
                return patientDAO.getAllPatients(index);
        }

        @Transactional
        public Patient getPatientById(int patientId) {
                return patientDAO.getPatientById(patientId);
        }
        
        @Transactional
        public Patient getPatientBySSN(String SSN) {
                return patientDAO.getPatientBySSN(SSN);
        }

        @Transactional
        public Patient getPatientByFirstName(String firstName) {
                return patientDAO.getPatientByFirstName(firstName);
        }

        @Transactional
        public Patient getPatientByLastName(String lastName) {
                return patientDAO.getPatientByLastName(lastName);
        }

        @Transactional
        public Patient getPatientByPhoneNumber(String patientPhoneNumber) {
                return patientDAO.getPatientByPhoneNumber(patientPhoneNumber);
        }

        @Transactional
        public int getPatientsCount() {
                return patientDAO.getPatientsCount();
        }

        @Transactional
        public void createPatient(Patient patient) {
                patientDAO.createPatient(patient);
        }

        @Transactional
        public void updatePatient(Patient patient) {
                patientDAO.updatePatient(patient);
        }

        @Transactional
        public List<Patient> findPatient(String field, String value, int index) {
                return patientDAO.findPatient(field, value, index);
        }
        @Transactional
        public int findPatientsQuantity(String field, String value) {
                return patientDAO.findPatientsQuantity(field, value);
        }        

}