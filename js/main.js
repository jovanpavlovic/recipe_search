
var appId = "fc57baf5";
var appKey = "a604c27d9fd27b5ace8ec622c5022c02";

var diet = document.querySelector(".diet");
var health = document.querySelector(".health");
var searchFood = document.querySelector(".keyword-input");
var recipesSection = document.querySelector("#recipes");
var calValues = document.querySelectorAll(".cal");

var dietValue = '';
var healthValue = '';
var c1Value = '';
var c2Value = '';

function getRecipes(searchValue) {
	var request = new XMLHttpRequest();

	console.log(searchValue);

	var requestURL = 'https://api.edamam.com/search?q=' + searchValue + '&app_id=' + appId + '&app_key=' + appKey + "&from=0&to=12";
	var cValue;


	if (dietValue) {
		requestURL = requestURL + '&diet=' + dietValue;
	}

	if (healthValue) {
		requestURL = requestURL + '&health=' + healthValue;
	}

	if (c1Value) {
		if (c2Value) {
			cValue = c1Value + '-' + c2Value;
		} else {
			cValue = c1 + '+';
		}
	} else if (c2Value) {
		cValue = c2 + '+';
	}

	if (cValue) {
		requestURL = requestURL + '&calories=' + cValue;
		console.log(cValue);
	}



	request.open("GET", requestURL);

	request.onload = function(){
		console.log(JSON.parse(request.responseText));
		listRecipes(JSON.parse(request.responseText).hits); 

		var count = document.querySelector(".recipe-count-number");
		count.textContent = JSON.parse(request.responseText).count;
	}

	request.send();
}





function listRecipes(recipes) {

	recipesSection.innerHTML = "";

	recipes.forEach(function(recipe) {
		addRecipe(recipe);
	})

	
}




function addRecipe(recipeData) {	
	var recipeElement = document.createElement("div");
	recipeElement.classList.add("recipe-element");
	var img = '<img src="' + recipeData.recipe.image +'">';
	var title = '<h3>' + recipeData.recipe.label + '</h3>';

	var calories = '<div class="calories">' +  Math.round(recipeData.recipe.calories / recipeData.recipe.yield) + '</div>';

	var labels = '<div class="labels">';

	var myLabels = recipeData.recipe.healthLabels;

	myLabels.forEach((element)=> {
		var label = '<div class="label">' + element +'</div>';
		console.log(element)
		labels += label;
	})
	
	labels.innerHTML ='</div>';

	recipeElement.innerHTML = img + title + labels + calories;

	recipesSection.appendChild(recipeElement);

}



// init 

var button = document.querySelector(".search-button");

calValues[0].onkeyup = function() {
	window.c1Value = calValues[0].value;
	console.log(c1Value);
}

calValues[1].onkeyup = function() {
	window.c2Value = calValues[1].value;
	console.log(c2Value);
}

searchFood.onkeyup = function() {
	button.removeAttribute("disabled");
	if (searchFood.value === "") {
		button.setAttribute("disabled", true);
	}
	window.foodValue = searchFood.value;
	console.log(foodValue);
}

diet.onchange = function() {
	dietValue = diet.value;
	console.log(dietValue);
}

health.onchange = function() {
	healthValue = health.value;
	console.log(healthValue);
}

button.addEventListener("click", e=> {
	console.log(e);
	// onSearch();
	getRecipes(foodValue);
})