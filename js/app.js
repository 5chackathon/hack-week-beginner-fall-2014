/*
 * Save the current notes in the list to local storage.
 */
function saveNotes() {
	// Retrieve all the notes from the list.
	var notes = [];

	$("#list li").each(function(index) {
		var note = {
			title: $(this).find(".title").text(),
			content: $(this).find(".content").text()
		}

		notes.push(note);
	});

	localStorage.setItem("notes", JSON.stringify(notes));
}

/*
 * Initialize list. This function will only run when the app loads for the
 * first time.
 */
$(document).ready(function() {
	var notes = localStorage.getItem("notes");

	// If there is nothing in local storage, create a note array and save
	// a default note to it.
	if (notes === null) {
		notes = [];

		var note = {
			title: "My First Note",
			content: "Add a note by clicking the 'New' button!"
		}

		notes.push(note);
	} else {
		notes = JSON.parse(notes);
	}

	// Add all the notes to the list.
	for (var i = 0; i < notes.length; i++) {
		addNote(notes[i]);
	}

	$("#list").sortable({
		delay: 900,
		update: saveNotes,		/* Save notes when the sort order changes */
	});
	$("#list").disableSelection();
});

/*
 * Adds a note object to the note list.
 */
function addNote(note) {
	// create li
	$item = $("<li></li>");
	$title = $("<h1></h1>").text(note.title).addClass("title");
	$content = $("<p></p>").text(note.content).addClass("content");
	$button = $("<div></div>").addClass("button remove").text("Remove");

	$item.append($title);
	$item.append($content);
	$item.append($button);
	$("#list").append($item);

	// Add event handler for the remove button.
	// Removes the list element containing the button.
	$(".remove").click(function(){
		$(this).parent().remove();
		saveNotes();
	});
}

/*
 * Save note button event handler.
 */
$("#saveNoteBtn").click(function() {
	var noteText = $("#noteText").val();
	var noteTitle = $("#noteTitle").val();

	// Don't save a note if there's no text.
	if (noteText === '') {
		return;
	}

	var note = {
		title: noteTitle,
		content: noteText
	}

	addNote(note);

	saveNotes();

	// Reset the inputs for the next note.
	$("#noteText").val("");
	$("#noteTitle").val("");

	// Transition back to the main page.
	$.ui.loadContent("page1", false, true, "slide");
});
