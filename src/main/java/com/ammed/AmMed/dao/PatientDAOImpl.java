package com.ammed.AmMed.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
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
	
	boolean searchDone = false;
	
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
        	System.out.println("	first" + patients.get(0).toString());
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
            return patients.get(0);				// NOT ONE BUT SEVERAL CAN BE FOUND
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
                return patients.get(0);				// NOT ONE BUT SEVERAL CAN BE FOUND
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
		/*****/
		if (searchDone == true) {
			System.out.println("   searchDone");
		}
		/*****/
		Session session = sessionFactory.getCurrentSession();
		return (Integer) session.createCriteria(Patient.class).setProjection(Projections.rowCount()).uniqueResult();
	}

	@Override
	public void createPatient(Patient patient) {
		sessionFactory.getCurrentSession().save(patient);
	}

	@Override
	public void updatePatient(Patient patient) {
		sessionFactory.getCurrentSession().update(patient);
	}

	@Override
	public List<Patient> findPatient(String field, String value, int index) {
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(Patient.class);
		criteria.setFirstResult((index - 1) * 5);
		criteria.setMaxResults(5);
		criteria.add( Restrictions.like(field, value, MatchMode.ANYWHERE) );
		criteria.addOrder( Order.asc(field) );
		@SuppressWarnings("unchecked")
		List<Patient> findPatientList = (List<Patient>) criteria.list();
		if(findPatientList!=null && findPatientList.size()!=0) {
            return findPatientList;
		}
		return null;
	}

}
