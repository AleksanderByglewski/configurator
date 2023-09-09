
import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
import { CubeObject,UconfigObject,WallGarageObject, genericGarageObject } from '../base/object'
import {UconfigController,CubeController,WallGarageController,groupGenericGarageController,genericGarageController} from '../base/controller'

import {UconfigsChildImplementationController as GateSystem} from '../gate/implementation'  
class UconfigImplementationOmegaGui extends genericGui {
    constructor() {
        super();
    }
     generateSep(){
        const sepElem= document.createElement('hr');
        sepElem.classList.add('my-2' , 'my-lg-4')
        return sepElem
     }
    generateInputs(attributes) {

        function generateAccordion(){
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

        let name= (attributes && attributes.name) ? attributes.name: "Reset? systemów";

        accordionButton.textContent = name;
      
        accordionHeaderH3.appendChild(accordionButton);

        const accordionCollapseDiv = document.createElement('div');
        accordionCollapseDiv.id = 'collapseTwo-' + this.id;
        accordionCollapseDiv.classList.add('accordion-collapse', 'collapse');
        accordionCollapseDiv.classList.add('show');
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
            return {
            accordionDiv: accordionDiv,
            accordionBodyDiv: accordionBodyDiv
        };
        }

        let {accordionBodyDiv, accordionDiv}=generateAccordion.bind(this)()

        // const squaresElement = 
        // const squaresElement2=
        // accordionBodyDiv.appendChild(this.createMarkupColors());

        // accordionBodyDiv.appendChild(this.generateSep());

         accordionBodyDiv.appendChild(this.createMarkup());
       
        // accordionBodyDiv.appendChild(this.generateSep());
      
        // accordionBodyDiv.appendChild(this.createMarkupCoverType());


   
        const escapedId = '#id-' + this.id + '.input-values';
        this.insertContent(accordionDiv, escapedId, 'input-values', this.id);

        this.listenToChanges();
    }
    createMarkup() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container--three');


        const text_attributes = [];

        text_attributes.forEach(attr => {
            const textLabel = document.createElement('label');
            textLabel.textContent = attr;
            containerDiv.appendChild(textLabel);

            const filler = document.createElement('div');
            containerDiv.appendChild(filler);

            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.value = this.mediator.state[attr] || 'State name';  // default to empty string if not set

            // Event listener for input changes
            textInput.addEventListener('input', function (e) {
                this.mediator.state[attr] = e.target.value;
                this.notifyMediator('stateChange', { [attr]: e.target.value });
                
                console.log(this.mediator.state.state)
            }.bind(this));

            containerDiv.appendChild(textInput);
        });

        const attributes = [];

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
            sliderInput.addEventListener('input', function (e) {
                this.mediator.state[attr] = e.target.value;
                this.notifyMediator('stateChange', { [attr]: e.target.value });
                this.notifyMediator('buildingStep', { });
            }.bind(this));

            const sliderValueDisplay = document.createElement('span');
            sliderValueDisplay.textContent = sliderInput.value;
            sliderInput.addEventListener('input', function (e) {
                sliderValueDisplay.textContent = e.target.value;
            });

