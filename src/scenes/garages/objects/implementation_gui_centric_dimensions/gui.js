
import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
import { CubeObject,UconfigObject,WallGarageObject, genericGarageObject } from '../base/object'
import {UconfigController,CubeController,WallGarageController,groupGenericGarageController,genericGarageController} from '../base/controller'
import { ComponentFactory } from '../base_gui/basic.js';
import { stateMachine } from '../../../../components/state.js';
class UconfigImplementationWallGui extends genericGui {
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
        accordionButton.classList.add('collapsed');
        accordionButton.type = 'button';
        accordionButton.dataset.bsToggle = "collapse";
        accordionButton.dataset.bsTarget = '#collapseTwo-' + this.id;
        accordionButton.setAttribute('aria-expanded', 'true');
        accordionButton.setAttribute('aria-controls', 'collapseTwo-' + this.id);
        let name=  this.mediator.state.state['name'] || "Wybór pergoli";
      
        
        accordionButton.textContent = name;
      
        accordionHeaderH3.appendChild(accordionButton);

        const accordionCollapseDiv = document.createElement('div');
        accordionCollapseDiv.id = 'collapseTwo-' + this.id;
        accordionCollapseDiv.classList.add('accordion-collapse', 'collapse');
        // accordionCollapseDiv.classList.add('show');
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
        //  accordionBodyDiv.appendChild(this.createMarkupColors());

        //  accordionBodyDiv.appendChild(this.generateSep());

        // accordionBodyDiv.appendChild(this.createMarkup());
       
        // accordionBodyDiv.appendChild(this.generateSep());
      
         accordionBodyDiv.appendChild(this.createMarkup());


   
        const escapedId = '#id-' + this.id + '.input-values';
        this.insertContent(accordionDiv, escapedId, 'input-values', this.id);

        this.listenToChanges();
    }
    createMarkup() {
        console.log("Wtf1", this)
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container','squares-container--1' );

        const handleClick = (value, e) => {
            // Here, 'this' refers to the UconfigImplementationWallGui instance.
        
            this.notifyMediator('stateChange', { 'object_width': value });
            this.notifyMediator('buildingStep', {});
   
     
            console.log('I am targetting this changed to:', value);
            // Add other actions you need to perform on click
          };



          function createHandleClick(propertyName) {
            console.log("Wtf2",  this)
            return (value)=> {
         
              // Ensure 'this' is bound correctly, it refers to the UconfigImplementationWallGui instance
              this.notifyMediator('stateChange', { [propertyName]: value });
              this.notifyMediator('buildingStep', {});
              console.log(propertyName + ' changed to:', value);
            }
          }
          
          // Generate specific handlers
        const handleClickHeight = createHandleClick.bind(this)('object_height');
        const handleClickWidth = createHandleClick.bind(this)('object_width');
        const handleClickDepth = createHandleClick.bind(this)('object_depth');
        // Function that creates a partially applied handleClick function for each type of input
  
        const heightInput = ComponentFactory.createInputField({
            label: 'Wysokość obiektu (m)',
            inputType: 'number',
            step: '0.1',
            changeCallback: handleClickHeight 
          });
          

        // Create width input
        const widthInput = ComponentFactory.createInputField({
            label: 'Szerokość obiektu (m)', // Label for the width input
            inputType: 'number', // Type of input
            step: '0.5', // Step size
            // You can also include callback functions for events like 'change' if needed
            changeCallback: handleClickWidth
        });

        const depthInput = ComponentFactory.createInputField({
            label: 'Głębokość obiektu (m)', // Label for the width input
            inputType: 'number', // Type of input
            step: '0.5', // Step size
            // You can also include callback functions for events like 'change' if needed
            changeCallback: handleClickDepth 
        });

        // Assuming you have a container div in your HTML to append these inputs
        containerDiv.appendChild(heightInput);
        containerDiv.appendChild(widthInput);
        containerDiv.appendChild(depthInput);

   
        //   buttons.forEach(buttonData => {
        //     // Here, you're passing an object with 'buttonData' and 'clickCallback' as keys
        //     const squareButton = ComponentFactory.createSquareButton({
        //       buttonData: buttonData,
        //       clickCallback: handleClick.bind(this) // Use .bind to ensure 'this' inside handleClick refers to your class instance
        //     });
        //     containerDiv.appendChild(squareButton);
        //   });
      


        const confirmation = ComponentFactory.confirmationButton({
            text: 'Zapisz wybory', // Label for the width input

            // You can also include callback functions for events like 'change' if needed
            changeCallback: function(value) {
            
                console.log('Dimensions confirmed:', value);
                stateMachine.transition('InputDimensionsState')
            }
});

containerDiv.appendChild(confirmation);

// containerDiv.appendChild(depthInput);
return containerDiv
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

    createColorType(){
        const containerDiv = document.createElement('div');
             containerDiv.classList.add('squares-container', 'squares-container--material');
     
             const squareButtons = [
                 { value: 'RAL7016',  display_value:"RAL 7016",  display_image:'/assets/display/material/RAL7016.jpg'},
                 { value: 'RAL9005',  display_value:"RAL 9005",  display_image:'/assets/display/material/RAL9005.jpg'},
                 { value: 'RAL9016',  display_value:"RAL 9016",  display_image:'/assets/display/material/RAL9016.jpg'},
                 { value: 'RAL1015',  display_value:"RAL 1015",  display_image:'/assets/display/material/RAL1015.jpg'},
                 { value: 'RAL7032',  display_value:"RAL 7032",  display_image:'/assets/display/material/RAL7032.jpg'},
                 { value: 'RAL8019',  display_value:"RAL 8019",  display_image:'/assets/display/material/RAL8019.jpg'},
                 { value: 'WOOD',  display_value:"Drewnopodobny",  display_image:'/assets/display/material/WOOD.jpg'},
                 { value: 'ALL',  display_value:"Zobacz wszystkie",  display_image:'/assets/display/material/0.png'},
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
                  
                     this.notifyMediator('stateChange', { 'object_type': squareDiv.dataset.value});
                     this.notifyMediator('buildingStep', { });
                    //  this.notifyMediator('hardBuildingStep', { });
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
 export{UconfigImplementationWallGui}