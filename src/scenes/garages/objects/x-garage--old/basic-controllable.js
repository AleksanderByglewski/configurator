import { v4 as uuidv4 } from 'uuid';
import {accesser} from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {Generic,genericGui,genericState,genericObject,genericDisplay, genericController } from '../../base.js'
import {PlanetGui, PlanetObject, Planet, System} from '../introduction.js'
import { genericGarageController, InvisibleWallGarageObject } from '../generic.js';
import { metalMaterial,metalMaterial2 } from '../../textures/material_spawn';
import {FloorsControllableBasicSystem} from '../x-floors--old/basic-controllable'
const loader = new THREE.TextureLoader();

class UconfigInvisibleGui extends genericGui {
    constructor() {
        super();
    }

    generateInputs(attributes) {
    }
    createMarkup() {
    }
    insertContent(element, selector = "*", classes = "attribute-values", id = "") {
    
    }
    notifyMediator(event, value="") {
      
    }

    createSquaresMarkup() {
    
    }

    listenToChanges(){
        

    }
}
class UconfigGui extends genericGui {
    constructor() {
        super();
    }

    generateInputs(attributes) {



        const squaresElement = this.createMarkup();

        const accordionDiv = document.createElement('div');
        accordionDiv.classList.add('accordion');
        accordionDiv.id = 'parent-inputs-accordion-' + this.id;

        const accordionItemDiv = document.createElement('div');
        accordionItemDiv.classList.add('accordion-item', 'rounded-0', 'border-end-0', 'border-top-0', 'border-start-0');
        accordionDiv.appendChild(accordionItemDiv);

        const accordionHeaderH3 = document.createElement('h3');
        accordionHeaderH3.classList.add('accordion-header');
        accordionHeaderH3.id = 'headingTwo-' + this.id;
        accordionItemDiv.appendChild(accordionHeaderH3);

        const accordionButton = document.createElement('button');
        accordionButton.classList.add('accordion-button');
        accordionButton.type = 'button';
        accordionButton.dataset.bsToggle = "collapse";
        accordionButton.dataset.bsTarget = '#collapseTwo-' + this.id;
        accordionButton.setAttribute('aria-expanded', 'true');
        accordionButton.setAttribute('aria-controls', 'collapseTwo-' + this.id);

        
        accordionButton.textContent = "Wymiary garażu";
        accordionHeaderH3.appendChild(accordionButton);

        const accordionCollapseDiv = document.createElement('div');
        accordionCollapseDiv.id = 'collapseTwo-' + this.id;
        accordionCollapseDiv.classList.add('accordion-collapse', 'collapse', 'show');
        accordionCollapseDiv.setAttribute('aria-labelledby', 'headingTwo-' + this.id);
        accordionCollapseDiv.dataset.bsParent = '#parent-inputs-accordion-' + this.id;
        accordionItemDiv.appendChild(accordionCollapseDiv);

        const accordionBodyDiv = document.createElement('div');
        accordionBodyDiv.classList.add('accordion-body');
        // accordionBodyDiv.textContent = 'Control system for a body';
        accordionCollapseDiv.appendChild(accordionBodyDiv);

        const inputGroupDiv = document.createElement('div');
        inputGroupDiv.classList.add('input-group', 'align-items-center');
        accordionBodyDiv.appendChild(inputGroupDiv);

        // const label = document.createElement('label');
        // label.classList.add('pe-2');
        // label.setAttribute('for', 'depth');
        // label.textContent = 'depth';
        // inputGroupDiv.appendChild(label);

        // const input = document.createElement('input');
        // input.type = 'text';
        // input.value = "3.5";
        // inputGroupDiv.appendChild(input);

        accordionBodyDiv.appendChild(squaresElement);

        // Append the entire accordion structure to a target container in the DOM.
        // const targetElement = document.querySelector('#targetContainer');  // You might want to adjust the selector.
        // targetElement.appendChild(accordionDiv);

        // this.insertContent(accordionDiv, escapedId, 'input-values', this.id);
        const escapedId = '#id-' + this.id + '.input-values';
        this.insertContent(accordionDiv, escapedId, 'input-values', this.id);

        this.listenToChanges();
    }
    createMarkup() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container--three');

   


