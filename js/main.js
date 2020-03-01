import * as imported from './modules.js'
const {appId, appKey, Image, Title, Calories, Label, Recipe, Labels} = imported;

const diet = document.querySelector(".diet");
const health = document.querySelector(".health");
const searchFood = document.querySelector(".keyword-input");
const recipesSection = document.querySelector("#recipes");
const calValues = document.querySelectorAll(".cal");

let dietValue = '';
let healthValue = '';
let cal1Value = '';
let cal2Value = '';
let calVal = '';

class Url{

	constructor(adress){
		this.adress = adress;
	}

	checkDiet(){
		if (dietValue) {
			this.adress += `&diet=${dietValue}`;
		}
	}

	checkHealth(){
		if (healthValue) {
			this.adress += `&health=${healthValue}`;
		}
	}

	checkCalories(){
		if (cal2Value) {
			calVal = cal2Value + '-';
			if (cal1Value) {
				calVal += cal1Value;
			}
		} else if (calVal) {
			calVal = cal1Value;
		}

		if (calVal) {
			this.adress += `&calories=${calVal}`;
		}
	}

	checkPaprameters(){
		this.checkDiet();
		this.checkHealth();
		this.checkCalories();
	}
}


const getRecipes = (searchValue) => {

	let requestURL = new Url (`https://api.edamam.com/search?q=${searchValue}&app_id=${appId}&app_key=${appKey}&from=0&to=12`);
	requestURL.checkPaprameters();

	fetch(requestURL.adress)
  	.then((response) => {
    	return response.json();
  	})
  	.then((myJson) => {
    	listRecipes(myJson.hits);
    	let count = document.querySelector(".recipe-count-number");
		myJson.count === 0 ? 
		alert("No results found. Please type in some food name. *Pizza* for example!") : 
		count.textContent = myJson.count;
  	})
  	.catch((error) => {
	  alert(`Error: ${error}`);
	});

}

const listRecipes = recipes => {
	recipesSection.innerHTML = "";
	recipes.forEach(recipe => addRecipe(recipe));
}

const addRecipe = recipeData => {	
	let {image, label, calories, healthLabels} = recipeData.recipe;

	let img = new Image(image);
	let title = new Title(label)
	let cals = new Calories(Math.round(calories/recipeData.recipe.yield));
	let labels = new Labels();

	healthLabels.forEach(element => {
		let label = new Label(element);
		labels.addLabel(label.content);
	})
	let recipeElement = new Recipe(img.content + title.content + cals.content + labels.content);
	recipesSection.innerHTML += recipeElement.content;
}

// init 

const button = document.querySelector(".search-button");

calValues[0].onkeyup = () => cal1Value = calValues[0].value;
calValues[1].onkeyup = () => cal1Value = calValues[1].value;

searchFood.onkeyup = () => {
	button.removeAttribute("disabled");
	if (searchFood.value === "") {
		button.setAttribute("disabled", true);
	}
	window.foodValue = searchFood.value;
}

diet.onchange = () => dietValue = diet.value;


health.onchange = () => healthValue = health.value;

button.addEventListener("click", () => getRecipes(foodValue));