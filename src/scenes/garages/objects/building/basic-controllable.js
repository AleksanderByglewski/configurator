import { v4 as uuidv4 } from 'uuid';
import {accesser} from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {Generic,genericGui,genericState,genericObject,genericDisplay, genericController } from '../../base.js'
import {PlanetGui, PlanetObject, Planet, System} from '../introduction.js'
import { genericGarageController, InvisibleWallGarageObject } from '../generic.js';
import { metalMaterial,metalMaterial2 } from '../../textures/material_spawn';

const loader = new THREE.TextureLoader();
const global_texture=loader.load('/assets/config/default_1k.jpg');
class WallGarageObject extends genericObject {
    constructor() {
        super(); 
    }
    create(attributes) {
        let loader = new THREE.TextureLoader();
        // alert(attributes.color)
    
        let texture = global_texture
        var material = new THREE.MeshPhysicalMaterial({
            map: texture,
            color:  attributes.color || "#272727"  ,
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });
        //material=metalMaterial()
        
        // Use BoxGeometry for the roof with adjusted width
        
        let width=parseFloat(attributes.width)
        let height=parseFloat(attributes.height)
       
        
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
        mesh.rotation.y = rotation_y; // Rotate by the given roof angle
        this.set(mesh);
    }

    update(attributes){
        if (!this.model) return;
    
        if (attributes.position_x !== undefined) {
            this.model.position.setX(parseFloat(attributes.position_x));
        }
    
        if (attributes.position_y !== undefined) {
            this.model.position.setY(parseFloat(attributes.position_y));
        }
    
        if (attributes.position_z !== undefined) {
            this.model.position.setZ(parseFloat(attributes.position_z));
        }
        
        // Update rotation if needed
        if (attributes.rotation_z !== undefined) {
            this.model.rotation.z = attributes.rotation_z;
        }
    }
}
class WallGarageController extends genericGarageController{
    constructor() {
        super(); 
        this.setModel(WallGarageObject)
    }
}
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
        accordionButton.textContent = "Ściany";
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
            { value: '#272727',  display_value:"RAL2003",  display_image:'/assets/display/colors/RAL2003'},
            { value: '#323232',  display_value:"RAL2005",  display_image:'/assets/display/colors/RAL2005'},
            { value: '#353335',  display_value:"RAL2007",  display_image:'/assets/display/colors/RAL2007'},
            { value: '#454345',  display_value:"RAL2009",  display_image:'/assets/display/colors/RAL2009'},
            { value: '#555355',  display_value:"RAL2011",  display_image:'/assets/display/colors/RAL20011'},
            { value: '#656365',  display_value:"RAL2011",  display_image:'/assets/display/colors/RAL20013'},
            { value: '#757375',  display_value:"RAL2015",  display_image:'/assets/display/colors/RAL2015'},
            { value: '#858385',  display_value:"RAL2017",  display_image:'/assets/display/colors/RAL2017'},
            { value: '#959395',  display_value:"RAL2019",  display_image:'/assets/display/colors/RAL2019'},
            { value: '#A5A3A5',  display_value:"RAL2021",  display_image:'/assets/display/colors/RAL2021'},
            { value: '#B5B3B5',  display_value:"RAL2023",  display_image:'/assets/display/colors/RAL2023'},
            { value: '#C5C3C5',  display_value:"RAL2025",  display_image:'/assets/display/colors/RAL2025'},
            { value: '#D5D3D5',  display_value:"RAL2027",  display_image:'/assets/display/colors/RAL2027'},
            { value: '#E5E3E5',  display_value:"RAL2029",  display_image:'/assets/display/colors/RAL2029'},
            
                        
        ];

        squareButtons.forEach(button => {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            // squareDiv.style.backgroundColor = button.color;
            squareDiv.dataset.value = button.value;

            // Create the image element
            const imageEl = document.createElement('div');
            imageEl.style.backgroundColor = button.value;
            imageEl.style.aspectRatio= "1 / 1"
            imageEl.alt = button.display_value;  // for accessibility
            squareDiv.appendChild(imageEl);  // append the image to the squareDiv

            const textDiv = document.createElement('div');
            textDiv.textContent = button.display_value;
            squareDiv.appendChild(textDiv)


   

            // Attach event listener directly to the squareDiv
            squareDiv.addEventListener('click', function (e) {
                // alert(squareDiv.dataset.value);
                // Notify the mediator or perform some action
                
              

                // this.notifyMediator('changeState',{color:`${squareDiv.dataset.value}`})
                // this.notifyMediator('recursivelyRemoveModel');
                // this.notifyMediator('buildingStep');

                this.notifyMediator('changeObject',`${squareDiv.dataset.value}`)
          
            }.bind(this));



            
            containerDiv.appendChild(squareDiv);
        });


        // const removeModelBtn = document.createElement('button');
        // removeModelBtn.textContent = "Remove Model";
        // removeModelBtn.classList.add('remove-model-btn');
        // removeModelBtn.addEventListener('click', function() {
        //     // Call notifyMediator with 'recursivelyRemoveModel' event
        //     this.notifyMediator('recursivelyRemoveModel');
        // }.bind(this));
        
        // containerDiv.appendChild(removeModelBtn);

        
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
  
    determineState(){
        //You can get the current state of the object by using the 
        let name=this.state.get('name')||'Wall'
        let object_type=this.state.get('object_type')||'flat'
        let object_width=parseFloat(this.state.get('object_width'))||3
        let object_height=parseFloat(this.state.get('object_height'))||2.43
        let object_depth=parseFloat(this.state.get('object_depth'))||2
        let object_color=this.state.get('color')||"#272727"

        let position_x=this.state.get('position_x')||0
        let position_y=this.state.get('position_y')||0
        let position_z=this.state.get('position_z')||0

        let height=this.state.get('height')||2.13
        let width=this.state.get('width')||4.0
        let depth=this.state.get('depth')||4.0
        object_height=height
        object_width=width
        object_depth=depth
        //let object_angle=parseFloat(this.state.get('object_angle'))||30
        let sheet_depth=parseFloat(this.state.get('sheet_depth'))||0.0075
 
     const accessersWallFront=[
         new accesser('name', name+"_front"),
         new accesser('width', object_width),
         new accesser('height', object_height),
         new accesser('sheet_depth', sheet_depth),
         new accesser('segments', 1),
         new accesser('radius', 0.01),
         new accesser('position_x', 0.0+position_x),
         new accesser('position_y', 0+position_y+height/2),
         new accesser('position_z',-0.5*object_depth+position_z),
         new accesser('color', object_color),
         new accesser('position_relative', 'true'),
       
     ]
     const accessersWallBack=[
         new accesser('name', name+"_back"),
         new accesser('width', object_width),
         new accesser('height', object_height),
         new accesser('sheet_depth', sheet_depth),
         new accesser('segments', 1),
         new accesser('radius', 0.01),
         new accesser('position_x', 0.0+position_x),
         new accesser('position_y', 0+position_y+height/2),
         new accesser('position_z',+0.5*object_depth+position_z),
         new accesser('color', object_color),
         new accesser('position_relative', 'true'),
       
     ]
     const accessersWallLeft=[
         new accesser('name', name+"_left"),
         new accesser('width', object_depth),
         new accesser('height', object_height),
         new accesser('sheet_depth', sheet_depth),
         new accesser('segments', 1),
         new accesser('radius', 0.01),
         new accesser('position_x', -0.5*object_width+position_x),
         new accesser('position_y', 0+position_y+height/2),
         new accesser('position_z',0+position_z),
         new accesser('color', object_color),
         new accesser('position_relative', 'true'),
         new accesser('rotation_y', '90'),
       
     ]
     const accessersWallRight=[
         new accesser('name', name+'_right'),
         new accesser('width', object_depth),
         new accesser('height', object_height),
         new accesser('sheet_depth', sheet_depth),
         new accesser('segments', 1),
         new accesser('radius', 0.01),
         new accesser('position_x', 0.5*object_width+position_x),
         new accesser('position_y', 0+position_y+height/2),
         new accesser('position_z',0+position_z),
         new accesser('color', object_color),
         new accesser('position_relative', 'true'),
         new accesser('rotation_y', '90'),
       
     ]
     return {"accessersWallFront":accessersWallFront,"accessersWallBack": accessersWallBack, "accessersWallLeft":accessersWallLeft,"accessersWallRight":accessersWallRight}
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
            new accesser('name', 'Floor controllero'),
            // new accesser('color','#373737' )
            
        ]  
        this.set_mediator(this)
        this.set_the_options(this,accessers)

        console.log(this.state.state)

        const {  accessersWallFront, accessersWallBack,accessersWallLeft, accessersWallRight } = this.determineState();
     
    
        let array = [
            {objectOptions:accessersWallFront, classInstance: WallGarageController},
            {objectOptions:accessersWallBack, classInstance: WallGarageController},
            {objectOptions:accessersWallLeft, classInstance: WallGarageController},
            {objectOptions:accessersWallRight, classInstance: WallGarageController}
        ]

        this.children.forEach((child) => {
            child.handleEvent('recursivelyRemoveModel')
        });
        this.children=[]

        array.forEach(({ objectOptions, classInstance }) => {
            this.object_addition.bind(this)(objectOptions, classInstance);
        });
        // this.handleEvent('stateChange')
        this.handleEvent('creationStep');
    }
    handleEvent(event, data) {
        switch (event) {
            case 'buildingStep':
                this.handleEvent('recursivelyRemoveModel');
                this.buildingStep()
                
                break;
            case 'creationStep':
                
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

            case 'changeObject':
                    // alert(data)
                    {
                    const accessers=[
                        new accesser('color', data),
                    ]  
                    this.handleEvent('recursivelyRemoveModel');
                    this.set_the_options(this,accessers)
                    this.handleEvent('buildingStep');
                    
                    // this.handleEvent('creationStep');
                    // this.buildingStep()
                    }
                    break;
            case 'changeFloor':
                // alert(data)
                const accessers=[
                    new accesser('color', data),
                ]  
                this.handleEvent('recursivelyRemoveModel');
                this.set_the_options(this,accessers)
                this.handleEvent('buildingStep');
                
                // this.handleEvent('creationStep');
                // this.buildingStep()

                break;
            default:
                super.handleEvent(event, data);
                break;
        }
    }
}

export { UconfigsController as BuildingControllableBasicSystem}
