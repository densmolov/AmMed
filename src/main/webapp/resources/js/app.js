var Views = { };
var patients;

var AllPatientView;
var PatientView;

var Patient = Backbone.Model.extend({
		urlRoot : '/AmMed/medic/patients'
});
var PatientCreate = Backbone.Model.extend({
	urlRoot : '/AmMed/medic/create'
});

var header = [
    "Warning",
];

var messages = [
    "Are you sure you want to log out from the application?",
];

var totalCount=0;
var totalPages;
var index = 1;
var paging = 5;

var search=false;

var SearchPatientList = Backbone.Collection.extend({
    baseUrl: 'medic/patients/find',
    initialize: function() {
        _.bindAll(this, 'url');
        this.value=$('#searchValue').val();
        this.index = index;
    },
    url: function() {
        return this.baseUrl + '?' + $.param({
            value: this.value,
            index: this.index
        });
    }
});

var PatientList = Backbone.Collection.extend({
    baseUrl: 'medic/patients',
    initialize: function() {
        _.bindAll(this, 'url');
        this.index = index;
    },
    url: function() {
        return this.baseUrl + '?' + $.param({
            index: this.index
        });
    }
});



/*        THE BEGINNING OF GREAT FUNCTION        */
$(function () {
	updatePaging();
    Backbone.emulateJSON = false;
    patients = new PatientList();
    
    
    var MyRouter = Backbone.Router.extend({
       routes: {
    	   "/patients/:id": 'patientDetails',
    	   "/edit/:id": 'editPatient',
    	   "": 'start',
    	   "/create": "create",
    	   //"/patients/edit": 'edit'
       },
        start: function() {
          closeModal();
          closeDetailedInfo();
          closeDetailedInfoCreator();
        },
        patientDetails: function(id) {
        	this.id = id;
        	Views.detailedInfo.render(id);
        },
        editPatient: function(id) {
        	this.id = id;
        	Views.editInfo.render(id);//_____________________________________________________________________________________
        },
        create: function() {
        	console.log('I am here');
        	Views.detailedInfoCreator.render();
        }/*,
        edit: function() {
            closeUserEditor();
            if(Views.detailedInfo!=null) {
                Views.detailedInfo.render(creationModel);
            }
        }*/
    });
    
    var myRouter = new MyRouter();
    
    Backbone.history.start({pushState: true, root: "/AmMed/medic"});
    /*****REMOVE*****/
    //$("#ssn").inputmask("999-99-9999");
    /*****REMOVE*****/
    
    var Start = Backbone.View.extend({
        el: $(".content"),
        events: {
            //"click #info": "info",
        	//"click a.edit": "edit",
        	"click #createNewPatient-btn": "create",
            "click #next": "next",
            "click #previous": "previous",
            "click #first": "first",
            "click #last": "last",
            "click #search-btn": "search"
        },
        /*info: function(e) {
            e.preventDefault();
            bankTransactions = new TransList();
            allTransView: new AllTransView();
            //myRouter.navigate("/patients/:id", {trigger: true} );
        },*/
        create: function(e) {
            e.preventDefault();
            myRouter.navigate("/create", {trigger: true} );
        },
        /*edit: function(e) {
            e.preventDefault();
            myRouter.navigate("/patients/edit", true);
        },*/
        next: function(e) {
            e.preventDefault();
            index++;
            buttonClick();
        },
        previous: function(e) {
            e.preventDefault();
            index--;
            buttonClick();
        },
        first: function(e) {
            e.preventDefault();
            index=1;
            buttonClick();
        },
        last: function(e) {
            e.preventDefault();
            index=totalPages;
            buttonClick();
        },
        search: function(e) {
            e.preventDefault();
            if($('#searchValue').val()==="") {
                    search=false;
            } else {
                search=true;
                }
            index=1;
            buttonClick();
        }
    });
    
    var start = new Start();
        
	PatientView = Backbone.View.extend({
		tagName: 'tr',
		template: $.templates("#rowpatient"),
        events: {
        	"click #info": "clicked",
        	"click #infoEditButton": "edit"
        },
        clicked: function(e){
            e.preventDefault();
            //myRouter.navigate('/edit/' + this.model.get("patientId"), {trigger:true});
            myRouter.navigate('/patients/' + this.model.get("patientId"), {trigger:true});
        },
        edit: function(e){
            e.preventDefault();
            myRouter.navigate('/edit/' + this.model.get("patientId"), {trigger:true});
        },
        initialize: function(){
            _.bind(this.render, this);
        },
        render: function() {
        	var element = this.template.render(this.model.toJSON());
            console.log(this.model.toJSON());
            $(this.el).html(element);
            return this;
        }
    });

        
        /*     DETAILED Patient INFORMATION     */
    
var DetailedInfo = Backbone.View.extend({
		//baseUrl: 'medic/patients/:id',
		baseUrl: 'medic/patients/',
		el: $("#patientTemplate"),
		template: $.templates("#showInfoTemplate"),
	events: {
		"click .btn-success#change_status_btn": "accept",
		"click .btn-success#edit_profile_btn": "edit",
		"click .btn-danger#cancel_btn": "cancel"
	},
	cancel: function(e) {
		e.preventDefault();
		toastr.warning("Closing with no changes") ;
		myRouter.navigate("", {trigger: true} );
	},
	edit: function(e){
        e.preventDefault();
        myRouter.navigate('/medic/edit/' + this.model.get("patientId"), {trigger:true});
    },
	accept: function(e) {
		e.preventDefault();
		toastr.success("Changes applied") ;
		myRouter.navigate("", {trigger: true} );
	},	
	render: function(id) {
        var detailedPatient = new Patient ( {id: id} );
        var that = this;
        detailedPatient.fetch({
        	success:function(){
        		var element = that.template.render(detailedPatient.toJSON());
        		console.log(detailedPatient.toJSON());
        		$(that.el).html(element);
        		return this;
        	}
        });
	}
	});

/*_______________________________________________________________________________*/

var EditInfo = Backbone.View.extend({
	//baseUrl: 'medic/patients/:id',
	baseUrl: 'medic/edit/',
	el: $("#editTemplateDiv"),
	template: $.templates("#editTemplate"),
events: {
	"click .btn-success#change_status_btn": "accept",
	"click .btn-danger#cancel_btn": "cancel"
},
cancel: function(e) {
	e.preventDefault();
	toastr.warning("Closing with no changes") ;
	myRouter.navigate("", {trigger: true} );
},
accept: function(e) {
	e.preventDefault();
	toastr.success("Changes applied") ;
	myRouter.navigate("", {trigger: true} );
},	
render: function(id) {
    var detailedPatient = new Patient ( {id: id} );
    var that = this;
    detailedPatient.fetch({
    	success:function(){
    		var element = that.template.render(detailedPatient.toJSON());
    		console.log(detailedPatient.toJSON());
    		/*****/
    		//	It works outside the pop-up window:
    		//var ident = "ARABIC";
    		//$('#language').val(ident);
    		
    		var ident = detailedPatient.toJSON().language;
    		console.log('	detailedPatient.toJSON().language is ... ' + detailedPatient.toJSON().language);
    		$('#language').val(ident);
    		//$('#language').val = ident;
    		/*****/
    		$(that.el).html(element);
    		return this;
    	}
    });
}
});
/*_______________________________________________________________________________*/


var DetailedInfoCreator = Backbone.View.extend({
		baseUrl: 'medic/create',
		el: $("#registerTemplate"),
	template: $.templates("#createTemplate"),
	events: {
		"click #create_patient_btn": "create",
		"click #cancel_patient_btn": "cancel",
	},
	cancel: function(e) {
		e.preventDefault();
		toastr.warning("Creating new patient cancelled") ;
		myRouter.navigate("", {trigger: true} );
		buttonClick();
	},
	create: function(e) {
        e.preventDefault();
        if ( validate() ) {
        	/*UGLY MASKS*/
        	//$("#ssn").inputmask("999-99-9999");	//	TURN IT ON !!!
        	//$("#ssn").inputmask("999-99-9999", {'autoUnmask' : true});
        	$("#date").inputmask("y/m/d");
        	$("#patientPhoneNumber").inputmask("(999) 999-9999");
        	$("#employerPhoneNumber").inputmask("(999) 999-9999");
        	var newPatientCreate = new PatientCreate({
        		ssn:$('#ssn').val(),
                firstName:$('#firstName').val(),
                lastName:$('#lastName').val(),
                
                dateOfBirth:Date.parse( $('#dateOfBirth').val() ),
                /*dateOfBirth:$('#req').val(),*/
                
                gender:$('#gender').val(),
                maritalStatus:$('#maritalStatus').val(),
                race:$('#race').val(),
                religion:$('#religion').val(),
                language:$('#language').val(),                
                	patientAddress:$('#patientAddress').val(),
                	patientCity:$('#patientCity').val(),
                	patientState:$('#patientState').val(),
                	patientZip:$('#patientZip').val(),
                	patientPhoneNumber:$('#patientPhoneNumber').val(),                
                employerName:$('#employerName').val(),
                employerAddress:$('#employerAddress').val(),
                employerCity:$('#employerCity').val(),                
                employerState:$('#employerState').val(),
                employerZip:$('#employerZip').val(),
                employerPhoneNumber:$('#employerPhoneNumber').val()
                });
           console.log(newPatientCreate);
           newPatientCreate.save();
           toastr.success("New patient was successfully added!") ;
           updatePaging();
           myRouter.navigate("", {trigger: true} );
           buttonClick();
        }
    },
    render: function(model) {
    	$(this.el).html(this.template.render(model));
    }
});


    /*     end DETAILED Patient INFORMATION ends     */


        
	AllPatientView = Backbone.View.extend({
		el : $('#patientListFrame'),
        initialize : function() {
        	_.bindAll(this, 'addOne', 'addAll', 'render');
            patients.bind('reset', this.addAll);
            patients.bind('add', this.addOne);
            patients.fetch();
        },
        addOne : function(patient) {
            var view = new PatientView({
                model : patient
            });
            this.$('#tablePatients').append(view.render().el);
        },
        addAll : function() {
        	patients.each(this.addOne);
        }
    });        
        
    Views = {
            detailedInfo: new DetailedInfo(),
            /*****/
            editInfo: new EditInfo(),
            /*****/
            detailedInfoCreator: new DetailedInfoCreator(),
            allPatientView: new AllPatientView()
    };


        
    // handlers for elements which are not in .content
    $("#buttonLogout").click(function (e) {
        e.preventDefault();
        showModal(0, 0);
        $('.modal-footer .btn-primary').one('click', function(event) {
            event.preventDefault();
            location.href="j_spring_security_logout";
        });
    });
    $(".modal-footer .btn").click(function (e) {
        e.preventDefault();
        closeModal();
    });

});
/*        THE END OF THE GREAT FUNCTION        */


