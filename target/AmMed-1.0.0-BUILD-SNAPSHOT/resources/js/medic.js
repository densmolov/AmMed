var Views = { };
var patients;

var AllPatientView;
var PatientView;

var Patient = Backbone.Model.extend({
        urlRoot : '/AmMed/medic/patients'                        
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
        this.field=$('#filter').val();
        this.value=$('#criteria').val();
        this.index = index;
    },
    url: function() {
        return this.baseUrl + '?' + $.param({
            field: this.field,
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
    	   "/patients/:id": 'informMe',
    	   "": 'start',
    	   "/create": "create",
    	   //"/patients/edit": 'edit'
       },
        start: function() {
          closeModal();
          closeDetailedInfo();
          closeDetailedInfoCreator();
        },
        informMe: function(id) {
        	this.id = id;
        	Views.detailedInfo.render(id);
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
            if($('#criteria').val()==="") {
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
        template: _.template($("#rowpatient").html()),
        events: {
            "click #info": "clicked"
        },
        clicked: function(e){
            e.preventDefault();
            myRouter.navigate('/patients/' + this.model.get("patientId"), {trigger:true});
        },
        initialize: function(){
            _.bind(this.render, this);
        },
        render: function() {
            var element = this.template(this.model.toJSON());
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
	template: _.template($("#showinfotemplate").html()),
	events: {
		"click .btn-success#change_status_btn": "accept",
		//"click .btn-success#edit_btn": "edit",
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
				var element = that.template(detailedPatient.toJSON());
				console.log(detailedPatient.toJSON());
				$(that.el).html(element);
			}
		});
	}
	});

var DetailedInfoCreator = Backbone.View.extend({
		baseUrl: 'medic/create',
		el: $("#patientTemplateCreate"),
	template: _.template($("#showinfotemplateCreate").html()),
	events: {
		"click #create_patient_btn": "create",
		"click #cancel_patient_btn": "cancel",
	},
	cancel: function(e) {
		e.preventDefault();
		toastr.warning("Creating new patient cancelled") ;
		myRouter.navigate("", {trigger: true} );
	},
	create: function() {
        //e.preventDefault();
        //if(validate()) {
        	var newPatient = new Patient({
        		SSN:$('SSN').val(),
                firstName:$('#firstName').val(),
                lastName:$('#lastName').val(),
                gender: {
                	gender: $("input:radio[name ='gender']:checked").val(),
                },
                maritalStatus: {
                	maritalStatus: $("input:radio[name ='maritalStatus']:checked").val(),
                },
                race: {
                	race: $("input:radio[name ='race']:checked").val(),
                },
                religion:$('#religion').val(),
                language:$('#language').val(),
                
                //Patient contacts:
                language:$('#patientAddress').val(),
                language:$('#patientCity').val(),
                patientState: {
                	patientState: $("input:radio[name ='patientState']:checked").val(),	//patientStateID
                },
                language:$('#patientZip').val(),
                language:$('#patientPhoneNumber').val(),
                
                //Employer contacts:
                language:$('#employerName').val(),
                language:$('#employerAddress').val(),
                language:$('#employerCity').val(),
                employerState: {
                	employerState: $("input:radio[name ='employerState']:checked").val(),
                },
                language:$('#employerZip').val(),
                language:$('#employerPhoneNumber').val()
                });
           console.log(newPatient);
           newPatient.save();
           toastr.success("New patient was successfully added!") ;
           buttonClick();
           /*****/
           //$(this.el).html(newPatient);
           /*****/
           myRouter.navigate("", {trigger: true} );
        //}
    },
    render: function(model) {
        $(this.el).html(this.template(model));
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
    $(".container#createshowinfo").fadeOut();
}
function closeDetailedInfoCreator() {
    $(".container#createshowinfoCreate").fadeOut();
}





