package com.ammed.AmMed.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ammed.AmMed.entities.Patient;


@Repository
public class PatientDAOImpl implements PatientDAO {
        
        @Autowired
        private SessionFactory sessionFactory;

        @Override
        public List<Patient> getAllPatients(int index) {
                Session session = sessionFactory.getCurrentSession();
                Criteria criteria = session.createCriteria(Patient.class).addOrder(Order.asc("SSN") );
                criteria.setFirstResult((index - 1) * 5);
                criteria.setMaxResults(5);        
                @SuppressWarnings("unchecked")
                List<Patient> patients = (List<Patient>) criteria.list();
                return patients;
        }

        @Override
        public Patient getPatientById(int patientId) {
        	Session session = sessionFactory.getCurrentSession();
        Criteria criteria = session.createCriteria(Patient.class).add(Restrictions.eq("patientId", patientId));
        @SuppressWarnings("unchecked")
        List<Patient> patients = (List<Patient>) criteria.list();
        if(patients!=null && patients.size()!=0) {
                /***********/
                System.out.println("        getPatientById " + patients.get(0).toString());
                /*******************/
                return patients.get(0);
        }
        return null;
        }
        
        @Override
        public Patient getPatientBySSN(String SSN) {
        	Session session = sessionFactory.getCurrentSession();
        	Criteria criteria = session.createCriteria(Patient.class).add(Restrictions.eq("SSN", SSN));
        	@SuppressWarnings("unchecked")
        	List<Patient> patients = (List<Patient>) criteria.list();
        	if(patients!=null && patients.size()!=0) {
        		return patients.get(0);
        	}
        	return null;
        }

        @Override
        public Patient getPatientByFirstName(String firstName) {
        //public List<Patient> getPatientByFirstName(String firstName, int index) {
        	Session session = sessionFactory.getCurrentSession();
        	Criteria criteria = session.createCriteria(Patient.class);
        	criteria.add( Restrictions.eq("firstName", firstName) );
        	criteria.addOrder(Order.asc("firstName") );
        	//criteria.setFirstResult((index - 1) * 10);
        	//criteria.setMaxResults(10);
        	@SuppressWarnings("unchecked")
        	List<Patient> patients = (List<Patient>) criteria.list();
        	if(patients!=null && patients.size()!=0) {
        		return patients.get(0);                                // NOT ONE BUT SEVERAL CAN BE FOUND
        	}
        	return null;
        }

        @Override
        public Patient getPatientByLastName(String lastName) {
        //public List<Patient> getPatientByLastName(String lastName, int index) {
        	Session session = sessionFactory.getCurrentSession();
        	Criteria criteria = session.createCriteria(Patient.class);
        	criteria.add(Restrictions.eq("lastName", lastName));
        	criteria.addOrder(Order.asc("lastName") );
        	//criteria.setFirstResult((index - 1) * 10);
        	//criteria.setMaxResults(10);
        	@SuppressWarnings("unchecked")
        	List<Patient> patients = (List<Patient>) criteria.list();
        	if(patients!=null && patients.size()!=0) {
        		return patients.get(0);                                // NOT ONE BUT SEVERAL CAN BE FOUND
        	}
        	return null;
        }

        @Override
        public Patient getPatientByPhoneNumber(String patientPhoneNumber) {
        	Session session = sessionFactory.getCurrentSession();
        	Criteria criteria = session.createCriteria(Patient.class).add(Restrictions.eq("patientPhoneNumber", patientPhoneNumber));
        	@SuppressWarnings("unchecked")
        	List<Patient> patients = (List<Patient>) criteria.list();
        	if(patients!=null && patients.size()!=0) {
        		return patients.get(0);
        	}
        	return null;
        }

        @Override
        @Transactional
        public int getPatientsCount() {
        	Session session = sessionFactory.getCurrentSession();
        	return (Integer) session.createCriteria(Patient.class).setProjection(Projections.rowCount()).uniqueResult();
        }

        @Override
        public void createPatient(Patient patient) {
        	sessionFactory.getCurrentSession().save(patient);
        }
        
