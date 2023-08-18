import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../base.js'
import { PlanetGui, PlanetObject, Planet, System } from './introduction.js'
import { genericGarageController, InvisibleWallGarageObject } from './generic.js';
import { metalMaterial, metalMaterial2 } from '../textures/material_spawn';
import { brickMaterial } from '../textures/material_spawn';
class FundGarageObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes) {
        let loader = new THREE.TextureLoader();
        let texture = loader.load('/assets/config/default_1k.jpg');
        // let material = new THREE.MeshPhysicalMaterial({
        //     map: texture,
        //     color: attributes.color || "#ffffff",
        //     metalness: 0.5,
        //     roughness: 0.1,
        //     clearcoat: 0.8,
        //     clearcoatRoughness: 0.2
        // });
        let material;
         if(this.mediator.state.get("floor_type")!==undefined && this.mediator.state.get("floor_type")!=="Default"){

            //  material = new THREE.MeshPhysicalMaterial({
   
            //     metalness: 0.0,
            //     roughness: 0.1,
            //     clearcoat: 0.8,
            //     clearcoatRoughness: 0.2,
            //     color: 0x000000,
                
            //   })
                
        
          
         
                
            
            
            
         }
            else{
                
                material = new THREE.MeshPhysicalMaterial({
   
                    metalness: 0.0,
                    roughness: 0.1,
                    clearcoat: 0.8,
                    clearcoatRoughness: 0.2,
                    color: 0x007777,
                    
                  })
                
            }
                    
                
        // Use BoxGeometry for the roof with adjusted width

        let width = parseFloat(attributes.width)
        let height = parseFloat(attributes.height)


        const rotation_y = (attributes.rotation_y || 0) * (Math.PI / 180); // Convert to radians
        // let garage_width=parseFloat(attributes.garage_width)
        // let garage_height=parseFloat(attributes.garage_height)

        let geometry = new RoundedBoxGeometry(
            parseFloat(attributes.width),
            parseFloat(attributes.height) || 1,
            parseFloat(attributes.sheet_depth) || 1, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 1,
            parseFloat(attributes.radius) || 0.005
        );
        // let geometry = new THREE.BoxGeometry(
        //     parseFloat(attributes.width),
        //     parseFloat(attributes.height) || 1,
        //     parseFloat(attributes.height), // Assuming depth is always 1, adjust as needed
        // );

        const mesh = new THREE.Mesh(geometry, material);

        // Position and rotate using the given roof angle
        mesh.position.set(
            parseFloat(attributes.position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(attributes.position_y),
            parseFloat(attributes.position_z),  // Assuming z position is always 0, adjust as needed
        );
        // this.state.get('color')
        // console.log(this.mediator.state.state)

        mesh.rotation.y = rotation_y; // Rotate by the given roof angle

        if(this.mediator.state.get("floor_type")!==undefined && this.mediator.state.get("floor_type")!=="Default"){

            //  mesh.rotation.y = 0; // Rotate by the given roof angle 
        }
           else{
                //  mesh.rotation.y = 1; // Rotate by the given roof angle
           }
                   

        this.set(mesh);
    }

    update(attributes) {
        // if (!this.model) return;

        // if (attributes.position_x !== undefined) {
        //     this.model.position.setX(parseFloat(attributes.position_x));
        // }

        // if (attributes.position_y !== undefined) {
        //     this.model.position.setY(parseFloat(attributes.position_y));
        // }

        // if (attributes.position_z !== undefined) {
        //     this.model.position.setZ(parseFloat(attributes.position_z));
        // }

        // // Update rotation if needed
        // if (attributes.rotation_z !== undefined) {
        //     this.model.rotation.z = attributes.rotation_z;
        // }
    }
}

class FundsSystemGui extends genericGui {
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
        accordionButton.textContent = "Wall";
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
        containerDiv.classList.add('squares-container');

        const squareButtons = [
            { value: 'Beton', color: 'blue' },
            { value: 'Kostka ', color: 'red' },
            { value: 'Żwir', color: 'green' },
            { value: 'Bez podłoża', color: 'yellow' }
        ];

