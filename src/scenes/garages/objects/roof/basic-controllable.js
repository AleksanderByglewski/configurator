import { v4 as uuidv4 } from 'uuid';
import {accesser} from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {Generic,genericGui,genericState,genericObject,genericDisplay, genericController } from '../../base.js'
import {PlanetGui, PlanetObject, Planet, System} from '../introduction.js'
import { genericGarageController, InvisibleWallGarageObject } from '../generic.js';
import { metalMaterial,metalMaterial2 } from '../../textures/material_spawn';
let this_loader = new THREE.TextureLoader();
let texture = this_loader.load('/assets/config/default_1k.jpg');
let global_texture = this_loader.load('/assets/config/default_1k.jpg');
// const loader = new THREE.TextureLoader();
// const global_texture=loader.load('/assets/config/default_1k.jpg');
class GarageObjectGable extends genericObject {
    constructor() {
        super(); 
    }
    create(attributes) {
 
        texture=global_texture
        var material = new THREE.MeshPhysicalMaterial({
            map: texture,
            color: attributes.color || "#ffffff",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
            
        });
        // var material=metalMaterial()
        // material.color="white"
        // Convert roof_angle to radians and compute adjusted width
        const alpha = (attributes.roof_angle || 0) * (Math.PI / 180); // Convert to radians
        let width_adjusted = (attributes.width || 1) * (1 / Math.cos(alpha));
        let height_displacement=width_adjusted*Math.sin(alpha)

        // Use BoxGeometry for the roof with adjusted width
        
        let geometry = new RoundedBoxGeometry(
            parseFloat(width_adjusted),
            parseFloat(attributes.sheet_depth) || 1,
            parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 1,
            parseFloat(attributes.radius) || 0.005
        );
        // let geometry = new THREE.BoxGeometry(
        //     width_adjusted,
        //     attributes.height || 1,
        //     attributes.depth || 1 // Assuming depth is always 1, adjust as needed
        // );
    
        const roof = new THREE.Mesh(geometry, material);
        let rotation_y=parseFloat( (attributes.rotation_y || 0));
        roof.rotateY(rotation_y)
        // .Position and rotate using the given roof angle
        roof.position.set(
            parseFloat(attributes.position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(attributes.position_y),
            parseFloat(attributes.position_z),  // Assuming z position is always 0, adjust as needed
        );

        roof.name="We got you gable!"
        roof.rotation.z = alpha; // Rotate by the given roof angle
        
       

        this.set(roof);
    }
    
    update(attributes){
        if (!this.model) return;
    
        if (attributes.position_x !== undefined) {
            this.model.position.setX(parseFloat(attributes.position_x)+parseFloat(attributes.height)*0);
        }
    
        if (attributes.position_y !== undefined) {
            this.model.position.setY(parseFloat(attributes.position_y) +parseFloat(attributes.height)*0.0);
        }
    
        if (attributes.position_z !== undefined) {
            this.model.position.setZ(attributes.position_z);
        }
        
        // Update rotation if needed
        if (attributes.rotation_z !== undefined) {
            this.model.rotation.z = attributes.rotation_z;
        }
    }
}

class GarageObjectSupport extends genericObject {
    constructor() {
        super(); 
    }
    create(attributes) {
        let loader = new THREE.TextureLoader();
        texture=global_texture
        var material = new THREE.MeshPhysicalMaterial({
            map: texture,
            color: attributes.color || "#ffffff",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
            
        });
        // var material=metalMaterial()
    
        // Create a right-angled triangle using Shape and ExtrudeGeometry for depth
        const alpha =parseFloat( (attributes.roof_angle || 0) * (Math.PI / 180)); // Convert to radians
        const adjusted_width=parseFloat(attributes.width*1/Math.cos(alpha));
        const adjusted_height=parseFloat(adjusted_width*Math.sin(alpha));
        let shape = new THREE.Shape();
        shape.moveTo(0, -0.5*parseFloat(adjusted_height));
        shape.lineTo(-parseFloat(attributes.width) || 1, -0.5*parseFloat(adjusted_height)|| 1);
        shape.lineTo(0, 0.5*parseFloat(adjusted_height)|| 1);
        shape.lineTo(0, 0);
    
        material.map.wrapS = texture.wrapT = THREE.RepeatWrapping;
        material.map.repeat.set( 1, 1);
        // shape.moveTo(0, 0);
        // shape.lineTo(-1, 0);
        // shape.lineTo(0, 1);
        // shape.lineTo(0, 0);
        // Define extrusion settings
        let extrudeSettings = {
            steps: 2,
            depth: parseFloat(attributes.sheet_depth) || 0.1,  // Depth of the extrusion
            bevelEnabled: true,
            bevelSize:0.0005,
            bevelThickness:0.001

        };
    
        let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
        // let geometry = new THREE.ShapeGeometry( shape );

        const triangle = new THREE.Mesh(geometry, material);
        let rotation_y=parseFloat( (attributes.rotation_y || 0));
        triangle.rotateY(rotation_y)
        // Position triangle
        triangle.position.set(
            parseFloat(attributes.position_x)+parseFloat(attributes.width/2) || 0,
            parseFloat(attributes.position_y)|| 0,
            parseFloat(attributes.position_z)+parseFloat((attributes.roof_depth/2||1)) || 0
        );

    
        this.set(triangle);
    }
    update(attributes){
        if (!this.model) return;
    
        if (attributes.position_x !== undefined) {
            this.model.position.setX(parseFloat(attributes.position_x)+parseFloat(attributes.width/2));
        }
    
        if (attributes.position_y !== undefined) {
            const alpha = (attributes.roof_angle || 0) * (Math.PI / 180); // Convert to radians
            let width_adjusted = (attributes.width || 1) * (1 / Math.cos(alpha));
            let height_displacement=width_adjusted*Math.sin(alpha)
            this.model.position.setY(attributes.position_y - (0*height_displacement/2 ));
        }
    
        if (attributes.position_z !== undefined) {
            this.model.position.setZ( parseFloat(attributes.position_z)+parseFloat((attributes.roof_depth/2||1)));
        }
        
        // // Update rotation if needed
        // if (attributes.rotation_z !== undefined) {
        //     this.model.rotation.z = attributes.rotation_z;
        // }
    }
}

class GarageObjectSupportSquare extends genericObject {
    constructor() {
        super(); 
    }
    create(attributes) {
        let loader = new THREE.TextureLoader();
        texture=global_texture
        var material = new THREE.MeshPhysicalMaterial({
            map: texture,
            color: attributes.color || "#ffffff",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
            
        });
        // var material=metalMaterial()
        // Convert roof_angle to radians and compute adjusted width
        const alpha = (parseFloat(attributes.roof_angle) || 0) * (Math.PI / 180); // Convert to radians
        let width_adjusted = (parseFloat(attributes.width) || 1) * (1 / Math.cos(alpha));
        let height_adjusted=parseFloat(width_adjusted)* Math.sin(alpha)
        let height_displacement=parseFloat(width_adjusted)*Math.sin(alpha)


        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 1, height_adjusted);
        // Use BoxGeometry for the roof with adjusted width
        