function buttonClick() {
	if(search) {
		patients = new SearchPatientList();
		patientView = new PatientView();
		$.when( updatePagingAfterSearch() ).then(
			Views.allPatientView = new AllPatientView()
		);
		setTimeout(scrollDown, 100);
		/*
		$.when( patients = new SearchPatientList() ).done(function (x) {
			patientView = new PatientView();
			$.when( updatePagingAfterSearch() ).then(
					Views.allPatientView = new AllPatientView()
			);
			setTimeout(scrollDown, 100);
		});
		*/
	} else {
		patients = new PatientList();
		patientView = new PatientView();
		$.when( updatePaging() ).then(
				Views.allPatientView = new AllPatientView()
		);
		setTimeout(scrollDown, 100);
    }
}


function updatePagingAfterSearch() {
    $.ajax({
    	type: "GET",
        url: "medic/getPatientsCountAfterSearch",
        async: false,
        success:function(count) {
        	totalCount = count;
            console.log('totalCount is ' + totalCount);
        }
	}
).responseText;    
totalPages = Math.ceil(totalCount/paging);
console.log('AfterSearch: totalPages is ' + totalPages + ', totalCount is ' + totalCount + ', paging is ' + paging);
$("#previous").attr("disabled", false);
$("#next").attr("disabled", false);
$("#first").attr("disabled", false);
$("#last").attr("disabled", false);
if(totalPages===0) {
        $("#previous").attr("disabled", true);
        $("#next").attr("disabled", true);
    $("#first").attr("disabled", true);
    $("#last").attr("disabled", true);
    totalPages = "NONE";
}
if(totalPages===1) {
    $("#first").attr("disabled", true);
    $("#last").attr("disabled", true);
    $("#previous").attr("disabled", true);
        $("#next").attr("disabled", true);
}
if(index===1) {
    $("#previous").attr("disabled", true);
    $("#first").attr("disabled", true);
}
if(index===totalPages) {
    $("#next").attr("disabled", true);
    $("#last").attr("disabled", true);
}
$("#pageIndex").html(index);
$("#totalPages").html(totalPages);
$("#patientListFrame #tablePatients tbody").html("");
}

