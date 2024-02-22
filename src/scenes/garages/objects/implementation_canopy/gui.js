
import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
import { CubeObject,UconfigObject,WallGarageObject, genericGarageObject } from '../base/object'
import {UconfigController,CubeController,WallGarageController,groupGenericGarageController,genericGarageController} from '../base/controller'

import {UconfigUserGui} from '../base/gui'

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
        accordionBodyDiv.appendChild(this.createMarkupColors());

        accordionBodyDiv.appendChild(this.generateSep());

        accordionBodyDiv.appendChild(this.createMarkup());
       
        accordionBodyDiv.appendChild(this.generateSep());
      
        accordionBodyDiv.appendChild(this.createMarkupCoverType());


   
        const escapedId = '#id-' + this.id + '.input-values';
        this.insertContent(accordionDiv, escapedId, 'input-values', this.id);

        this.listenToChanges();
    }
    createMarkup() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container--three');


        const text_attributes = ['name'];

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

        const attributes = ['position_x', 'position_y', 'position_z','rotation_x','rotation_y', 'rotation_z',  'width', 'height', 'depth'];

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
        removeModelBtn.textContent = "Remove Model";
        removeModelBtn.classList.add('remove-model-btn');
        removeModelBtn.addEventListener('click', function () {
            // Call notifyMediator with 'recursivelyRemoveModel' event
            this.notifyMediator('recursivelyRemoveModel');
        }.bind(this));

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

class UconfigCanopyUserGui extends UconfigUserGui {
    constructor() {
        super();
    }

    createMarkup() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container--three');


        // let text_attributes = ['name'];
        // console.log(this.mediator.state.state)

        let text_attributes = Object.keys(this.mediator.state.state)
        

        function splitArrayByValue(array, values) {
            //
            // Create two arrays: one for items with certain values and another for the rest
            let arrayWithValues = array.filter(item => values.includes(item));
            let arrayWithoutValues = array.filter(item => !values.includes(item));
        
            // Return both arrays
            return  arrayWithValues;
        }
        function restSplitArrayByValue(array, values){
            let arrayWithoutValues = array.filter(item => !values.includes(item));
            return  arrayWithoutValues 
        }


        
        // let text_attributes = [1, 2, 3, 4, 5];
        let values = ['object_width', 'object_depth' ];
        let label_values=[ 'Szerokość elementu', 'Głębokość elementu']
        
        let positionValues=splitArrayByValue(text_attributes,values);
        text_attributes=restSplitArrayByValue(text_attributes,values);
        //TODO YOU CAN RETURN HERE AND MAKE IT BETTER
        text_attributes=[]

        let inputs=this.generateTextInputs(containerDiv,positionValues, {type:"number", step:"0.1"},label_values)
        
        
 

        text_attributes.forEach(attr => {
            const textLabel = document.createElement('label');
            textLabel.textContent = attr;
            containerDiv.appendChild(textLabel);

            const filler = document.createElement('div');
            containerDiv.appendChild(filler);

            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.value = this.mediator.state.state[attr] || '';  // default to empty string if not set

            // Event listener for input changes
            textInput.addEventListener('input', function (e) {
                this.mediator.state[attr] = e.target.value;
               
                this.notifyMediator('debugStateChange', { [attr]: e.target.value });
              
                console.log(this.mediator.state.state)
            }.bind(this));

            containerDiv.appendChild(textInput);
        });



        // const attributes = ['position_x', 'position_y', 'position_z','rotation_x','rotation_y', 'rotation_z',  'width', 'height', 'depth'];
        const attributes = []
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
                this.notifyMediator('buildingStep', {});
            }.bind(this));

            const sliderValueDisplay = document.createElement('span');
            sliderValueDisplay.textContent = sliderInput.value;
            sliderInput.addEventListener('input', function (e) {
                sliderValueDisplay.textContent = e.target.value;
            });

            containerDiv.appendChild(sliderInput);
            containerDiv.appendChild(sliderValueDisplay);
        });

       

        const formFields = [
            { label: 'Lamele ściana prawa', value: 'Dodatkowe spady',type:"checkbox", name:'lameled_wall_right'  },
            { label: 'Lamele ściana lewa', value: 'Dodatkowe spady',type:"checkbox", name:'lameled_wall_left'  },
            { label: 'Lamele ściana tylnia', value: 'Automatyka', type:"checkbox",  name:'lameled_wall_back' },
            { label: 'Lamele ściana frontowa', value: 'Rynny',type:"checkbox" , name:'lameled_wall_front' },
          
            
        ];
    
        
        const checkboxes = document.createElement('div');
        checkboxes.style.gridColumn="1/-1"
        checkboxes.classList.add('mt-2')
        containerDiv.appendChild(checkboxes);

        formFields.forEach(field => {

            let inputElement;
            if (field.type === 'textarea') {
                inputElement = document.createElement('textarea');
            } else if (field.type === 'select') {
                inputElement = document.createElement('select');
                field.options.forEach(optionValue => {
                    const optionElement = document.createElement('option');
                    optionElement.value = optionValue;
                    optionElement.textContent = optionValue;
                    inputElement.appendChild(optionElement);
                });
            } 
            else  if (field.type === 'checkbox') {
                const checkboxDiv = document.createElement('div');
                checkboxDiv.classList.add('input-group', 'mb-2');
        
                const inputGroupTextDiv = document.createElement('div');
                inputGroupTextDiv.classList.add('input-group-text');
        
                const input = document.createElement('input');
                input.classList.add('form-check-input');
                input.type = 'checkbox';
                input.value = field.value;
                input.name = field.value.toLowerCase().replace(/\s+/g, '-');  // Example to generate name attribute
        
                input.addEventListener('change', function(e) {
                    this.mediator.state[field.name] = e.target.checked;
                    this.notifyMediator('stateChange', { [field.name]: e.target.checked });
                    this.notifyMediator('buildingStep', {});
                }.bind(this));

                inputGroupTextDiv.appendChild(input);
                checkboxDiv.appendChild(inputGroupTextDiv);
        
                const textDiv = document.createElement('div');
                textDiv.classList.add('form-control');
                textDiv.textContent = field.label;
                textDiv.setAttribute('disabled', '');
        
                checkboxDiv.appendChild(textDiv);
                checkboxes.appendChild(checkboxDiv);
            } 
            else {
                inputElement = document.createElement('input');
                inputElement.type = field.type;
            }
            // inputElement.name = field.name;
            // contactForm.appendChild(inputElement);
        });


        const removeModelBtn = document.createElement('button');
        removeModelBtn.textContent = "Usuń element";
        removeModelBtn.classList.add('remove-model-btn', 'mt-2');
        removeModelBtn.addEventListener('click', function () {
            // Call notifyMediator with 'recursivelyRemoveModel' event
            this.notifyMediator('unattachModel');
            this.notifyMediator('recursivelyRemoveModel');
            var element = document.getElementById('id-'+this.id);
            if (element) {
                element.remove();
            }
        }.bind(this));

        containerDiv.appendChild(removeModelBtn);
      

        return containerDiv;
    }

}

 export{UconfigImplementationWallGui ,UconfigCanopyUserGui}