        let geometry = new RoundedBoxGeometry(
            parseFloat(attributes.roof_depth),
            parseFloat(height_adjusted) || 1,
            parseFloat(attributes.sheet_depth) || 1, // Assuming depth is always 1, adjust as needed
            parseFloat(attributes.segments) || 1,
            parseFloat(attributes.radius) || 0.005
        );
        // let geometry = new THREE.BoxGeometry(
        //     width_adjusted,
        //     height_adjusted,
        //     parseFloat(attributes.depth) || 1 // Assuming depth is always 1, adjust as needed
        // );
        
        const roof = new THREE.Mesh(geometry, material);
        let rotation_y=parseFloat( (attributes.rotation_y || 0));
        roof.rotateY(rotation_y+Math.PI/2)
        // Position and rotate using the given roof angle
        roof.position.set(
            parseFloat(attributes.width)/2-0.020+parseFloat(attributes.position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(attributes.position_y),
            parseFloat(attributes.position_z),  // Assuming z position is always 0, adjust as needed
        );
        // roof.rotation.y=Math.PI
        //  roof.rotation.y =

      
        // roof.rotation.z = alpha; // Rotate by the given roof angle
        
        this.set(roof);
    }

    update(attributes){
        if (!this.model) return;
    
        if (attributes.position_x !== undefined) {
            this.model.position.setX(parseFloat(attributes.width)/2-0.005);
        }
    
        if (attributes.position_y !== undefined) {
           
            this.model.position.setY(parseFloat(attributes.position_y) );
        }
    
        // if (attributes.position_z !== undefined) {
        //     this.model.position.setZ( parseFloat(attributes.position_z)+parseFloat((attributes.roof_depth/2||1)));
        // }
        
        // // Update rotation if needed
        // if (attributes.rotation_z !== undefined) {
        //     this.model.rotation.z = attributes.rotation_z;
        // }
    }
}

class SupportSquareGarageController extends genericGarageController{
    constructor() {
        super(); 
        this.setModel(GarageObjectSupportSquare)
    }
  

}

class SupportGarageController extends genericGarageController{
    constructor(){
        super()
        this.setModel(GarageObjectSupport)
    }
}

class GableGarageController extends genericGarageController{    
    constructor(){
        super()
        this.setModel(GarageObjectGable)
    }
}






// const loader = new THREE.TextureLoader();
// const global_texture=loader.load('/assets/config/default_1k.jpg');
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


        
        let  create_accordion=function(){
            
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
            accordionButton.textContent = "Kolory dachu";
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
    
    
            const squaresElement = this.createMarkup();
            accordionBodyDiv.appendChild(squaresElement);

            return accordionDiv
        }.bind(this)


