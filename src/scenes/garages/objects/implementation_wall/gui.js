
import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
import { CubeObject,UconfigObject,WallGarageObject, genericGarageObject } from '../base/object'
import {UconfigController,CubeController,WallGarageController,groupGenericGarageController,genericGarageController} from '../base/controller'

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

        function generateAccordion(who_to_collapse="collapseTwo", pass_name="Kontroler", show=false){
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
            accordionButton.classList.add('accordion-button', 'collapsed');
            accordionButton.type = 'button';
            accordionButton.dataset.bsToggle = "collapse";
            accordionButton.dataset.bsTarget = '#'+who_to_collapse+'-' + this.id;
            accordionButton.setAttribute('aria-expanded', 'true');
            accordionButton.setAttribute('aria-controls', ''+who_to_collapse+'-' + this.id);
    
            let name= pass_name
    
            accordionButton.textContent = name;
          
            accordionHeaderH3.appendChild(accordionButton);
    
            const accordionCollapseDiv = document.createElement('div');
            accordionCollapseDiv.id = ''+who_to_collapse+'-' + this.id;
            accordionCollapseDiv.classList.add('accordion-collapse', 'collapse');
            //You can add remove this line to collapse it by default
            if(show){
            accordionCollapseDiv.classList.add('show');
            }
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

        let {accordionBodyDiv, accordionDiv}=generateAccordion.bind(this)('collapseTwo',"Wymiary garażu", true)

        // const squaresElement = 
        // const squaresElement2=
        
        accordionBodyDiv.appendChild(this.createMarkupSize());
       
   

        //accordionBodyDiv.appendChild(this.generateSep());

        // accordionBodyDiv.appendChild(this.createMarkupColors());

        //accordionBodyDiv.appendChild(this.generateSep());
      
        //accordionBodyDiv.appendChild(this.createMarkupCoverType());


   
        const escapedId = '#id-' + this.id + '.input-values';
        this.insertContent(accordionDiv, escapedId, 'input-values', this.id);

        let { accordionBodyDiv: accordionBodyDiv2, accordionDiv: accordionDiv2 } = 
        generateAccordion.bind(this)('collapseThree',"Kolory ścian")

        accordionBodyDiv2.appendChild(this.createMarkupColors());
    
        const escapedId2 = '#id-' + this.id + '.input-values2'; // Assuming you have a different container for the second accordion
        this.insertContent(accordionDiv2, escapedId2, 'input-values', this.id);




        let { accordionBodyDiv: accordionBodyDiv3, accordionDiv: accordionDiv3 } = 
        generateAccordion.bind(this)('collapseFour',"Pokrycie ścian")

        accordionBodyDiv3.appendChild(this.createMarkupType());
    
        const escapedId3 = '#id-' + this.id + '.input-values3'; // Assuming you have a different container for the second accordion
        this.insertContent(accordionDiv3, escapedId3, 'input-values', this.id);




        

        this.listenToChanges();
    }
    createMarkupType(){
        const containerDiv = document.createElement('div');
             containerDiv.classList.add('squares-container', 'squares-container--material');
     
             const squareButtons = [
                 { value: 'material_type_1',  display_value:"Blacha typ 1",  display_image:'/assets/display/material/1.jpg'},
                 { value: 'material_type_2',  display_value:"Blacha typ 2",  display_image:'/assets/display/material/2.jpg'},
                 { value: 'material_type_3',  display_value:"Blacha typ 3",  display_image:'/assets/display/material/3.jpg'},
                 { value: 'material_type_4',  display_value:"Blacha typ 4",  display_image:'/assets/display/material/4.jpg'},
                //  { value: 'material_type_5',  display_value:"Blacha typ dodatkowa",  display_image:'/assets/display/material/5.jpg'},
                
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
                  
                    // const accessers = [
                    //     new accesser('material_type', squareDiv.dataset.value),
                    // ]
                    //  this.notifyMediator('genericChangeObject',accessers)
                    
                    this.notifyMediator('stateChange', { 'material_type': squareDiv.dataset.value});
                 
                    this.notifyMediator('buildingStep', { });
               
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

    createMarkupSize() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container');


        // const text_attributes = ['name'];

        // text_attributes.forEach(attr => {
        //     const textLabel = document.createElement('label');
        //     textLabel.textContent = attr;
        //     containerDiv.appendChild(textLabel);

        //     const filler = document.createElement('div');
        //     containerDiv.appendChild(filler);

        //     const textInput = document.createElement('input');
        //     textInput.type = 'text';
        //     textInput.value = this.mediator.state[attr] || 'State name';  // default to empty string if not set

        //     // Event listener for input changes
        //     textInput.addEventListener('input', function (e) {
        //         this.mediator.state[attr] = e.target.value;
        //         this.notifyMediator('stateChange', { [attr]: e.target.value });
                
        //         console.log(this.mediator.state.state)
        //     }.bind(this));

        //     containerDiv.appendChild(textInput);
        // });

        let N=25
        const vals1 = Array.from({length: N}, (_, i) => 0.5*i + 3.0);
         N=25
        const vals2 = Array.from({length: N}, (_, i) => 0.1*i + 2.13);
         N=25
        const vals3 = Array.from({length: N}, (_, i) => 0.5*i + 3.0);

        const attributes = [ 
            ['object_width', 'Szerokość garażu', vals1],
            ['object_depth', 'Głębokość garażu', vals3],
            ['object_height', 'Wysokość garażu', vals2],
        ];
        
        attributes.forEach(([attr, description,vals]) => {
            const selectLabel = document.createElement('label');
            selectLabel.textContent = description;
            containerDiv.appendChild(selectLabel);
        
            // Create a select element
            const selectInput = document.createElement('select');
        
            // Define your values
            let N=10
            const values = vals
        
            // Create options for each value
            values.forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.text = value.toFixed(2);
                selectInput.appendChild(option);
            });
        
            selectInput.value = this.mediator.state[attr] || 0;  // default to 0 if not set, adjust as needed
        
            selectInput.addEventListener('change', function (e) {
                this.mediator.state[attr] = e.target.value;
                this.notifyMediator('stateChange', { [attr]: e.target.value });
                this.notifyMediator('buildingStep', { });
            }.bind(this));
        
            containerDiv.appendChild(selectInput);
        });

        // ... your previous code ...

       

        // const removeModelBtn = document.createElement('button');
        // removeModelBtn.textContent = "Remove Model";
        // removeModelBtn.classList.add('remove-model-btn');
        // removeModelBtn.addEventListener('click', function () {
        //     // Call notifyMediator with 'recursivelyRemoveModel' event
        //     this.notifyMediator('recursivelyRemoveModel');
        // }.bind(this));

        // containerDiv.appendChild(removeModelBtn);


        return containerDiv;
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

        const attributes = ['position_x', 'position_y', 'position_z','rotation_x','rotation_y', 'rotation_z',  'object_width', 'object_height', 'object_depth'];

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
            { value: '#8781a3',  display_value:"RAL2007", color_value:"#656179"},
            { value: '#a7a1c3',  display_value:"RAL2009", color_value:"#858199"},
            { value: '#c7c1e3',  display_value:"RAL2000", color_value:"#a5a1b9"},
            { value: '#e7e1f3',  display_value:"RAL2011", color_value:"#c5c1d9"},
            { value: '#757375',  display_value:"RAL2015", color_value:"#434143"},
            { value: '#858385',  display_value:"RAL2017", color_value:"#535153"},
            { value: '#959395',  display_value:"RAL2019", color_value:"#737173"},
            { value: '#A5A3A5',  display_value:"RAL2021", color_value:"#838183"},
            { value: '#B5B3B5',  display_value:"RAL2023", color_value:"#939193"},
            { value: '#C5C3C5',  display_value:"RAL2025", color_value:"#a3a1a3"},
            { value: '#D5D3D5',  display_value:"RAL2027", color_value:"#b4b1b3"},
            { value: '#E5E3E5',  display_value:"RAL2029", color_value:"#c4c1c3"},
        ];

        squareButtons.forEach(button => {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            // squareDiv.style.backgroundColor = button.color;
            squareDiv.dataset.value = button.value;

            // Create the image element
            const imageEl = document.createElement('div');
            imageEl.style.backgroundColor = button.color_value;
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
                    //this.mediator.state[attr] = e.target.value;
                    // this.notifyMediator('requestParentAssistance', { })
             
                    this.notifyMediator('stateChange', { 'object_color': squareDiv.dataset.value});
                    
                    this.notifyMediator('stateChange', { 'wall_color': squareDiv.dataset.value});
                    this.notifyMediator('buildingStep', { });
          
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
 export{UconfigImplementationWallGui}