
/* ======= Model ======= */

$(function() {
	var model = {
		init: function() {
			CatViewed: null,
			CatList = [
				{
					"name": "Grumpy Cat",
					"pic": "media/GrumpyCat.jpg",
					"clicks": 0
				},
				{
					"name": "Evil Cat",
					"pic": "media/EvilCat.jpg",
					"clicks": 0
				},
				{
					"name": "Demon Cat",
					"pic": "media/DemonCat.jpg",
					"clicks": 0
				},
				{
					"name": "Devil Cat",
					"pic": "media/DevilCat.jpg",
					"clicks": 0
				},
				{
					"name": "Monster Cat",
					"pic": "media/MonsterCat.jpg",
					"clicks": 0
				}
			];
		},
		getCatList: function() {
			return CatList;
		},
		getCatViewed: function() {
			return CatViewed;
		},
		changeCatViewed: function(index) {
			CatViewed = index;
		},
		incrementCatCount: function(index) {
			CatList[index].clicks += 1;
		}
	};
	
	/* ======= Octopus ======= */
	
	var octopus = {
		init: function() {
			model.init();
			catView.init();
		},
		getCats: function() {
			return model.getCatList();
		},
		getCat: function() {
			return model.getCatViewed();	
		},
		changeCat: function(index) {
			model.changeCatViewed(index);
			displayCat.render();
		},
		incrementCatCount: function(index) {
			model.incrementCatCount(index);
			displayCat.render();
		}
	};
	
	/* ======= View ======= */
	
	var catView = {
		init: function() {
			cats = octopus.getCats();
			var toAppend = "";
			$.each(cats, function(catIndex, cat) {
				toAppend += "<li class='cat list-group-item'>" + cat.name + "</li>";
			});
			$("#list").append("<ul class='list-group'>" + toAppend + "</ul>");
			$(".cat").click(function(obj) {
				id = cats.indexOf(cats.filter(function(a){ return a.name == obj.target.innerHTML; })[0]);
				octopus.changeCat(id);
			});
		}
	};
	
	var displayCat = {
		render: function() {
			$("#display").empty();
			cats = octopus.getCats();
			cat = cats[octopus.getCat()];
			var toDisplay = "<div class='container'><div class='name'>" + cat.name + "</div><img src='" + cat.pic + "' class='clickable'/><div id='" + id.toString() + "' class='count'>" + cat.clicks.toString() + "</div></div>";
			$("#display").append(toDisplay);
			$(".clickable").click(function(object) {
				var elem = object.target.parentElement.childNodes[2];
				cats[elem.id].clicks += 1;
				$("#" + elem.id).text(cats[elem.id].clicks);
			});
		}
	};
	
	octopus.init();
});