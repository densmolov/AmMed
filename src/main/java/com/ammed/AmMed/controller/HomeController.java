package com.ammed.AmMed.controller;

import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ammed.AmMed.entities.Patient;
import com.ammed.AmMed.service.PatientService;


@Controller
public class HomeController {
	
	@Autowired
	private PatientService patientService;
	
	@RequestMapping(value = "login", method = RequestMethod.GET)
	public String loginPage(Locale locale, Model model, HttpServletResponse response, @RequestParam(required=false) Integer error) {
		if(error!=null) {
			response.setHeader("message", "Incorrect login or password!");
		}
		return "forward:/pages/login.html";
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model, HttpServletRequest request) {
		if (request.isUserInRole("ROLE_MEDIC")) {
			return "redirect:/medic";
		}
		return "redirect:/login";
	}

	@RequestMapping(value = "/medic", method = RequestMethod.GET)
	public String employee(Locale locale, Model model) {
		return "forward:/pages/index.html";
	}
		
	@RequestMapping(value = "/medic/getPatientsCount", method = RequestMethod.GET)
	public @ResponseBody
	Integer getPatientsCount() {
		System.out.println("	getPatientsCount returns " + patientService.getPatientsCount());
		return patientService.getPatientsCount();
	}
	
	@RequestMapping(value = "/medic/patients", method = RequestMethod.GET)
	public @ResponseBody
	List<Patient> list(@RequestParam int index) {
		return patientService.getAllPatients(index);
	}
	
	@RequestMapping(value = "/medic/patients/{SSN}", method = RequestMethod.GET)
    public @ResponseBody
    Patient getPatientBySSN(@PathVariable("SSN") String SSN) {
            return patientService.getPatientBySSN(SSN);
    }
	
}
