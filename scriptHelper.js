// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.querySelector("div[id=missionTarget]");
    missionTarget.innerHTML = `
    <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
    `;
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
}

function validateInput(testInput) {
   if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let hasEmptyField = false;
    let testArr = [pilot, copilot, fuelLevel, cargoLevel];
    for (let i = 0; i < 4; i++) {
        if(validateInput(testArr[i]) === "Empty") {
            hasEmptyField = true;
        }
    }

    if(hasEmptyField === true) {
        alert("All fields are required!");
        event.preventDefault();
    } else if(!isNaN(pilot) || !isNaN(copilot)) {
        alert("Make sure to enter valid characters for all of the pilots' names!");
        event.preventDefault();
    } else if(isNaN(fuelLevel) || isNaN(cargoLevel)) {
        alert("Make sure to enter valid digits for the fuel and cargo levels!");
        event.preventDefault();
    } else {
        let launchStatus = document.querySelector("h2[id=launchStatus]");
        let pilotName = document.querySelector("li[id=pilotStatus]");
        let copilotName = document.querySelector("li[id=copilotStatus]");
        let fuelStatus = document.querySelector("li[id=fuelStatus]");
        let cargoStatus = document.querySelector("li[id=cargoStatus]");

        pilotName.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotName.innerHTML = `Co-pilot ${copilot} is ready for launch`;

        if (fuelLevel < 10000) {
            list.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel me up, my guy!";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch.";
            launchStatus.style.color = "red";
        }

        if (cargoLevel > 10000) {
            list.style.visibility = "visible";
            cargoStatus.innerHTML = "Gotta cut some weight, Bro";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch.";
            launchStatus.style.color = "red";
        }

        if(cargoLevel <= 10000 && fuelLevel >= 10000) {
            launchStatus.innerHTML = "Shuttle is Ready for Launch.";
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.style.color = "green";
        }

        event.preventDefault();
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomChoice = Math.floor(Math.random() * 6);
    return planets[randomChoice];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
