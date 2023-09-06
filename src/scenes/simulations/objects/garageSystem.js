import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';
import { accesser } from '../base'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../base'
import { PlanetGui, PlanetObject, Planet, System } from './introduction.js'
import { genericGarageObject, genericGarageController } from './generic'

//Quick fix

import {RoofGarageController} from './roof'
import {WallsGarageController} from './wall'
import {GateGarageController, DoorGarageController, WindowGarageController} from './gate'
import {Ground, closeGround} from './ground'

class GarageSystem extends genericGarageController {
    constructor() {
        super();
        this.model = new genericGarageObject();
        this.model.set_mediator(this);
        this.gui = new GarageSystemGui();
        this.gui.set_mediator(this);
    }

    determineState() {

        //You can get the current state of the object by using the 
        let name = this.state.get('name') || 'Roof'
        let roof_type = this.state.get('roof_type') || 'flat'
        let roof_width = parseFloat(this.state.get('roof_width')) || 1
        let roof_height = parseFloat(this.state.get('roof_height')) || 2
        let roof_color = this.state.get('color') || "#272727"
        let roof_angle = parseFloat(this.state.get('roof_angle')) || 30
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.1

        let wall_height = parseFloat(this.state.get('wall_height')) || 2
        let wall_depth = parseFloat(this.state.get('wall_depth')) || 5
        let wall_width = parseFloat(this.state.get('wall_width')) || 2

        //    this.state.state['position_y']=0.2+1*Math.sin(180*roof_angle/Math.PI)
        const walls = [
            new accesser('position_x', 0.0),
            new accesser('position_y', wall_height / 2),
            new accesser('position_z', 0),
            new accesser('object_height', wall_height),
            new accesser('object_depth', wall_depth),
            new accesser('object_width', wall_width),
            new accesser('height', wall_height),
            new accesser('depth', wall_depth),
            //  new accesser('depth',parseFloat(this.state.get('wall_height'))),

        ]
        const roof = [
            new accesser('position_x', 0.0),
            new accesser('base_position_y', wall_height),
            new accesser('position_y', wall_height),
            new accesser('position_z', 0),
            new accesser('roof_width', wall_width),
            new accesser('roof_depth', wall_depth),
            new accesser('base_position_y', wall_width),
        ]

        return { "walls": walls, "roof": roof }
    }
    calculateState() {
        //  alert("hello state2")
        console.log(this.children)
        const accessersDict = this.determineState();
        Object.keys(accessersDict).forEach((key, index) => {
            if (this.children[index]) {
                this.set_the_options(this.children[index], accessersDict[key]);
                this.children[index].handleEvent('creationStep')
            }
        })
    }

    handleEvent(event, data) {
        switch (event) {
            case 'generateInputs':
                this.gui.generateInputs(this.state.state)
                if (this.children) {
                    this.children.forEach(child => {
                        child.gui.generateInputs(child.state.state)
                    });
                }
            default:
                super.handleEvent(event, data);
                break;
        }
    }

}
class GarageSystemGui extends genericGui {
    constructor() {
        super();
    }

    generateInputs(attributes) {



        const markup = this.createInputMarkup(attributes)
        const escapedId = '#id-' + this.id + '.input-values';
        this.insertContent(markup, escapedId, 'input-values', this.id)

        const parentElement = document.getElementById(`parent-inputs-accordion-${this.id}`);
        const rangeInputs = parentElement.querySelectorAll(`input[type="range"]`);




        rangeInputs.forEach(rangeInput => {
            rangeInput.addEventListener('input', function () {
                const textInputId = this.id.replace('-range', '');
                const textInput = parentElement.querySelector(`#${textInputId}`);
                textInput.value = this.value;
            });
        });

        // Optional: Attach event listeners for the text inputs to update the corresponding range input
        const textInputs = parentElement.querySelectorAll(`input[type="text"]`);

        textInputs.forEach(textInput => {
            textInput.addEventListener('input', function () {
                const rangeInput = parentElement.querySelector(`#${this.id}-range`);
                rangeInput.value = this.value;
            });
        });

        let self=this
        document.querySelectorAll('.add-button').forEach(button => {
            button.addEventListener('click', function(event) {
                // Get the associated <select> element
                self
                let scene=self.mediator.display.get_scene()
                const selectElement = event.target.previousElementSibling;
          
                // Get the value of the selected option
                const selectedIndex = parseInt(selectElement.value, 10);
                // console.log(self.mediator.children[0].children[selectedIndex]);
                // Log the desired element from this.mediator.children based on the selected value

                let parentElement = event.target.closest('.this-is-the-adder');
                if (!parentElement) {
                    console.warn('No parent found with class "this-is-the-adder".');
                    return;
                }
        
                // Get the data-type attribute
                let dataType = parentElement.getAttribute('data-type');
        
                // Determine which type of controller to instantiate based on the data-type
                let gate;
                switch (dataType) {
                    case 'Bramy':
                        gate = new GateGarageController();
                        break;
                    case 'Drzwi':
                        gate = new DoorGarageController();
                        break;
                    case 'Okna':
                        gate = new WindowGarageController();
                        break;
                    default:
                        console.warn('Unknown data-type:', dataType);
                        return;
                }

                // const gate=new GateGarageController()
                gate.display.set_scene(scene)
                gate.display.set_scene(scene)
                gate.handleEvent('buildingStep');
                gate.handleEvent('creationStep');
                gate.handleEvent('stateChange');
                gate.handleEvent('generateInputs');
                // gate.handleEvent('buildingStep');
                // gate.handleEvent('creationStep');
                if(selectedIndex==2 || selectedIndex==0){
                gate.state.state.position_z="-0.005"}

                // add-element'+names[i]


                self.mediator.children[0].children[selectedIndex].addChild(gate)
                self.mediator.handleEvent('generateInputs');
                self.mediator.handleEvent('guiInputChange', {});
    
            });
          });

        this.listenToChanges()
    }