function updatePaging() {
    $.ajax({
            type: "GET",
            url: "medic/getPatientsCount",
            async: false,
            success:function(count) {
                totalCount = count;
                console.log('totalCount is ' + totalCount);
            }
        }
    ).responseText;
    totalPages = Math.ceil(totalCount/paging);
    console.log('totalPages is ' + totalPages + ', totalCount is ' + totalCount + ', paging is ' + paging);
    $("#previous").attr("disabled", false);
    $("#next").attr("disabled", false);
    $("#first").attr("disabled", false);
    $("#last").attr("disabled", false);
    if(totalPages===0) {
            $("#previous").attr("disabled", true);
            $("#next").attr("disabled", true);
        $("#first").attr("disabled", true);
        $("#last").attr("disabled", true);
        totalPages = "NONE";
    }
    if(totalPages===1) {
        $("#first").attr("disabled", true);
        $("#last").attr("disabled", true);
        $("#previous").attr("disabled", true);
            $("#next").attr("disabled", true);
    }
    if(index===1) {
        $("#previous").attr("disabled", true);
        $("#first").attr("disabled", true);
    }
    if(index===totalPages) {
        $("#next").attr("disabled", true);
        $("#last").attr("disabled", true);
    }
    $("#pageIndex").html(index);
    $("#totalPages").html(totalPages);
    $("#patientListFrame #tablePatients tbody").html("");
}


