$(document).ready(function() {
	var counter = 0;
	$("#counter").append("<c id='clicks'>" + counter.toString() + "</c>");
	$("#img").click(function() {
		counter += 1;
		$("#clicks").text(counter.toString());
	});
});