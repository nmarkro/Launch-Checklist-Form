// Write your JavaScript code here!
function allFieldsFilled() {
   return (
      document.querySelector("input[name=pilotName]").value.length > 0 &&
      document.querySelector("input[name=copilotName]").value.length > 0 && 
      document.querySelector("input[name=fuelLevel]").value.length > 0 && 
      document.querySelector("input[name=cargoMass]").value.length > 0
   );
}

function isValid() {
   return (
      document.querySelector("input[name=pilotName]").value && 
      document.querySelector("input[name=copilotName]").value && 
      !isNaN(Number(document.querySelector("input[name=fuelLevel]").value)) &&
      !isNaN(Number(document.querySelector("input[name=cargoMass]").value))
   );
}

function fetchPlanets() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         let mission = json[Math.floor(Math.random() * json.length)];
         const missionDiv = document.getElementById('missionTarget');
         missionDiv.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${mission.name}</li>
               <li>Diameter: ${mission.diameter}</li>
               <li>Star: ${mission.star}</li>
               <li>Distance from Earth: ${mission.distance}</li>
               <li>Number of Moons: ${mission.moons}</li>
            </ol>
            <img src="${mission.image}">
         `;
      });
   });
}

function updateStatus() {
   const itemsDiv = document.getElementById("faultyItems");
   const launchStatus = document.getElementById("launchStatus");

   let pilotName = document.querySelector("input[name=pilotName]").value;
   let copilotName = document.querySelector("input[name=copilotName]").value;
   let fuelLevel = Number(document.querySelector("input[name=fuelLevel]").value);
   let cargoMass = Number(document.querySelector("input[name=cargoMass]").value);

   itemsDiv.innerHTML = `
      <ol>
         <li id="pilotStatus">Pilot ${pilotName} Ready</li>
         <li id="copilotStatus">Co-pilot ${copilotName} Ready</li>
         <li id="fuelStatus">${fuelLevel < 10000 ? "Fuel level too low for launch" : "Fuel level high enough for launch"}</li>
         <li id="cargoStatus">${cargoMass > 10000 ? "Cargo mass too high for launch" : "Cargo mass low enough for launch"}</li>
      </ol>
   `;

   if (fuelLevel < 10000 || cargoMass > 10000) {
      itemsDiv.style.visibility = 'visible';
      launchStatus.innerHTML = "Shuttle not ready for launch";
      launchStatus.style.color = "red";
   } else {
      itemsDiv.style.visibility = 'hidden';
      launchStatus.innerHTML = "Shuttle is ready for launch";
      launchStatus.style.color = "green";
      fetchPlanets();
   }
}

window.addEventListener('load', function() {
   document.querySelector("form").addEventListener("submit", function(event) {
      event.preventDefault();
      if (!allFieldsFilled()) {
         window.alert("All fields are required.")
         return;
      }
      if (!isValid()) {
         window.alert("Make sure to submit valid information for every field.")
         return;
      }
      updateStatus();
   });
});