    createInputMarkup(attributes) {


        let value = this.mediator.children[0]
        if (value !== undefined) {
            console.log('hi')
            console.log(value.children[0])
            console.log('hii')
        }
        if (this.childrene && Array.isArray(this.children) && this.children.length > 0) {
            let firstElement = this.children[0];

            console.log(firstElement);
        }


        let accordion = '<div class="accordion">';

        let names = ['Bramy', 'Drzwi', 'Okna'];

        for (let i = 0; i < names.length; i++) {
            accordion += `
                <div id="${'add-element'+names[i]}" data-type="${names[i]}" class="this-is-the-adder accordion-item rounded-0 border-end-0 border-top-0 border-start-0">
                    <h2 class="accordion-header" id="additional-heading-${i}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#additional-collapse-${i}" aria-expanded="false" aria-controls="additional-collapse-${i}">
                            ${names[i]}
                        </button>
                    </h2>
                    <div id="additional-collapse-${i}" class="accordion-collapse collapse" aria-labelledby="additional-heading-${i}" data-bs-parent=".accordion">
                    <div class="accordion-body">
                            Ściana
                            <select data-index="${i}">
                            <option value="1">Przednia</option>
                            <option value="0">Tylnia </option>
                            <option value="3">Prawa</option>
                            <option value="2">Lewa</option>
                            </select>
                            <button data-index="${i}" class="add-button">Add</button>
                        </div>
                    </div>
                </div>`;
        }


        accordion += '</div>';

        let accordion2 = '<div class="accordion">';

        const excludeKeys = ['name', 'gender'];

        const filteredAttributes = Object.fromEntries(
            Object.entries(attributes).filter(([key]) => !excludeKeys.includes(key))
        );


        const includeKeysWide = ['wall_depth', 'wall_width'];

        const filteredAttributesWide = Object.fromEntries(
            Object.entries(attributes).filter(([key]) => includeKeysWide.includes(key))
        );

        const includeKeysSemi = ['wall_height'];

        const filteredAttributesSemi = Object.fromEntries(
            Object.entries(attributes).filter(([key]) => includeKeysSemi.includes(key))
        );


        const includeKeysNarrow = ['position_x', 'position_y', 'position_z'];

        const filteredAttributesNarrow = Object.fromEntries(
            Object.entries(attributes).filter(([key]) => includeKeysNarrow.includes(key))
        );

        let inputs = '';
        for (const key in filteredAttributesWide) {
            if (attributes.hasOwnProperty(key)) {
                inputs += `
                    <div class="input-group align-items-center ">
                        <label class="pe-2 d-block" for="${key}">${key}</label>
                        <input class="flex-grow-1" type="text" id="${key}" name="${key}" value="${attributes[key]}">
                        <label class="pe-2 d-block" for="${key}-range"></label>
                        <input type="range" class="mt-2 mb-3 form-range" min="2" step="0.5" max="8" name="${key}" value="${filteredAttributes[key]}" id="${key}-range">
                    </div>`;
            }
        }

        for (const key in filteredAttributesSemi) {
            if (attributes.hasOwnProperty(key)) {
                inputs += `
                    <div class="input-group align-items-center ">
                        <label class="pe-2 d-block" for="${key}">${key}</label>
                        <input class="flex-grow-1" type="text" id="${key}" name="${key}" value="${attributes[key]}">
                        <label class="pe-2 d-block" for="${key}-range"></label>
                        <input type="range" class="mt-2 mb-3 form-range" min="1.83" step="0.1" max="3.23" name="${key}" value="${filteredAttributes[key]}" id="${key}-range">
                    </div>`;
            }
        }

        for (const key in filteredAttributesNarrow) {
            if (attributes.hasOwnProperty(key)) {
                inputs += `
                    <div class="input-group align-items-center ">
                        <label class="pe-2 d-block" for="${key}">${key}</label>
                        <input class="flex-grow-1" type="text" id="${key}" name="${key}" value="${attributes[key]}">
                        <label class="pe-2 d-block" for="${key}-range"></label>
                        <input type="range" class="mt-2 mb-3 form-range" min="-5" step="0.01" max="5" name="${key}" value="${filteredAttributes[key]}" id="${key}-range">
                    </div>`;
            }
        }

        let inputs2 = `
          <div class="accordion" id="parent-inputs-accordion-${this.id}">
            <div class="accordion-item rounded-0 border-end-0 border-top-0 border-start-0">
              <h3 class="accordion-header" id="headingTwo-${this.id}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo-${this.id}" aria-expanded="false" aria-controls="collapseTwo-${this.id}">Wymiary garaży</button>
              </h3>
              <div id="collapseTwo-${this.id}" class="accordion-collapse collapse" aria-labelledby="headingTwo-${this.id}" data-bs-parent="#parent-inputs-accordion-${this.id}">
                <div class="accordion-body">${inputs}</div>
              </div>
            </div>
          </div>`;






        // let inputs = 'Control system for a body';
        // for (const key in attributes) {
        //     if (attributes.hasOwnProperty(key)) {
        //         inputs += `
        //             <div class="input-group">
        //                 <label for="${key}">${key}</label>
        //                 <input type="text" id="${key}" name="${key}" value="${attributes[key]}">
        //             </div>`;
        //     }
        // }

        return inputs2 + accordion;
    }
}

export { GarageSystem, GarageSystemGui }