package com.ammed.AmMed.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "MEDIC")
public class Medic implements Serializable {
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int medicId;
	private String login;
	private String password;
	
	@ManyToOne
	@JoinColumn(name = "ROLEID")
	private Role role;
	
	public Medic() {}
	
	public Medic(int medicId, String login, String password, Role role) {
		super();
		this.medicId = medicId;
		this.login = login;
		this.password = password;
		this.role = role;
	}
	
	@Override
	public String toString() {
		return ("Medic [medicId= " + medicId + ", Login= " + login + ", Password= " + password + "]");
	}

	public int getMedicId() {
		return medicId;
	}
	public void setMedicId(int medicId) {
		this.medicId = medicId;
	}

	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}

}
