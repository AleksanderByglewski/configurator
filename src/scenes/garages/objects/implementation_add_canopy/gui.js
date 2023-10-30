
import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
import { CubeObject,UconfigObject,WallGarageObject, genericGarageObject } from '../base/object'
import {UconfigController,CubeController,WallGarageController,groupGenericGarageController,genericGarageController} from '../base/controller'

import { 
    UconfigsImplementationDoorController as DoorSystem,
 
    } from '../implementation_door/implementation'

    import {
        UconfigsImplementationRoofsController as RoofSystem,
        UconfigsImplementationSecondaryRoofsController as SecondaryRoofSystem
      } from '../implementation_roof/implementation'
    
      import {
        UconfigsImplementationCanopyController as CanopySystem,
      } from '../implementation_canopy/implementation'

      import {
        UconfigsImplementationSecondaryCanopyController as SecondaryCanopySystem,
      } from '../implementation_canopy/implementation'
      import {
        UconfigsSecondaryChildImplementationController as SecondaryFloorSystem,
        UconfigsChildImplementationController as FloorSystem,
        UconfigsImplementationController as InvisibleSystem } from '../floors/implementation'
        import {
            UconfigsImplementationFloorsController as AnotherFloorSystem } from '../implementation_floor/implementation'

class UconfigImplementationGui extends genericGui {
    constructor() {
        super();
    }
    initial_call(targeted_wall_name){
        let scene = this.mediator.display.get_scene();
        const emptySystem = [];
     
        let self=this
     
        let GroupGarageSystem=self.mediator.group_controller
        // if(targeted_wall){
        // GroupGarageSystem=targeted_wall
        // }
        let RoofSystem2 = self.createGarageObject(emptySystem, SecondaryRoofSystem)

       
        let CanopySystem1 = self.createGarageObject(emptySystem, SecondaryCanopySystem)

        CanopySystem1.status="niche_canopy"
    
        if(this.mediator.state.get('gui_child_name')=="Dodaj wiatę"){
            CanopySystem1.state.state['name']= "Kontrola wiaty"
        }
        else{
        CanopySystem1.state.state['name']=  "Kontrola Wnęk"
        }
        GroupGarageSystem.external_objects.push(CanopySystem1)
        CanopySystem1.external_objects_controllers.push(GroupGarageSystem)
        CanopySystem1.mediator = GroupGarageSystem
        

        CanopySystem1.external_objects.push(RoofSystem2)
        RoofSystem2.external_objects_controllers.push(CanopySystem1)
        CanopySystem1.mediator = GroupGarageSystem
        // RoofSystem2.state.state['position_x']=3.25
        // RoofSystem2.handleEvent('buildingStep')
        // RoofSystem2.handleEvent('generateInputs')

        GroupGarageSystem.external_objects.push(CanopySystem1)
        CanopySystem1.external_objects_controllers.push(GroupGarageSystem)
        CanopySystem1.mediator = GroupGarageSystem

       
        let RedGateSystem1 = self.createGarageObject(emptySystem, AnotherFloorSystem);
        RedGateSystem1.state.state['color'] = "#FFFFFF"
        
        CanopySystem1.external_objects.push(RedGateSystem1)
        RedGateSystem1.external_objects_controllers.push(CanopySystem1)
        RedGateSystem1.mediator = CanopySystem1

        // CanopySystem1.state.state['object_width']=2.7
        CanopySystem1.state.state['targeted_wall_name']=targeted_wall_name
        CanopySystem1.handleEvent('hardBuildingStep')
        CanopySystem1.handleEvent('generateInputs')
      
    }
    initialGeneration(){
        const emptySystem = [];
    
    
        let targetWall = this.mediator.wall_front;
        // Create DoorSystem1 and assign appropriate values based on the selected option
        let DoorSystem1 = this.createGarageObject(emptySystem, DoorSystem);
        targetWall.external_objects.push(DoorSystem1);
        DoorSystem1.external_objects_controllers.push(targetWall); // Changed to targetWall instead of always wall_left
        DoorSystem1.mediator = targetWall; // Changed to targetWall instead of always wall_left
        //DoorSystem1.state.state['color']="#C20000"
        DoorSystem1.state.state['position_z']=0.01
        if(this.mediator.door_type){

        DoorSystem1.state.state['door_width']=1.13
        }


        DoorSystem1.state.state['name']="Brama frontowa" ;
        targetWall.handleEvent('buildingStep');
       
        DoorSystem1.handleEvent('generateInputs')

    }

