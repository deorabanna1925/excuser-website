var categoryElement = document.getElementById('category');
var excuseElement = document.getElementById('excuse');

addCategories();
getExcuse('');

function addCategories() {
    //Random, Family, Office, Children, College, Party
    var random = document.createElement('button');
    random.innerHTML = 'Random';
    random.onclick = function() {
        getExcuse('');
    }
    categoryElement.appendChild(random);
    var family = document.createElement('button');
    family.innerHTML = 'Family';
    family.id = 'family';
    family.onclick = function() {
        getExcuse('family');
    }
    categoryElement.appendChild(family);
    var office = document.createElement('button');
    office.innerHTML = 'Office';
    office.id = 'office';
    office.onclick = function() {
        getExcuse('office');
    }
    categoryElement.appendChild(office);
    var children = document.createElement('button');
    children.innerHTML = 'Children';
    children.id = 'children';
    children.onclick = function() {
        getExcuse('children');
    }
    categoryElement.appendChild(children);
    var college = document.createElement('button');
    college.innerHTML = 'College';
    college.id = 'college';
    college.onclick = function() {
        getExcuse('college');
    }
    categoryElement.appendChild(college);
    var party = document.createElement('button');
    party.innerHTML = 'Party';
    party.id = 'party';
    party.onclick = function() {
        getExcuse('party');
    }
    categoryElement.appendChild(party);
}


function getExcuse(category) {
    fetch('https://excuser.herokuapp.com/v1/excuse/' + category)
        .then(function(response) {
            return response.json();
        }
    ).then(function(data) {
        var excuse = document.createElement('p');
        var excuseCategory = document.createElement('h3');
        var speaker = document.createElement('img');
        excuseCategory.innerHTML = firsletterCapital(data[0].category);
        excuse.innerHTML = data[0].excuse;
        speaker.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/64px-Speaker_Icon.svg.png';
        speaker.onclick = function() {
            speak(data[0].excuse);
        }
        excuseElement.innerHTML = '';
        excuseElement.appendChild(excuse);
        excuseElement.appendChild(excuseCategory);
        excuseElement.appendChild(speaker);
    });
}

function firsletterCapital(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function speak(text) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'en-US';
    msg.rate = 1;
    msg.pitch = 1;
    msg.volume = 1;
    msg.voice = speechSynthesis.getVoices()[getRandomInt(66)];
    window.speechSynthesis.speak(msg);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}