        @Override
		public boolean isPatientValid(Patient patient) {
        	if ((patient.getSSN().length()!=11) || 
        		(patient.getFirstName().length()<2) || (patient.getFirstName().length()>20) ||
        		(patient.getLastName().length()<2) || (patient.getLastName().length()>20) ||
        		patient.getDateOfBirth().toString().isEmpty() ||	// DO WE NEED ANYTHING ?
        		patient.getGender().toString().isEmpty() ||	//	Do we need this? There is a default expression.
        		//patient.getMaritalStatus().toString().isEmpty() && NOT OBLIGATORY !!!
        		patient.getRace().toString().isEmpty() ||	//	Do we need this? There is a default expression.
        		//patient.getReligion().toString().isEmpty() && NOT OBLIGATORY !!!
        		patient.getLanguage().toString().isEmpty() ||	//	Do we need this? There is a default expression.
        		(patient.getPatientAddress().length()<2) || (patient.getPatientAddress().length()>20) ||
        		(patient.getPatientCity().length()<2) || (patient.getPatientCity().length()>20) && 
        		patient.getPatientState().toString().isEmpty() ||	//	Do we need this? There is a default expression.
        		(patient.getPatientZip().length()!=5) ||
        		(patient.getPatientPhoneNumber().length()!=14) ||
        		(patient.getEmployerName().length()<2) || (patient.getEmployerName().length()>20) ||
        		(patient.getEmployerAddress().length()<2) || (patient.getEmployerAddress().length()>20) ||
        		(patient.getEmployerCity().length()<2) || (patient.getEmployerCity().length()>20) || 
        		patient.getEmployerState().toString().isEmpty() ||	//	Do we need this? There is a default expression.
        		(patient.getEmployerZip().length()!=5) ||
        		(patient.getEmployerPhoneNumber().length()!=14) ) {
        		System.out.println("	Validation failed");
        		return false;
        	}
        	System.out.println("	Validation success");
        	return true;
        }

        @Override
        public void updatePatient(Patient patient) {
        	sessionFactory.getCurrentSession().update(patient);
        }

        @Override
        public List<Patient> findPatient(String value, int index) {
        	Session session = sessionFactory.getCurrentSession();
        	Criteria criterion = session.createCriteria(Patient.class);
        	Disjunction or = Restrictions.disjunction();
        	or.add(Restrictions.like("firstName", value, MatchMode.START));
        	or.add(Restrictions.like("lastName", value, MatchMode.START));
        	or.add(Restrictions.like("SSN", value, MatchMode.START));
        	criterion.add(or);
        	criterion.addOrder( Order.asc("SSN") );
        	/*****/
        	quantity = criterion.list().size();
        	System.out.println("	quantity should be shown for the first time ... " + quantity);
        	/*****/
        	criterion.setFirstResult((index - 1) * 5);
        	criterion.setMaxResults(5);
        	@SuppressWarnings("unchecked")
        	List<Patient> findPatientList = (List<Patient>) criterion.list();
        	if(findPatientList!=null && findPatientList.size()!=0) {
        		return findPatientList;
        	}
        	return null;
        }
        @Override
        public List<Patient> findPatientForAutocomplete(String value) {
        	Session session = sessionFactory.getCurrentSession();
        	Criteria criterion = session.createCriteria(Patient.class);
        	Disjunction or = Restrictions.disjunction();
        	or.add(Restrictions.like("firstName", value, MatchMode.START));
        	or.add(Restrictions.like("lastName", value, MatchMode.START));
        	or.add(Restrictions.like("SSN", value, MatchMode.START));
        	criterion.add(or);
        	criterion.addOrder( Order.asc("SSN") );
        	@SuppressWarnings("unchecked")
        	List<Patient> findPatientList = (List<Patient>) criterion.list();
        	if(findPatientList!=null && findPatientList.size()!=0) {
        		return findPatientList;
        	}
        	return null;
        }

        int quantity;
        
        @Override
        public int findPatientsQuantity() {
        	System.out.println("	quantity is (from DAO) " + quantity);
        	return quantity;
        }		

}