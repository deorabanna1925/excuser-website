var categoryElement = document.getElementById("category");
var excuseElement = document.getElementById("excuse");
var favoritesElement = document.getElementById("favorites");

addCategories();
getExcuse("");

function addCategories() {
  //Random, Family, Office, Children, College, Party
  var random = document.createElement("button");
  random.innerHTML = "Random";
  random.onclick = function () {
    getExcuse("");
  };
  categoryElement.appendChild(random);
  var family = document.createElement("button");
  family.innerHTML = "Family";
  family.id = "family";
  family.onclick = function () {
    getExcuse("family");
  };
  categoryElement.appendChild(family);
  var office = document.createElement("button");
  office.innerHTML = "Office";
  office.id = "office";
  office.onclick = function () {
    getExcuse("office");
  };
  categoryElement.appendChild(office);
  var children = document.createElement("button");
  children.innerHTML = "Children";
  children.id = "children";
  children.onclick = function () {
    getExcuse("children");
  };
  categoryElement.appendChild(children);
  var college = document.createElement("button");
  college.innerHTML = "College";
  college.id = "college";
  college.onclick = function () {
    getExcuse("college");
  };
  categoryElement.appendChild(college);
  var party = document.createElement("button");
  party.innerHTML = "Party";
  party.id = "party";
  party.onclick = function () {
    getExcuse("party");
  };
  categoryElement.appendChild(party);
}

function getExcuse(category) {
  excuseElement.innerHTML = "";
  fetch("https://excuser.herokuapp.com/v1/excuse/" + category)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var excuse = document.createElement("p");
      var excuseCategory = document.createElement("h3");
      var speaker = document.createElement("img");
      var favorite = document.createElement("button");
      excuseCategory.innerHTML = firsletterCapital(data[0].category);
      excuse.innerHTML = data[0].excuse;
      speaker.src =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/64px-Speaker_Icon.svg.png";
      speaker.onclick = function () {
        speak(data[0].excuse);
      };
      favorite.innerHTML = "Add to Favorite";
      favorite.onclick = function () {
        addFavorite(data[0].excuse, data[0].category);
      };
      excuseElement.appendChild(excuseCategory);
      excuseElement.appendChild(excuse);
      excuseElement.appendChild(favorite);
      excuseElement.appendChild(speaker);
    });
}

function addFavorite(excuse, category) {
  // save to local storage
  // chceck if there is already a saved excuse
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
    favoriteDelete.innerHTML = "Delete";
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
  msg.voice = speechSynthesis.getVoices()[getRandomInt(66)];
  window.speechSynthesis.speak(msg);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
