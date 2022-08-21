// Write your JavaScript code here!

//const { addDestinationInfo } = require("./scriptHelper");

//const { myFetch, pickPlanet } = require("./scriptHelper");

//const { formSubmission } = require("./scriptHelper");

window.addEventListener("load", function() {
    let form = document.querySelector("form");
    let list = document.querySelector("div[id=faultyItems]");
    list.style.visibility = "hidden";

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let pilot = document.querySelector("input[name=pilotName]");
        let copilot = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoMass = document.querySelector("input[name=cargoMass]");

        formSubmission(document, list, pilot.value, copilot.value, fuelLevel.value, cargoMass.value);
    });

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let chosenPlanet = pickPlanet(listedPlanets);

        let name = chosenPlanet.name;
        let diameter = chosenPlanet.diameter;
        let star = chosenPlanet.star;
        let distance = chosenPlanet.distance;
        let moons = chosenPlanet.moons;
        let image = chosenPlanet.image;

        addDestinationInfo(document, name, diameter, star, distance, moons, image);
   })
   
});