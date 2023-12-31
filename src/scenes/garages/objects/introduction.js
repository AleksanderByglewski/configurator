import {Generic,genericGui,genericState,genericObject,genericDisplay, genericController } from '../base'

class PlanetGui extends genericGui{
    constructor() {
        super();
    }
    createGuiMarkup(attributes){
        let content=""
        for (const key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                content += `<div class="attribute"><strong>${key}:</strong> ${attributes[key]}</div>`;
            }
        }  

        return content;
    }
    createInputMarkup(attributes){
        let inputs = 'Control system for a body';
        for (const key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                inputs += `
                    <div class="input-group align-items-center">
                        <label class="pe-2" for="${key}">${key}</label>
                        <input class="flex-grow-1" type="text" id="${key}" name="${key}" value="${attributes[key]}">
                    </div>`;
            }
        }

        return `
          <div class="accordion" id="parent-inputs-accordion-${this.id}">
            <div class="accordion-item rounded-0 border-end-0 border-top-0 border-start-0">
              <h3 class="accordion-header" id="headingTwo-${this.id}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo-${this.id}" aria-expanded="false" aria-controls="collapseTwo-${this.id}">${attributes.hasOwnProperty("name") ? attributes.name : "DefaultValue"}</button>
              </h3>
              <div id="collapseTwo-${this.id}" class="accordion-collapse collapse" aria-labelledby="headingTwo-${this.id}" data-bs-parent="#parent-inputs-accordion-${this.id}">
                <div class="accordion-body">${inputs}</div>
              </div>
            </div>
          </div>`;
    }
}
class PlanetObject extends genericObject {
    constructor() {
        super();
    }

    create(attributes) {
        // For simplicity, creating a basic sphere using the size attribute as its radius
        // You can customize this creation process based on more attributes if needed
        const geometry = new THREE.SphereGeometry(attributes.size, 32, 32); // Using 'size' attribute for the radius of the sphere
        const material = new THREE.MeshStandardMaterial({ color: 0x4488aa  }); // Basic green color for now
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(attributes.position_x, attributes.position_y, 0); // Assuming z-position is always 0, adjust if needed

        this.set(sphere); // Save the mesh into the model using the parent class method
        this.model.material.color.set(0x4488aa)
        
        //Here is your task I would like for this to be a standard hex color string use
    }

    update(attributes){
        if (!this.model) return; // Exit if model is not set.

        // Update position if new values are provided.
        if (attributes.position_x !== undefined && attributes.position_y !== undefined) {
            this.model.position.set(attributes.position_x, attributes.position_y, 0); // Assuming z-position is always 0
        }
        if(attributes.color!==undefined){
            this.model.material.color=new THREE.Color(attributes.color)
        }
    }

  
}
class Planet extends genericController {
    constructor() {
        super(); 
        this.model = new PlanetObject();
        this.gui=new PlanetGui();
        this.gui.set_mediator(this)
    }
  
    modifyState(iterationStepLength = 0.1) {
        // Calculate new positions using kinematic equations
        const newPositionX = parseFloat(this.state.get('position_x')) + parseFloat(this.state.get('speed_x')) * parseFloat(iterationStepLength) + 0.5 * parseFloat(this.state.get('acceleration_x')) * Math.pow(parseFloat(iterationStepLength), 2);
        const newPositionY = parseFloat(this.state.get('position_y')) + parseFloat(this.state.get('speed_y')) * parseFloat(iterationStepLength) + 0.5 * parseFloat(this.state.get('acceleration_y')) * Math.pow(parseFloat(iterationStepLength), 2);

        // Update the state with the new positions
        this.state.update('position_x', parseFloat(newPositionX));
        this.state.update('position_y', parseFloat(newPositionY));
        
        // Update speed based on acceleration. 
        // This is using the formula: new speed = old speed + acceleration * time
        const newSpeedX = parseFloat(this.state.get('speed_x')) + parseFloat(this.state.get('acceleration_x')) * parseFloat(iterationStepLength);
        const newSpeedY = parseFloat(this.state.get('speed_y')) + parseFloat(this.state.get('acceleration_y')) * parseFloat(iterationStepLength);
        
        // Update the state with the new speeds
        this.state.update('speed_x', parseFloat(newSpeedX));
        this.state.update('speed_y', parseFloat(newSpeedY));
  

 
    }

