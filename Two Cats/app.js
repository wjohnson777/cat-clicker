var cats = [
{
	"name": "Grumpy Cat",
	"pic": "media/GrumpyCat.jpg",
	"clicks": 0
},
{
	"name": "Evil Cat",
	"pic": "media/EvilCat.jpg",
	"clicks": 0
}
];

function makeTwoCats() {
	var twoCats = "";
	$.each(cats, function(catIndex, cat) {
		twoCats += "<div class='cat col-xs-6'><div class='container'><div class='name'>" + cat.name + "</div><img src='" + cat.pic + "' class='clickable'/><div id='" + catIndex.toString() + "' class='count'>" + cat.clicks.toString() + "</div></div></div>";
	});
	$("#main").append("<div class='row'><div class='container'>" + twoCats + "</div></div>");
}


$(document).ready(function() {
	makeTwoCats();
	$(".clickable").click(function(obj) {
		var elem = obj.target.parentElement.childNodes[2];
		cats[elem.id].clicks += 1;
		$("#" + elem.id).text(cats[elem.id].clicks);
	});
});