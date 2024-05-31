var categoryElement = document.getElementById("category");
var excuseElement = document.getElementById("excuse");
var favoritesElement = document.getElementById("favorites");

addCategories();
getExcuse("");

function addCategories() {
  var random = document.createElement("button");
  random.innerHTML = "Random";
  random.onclick = function () {
    getExcuse("");
  };
  categoryElement.appendChild(random);
  const uniqueCategories = new Set();
  for (const use of localData) {
    uniqueCategories.add(use.category);
  }
  for(let unique of uniqueCategories){
    console.log(unique)
    var button = document.createElement("button");
    button.innerHTML = unique.charAt(0).toUpperCase() + unique.slice(1);
    button.id = unique;
    button.onclick = () => {
      getExcuse(unique);
    };
    categoryElement.appendChild(button);
  }
}

function getExcuse(category) {
  if(category == ""){
    var random = Math.floor(Math.random() * localData.length)
    var data = localData[random]
    excuseElement.innerHTML = "";
    var excuse = document.createElement("p");
    var excuseCategory = document.createElement("h3");
    var speaker = document.createElement("img");
    var favorite = document.createElement("button");
    excuseCategory.innerHTML = firsletterCapital(data.category);
    excuse.innerHTML = data.excuse;
    speaker.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/64px-Speaker_Icon.svg.png";
    speaker.onclick = function () {
      speak(data.excuse);
    };
    favorite.innerHTML = "Add to Favorite";
    favorite.onclick = function () {
      addFavorite(data.excuse, data.category);
    };
    excuseElement.appendChild(excuseCategory);
    excuseElement.appendChild(excuse);
    excuseElement.appendChild(favorite);
    excuseElement.appendChild(speaker);
  }else {
    getAllCategoryData(category)
  }
}

function addFavorite(excuse, category) {
  // save to local storage
  // check if there is already a saved excuse
  var favorites = JSON.parse(localStorage.getItem("favorites"));
  if (favorites == null) {
    favorites = [];
  }
  if (favorites.length == 0) {
    favorites.push({ excuse: excuse, category: category });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    showFavorites();
  } else {
    for (var i = 0; i < favorites.length; i++) {
      if (favorites[i].excuse == excuse) {
        alert("Excuse already in favorites");
        return;
      }else {
        favorites.push({ excuse: excuse, category: category });
        localStorage.setItem("favorites", JSON.stringify(favorites));
        showFavorites();
        return;
      }
    }
  }
}

function getAllCategoryData(category){
  var cateExcuses = localData.filter(excuse => excuse.category === category);
  var random = Math.floor(Math.random() * cateExcuses.length)
  var data = cateExcuses[random]
  excuseElement.innerHTML = "";
  var excuse = document.createElement("p");
  var excuseCategory = document.createElement("h3");
  var speaker = document.createElement("img");
  var favorite = document.createElement("button");
  excuseCategory.innerHTML = firsletterCapital(data.category);
  excuse.innerHTML = data.excuse;
  speaker.src =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/64px-Speaker_Icon.svg.png";
  speaker.onclick = function () {
    speak(data.excuse);
  };
  favorite.innerHTML = "Add to Favorite";
  favorite.onclick = function () {
    addFavorite(data.excuse, data.category);
  };
  excuseElement.appendChild(excuseCategory);
  excuseElement.appendChild(excuse);
  excuseElement.appendChild(favorite);
  excuseElement.appendChild(speaker);
}

showFavorites();

function showFavorites() {
  // get from local storage
  favoritesElement.innerHTML = "";
  var favorites = JSON.parse(localStorage.getItem("favorites"));
  if (favorites == null) {
    favorites = [];
  }
  var favoritesTitle = document.createElement("h2");
  favoritesTitle.innerHTML = "Favorites";
  favoritesElement.appendChild(favoritesTitle);
  var favoritesList = document.createElement("ul");
  for (var i = 0; i < favorites.length; i++) {
    var favorite = document.createElement("li");
    var favoriteExcuse = document.createElement("p");
    var favoriteCategory = document.createElement("h3");
    favoriteExcuse.innerHTML = favorites[i].excuse;
    favoriteCategory.innerHTML = firsletterCapital(favorites[i].category);
    var favoriteDelete = document.createElement("button");
    favoriteDelete.innerHTML = "Remove";
    favoriteDelete.onclick = function () {
        deleteFavorite(this.parentElement.firstChild.innerHTML);
    };
    favorite.appendChild(favoriteExcuse);
    favorite.appendChild(favoriteCategory);
    favorite.appendChild(favoriteDelete);
    favoritesList.appendChild(favorite);
  }
  favoritesElement.appendChild(favoritesList);
}

function deleteFavorite(excuse) {
  var favorites = JSON.parse(localStorage.getItem("favorites"));
  for (var i = 0; i < favorites.length; i++) {
    if (favorites[i].excuse == excuse) {
      favorites.splice(i, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      showFavorites();
      return;
    }
  }
}

function firsletterCapital(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function speak(text) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.lang = "en-US";
  msg.rate = 1;
  msg.pitch = 1;
  msg.volume = 1;
  msg.voice = speechSynthesis.getVoices()[1];
  window.speechSynthesis.speak(msg);
}

function getRandomInt(max) {
  // max = 66
  return Math.floor(Math.random() * Math.floor(max));
}