        let  create_accordion2=(context,createMarkup)=>{
            
            const accordionDiv = document.createElement('div');
            accordionDiv.classList.add('accordion');
            accordionDiv.id = 'parent-inputs-accordion-' + context.id;
    
            const accordionItemDiv = document.createElement('div');
            accordionItemDiv.classList.add('accordion-item', 'rounded-0', 'border-end-0', 'border-top-0', 'border-start-0');
            accordionDiv.appendChild(accordionItemDiv);
    
            const accordionHeaderH3 = document.createElement('h3');
            accordionHeaderH3.classList.add('accordion-header');
            accordionHeaderH3.id = 'headingTwo-' + context.id;
            accordionItemDiv.appendChild(accordionHeaderH3);
    
            const accordionButton = document.createElement('button');
            accordionButton.classList.add('accordion-button');
            accordionButton.type = 'button';
            accordionButton.dataset.bsToggle = "collapse";
            accordionButton.dataset.bsTarget = '#collapseTwoType-' + context.id;
            accordionButton.setAttribute('aria-expanded', 'true');
            accordionButton.setAttribute('aria-controls', 'collapseTwoType-' + context.id);
            accordionButton.textContent = "Typ dachu";
            accordionHeaderH3.appendChild(accordionButton);
    
            const accordionCollapseDiv = document.createElement('div');
            accordionCollapseDiv.id = 'collapseTwoType-' + context.id;
            accordionCollapseDiv.classList.add('accordion-collapse', 'collapse', 'show');
            accordionCollapseDiv.setAttribute('aria-labelledby', 'headingTwo-' + context.id);
            accordionCollapseDiv.dataset.bsParent = '#parent-inputs-accordion-' + context.id;
            accordionItemDiv.appendChild(accordionCollapseDiv);
    
            const accordionBodyDiv = document.createElement('div');
            accordionBodyDiv.classList.add('accordion-body');
            // accordionBodyDiv.textContent = 'Control system for a body';
            accordionCollapseDiv.appendChild(accordionBodyDiv);
    
            const inputGroupDiv = document.createElement('div');
            inputGroupDiv.classList.add('input-group', 'align-items-center');
            accordionBodyDiv.appendChild(inputGroupDiv);
    
    
            const squaresElement = context.createMarkupType();
            accordionBodyDiv.appendChild(squaresElement);

            return accordionDiv
        }


        const accordionDiv=create_accordion()
        // this.insertContent(accordionDiv, escapedId, 'input-values', this.id);
        const escapedId = '#id-' + this.id + '.input-values';
        this.insertContent(accordionDiv, escapedId, 'input-values', this.id);

        const accordionDiv2=create_accordion2(this, this.createMarkupType)
        const escapedId2 = '#id-' + this.id + '.input-type';
        this.insertContent(accordionDiv2, escapedId2, 'input-values', this.id);

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
    createMarkupType() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container');