        const attributes = ['position_x', 'position_y', 'position_z', 'width', 'height', 'depth'];

        attributes.forEach(attr => {
            const sliderLabel = document.createElement('label');
            sliderLabel.textContent = attr;
            containerDiv.appendChild(sliderLabel);
    
            const sliderInput = document.createElement('input');
            sliderInput.type = 'range';
            sliderInput.min = -10; // You can set min/max/default values according to your needs
            sliderInput.max = 10;
            sliderInput.step = 0.1;
            sliderInput.value = this.mediator.state[attr] || 0;  // default to 0 if not set, adjust as needed
            sliderInput.addEventListener('input', function(e) {
                this.mediator.state[attr] = e.target.value;
                this.notifyMediator('stateChange', { [attr]: e.target.value });
            }.bind(this));
    
            const sliderValueDisplay = document.createElement('span');
            sliderValueDisplay.textContent = sliderInput.value;
            sliderInput.addEventListener('input', function(e) {
                sliderValueDisplay.textContent = e.target.value;
            });
    
            containerDiv.appendChild(sliderInput);
            containerDiv.appendChild(sliderValueDisplay);
        });
    
        // ... your previous code ...
    
        return containerDiv;

        const removeModelBtn = document.createElement('button');
        removeModelBtn.textContent = "Remove Model";
        removeModelBtn.classList.add('remove-model-btn');
        removeModelBtn.addEventListener('click', function() {
            // Call notifyMediator with 'recursivelyRemoveModel' event
            this.notifyMediator('recursivelyRemoveModel');
        }.bind(this));
        