    //Helper functions
    createGarageObject(accessers, ObjectClass) {
        let scene = this.mediator.display.get_scene();
        const passedObject = new ObjectClass();
        this.setOptions(passedObject, accessers);
        passedObject.display.set_scene(scene);
        return passedObject;
    }

    setOptions(passedObject, accessers) {
        for (let i = 0; i < accessers.length; i++) {
            passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
        }
    }
    //

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
        accordionButton.classList.add('collapsed');
        accordionButton.type = 'button';
        accordionButton.dataset.bsToggle = "collapse";
        accordionButton.dataset.bsTarget = '#collapseTwo-' + this.id;
        accordionButton.setAttribute('aria-expanded', 'true');
        accordionButton.setAttribute('aria-controls', 'collapseTwo-' + this.id);

        let name= (attributes && attributes.name) ? attributes.name: "Budowa systemów";

        accordionButton.textContent = name;
      
        accordionHeaderH3.appendChild(accordionButton);

        const accordionCollapseDiv = document.createElement('div');
        accordionCollapseDiv.id = 'collapseTwo-' + this.id;
        accordionCollapseDiv.classList.add('accordion-collapse', 'collapse');
        //accordionCollapseDiv.classList.add('show');
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
    
        // Create a select element
        const selectElement = document.createElement('select');
        selectElement.classList.add('wall-select');
        
        let options=['front']
        let options_mapping={"front":"frontowa"}
        let print_elemnt="Brama"
        // Create options for the select element
        if(this.mediator.door_type){
        print_elemnt="Drzwi"
        options = ['front', 'left', 'right', 'back'];
        options_mapping={
            "front":"frontowe",
            "left": "lewe",
            "right":"prawe",
            "back":"tylnie"
                    }
        }

    

        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = options_mapping[option];
            selectElement.appendChild(optionElement);
        });
    
        // Create a submit button
        const submitButton = document.createElement('button');
        submitButton.textContent = "Dodaj element";
        submitButton.classList.add('submit-button');
    
        //Todo make it better
        let scene = this.mediator.display.get_scene();
        const emptySystem = [];
    

    
        let self = this;
    
        // Add click event listener to the submit button
        submitButton.addEventListener('click', function() {
            let targetWall;
            const selectedValue = selectElement.value;
            switch (selectedValue) {
                case 'front':
                    targetWall = self.mediator.wall_front;
                    break;
                case 'left':
                    targetWall = self.mediator.wall_left;
                    break;
                case 'right':
                    targetWall = self.mediator.wall_right;
                    break;
                case 'back':
                    targetWall = self.mediator.wall_back;
                    break;
                default:
                    console.error('Invalid option selected');
                    return;
            }
    
         self.initial_call(selectedValue)
          
        });
    
        containerDiv.appendChild(selectElement);
    
        // ... your previous code ...
    
        const removeModelBtn = document.createElement('button');
        removeModelBtn.textContent = "Remove Model";
        removeModelBtn.classList.add('remove-model-btn');
        removeModelBtn.addEventListener('click', function() {
            // Call notifyMediator with 'recursivelyRemoveModel' event
       
        this.notifyMediator('recursivelyRemoveModel');
        }.bind(this));
    
        containerDiv.appendChild(submitButton); 
        // containerDiv.appendChild(removeModelBtn);
    
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
             containerDiv.classList.add('squares-container', 'squares-container--material');
     
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
 export{UconfigImplementationGui}