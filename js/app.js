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
			var $content = $("<div></div>");

			// clean out the content
			$(".list").html("");

			console.log(results.length);
			for(var i=0; i<results.length; i++) {
				$innerContent = $("<li></li>");
				var titleText;
				if (results[i].get("title")) {
					titleText = results[i].get("title");
				} else {
					titleText = "Untitled"
				}

				$title = $("<h1></h1>")
						.text(titleText);
				$hiddenContent = $("<p></p>")
						.addClass("noteContent")
						.text(results[i].get("text"));
				
				$innerContent.append($title);
				$innerContent.append($hiddenContent);

				$("#list").append($innerContent)
				// $content.append($innerContent);
			}

			$("#list li").on("delete", function(evt) {
  				console.log("sdf");
			});
		},error:function(e) {
			$.mobile.loading("hide");

		}
	});
});

$(document).on("pageshow", "#addNote", function(e, ui) {

	$("#saveNoteBtn").on("click", function(e) {
		//e.preventDefault();
		//$(this).attr("disabled","disabled").button("refresh");

		var noteText = $("#noteText").val();
		var noteTitle = $("#noteTitle").val();
		if(noteText === '') return;

			var note = new NoteOb();
			note.set("text",noteText);
			note.set("title", noteTitle);
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
		$("#noteTitle").val("");
	}

});
