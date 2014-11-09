$("#saveNoteBtn").click(function() {

		var noteText = $("#noteText").val();
		var noteTitle = $("#noteTitle").val();
		if(noteText === '') {
			return;
		}

		// create li
		$item = $("<li></li>");
		$title = $("<h1></h1>").text(noteText);
		$content = $("<p></p>").text(noteTitle);
		$button = $("<div></div>").addClass("button remove").text("Remove");

		$item.append($title);
		$item.append($content);
		$item.append($button);
		$("#list").prepend($item);

		// we need to readd trigger
		$(".remove").click(function(){
            $(this).parent().remove();
        });

		cleanUp();
});

	function cleanUp() {
		$("#noteText").val("");
		$("#noteTitle").val("");
	}
