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

		cleanUp();
});

	function cleanUp() {
		alert("Note successfully added!");
		$("#noteText").val("");
		$("#noteTitle").val("");
	}
