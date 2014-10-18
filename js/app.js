var parseAPPID ="nWaGdXUhchnfgMeTeBC6d5pZZChOcEWM8Dl0FSwj";
var parseJSID = "lvlI3tjmZ36VNA4dTTuilqJQCHwPyvRnocbvK4eI";

//Initialize Parse
Parse.initialize(parseAPPID,parseJSID);

var NoteOb = Parse.Object.extend("Note");

$(document).on("pageshow", "#home", function(e, ui) {
	$.mobile.loading("show");

	var query = new Parse.Query(NoteOb);
	query.limit(10);
	query.descending("createdAt");

	query.find({ 
		success:function(results) {
			$.mobile.loading("hide");
			var s = "";
			for(var i=0; i<results.length; i++) {
				//Lame - should be using a template
				s += "<p>";
				s += "<h3>Note " + results[i].createdAt + "</h3>";
				s += results[i].get("text");
				var pic = results[i].get("picture");
				if(pic) {
					s += "<br/><img src='" + pic.url() + "'>";
				}
				s += "</p>";
			}
			$("#home div[data-role=content]").html(s);
		},error:function(e) {
			$.mobile.loading("hide");

		}
	});
});

$(document).on("pageshow", "#addNote", function(e, ui) {

	var imagedata = "";

	$("#saveNoteBtn").on("touchend", function(e) {
		//e.preventDefault();
		//$(this).attr("disabled","disabled").button("refresh");

		var noteText = $("#noteText").val();
		if(noteText === '') return;

			var note = new NoteOb();
			note.set("text",noteText);
			note.save(null, {
				success:function(ob) {
					$.mobile.changePage("#home");
				}, error:function(e) {
					console.log("Oh crap", e);
				}
			});
			cleanUp();
	});
	
	function failHandler(e) {
		alert("ErrorFromC");
		alert(e);
		console.log(e.toString());
	}

	function cleanUp() {
		$("#noteText").val("");
	}

});