function scrollDown() {
    $('html, body').animate({scrollTop: $("#foot").offset().top}, 1);
}


//modals, errors, warnings

function closeModal() {
    $("#modal").fadeOut();
}


function showModal(head, message, id) {
    if (head == 0) {
        $(".modal-footer .btn-primary").html("Yes");
        $(".modal-footer .btn#no").removeClass("hide");
    } else {
        $(".modal-footer .btn-primary").html("Ok");
        $(".modal-footer .btn#no").addClass("hide");
    }
    $(".modal-header h4").html(header[head]);
    $(".modal-body p").html(messages[message]);
    $("#modal").fadeIn();
}


function closeDetailedInfo() {
    $(".container#infoContainer").fadeOut();
}
function closeEditInfo() {
    $(".container#editContainer").fadeOut();
}
function closeDetailedInfoCreator() {
    $(".container#createContainer").fadeOut();
}


	//	AUTOCOMPLETE
$(function() {
	$("#searchValue").autocomplete({
		delay: 300,
		minLength: 2,
		source: function( request, response ) {
			$.ajax({
				url: "/AmMed/autocomplete",
				type: "GET",
				data: {
					term: request.term
				},
				dataType: "json",
				success: function(data) {
					response($.map( data, function( patient ) {
						return {
							label: patient.lastName + ", " + patient.firstName + ", SSN: " + patient.ssn,
							value: patient.firstName
						};
					}));
				}
			});			
		},
		/*focus: function(event, ui) {
            $("input#searchValue").val(ui.item.label);
        },*/
		select: function(event, ui) {
			$("input#searchValue").val(ui.item.value);
			$("#search-btn").click();
		  }
	}).focus(function () {
		$(this).autocomplete("search", this.value);
	});
	});

/*
if ( $("#searchValue").data() ) {

// some jQueryUI versions may use different keys for the object. so to make sure,
// put a breakpoint on the following line and add a watch for $(selector).data(). 
// then you can find out what key is used by your jQueryUI script.

    /*var ac = $("#searchValue").data('uiAutocomplete');
    if ( ac ) {
       // do what you want with the autoComplete object. below is the changed version of an example from jqueryUI autocomplete tutorial

       ac._renderItem = function(ul, item) {
            return $("<li>")
                .append("<a>" + item.label + "</a>")
                .appendTo(ul);
        };
    }
}*/


	


		//VALIDATION

	function validate() {
		if ($('#registerPatientForm').validationEngine('validate')) {
			return true;
		}
	}



	