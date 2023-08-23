import { v4 as uuidv4 } from 'uuid';
import {accesser} from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {Generic,genericGui,genericState,genericObject,genericDisplay, genericController } from '../../base.js'
import {PlanetGui, PlanetObject, Planet, System} from '../introduction.js'
import { genericGarageController, InvisibleWallGarageObject } from '../generic.js';
import { metalMaterial,metalMaterial2 } from '../../textures/material_spawn';


class UconfigGui extends genericGui {
    constructor() {
        super();
        // assuming uuidv4 is available
        this.id = uuidv4();
    }

    insertContent(content, selector = "*", classes = "attribute-values", id = "") {
        this.waitForDOM(() => {
            const container = this.getContainer(selector);
            container.innerHTML = content;
            container.classList.add(classes);
            container.id = 'id-' + id;
        });
    }
    waitForDOM(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }
    generateChanges(attributes) {
        const markup = this.createGuiMarkup(attributes);
        const escapedId = '#id-' + this.id + '.attribute-values';
        this.insertContent(markup, escapedId, "attribute-values", this.id);
    }
    createGuiMarkup(attributes) {
        let content = ""
        for (const key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                content += `<div class="attribute"><strong>${key}:</strong> ${attributes[key]}</div>`;
            }
        }

        return content;
    }
    generateInputs(attributes) {
        const markup = this.createInputMarkup(attributes)
        const escapedId = '#id-' + this.id + '.input-values';
        this.insertContent(markup, escapedId, 'input-values', this.id)
        this.listenToChanges()
    }
    createInputMarkup(attributes) {
        let inputs = 'Control system for a body';
        for (const key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                inputs += `
                    <div class="input-group">
                        <label for="${key}">${key}</label>
                        <input type="text" id="${key}" name="${key}" value="${attributes[key]}">
                    </div>`;
            }
        }
        return inputs;
    }
    listenToChanges() {
        const container = document.getElementById('id-' + this.id);
        if (!container) {
            console.error('Container not found.');
            return;
        }

        const inputs = container.querySelectorAll('.input-values input');
        const newState = {};
        inputs.forEach(input => {
            newState[input.name] = parseFloat(input.value);
        });
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const newState = this.getInputValues();  // assuming you have the getInputValues method
                this.mediator.handleEvent("guiInputChange", newState);
            });
        });


    }
    getInputValues() {
        const container = document.getElementById('id-' + this.id);

        // Check if the container exists
        if (!container) {
            console.error('Container not found.');
            return {};
        }

        const inputs = container.querySelectorAll('.input-values input');
        const values = {};

        // Iterate over each input and store its name and value in the dictionary
        inputs.forEach(input => {
            values[input.name] = input.value;
        });

        return values;
    }
    getContainer(selector = `#${this.id}`, parent_container = this.getMenu()) {
        let container = document.querySelector(selector);

        if (!container) {
            let child_container = document.createElement('div');
            parent_container.appendChild(child_container);
            return child_container;
        }

        return container;
    }
    getMenu() {
        return document.querySelector('.side-menu')
    }
    setMenuSelector(selector = '.side-menu') {
        this.menuSelector = ".side-menu"
    }
}



class UconfigObject extends genericObject{
    constructor() {
        super(); 
    }
    update(){}
    create(attributes) {
        
        // const material_color=(attributes.colored).replace('#','0x')

        let material= new THREE.MeshPhysicalMaterial({
   
            metalness: 0.0,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2,
            color:  0x272727,
            
          })
        let geometry = new RoundedBoxGeometry(
            parseFloat(attributes.width) || 5,
            parseFloat(attributes.height) || 1,
            parseFloat(attributes.sheet_depth) || 1, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 2,
            parseFloat(attributes.radius) || 0.005
        );
  
    
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            parseFloat(attributes.position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(attributes.position_y),
            parseFloat(attributes.position_z),  // Assuming z position is always 0, adjust as needed
        );
        this.set(mesh);
    }
}
class UconfigController extends genericGarageController{
    constructor() {
        super(); 
        this.setModel(UconfigObject)
        
    }
}
class UconfigsController extends genericGarageController {
    constructor(){
     super()
     this.setModel(InvisibleWallGarageObject)
     this.gui = new UconfigGui();
    }
    determineState(){
       //This is the function that determines the values of the children
       let name=this.state.get('name')||'Gate'
       let object_type=this.state.get('object_type')||'flat'
       let object_width=parseFloat(this.state.get('object_width'))||3
       let object_height=parseFloat(this.state.get('object_height'))||0.4
       let object_depth=parseFloat(this.state.get('object_depth'))||2
       let object_color=this.state.get('color')||"#272727"
       //It returns an array for children from which the children may be created or updated
    const accessersWallFront=[
        new accesser('name', name+"object"),
        new accesser('width', object_width),
        new accesser('height', object_height),
        new accesser('position_x', 0.0),
        new accesser('position_y', 1.05),
        new accesser('position_z',0.0),
        new accesser('color', object_color),
        new accesser('position_relative', 'true')
    ]
    return {"accessersWallFront":accessersWallFront}
    }
    calculateState(){
        //This is a function that updates the values of the children of the system
        const accessersDict = this.determineState();
        Object.keys(accessersDict).forEach((key, index) => {
            if (this.children[index]) {
                this.set_the_options(this.children[index], accessersDict[key]);
            }
        });
    }
    buildingStep(){
        const accessers=[
            new accesser('name', 'Check controller'),
        ]  
        this.set_mediator(this)
        this.set_the_options(this,accessers)

        const {  accessersWallFront} = this.determineState();
     
    
        let array = [
            {objectOptions:accessersWallFront, classInstance: UconfigController},
        ]
        
        array.forEach(({ objectOptions, classInstance }) => {
            this.object_addition.bind(this)(objectOptions, classInstance);
        });
        this.handleEvent('stateChange')
        this.handleEvent('creationStep');
    }
    handleEvent(event, data) {
        switch (event) {
            case 'buildingStep':
                this.buildingStep()
                break;
            default:
                super.handleEvent(event, data);
                break;
        }
    }
}

export { UconfigsController as ControllableBasicSystem}