        containerDiv.appendChild(removeModelBtn);

        
        return containerDiv;
    }
    insertContent(element, selector = "*", classes = "attribute-values", id = "") {
        this.waitForDOM(() => {
            const container = this.getContainer(selector);
            // Clear any previous content inside the container

            if (!container) {
                console.warn(`Element with selector "${selector}" not found.`);
                return;  // Exit early if container is not found
            }
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            // Append the new element to the container
            container.appendChild(element);

            // Add the provided classes and id
            container.classList.add(classes);
            container.id = 'id-' + id;
        });
    }
    notifyMediator(event, value="") {
        if (this.mediator) {
            // console.log(this.mediator.state.update('color',"#ff3030"))
            // The mediator should handle the square click with the value
            //console.log(this.mediator)
            this.mediator.handleEvent(event, value);
        }
    }
    createSquaresMarkup() {
        // Example: Define four values. Modify as needed.
        const values = ["Value1", "Value2", "Value3", "Value4"];

        let markup = '<div class="squares-container">';
        values.forEach(value => {
            markup += `<div class="gui-square" data-value="${value}">${value}</div>`;
        });
        markup += '</div>';

        return markup;
    }
    listenToChanges(){
    }
}
class UconfigObject extends genericObject{
    constructor() {
        super(); 
        
    }
    update(){}
    create(attributes) {
        
        // const material_color=(attributes.colored).replace('#','0x')

        let width=parseFloat(attributes.width) || 5
        let height=parseFloat(attributes.height) || 5


        const texture_value=attributes.material ? `${attributes.material}` : '/assets/config/default_1k.jpg'



        let texture = loader.load(texture_value);
        texture.repeat.set(width, height);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        // let material= new THREE.MeshPhysicalMaterial({
   
        //     metalness: 0.0,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2,
        //     color:  "#"+attributes.color,
            
        //   })


          const material = new THREE.MeshPhysicalMaterial({
            metalness: 0.0,
            roughness: 0.95,
            clearcoat: 0.0,
            clearcoatRoughness: 0.0,
            color:  attributes.color ? `#${attributes.color}` : '#272727',
            opacity: attributes.visibility || 0,
            map: texture
        });
          
        let geometry = new RoundedBoxGeometry(
            parseFloat(attributes.width) || 5,
            parseFloat(attributes.height) || 1,
            parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 2,
            parseFloat(attributes.radius) || 0.005
        );
  
    
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            parseFloat(attributes.position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(attributes.position_y),
            parseFloat(attributes.position_z),  // Assuming z position is always 0, adjust as needed
        );

    
        mesh.rotateX(attributes.position_rotation_x)
        mesh.visible=attributes.visibility || true
        this.set(mesh);
    }
}
class UconfigController extends genericGarageController{
    constructor() {
        super(); 
        this.setModel(UconfigObject)
        this.gui = new UconfigInvisibleGui();
        this.gui.set_mediator(this)
        
    }
}
class UconfigsController extends genericGarageController {
    constructor(){
     
     super()
     this.setModel(InvisibleWallGarageObject)
     this.gui = new UconfigGui();
     this.gui.set_mediator(this)
    }
    setCloseFriend(friendName,friend){
        if(!this.closefriends){
            this.closefriends={}
        }
        this.closefriends[friendName]=friend

    }
    determineState() {
        // This is the function that determines the values of the children
        let name = this.state.get('name') || 'Gate';
        let object_type = this.state.get('object_type') || 'beton';
        let object_width = parseFloat(this.state.get('object_width')) || 3;
        let object_height = parseFloat(this.state.get('object_height')) || 0.4;
        let object_depth = parseFloat(this.state.get('object_depth')) || 2;
        let object_color = this.state.get('color') || "272727";
        let material="";
        let visible=true

        //Can you ensure that the state will be persistent
        let position_x=this.state.get('position_x') || 0;
        let position_y=this.state.get('position_y') || 0;
        let position_z= this.state.get('position_z') || 0;

        let position_rotation_x=Math.PI/2

        switch (object_type) {
            case 'beton':
                object_width = 5.00;
                object_height = 5.00;
                object_depth = 0.015;
                // position_x=0
                object_color="272727"
                material="/assets/textures/foundation/foundation0.jpg"
                break;
            case 'kostka':
                object_width = 5.00;
                object_height = 5.00;
                object_depth = 0.015;
  
                object_color="272727"
                material="/assets/textures/foundation/foundation1.jpg"
    
                break;
            case 'fundamenty':
                    object_width = 5.00;
                    object_height = 5.00;
                    object_depth = 0.015;
      
                    object_color="272727";
                    material="/assets/textures/foundation/foundation2.jpg";
                    break;
                
            case 'zwir':
                object_width = 5.00;
                object_height = 5.00;
                object_depth = 0.015;
  
                object_color="272727";
                material="/assets/textures/foundation/foundation3.jpg";
                break;
            
            case 'bez_podloza':
                object_width = 5.00;
                object_height = 5.00;
                object_depth = 0.015;
                object_color="272727";
                material="/assets/textures/foundation/foundation3.jpg";
                position_x=-1000;
                visible=0.0
                break;
        
            default: 
                break;
        }
    
        const accessersWallFront = [
            new accesser('name', 'This is an invisible only'+ "object"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('depth', object_depth),
            new accesser('position_x', position_x),
            new accesser('position_y', position_y),
            new accesser('position_z', position_z),
            new accesser('color', object_color),
            new accesser('material', material),
            new accesser('visibility', visible),
            new accesser('position_relative', 'true'),
            new accesser('position_rotation_x', position_rotation_x)
        ];
    
  
    

        return { 
            "accessersWallFront": accessersWallFront,
    
    
    };
    }
    calculateState(){
        //This is a function that updates the values of the children of the system
        const accessersDict = this.determineState();
        Object.keys(accessersDict).forEach((key, index) => {
            if (this.children[index]) {
                this.setOptions(this.children[index], accessersDict[key]);
            }
        });
    }
    buildingStep(){
        const accessers=[
            new accesser('name', 'This is a problematic class'),
            
        ]  
        this.set_mediator(this)
        this.setOptions(this,accessers)

        //console.log(this.state.state)

        const {accessersWallFront} = this.determineState();
     
    
        let array = [
            {objectOptions:accessersWallFront, classInstance: UconfigController},
        ]
        this.children.forEach((child) => {
            child.handleEvent('recursivelyRemoveModel')
        });
        this.children=[]
        array.forEach(({ objectOptions, classInstance }) => {
            // this.object_addition(objectOptions, classInstance);
            this.object_addition_existing(this.closefriends['floor']);
            this.object_addition_existing(this.closefriends['building']);
            this.object_addition_existing(this.closefriends['roof']);
        });
        // this.handleEvent('stateChange')

    }
    handleEvent(event, data) {
        switch (event) {
            case 'buildingStep':
                this.buildingStep()
                this.handleEvent('creationStep');
                break;
            case 'creationStep':
                this.handleEvent('recursivelyRemoveModel')
                if (this.model && typeof this.model.get_model === 'function') {
                    const modelInstance = this.model.get_model();
                    if (modelInstance && typeof modelInstance.create === 'function') {
                        modelInstance.create(this.state.state);
                    }
            
                    if (this.display && typeof this.display.add_to_scene === 'function') {
                        this.display.add_to_scene(modelInstance);
                    }
                }
            
                if (Array.isArray(this.children)) {
                    this.children.forEach((child) => {
                        if (child && typeof child.handleEvent === 'function') {
                            child.handleEvent('creationStep');
                        }
                    });
                }
                break

            case 'simplestateChange':
                    //Is this the correct way to check if the function exists in the class
                    if (typeof this.calculateState === 'function'){
                    this.calculateState()}
                    this.basicChildrenUpdate()
                    // this.model.update(this.state.state)
                    // this.children.forEach((child) => { child.handleEvent('stateChange') });
                    break;
            case 'stateChange':
                        if (data && typeof data === 'object' && Object.keys(data).length) {
                            const attr = Object.keys(data)[0];
                            const value = data[attr];
                    
                            if (attr && value) {
                                console.log("Attribute:", attr);
                                console.log("Value:", value);
                                this.state.update(attr,value)
                                this.basicChildrenUpdate()
                                // this.handleEvent("buildingStep")
                            } else {
                                console.error("Data object does not have the expected format.");
                            }
                        } else {
                            console.error("Invalid data provided.");
                        }
                        this.handleEvent('buildingStep');
                        if (Array.isArray(this.children)) {
                            this.children.forEach((child) => {
                                if (child && typeof child.handleEvent === 'function') {
                                    child.handleEvent('buildingStep');
                                }
                            });
                        }
                        
                        break;        
            
            case 'changeFloor':
                alert(data)
                const accessers=[
                    new accesser('object_type', data),
                ]  
                // this.handleEvent('recursivelyRemoveModel');
                this.setOptions(this,accessers)
                this.handleEvent('buildingStep');
                // this.handleEvent('creationStep');
                // this.buildingStep()

                break;
            default:
                super.handleEvent(event, data);
                break;
        }
    }

    basicChildrenUpdate(){
       let self=this
       this.children.forEach(element => {
            element.state.update("position_x",parseFloat(self.state.get('position_x')))
            element.state.update("position_y",parseFloat(self.state.get('position_y')))
            element.state.update("position_z",parseFloat(self.state.get('position_z')))
            element.state.update("width",parseFloat(self.state.get('width')))
            element.state.update("depth",parseFloat(self.state.get('depth')))
            element.state.update("height",parseFloat(self.state.get('height')))
        })
    }
}



export { UconfigsController as GarageControllableBasicSystem}