        squareButtons.forEach(button => {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            squareDiv.style.backgroundColor = button.color;
            squareDiv.dataset.value = button.value;
            squareDiv.textContent = button.value;

            // Attach event listener directly to the squareDiv
            squareDiv.addEventListener('click', function (e) {
                // alert(squareDiv.dataset.value);
                // Notify the mediator or perform some action
                this.notifyMediator(`${squareDiv.dataset.value}`)
                // alert(this.id)
                // console.log(`Clicked on square with value: ${this.dataset.value}`);
            }.bind(this));

            containerDiv.appendChild(squareDiv);
        });

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
    notifyMediator(value) {
        if (this.mediator) {
            console.log(this.mediator.state.update('color',"#ff3030"))
            // The mediator should handle the square click with the value
            this.mediator.handleEvent("changeFloor", value);

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
}



class FundGarageController extends genericGarageController {
    constructor() {
        super();
        this.setModel(FundGarageObject)
    }


}
class FundsGarageController extends genericGarageController {
    constructor() {
        super()
        this.setModel(InvisibleWallGarageObject)
        this.gui = new FundsSystemGui();
        this.gui.set_mediator(this);
    }

    handleSquareClick(value) {
        // Handle the square click event here
        console.log(`Square with value ${value} clicked.`);
    }
    determineState() {
        //You can get the current state of the object by using the 
        let name = this.state.get('name')|| 'Wall'
        let material=this.state.get('floor_type') || 'Default'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 1
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('color') || "#272727"
        //let object_angle=parseFloat(this.state.get('object_angle'))||30
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        const accessersWallFront = [
            new accesser('name', name + "_front"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0.0),
            new accesser('position_y', 0),
            new accesser('position_z', -0.5 * object_depth),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),

        ]
        const accessersWallBack = [
            new accesser('name', name + "_back"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0.0),
            new accesser('position_y', 0),
            new accesser('position_z', +0.5 * object_depth),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),

        ]
        const accessersWallLeft = [
            new accesser('name', name + "_left"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', -0.5 * object_width),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', '90'),

        ]
        const accessersWallRight = [
            new accesser('name', name + '_right'),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0.5 * object_width),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', '90'),

        ]
        const accessersFoundation = [
            new accesser('name', name + '_right'),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', object_width),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 0),
            new accesser('position_y', 0),
            new accesser('position_z', 0),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', '90'),
            new accesser('floor_type', material)

        ]

        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, "accessersWallLeft": accessersWallLeft, "accessersWallRight": accessersWallRight, "accessersFoundation": accessersFoundation }
    }
    calculateState() {

        const accessersDict = this.determineState();
        Object.keys(accessersDict).forEach((key, index) => {
            if (this.children[index]) {
                this.set_the_options(this.children[index], accessersDict[key]);
            }
        });
    }
    buildingStep() {
        const accessers = [
            new accesser('name', 'Foundations'),
            new accesser('object_type', 'flat'),
            new accesser('object_angle', '30'),
            new accesser('object_width', '4.0'),
            new accesser('object_height', '0.05'),
            new accesser('object_depth', '4.0'),
            new accesser('sheet_depth', '0.0075'),
            new accesser('segments', 1),
            new accesser('radius', 0),
            new accesser('position_x', 0),
            new accesser('position_y', 0.0),
            new accesser('position_z', 0),
            new accesser('color', '#272727'),
            new accesser('invisible_controller', true),
            new accesser('position_relative', true),
        ]


        this.set_mediator(this)
        this.set_the_options(this, accessers)

        const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight, accessersFoundation } = this.determineState();


        let array = [
            { objectOptions: accessersWallFront, classInstance: FundGarageController },
            { objectOptions: accessersWallBack, classInstance: FundGarageController },
            { objectOptions: accessersWallLeft, classInstance: FundGarageController },
            { objectOptions: accessersWallRight, classInstance: FundGarageController },
            { objectOptions: accessersFoundation, classInstance: FundGarageController }
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
            case 'changeFloor':
                console.log();
                this.children[4].model.get_model().position.y=0.5
                break;
                 
                const accessers = [
                    new accesser('floor_type', data),
                ]
                this.set_the_options(this, accessers)
                this.handleEvent('stateChange')
                this.handleEvent('buildingStep');
                break;
            default:
                super.handleEvent(event, data);
                break;
        }
    }
}
export { FundsGarageController as FoundationsGarageController }
