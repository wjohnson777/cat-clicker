/* ======= Model ======= */

$(function() {
	var model = {
		init: function() {
			CatViewed: null;
			CatList = [
				{
					name: "Grumpy Cat",
					pic: "media/GrumpyCat.jpg",
					clicks: 0
				},
				{
					name: "Evil Cat",
					pic: "media/EvilCat.jpg",
					clicks: 0
				},
				{
					name: "Demon Cat",
					pic: "media/DemonCat.jpg",
					clicks: 0
				},
				{
					name: "Devil Cat",
					pic: "media/DevilCat.jpg",
					clicks: 0
				},
				{
					name: "Monster Cat",
					pic: "media/MonsterCat.jpg",
					clicks: 0
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
		},
		editCatViewed: function(name, pic, clicks) {
			CatList[CatViewed].name = name;
			CatList[CatViewed].pic = pic;
			CatList[CatViewed].clicks = clicks;
		}
	};
	
	/* ======= Octopus ======= */
	
	var octopus = {
		init: function() {
			model.init();
			catView.render();
			adminView.init();
		},
		getCats: function() {
			return model.getCatList();
		},
		getCat: function() {
			return model.getCatViewed();	
		},
		changeCat: function(index) {
			model.changeCatViewed(index);
			catView.render();
			displayCat.render();
		},
		incrementCatCount: function(index) {
			model.incrementCatCount(index);
			displayCat.render();
		},
		editCat: function(name, pic, clicks) {
			model.editCatViewed(name, pic, clicks);
			catView.render();
			displayCat.render();
		}
	};
	
	/* ======= View ======= */
	
	var catView = {
		render: function() {
			$("#list").empty();
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
			var toDisplay = "<div class='container'><div class='name'>" + cat.name + "</div><img src='" + cat.pic + "' class='clickable'/><div id='" + octopus.getCat().toString() + "' class='count'>" + cat.clicks.toString() + "</div></div>";
			$("#display").append(toDisplay);
			$(".clickable").click(function(object) {
				var elem = object.target.parentElement.childNodes[2];
				octopus.incrementCatCount(elem.id);
				$("#" + elem.id).text(cats[elem.id].clicks);
			});
		}
	};
	
	var adminView = {
		init: function() {
			$("#admin-button").click(function() {
				adminView.render();
			});
		},
		render: function() {
			cats = octopus.getCats();
			cat = cats[octopus.getCat()];
			if (cat != null) {
				$("#admin").empty();
				editor = "";
				editor += "<form>Name: <input type='text' name='name'><br>Pic: <input type='text' name='pic'><br>clicks: <input type='text' name='clicks'><div id='save'>Save</div><div id='cancel'>Cancel</div></form>";
				$("#admin").append(editor);
				$("input[name=name]").val(cat.name);
				$("input[name=pic]").val(cat.pic);
				$("input[name=clicks]").val(cat.clicks);
				$("#save").click(function() {
					name = $("input[name=name]").val();
					pic = $("input[name=pic]").val();
					clicks = $("input[name=clicks]").val();
					octopus.editCat(name, pic, clicks);
					$("#admin").empty();
				});
				$("#cancel").click(function() {
					$("#admin").empty();
				});
			}
		}
	}
	octopus.init();
});