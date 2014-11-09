/*
 * Initialize list.
 */
$(function() {
	$("#list").sortable({
		delay: 900
	});
	$("#list").disableSelection();
});

/*
 * Remove button event handler.
 */
$(".remove").click(function() {
	$(this).parent().remove();
})

/*
 * Adds a note to the list.
 */
$("#saveNoteBtn").click(function() {
	var noteText = $("#noteText").val();
	var noteTitle = $("#noteTitle").val();
	if(noteText === '') {
		return;
	}

	// create li
	$item = $("<li></li>");
	$title = $("<h1></h1>").text(noteTitle);
	$content = $("<p></p>").text(noteText);
	$button = $("<div></div>").addClass("button remove").text("Remove");

	$item.append($title);
	$item.append($content);
	$item.append($button);
	$("#list").prepend($item);

	// we need to recreate trigger
	$(".remove").click(function(){
		$(this).parent().remove();
	});

	// Reset the inputs for the next note.
	$("#noteText").val("");
	$("#noteTitle").val("");

	// Transition back to the main page.
	$.ui.loadContent("page1", false, true, "slide");
});