        const squareButtons = [
            { value: 'left', color: 'blue', display_value:"Spad w lewo",  display_image:'/assets/display/roof/roof_left.jpg'},
            { value: 'right', color: 'red', display_value:"Spad w prawo",  display_image:'/assets/display/roof/roof_right.jpg'},
            { value: 'back', color: 'green', display_value:"Spad do tyłu",  display_image:'/assets/display/roof/roof_back.jpg'},
            { value: 'front', color: 'green', display_value:"Spad do przodu",  display_image:'/assets/display/roof/roof_front.jpg'},
            { value: 'sideways', color: 'yellow', display_value:"Dwuspadowy", display_image:'/assets/display/roof/roof_sideways.jpg'},
            { value: 'sideways_front', color: 'yellow', display_value:"Dwuspadowy do przodu", display_image:'/assets/display/roof/roof_sideways_front.jpg'}
        ];

        squareButtons.forEach(button => {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            // squareDiv.style.backgroundColor = button.color;
            squareDiv.dataset.value = button.value;

            // Create the image element
            const imageEl = document.createElement('img');
            imageEl.src = button.display_image;
            imageEl.alt = button.display_value;  // for accessibility
            squareDiv.appendChild(imageEl);  // append the image to the squareDiv

            const textDiv = document.createElement('div');
            textDiv.textContent = button.display_value;
            squareDiv.appendChild(textDiv)


   

            // Attach event listener directly to the squareDiv
            squareDiv.addEventListener('click', function (e) {
                alert(squareDiv.dataset.value);
                // Notify the mediator or perform some action
             
                this.notifyMediator('changeType',`${squareDiv.dataset.value}`)
                // alert(this.id)
                // console.log(`Clicked on square with value: ${this.dataset.value}`);
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


class Platform {
    constructor() {
      // Initialize platform properties here
      // Maybe a Three.js Group or any other 3D object grouping mechanism you use
      this.group = new THREE.Group();
    }
  
    // Add child to platform
    addObject(child) {
      this.group.add(child);
    }
  
    // Remove child from platform
    removeObject(child) {
      this.group.remove(child);
    }
  
    // Apply rotation
    rotateY(angle) {
      this.group.rotation.y = angle;
    }
  
    // ... add other transformation or utility methods as needed
  }


class UconfigController extends genericGarageController {
    constructor(){
     super()
     this.setModel(InvisibleWallGarageObject)
     this.gui = new UconfigGui();
     this.gui.set_mediator(this)
    }
  
    determineState(){
     //You can get the current state of the object by using the 
     let name=this.state.get('name')||'Roof'

     let width=parseFloat(this.state.get('width'))||4.0
     let height=parseFloat(this.state.get('height'))||2.13
     let depth=parseFloat(this.state.get('depth'))||4.0


     let roof_type=this.state.get('roof_type')||'flat'
     let roof_width=parseFloat(this.state.get('roof_width'))||4.0
     let roof_depth=parseFloat(this.state.get('roof_depth'))||4.0
     let roof_height=parseFloat(this.state.get('roof_height'))||2
     let roof_color=this.state.get('color')||"#272727"
     let roof_angle=parseFloat(this.state.get('roof_angle'))||10
     let sheet_depth=parseFloat(this.state.get('sheet_depth'))||0.05
     let building_height=parseFloat(this.state.get('height'))||2.13
      // roof_depth=1.5

     let object_type = this.state.get('object_type') || 'left';

      roof_width=width
      building_height=height
      roof_depth=depth

      let position_x=this.state.get('position_x')||0
      let position_y=this.state.get('position_y')||0
      let position_z=this.state.get('position_z')||0
  
     let displacement_y=0
  //    displacement_y=1/8*Math.sin(Math.PI*parseFloat(roof_angle)/180)*parseFloat(this.state.get('roof_width'))
       displacement_y=roof_width*(1/2*Math.sin(Math.PI*parseFloat(roof_angle)/180))
      
  //    this.state.update( new accesser('position_y',find_displacement))
     let rotation_y=0
//   switch (object_type) {
//     case 'left':
//        rotation_y=0
//         break;
//     case 'right':
//          rotation_y=Math.PI/2

//         break;
//     case 'back':
//         rotation_y=Math.PI
//         break;
        
//     case 'front':
//         rotation_y=-Math.PI/2

//         break;
    
//     case 'sideways':
//         rotation_y=-Math.PI/2
//         break;
//     case 'sideways_front':
//         rotation_y=-Math.PI/2
//         break;
    
//     default: 
//         break;
    
// }



  
  //    this.state.state['position_y']=0.2+1*Math.sin(180*roof_angle/Math.PI)
     const accessersGable=[
      new accesser('name', 'Rooftop'),
      new accesser('width', roof_width),
      new accesser('height', 0.05),
      new accesser('sheet_depth', sheet_depth),
      new accesser('depth', roof_depth),
      new accesser('segments', 0),
      new accesser('radius', 0),
      new accesser('position_x', position_x),
      new accesser('position_y',displacement_y+building_height+position_y),
      new accesser('position_z',position_z),
      new accesser('color', roof_color),
      new accesser('position_relative', 'true'),
      new accesser('roof_angle', roof_angle),
      new accesser('roof_color', roof_color),
      new accesser('rotation_y', rotation_y)
      
    
  ]
  const accessersSupport1=[
      new accesser('name', 'Roof left'),
      new accesser('width', roof_width),
      new accesser('height', roof_height),
      new accesser('sheet_depth', sheet_depth),
      new accesser('depth', 0.05),
      new accesser('roof_depth', roof_depth),
      new accesser('segments', 0),
      new accesser('radius', 0),
      new accesser('position_x', position_x),
      new accesser('position_y', displacement_y+building_height+position_y),
      new accesser('position_z',-sheet_depth+position_z),
      new accesser('color', roof_color),
      new accesser('position_relative', 'true'),
      new accesser('roof_angle', roof_angle),
      new accesser('roof_color', roof_color),
      new accesser('rotation_y', rotation_y)
    
  ]
  const accessersSupport2=[
      new accesser('name', 'Roof right'),
      new accesser('width', roof_width),
      new accesser('height', roof_height),
      new accesser('sheet_depth', sheet_depth),
      new accesser('depth', 0.05),
      new accesser('roof_depth', roof_depth),
      new accesser('segments', 1),
      new accesser('radius', 1),
      new accesser('position_x', position_x),
      new accesser('position_y', displacement_y+building_height+position_y),
      new accesser('position_z',-roof_depth+position_z),
      new accesser('color', roof_color),
      new accesser('position_relative', 'true'),
      new accesser('roof_angle', roof_angle),
      new accesser('roof_color', roof_color),
      new accesser('rotation_y', rotation_y)
  ]
  const accessersSupport3=[
      new accesser('name', 'Roof back'),
      new accesser('width', roof_width),
      new accesser('height', 1),
      new accesser('sheet_depth', sheet_depth),
      new accesser('depth', 0.05),
      new accesser('roof_depth', roof_depth),
      new accesser('segments', 1),
      new accesser('radius', 0),
      new accesser('position_x',position_x),
      new accesser('position_y', displacement_y+building_height+position_y),
      new accesser('position_z',position_z),
      new accesser('color', roof_color),
      new accesser('position_relative', 'true'),
      new accesser('roof_angle', roof_angle),
      new accesser('roof_color', roof_color),
      new accesser('rotation_y', rotation_y)
    
  ]
    return {"accessersGable":accessersGable,"accessersSupport1":accessersSupport1, "accessersSupport2":accessersSupport2,"accessersSupport3":accessersSupport3}
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
            new accesser('name', 'Roof controllero'),
            // new accesser('color','#373737' )
            
        ]  
        this.set_mediator(this)
        this.set_the_options(this,accessers)

        console.log(this.state.state)
        const { accessersGable, accessersSupport1, accessersSupport2, accessersSupport3 } = this.determineState();
        // for(let i=0; i<accessers.length; i++) {
        //     this.state.update(accessers[i].resource_locator, accessers[i].value);
        // }
    
        let array = [
            {objectOptions: accessersGable, classInstance: GableGarageController},
            {objectOptions: accessersSupport1, classInstance: SupportGarageController},
            {objectOptions: accessersSupport2, classInstance: SupportGarageController},
            {objectOptions: accessersSupport3, classInstance: SupportSquareGarageController}
        ]
        

        this.children.forEach((child) => {
            child.handleEvent('recursivelyRemoveModel')
        });
        this.children=[]

        array.forEach(({ objectOptions, classInstance }) => {
            this.object_addition(objectOptions, classInstance);
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
            case 'changeType':
                // alert(data)
                const accessers=[
                    new accesser('object_type', data),
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

class UconfigsController extends genericGarageController {
    constructor(){
     super()
     this.setModel(InvisibleWallGarageObject)
     this.gui = new UconfigGui();
     this.gui.set_mediator(this)
    }
  
    object_addition(objectOptions,classInstance){
        const added_object=new classInstance()
        added_object.display.set_scene(this.display.get_scene())
        this.set_the_options(added_object, objectOptions)
        this.addChild(added_object)
    }

    determineState(){
     //You can get the current state of the object by using the 
     let name=this.state.get('name')||'Roof'

     let width=parseFloat(this.state.get('width'))||4.0
     let height=parseFloat(this.state.get('height'))||2.13
     let depth=parseFloat(this.state.get('depth'))||4.0


     let roof_type=this.state.get('roof_type')||'flat'
     let roof_width=parseFloat(this.state.get('roof_width'))||4.0
     let roof_depth=parseFloat(this.state.get('roof_depth'))||4.0
     let roof_height=parseFloat(this.state.get('roof_height'))||2
     let roof_color=this.state.get('color')||"#272727"
     let roof_angle=parseFloat(this.state.get('roof_angle'))||10
     let sheet_depth=parseFloat(this.state.get('sheet_depth'))||0.05
     let building_height=parseFloat(this.state.get('height'))||2.13
      // roof_depth=1.5

     let object_type = this.state.get('object_type') || 'left';

      roof_width=width
      building_height=height
      roof_depth=depth

      let position_x=this.state.get('position_x')||0
      let position_y=this.state.get('position_y')||0
      let position_z=this.state.get('position_z')||0
  
     let displacement_y=0
  //    displacement_y=1/8*Math.sin(Math.PI*parseFloat(roof_angle)/180)*parseFloat(this.state.get('roof_width'))
       displacement_y=roof_width*(1/2*Math.sin(Math.PI*parseFloat(roof_angle)/180))
      
  //    this.state.update( new accesser('position_y',find_displacement))
     let rotation_y=0
//   switch (object_type) {
//     case 'left':
//        rotation_y=0
//         break;
//     case 'right':
//          rotation_y=Math.PI/2

//         break;
//     case 'back':
//         rotation_y=Math.PI
//         break;
        
//     case 'front':
//         rotation_y=-Math.PI/2

//         break;
    
//     case 'sideways':
//         rotation_y=-Math.PI/2
//         break;
//     case 'sideways_front':
//         rotation_y=-Math.PI/2
//         break;
    
//     default: 
//         break;
    
// }



  
  //    this.state.state['position_y']=0.2+1*Math.sin(180*roof_angle/Math.PI)
     const accessersGable=[
      new accesser('name', 'Rooftop'),
      new accesser('width', roof_width),
      new accesser('height', 0.05),
      new accesser('sheet_depth', sheet_depth),
      new accesser('depth', roof_depth),
      new accesser('segments', 0),
      new accesser('radius', 0),
      new accesser('position_x', position_x),
      new accesser('position_y',displacement_y+building_height+position_y),
      new accesser('position_z',position_z),
      new accesser('color', roof_color),
      new accesser('position_relative', 'true'),
      new accesser('roof_angle', roof_angle),
      new accesser('roof_color', roof_color),
      new accesser('rotation_y', rotation_y)
      
    
  ]
  const accessersSupport1=[
      new accesser('name', 'Roof left'),
      new accesser('width', roof_width),
      new accesser('height', roof_height),
      new accesser('sheet_depth', sheet_depth),
      new accesser('depth', 0.05),
      new accesser('roof_depth', roof_depth),
      new accesser('segments', 0),
      new accesser('radius', 0),
      new accesser('position_x', position_x),
      new accesser('position_y', displacement_y+building_height+position_y),
      new accesser('position_z',-sheet_depth+position_z),
      new accesser('color', roof_color),
      new accesser('position_relative', 'true'),
      new accesser('roof_angle', roof_angle),
      new accesser('roof_color', roof_color),
      new accesser('rotation_y', rotation_y)
    
  ]
  const accessersSupport2=[
      new accesser('name', 'Roof right'),
      new accesser('width', roof_width),
      new accesser('height', roof_height),
      new accesser('sheet_depth', sheet_depth),
      new accesser('depth', 0.05),
      new accesser('roof_depth', roof_depth),
      new accesser('segments', 1),
      new accesser('radius', 1),
      new accesser('position_x', position_x),
      new accesser('position_y', displacement_y+building_height+position_y),
      new accesser('position_z',-roof_depth+position_z),
      new accesser('color', roof_color),
      new accesser('position_relative', 'true'),
      new accesser('roof_angle', roof_angle),
      new accesser('roof_color', roof_color),
      new accesser('rotation_y', rotation_y)
  ]
  const accessersSupport3=[
      new accesser('name', 'Roof back'),
      new accesser('width', roof_width),
      new accesser('height', 1),
      new accesser('sheet_depth', sheet_depth),
      new accesser('depth', 0.05),
      new accesser('roof_depth', roof_depth),
      new accesser('segments', 1),
      new accesser('radius', 0),
      new accesser('position_x',position_x),
      new accesser('position_y', displacement_y+building_height+position_y),
      new accesser('position_z',position_z),
      new accesser('color', roof_color),
      new accesser('position_relative', 'true'),
      new accesser('roof_angle', roof_angle),
      new accesser('roof_color', roof_color),
      new accesser('rotation_y', rotation_y)
    
  ]
    return {"accessersGable":accessersGable,"accessersSupport1":accessersSupport1, "accessersSupport2":accessersSupport2,"accessersSupport3":accessersSupport3}
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
            new accesser('name', 'Roof controllero'),
            // new accesser('color','#373737' )
            
        ]  
        this.set_mediator(this)
        this.set_the_options(this,accessers)

        console.log(this.state.state)
        const { accessersGable, accessersSupport1, accessersSupport2, accessersSupport3 } = this.determineState();
        // for(let i=0; i<accessers.length; i++) {
        //     this.state.update(accessers[i].resource_locator, accessers[i].value);
        // }
    
        let array = [
            {objectOptions: accessersGable, classInstance: GableGarageController},
            {objectOptions: accessersSupport1, classInstance: SupportGarageController},
            {objectOptions: accessersSupport2, classInstance: SupportGarageController},
            {objectOptions: accessersSupport3, classInstance: SupportSquareGarageController}
        ]
        

        this.children.forEach((child) => {
            child.handleEvent('recursivelyRemoveModel')
        });
        this.children=[]

        array.forEach(({ objectOptions, classInstance }) => {
            this.object_addition(objectOptions, classInstance);
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
            case 'changeType':
                // alert(data)
                const accessers=[
                    new accesser('object_type', data),
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

class AdvancedUconfigsController extends genericGarageController {
    constructor(){
     super()
     this.setModel(InvisibleWallGarageObject)
     this.gui = new UconfigGui();
     this.gui.set_mediator(this)
    }
  
    object_addition(objectOptions,classInstance){
        const added_object=new classInstance()
        added_object.display.set_scene(this.display.get_scene())
        this.set_the_options(added_object, objectOptions)
        this.addChild(added_object)
    }

    determineState(){
     //You can get the current state of the object by using the 
     let name=this.state.get('name')||'Roof'

     let width=parseFloat(this.state.get('width'))||4.0
     let height=parseFloat(this.state.get('height'))||2.13
     let depth=parseFloat(this.state.get('depth'))||4.0


     let roof_type=this.state.get('roof_type')||'flat'
     let roof_width=parseFloat(this.state.get('roof_width'))||4.0
     let roof_depth=parseFloat(this.state.get('roof_depth'))||4.0
     let roof_height=parseFloat(this.state.get('roof_height'))||2
     let roof_color=this.state.get('color')||"#272727"
     let roof_angle=parseFloat(this.state.get('roof_angle'))||10
     let sheet_depth=parseFloat(this.state.get('sheet_depth'))||0.05
     let building_height=parseFloat(this.state.get('height'))||2.13
      // roof_depth=1.5

     let object_type = this.state.get('object_type') || 'left';

      roof_width=width
      building_height=height
      roof_depth=depth

      let position_x=this.state.get('position_x')||0
      let position_y=this.state.get('position_y')||0
      let position_z=this.state.get('position_z')||0
  
     let displacement_y=0
  //    displacement_y=1/8*Math.sin(Math.PI*parseFloat(roof_angle)/180)*parseFloat(this.state.get('roof_width'))
       displacement_y=roof_width*(1/2*Math.sin(Math.PI*parseFloat(roof_angle)/180))
      
  //    this.state.update( new accesser('position_y',find_displacement))
     let rotation_y=0
//   switch (object_type) {
//     case 'left':
//        rotation_y=0
//         break;
//     case 'right':
//          rotation_y=Math.PI/2

//         break;
//     case 'back':
//         rotation_y=Math.PI
//         break;
        
//     case 'front':
//         rotation_y=-Math.PI/2

//         break;
    
//     case 'sideways':
//         rotation_y=-Math.PI/2
//         break;
//     case 'sideways_front':
//         rotation_y=-Math.PI/2
//         break;
    
//     default: 
//         break;
    
// }



  
  //    this.state.state['position_y']=0.2+1*Math.sin(180*roof_angle/Math.PI)
     const accessersGable=[
      new accesser('name', 'Rooftop'),
      new accesser('width', roof_width),
      new accesser('height', 0.05),
      new accesser('sheet_depth', sheet_depth),
      new accesser('depth', roof_depth),
      new accesser('segments', 0),
      new accesser('radius', 0),
      new accesser('position_x', position_x),
      new accesser('position_y',displacement_y+building_height+position_y),
      new accesser('position_z',position_z),
      new accesser('color', roof_color),
      new accesser('position_relative', 'true'),
      new accesser('roof_angle', roof_angle),
      new accesser('roof_color', roof_color),
      new accesser('rotation_y', rotation_y)
      
    
  ]
  const accessersSupport1=[
      new accesser('name', 'Roof left'),
      new accesser('width', roof_width),
      new accesser('height', roof_height),
      new accesser('sheet_depth', sheet_depth),
      new accesser('depth', 0.05),
      new accesser('roof_depth', roof_depth),
      new accesser('segments', 0),
      new accesser('radius', 0),
      new accesser('position_x', position_x),
      new accesser('position_y', displacement_y+building_height+position_y),
      new accesser('position_z',-sheet_depth+position_z),
      new accesser('color', roof_color),
      new accesser('position_relative', 'true'),
      new accesser('roof_angle', roof_angle),
      new accesser('roof_color', roof_color),
      new accesser('rotation_y', rotation_y)
    
  ]
  const accessersSupport2=[
      new accesser('name', 'Roof right'),
      new accesser('width', roof_width),
      new accesser('height', roof_height),
      new accesser('sheet_depth', sheet_depth),
      new accesser('depth', 0.05),
      new accesser('roof_depth', roof_depth),
      new accesser('segments', 1),
      new accesser('radius', 1),
      new accesser('position_x', position_x),
      new accesser('position_y', displacement_y+building_height+position_y),
      new accesser('position_z',-roof_depth+position_z),
      new accesser('color', roof_color),
      new accesser('position_relative', 'true'),
      new accesser('roof_angle', roof_angle),
      new accesser('roof_color', roof_color),
      new accesser('rotation_y', rotation_y)
  ]
  const accessersSupport3=[
      new accesser('name', 'Roof back'),
      new accesser('width', roof_width),
      new accesser('height', 1),
      new accesser('sheet_depth', sheet_depth),
      new accesser('depth', 0.05),
      new accesser('roof_depth', roof_depth),
      new accesser('segments', 1),
      new accesser('radius', 0),
      new accesser('position_x',position_x),
      new accesser('position_y', displacement_y+building_height+position_y),
      new accesser('position_z',position_z),
      new accesser('color', roof_color),
      new accesser('position_relative', 'true'),
      new accesser('roof_angle', roof_angle),
      new accesser('roof_color', roof_color),
      new accesser('rotation_y', rotation_y)
    
  ]
    return {"accessersGable":accessersGable,"accessersSupport1":accessersSupport1, "accessersSupport2":accessersSupport2,"accessersSupport3":accessersSupport3}
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
            new accesser('name', 'Roof controllero'),
            // new accesser('color','#373737' )
            
        ]  
        this.set_mediator(this)
        this.set_the_options(this,accessers)

        console.log(this.state.state)
        const { accessersGable, accessersSupport1, accessersSupport2, accessersSupport3 } = this.determineState();
        // for(let i=0; i<accessers.length; i++) {
        //     this.state.update(accessers[i].resource_locator, accessers[i].value);
        // }
    
        let array = [
            {objectOptions: accessersGable, classInstance: GableGarageController},
            {objectOptions: accessersSupport1, classInstance: SupportGarageController},
            {objectOptions: accessersSupport2, classInstance: SupportGarageController},
            {objectOptions: accessersSupport3, classInstance: SupportSquareGarageController}
        ]
        

        this.children.forEach((child) => {
            child.handleEvent('recursivelyRemoveModel')
        });
        this.children=[]

        array.forEach(({ objectOptions, classInstance }) => {
            this.object_addition(objectOptions, classInstance);
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
            case 'changeType':
                // alert(data)
                const accessers=[
                    new accesser('object_type', data),
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



export { UconfigsController as RoofControllableBasicSystem}
