const appId = "fc57baf5";
const appKey = "a604c27d9fd27b5ace8ec622c5022c02";

class Image {
	constructor(source) {
		this.content = `<img src='${source}'>`;
	}
}

class Title {
	constructor(title) {
		this.content = `<h3>${title}</h3>`;
	}
}

class Calories {
	constructor(calories) {
		this.content = `<div class="calories">${calories}</div>`
	}
}

class Label {
	constructor(topic) {
		this.content = `<div class="label">${topic}</div>`;
	}
}

class Recipe {
	constructor(elements){
		this.content = `<div class="recipe-element">${elements}</div>`;
	}
}

class Labels {
	constructor(){
		this.inner = '';
		this.content = `<div class="labels">${this.inner}</div>`;
	}

	addLabel(text) {
		this.inner += text;
		this.content = `<div class="labels">${this.inner}</div>`;
	}
}

export {appId, appKey, Image, Title, Calories, Recipe, Labels, Label};