    handleEvent(event, data) {
        switch (event) {
            case 'guiInputChange':
                Object.entries(data).forEach(([name, value]) => {
                    this.state.update(name, value);  // Call update for each input
                });

            case 'iterationStep':
                // Here, you can add code to execute during each iteration step, if necessary.
                // console.log(`${this.constructor.name} is processing iteration step.`);
                this.modifyState()
                this.model.update(this.state.state)
                break;
            // Handle other events...
            case 'creationStep':
                
                this.model.create(this.state.state); // Passing entire state to the create function
                // Step 2: Retrieve the mesh using the get_model method
                const planetMesh = this.model.get_model();
                // Step 3: Notify PlanetDisplay to add the mesh to the scene

                // this.state.update('position_x', 0);
                // this.state.update('position_y', 0);
                this.display.add_to_scene(planetMesh);
                break;
            case 'stateChange':
                this.model.update(this.state.state)
                break;
            case 'guiChange':
                this.notify('stateChange')
                break;
            default:
                super.handleEvent(event, data); // Call the parent's handleEvent for other events
                break;
        }
    }
}
class System extends genericController {
    constructor() {
        super();

        // Collection of planets
        this.planets = [];
    }
    // Method to add a planet to the system
    addPlanet(planet) {
        if (planet instanceof Planet) {
            this.planets.push(planet);
            planet.set_mediator(this);  // Setting the mediator for the planet
        } else {
            console.error("Only instances of Planet can be added.");
        }
    }
    // Method to remove a planet from the system
    removePlanet(planet) {
        const index = this.planets.indexOf(planet);
        if (index !== -1) {
            this.planets.splice(index, 1);
            planet.set_mediator(null);  // Removing the mediator for the planet
        }
    }
    // Method to get all planets in the system
    getPlanets() {
        return this.planets;
    }
    calculateChanges(planet, planets) {
        let total_ax = 0;
        let total_ay = 0;
    
        const G = 6.67430e-11;  // gravitational constant
        const scaler=1e-24
        // Loop through all other planets
        planets.forEach(otherPlanet => {
            if (otherPlanet !== planet) {
                const dx = otherPlanet.state.get('position_x') - planet.state.get('position_x');
                const dy = otherPlanet.state.get('position_y') - planet.state.get('position_y');
                const r = Math.sqrt(dx*dx + dy*dy);
    
                const a_magnitude = G * otherPlanet.state.get('weight') / (r * r);
                
                const ax_direction = dx / r;
                const ay_direction = dy / r;
        
                total_ax += scaler*ax_direction * a_magnitude;
                total_ay += scaler*ay_direction * a_magnitude;
             
            }
        });
    
        // Update planet's acceleration
        planet.state.update('acceleration_x', total_ax);
        planet.state.update('acceleration_y', total_ay);
    }
    handleEvent(event, data) {
        super.handleEvent(event, data); // Handle events defined in the genericController

        // You can add additional event handling specific to System if needed
        switch (event) {
            // Example:
          

            case 'iterationStep':
                this.planets.forEach(planet => {
                    planet.handleEvent('iterationStep', data);
                });
                this.planets.forEach(planet => {
                    this.calculateChanges(planet, this.planets)
                });
                this.planets.forEach(planet => {
                    planet.gui.generateChanges(planet.state.state)
                });

                break;
            
            case 'planetAdded':
                console.log(`Planet ${data.name} added to the system.`);
                break;
            case 'generateInputs':
                this.planets.forEach(planet => {
                    planet.gui.generateInputs(planet.state.state)
                });
                break;
            // ... other events
            default:
                break;
        }
    }
}
export {PlanetGui, PlanetObject, Planet, System}