            containerDiv.appendChild(sliderInput);
            containerDiv.appendChild(sliderValueDisplay);
        });

        // ... your previous code ...

       

        const removeModelBtn = document.createElement('button');
        removeModelBtn.textContent = "Add new model front";
        removeModelBtn.classList.add('remove-model-btn');
        removeModelBtn.addEventListener('click', function () {
            // Call notifyMediator with 'recursivelyRemoveModel' event

            let scene=this.mediator.display.scene

            function setOptions(passedObject, accessers){
                for(let i=0; i<accessers.length; i++) {
                    passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
                }
            
              }

            let GroupGarageSystem=this.mediator.wall_front
            const emptySystem=[
                // new accesser('name', ' System'),
            
                // new accesser('position_x', 0.0),
                // new accesser('position_y', 0.0),
                // new accesser('position_z',0.0),
              ]
            
            function createGarageObject(accessers, ObjectClass){
                const passedObject = new ObjectClass();
                setOptions(passedObject, accessers)
                passedObject.display.set_scene(scene)
                return passedObject
            }
            let RedGateSystem1=createGarageObject(emptySystem, GateSystem);

            RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
            GroupGarageSystem.external_objects.push(RedGateSystem1)
            RedGateSystem1.state.state['name']="Brama frontowa" 
            RedGateSystem1.state.state['width']=3.35
            RedGateSystem1.handleEvent('buildingStep');
            RedGateSystem1.handleEvent('generateInputs');
            GroupGarageSystem.handleEvent('stateChange', {'rotation_y': 0*Math.PI/2} )

 
        }.bind(this));

        const removeModelBtn2 = document.createElement('button');
        removeModelBtn2.textContent = "Add new model left";
        removeModelBtn2.classList.add('remove-model-btn');

        removeModelBtn2.addEventListener('click', function () {
            // Call notifyMediator with 'recursivelyRemoveModel' event

            let scene=this.mediator.display.scene

            function setOptions(passedObject, accessers){
                for(let i=0; i<accessers.length; i++) {
                    passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
                }
            
              }

            let GroupGarageSystem=this.mediator.wall_left
            const emptySystem=[
                // new accesser('name', ' System'),
            
                // new accesser('position_x', 0.0),
                // new accesser('position_y', 0.0),
                // new accesser('position_z',0.0),
              ]
            
            function createGarageObject(accessers, ObjectClass){
                const passedObject = new ObjectClass();
                setOptions(passedObject, accessers)
                passedObject.display.set_scene(scene)
                return passedObject
            }
            let RedGateSystem1=createGarageObject(emptySystem, GateSystem);

            RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
            GroupGarageSystem.external_objects.push(RedGateSystem1)
            RedGateSystem1.state.state['name']="Brama lewa" 
            RedGateSystem1.state.state['width']=3.25
            RedGateSystem1.handleEvent('buildingStep');
            RedGateSystem1.handleEvent('generateInputs');
            GroupGarageSystem.handleEvent('stateChange', {'rotation_y': 3*Math.PI/2} )

 
        }.bind(this));

       const removeModelBtn3 = document.createElement('button');
        removeModelBtn3.textContent = "Add new model right";
        removeModelBtn3.classList.add('remove-model-btn');

        removeModelBtn3.addEventListener('click', function () {
            // Call notifyMediator with 'recursivelyRemoveModel' event

            let scene=this.mediator.display.scene

            function setOptions(passedObject, accessers){
                for(let i=0; i<accessers.length; i++) {
                    passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
                }
            
              }

            let GroupGarageSystem=this.mediator.wall_right
            const emptySystem=[
                // new accesser('name', ' System'),
            
                // new accesser('position_x', 0.0),
                // new accesser('position_y', 0.0),
                // new accesser('position_z',0.0),
              ]
            
            function createGarageObject(accessers, ObjectClass){
                const passedObject = new ObjectClass();
                setOptions(passedObject, accessers)
                passedObject.display.set_scene(scene)
                return passedObject
            }
            let RedGateSystem1=createGarageObject(emptySystem, GateSystem);

            RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
            GroupGarageSystem.external_objects.push(RedGateSystem1)
            RedGateSystem1.state.state['name']="Brama prawa" 
            RedGateSystem1.state.state['width']=3.65
            RedGateSystem1.handleEvent('buildingStep');
            RedGateSystem1.handleEvent('generateInputs');
            GroupGarageSystem.handleEvent('stateChange', {'rotation_y': Math.PI/2} )

 
        }.bind(this));


        const removeModelBtn4 = document.createElement('button');
        removeModelBtn4.textContent = "Add new model wall back";
        removeModelBtn4.classList.add('remove-model-btn');

        removeModelBtn4.addEventListener('click', function () {
            // Call notifyMediator with 'recursivelyRemoveModel' event

            let scene=this.mediator.display.scene

            function setOptions(passedObject, accessers){
                for(let i=0; i<accessers.length; i++) {
                    passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
                }
            
              }

            let GroupGarageSystem=this.mediator.wall_back
            const emptySystem=[
                // new accesser('name', ' System'),
            
                // new accesser('position_x', 0.0),
                // new accesser('position_y', 0.0),
                // new accesser('position_z',0.0),
              ]
            
            function createGarageObject(accessers, ObjectClass){
                const passedObject = new ObjectClass();
                setOptions(passedObject, accessers)
                passedObject.display.set_scene(scene)
                return passedObject
            }
            let RedGateSystem1=createGarageObject(emptySystem, GateSystem);

            RedGateSystem1.external_objects_controllers.push(GroupGarageSystem);
            GroupGarageSystem.external_objects.push(RedGateSystem1)
            RedGateSystem1.state.state['name']="Brama tylnia" 
            RedGateSystem1.state.state['width']=4.15
            RedGateSystem1.handleEvent('buildingStep');
            RedGateSystem1.handleEvent('generateInputs');
            GroupGarageSystem.handleEvent('stateChange', {'rotation_y': 2*Math.PI/2} )

 
        }.bind(this));
        containerDiv.appendChild(removeModelBtn3);
        containerDiv.appendChild(removeModelBtn4);
        containerDiv.appendChild(removeModelBtn2);
        containerDiv.appendChild(removeModelBtn);

        return containerDiv;
    }
    createMarkupColors(){
   const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container--8');

        const squareButtons = [
            { value: '#972727',  display_value:"RAL2003",  display_image:'/assets/display/colors/RAL2003'},
            { value: '#822727',  display_value:"RAL2005",  display_image:'/assets/display/colors/RAL2005'},
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

    createMarkupCoverType(){
        const containerDiv = document.createElement('div');
             containerDiv.classList.add('squares-container');
     
             const squareButtons = [
                 { value: 'material_type_1',  display_value:"Blacha typ 1",  display_image:'/assets/display/material/1.jpg'},
                 { value: 'material_type_2',  display_value:"Blacha typ 2",  display_image:'/assets/display/material/2.jpg'},
                 { value: 'material_type_3',  display_value:"Blacha typ 3",  display_image:'/assets/display/material/3.jpg'},
                 { value: 'material_type_4',  display_value:"Blacha typ 4",  display_image:'/assets/display/material/4.jpg'},
                 { value: 'material_type_5',  display_value:"Blacha typ dodatkowa",  display_image:'/assets/display/material/5.jpg'},
                
             ];
     
             squareButtons.forEach(button => {
                 const squareDiv = document.createElement('div');
                 squareDiv.classList.add('square');
                 // squareDiv.style.backgroundColor = button.color;
                 squareDiv.dataset.value = button.value;
     
                 // Create the image element
                 const imageEl = document.createElement('img');
                //  imageEl.style.backgroundColor = button.value;
                imageEl.src =button.display_image;

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
                  
                    const accessers = [
                        new accesser('material_type', squareDiv.dataset.value),
                    ]
                     this.notifyMediator('genericChangeObject',accessers)
               
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
    notifyMediator(event, value = "") {
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
    listenToChanges() {
    }
}



 export{UconfigImplementationOmegaGui}