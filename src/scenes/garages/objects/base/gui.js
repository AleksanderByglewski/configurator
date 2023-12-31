
import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
import { CubeObject, UconfigObject, WallGarageObject, genericGarageObject } from './object'

import { UconfigController, CubeController, WallGarageController, groupGenericGarageController, genericGarageController } from './controller'

class UconfigDebugGui extends genericGui {
    constructor() {
        super();
    }
    generateSep() {
        const sepElem = document.createElement('hr');
        sepElem.classList.add('my-2', 'my-lg-4')
        return sepElem
    }
    generateInputs(attributes) {

        function generateAccordion() {
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

            let name = (attributes && attributes.name) ? attributes.name : "Budowa systemów";
          
            accordionButton.textContent = name;

            accordionHeaderH3.appendChild(accordionButton);

            const accordionCollapseDiv = document.createElement('div');
            accordionCollapseDiv.id = 'collapseTwo-' + this.id;
            accordionCollapseDiv.classList.add('accordion-collapse', 'collapse');
            // accordionCollapseDiv.classList.add('show')
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

        let { accordionBodyDiv, accordionDiv } = generateAccordion.bind(this)()

        accordionBodyDiv.appendChild(this.createMarkup());

        accordionBodyDiv.appendChild(this.generateSep());

        const escapedId = '#id-' + this.id + '.input-values';
        this.insertContent(accordionDiv, escapedId, 'input-values', this.id);

        this.listenToChanges();
    }
    createMarkup() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container--three');


        // let text_attributes = ['name'];
        // console.log(this.mediator.state.state)

        let text_attributes = Object.keys(this.mediator.state.state)

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

        // ... your previous code ...



        const removeModelBtn = document.createElement('button');
        removeModelBtn.textContent = "Remove Models";
        removeModelBtn.classList.add('remove-model-btn');
        removeModelBtn.addEventListener('click', function () {
            // Call notifyMediator with 'recursivelyRemoveModel' event
            this.notifyMediator('recursivelyRemoveModel');
        }.bind(this));

        containerDiv.appendChild(removeModelBtn);


        return containerDiv;
    }
    createMarkupColors() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container');

        const squareButtons = [
            { value: '#972727', display_value: "RAL2003", display_image: '/assets/display/colors/RAL2003' },
            { value: '#822727', display_value: "RAL2005", display_image: '/assets/display/colors/RAL2005' },
            { value: '#353335', display_value: "RAL2007", display_image: '/assets/display/colors/RAL2007' },
            { value: '#454345', display_value: "RAL2009", display_image: '/assets/display/colors/RAL2009' },
            { value: '#555355', display_value: "RAL2011", display_image: '/assets/display/colors/RAL20011' },
            { value: '#656365', display_value: "RAL2011", display_image: '/assets/display/colors/RAL20013' },
            { value: '#757375', display_value: "RAL2015", display_image: '/assets/display/colors/RAL2015' },
            { value: '#858385', display_value: "RAL2017", display_image: '/assets/display/colors/RAL2017' },
            { value: '#959395', display_value: "RAL2019", display_image: '/assets/display/colors/RAL2019' },
            { value: '#A5A3A5', display_value: "RAL2021", display_image: '/assets/display/colors/RAL2021' },
            { value: '#B5B3B5', display_value: "RAL2023", display_image: '/assets/display/colors/RAL2023' },
            { value: '#C5C3C5', display_value: "RAL2025", display_image: '/assets/display/colors/RAL2025' },
            { value: '#D5D3D5', display_value: "RAL2027", display_image: '/assets/display/colors/RAL2027' },
            { value: '#E5E3E5', display_value: "RAL2029", display_image: '/assets/display/colors/RAL2029' },


        ];

        squareButtons.forEach(button => {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            // squareDiv.style.backgroundColor = button.color;
            squareDiv.dataset.value = button.value;

            // Create the image element
            const imageEl = document.createElement('div');
            imageEl.style.backgroundColor = button.value;
            imageEl.style.aspectRatio = "1 / 1"
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

                this.notifyMediator('changeObject', `${squareDiv.dataset.value}`)

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
    createMarkupCoverType() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container');

        const squareButtons = [
            { value: 'material_type_1', display_value: "Blacha typ 1", display_image: '/assets/display/material/1.jpg' },
            { value: 'material_type_2', display_value: "Blacha typ 2", display_image: '/assets/display/material/2.jpg' },
            { value: 'material_type_3', display_value: "Blacha typ 3", display_image: '/assets/display/material/3.jpg' },
            { value: 'material_type_4', display_value: "Blacha typ 4", display_image: '/assets/display/material/4.jpg' },
            { value: 'material_type_5', display_value: "Blacha typ dodatkowa", display_image: '/assets/display/material/5.jpg' },

        ];

        squareButtons.forEach(button => {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            // squareDiv.style.backgroundColor = button.color;
            squareDiv.dataset.value = button.value;

            // Create the image element
            const imageEl = document.createElement('img');
            //  imageEl.style.backgroundColor = button.value;
            imageEl.src = button.display_image;

            imageEl.style.aspectRatio = "1 / 1"
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
                this.notifyMediator('genericChangeObject', accessers)

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
class UconfigUserGui extends genericGui {
    constructor() {
        super();
    }
    generateSep() {
        const sepElem = document.createElement('hr');
        sepElem.classList.add('my-2', 'my-lg-4')
        return sepElem
    }
    generateInputs(attributes) {

        function generateAccordion() {
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

            let name = (attributes && attributes.name) ? attributes.name : "Budowa systemów";
          
            accordionButton.textContent = name;

            accordionHeaderH3.appendChild(accordionButton);

            const accordionCollapseDiv = document.createElement('div');
            accordionCollapseDiv.id = 'collapseTwo-' + this.id;
            accordionCollapseDiv.classList.add('accordion-collapse', 'collapse');
            // accordionCollapseDiv.classList.add('show')
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

        let { accordionBodyDiv, accordionDiv } = generateAccordion.bind(this)()

  
        accordionBodyDiv.appendChild(this.createMarkup());

        accordionBodyDiv.appendChild(this.generateSep());

        const escapedId = '#id-' + this.id + '.input-values';
        this.insertContent(accordionDiv, escapedId, 'input-values', this.id);

        this.listenToChanges();
    }
    createMarkup() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container--three');


        // let text_attributes = ['name'];
        // console.log(this.mediator.state.state)

        let text_attributes = Object.keys(this.mediator.state.state)
        

        function getOrderedAttributes(attributes, order) {
            return order.filter(value => attributes.includes(value));
        }
        function restSplitArrayByValue(array, values){
            let arrayWithoutValues = array.filter(item => !values.includes(item));
            return  arrayWithoutValues 
        }


        
        // let text_attributes = [1, 2, 3, 4, 5];
        // let values = ['object_width' ,'position_x'];
        // let label_values=[ 'Szerokość elementu', 'pozycja_x']
        
        // let positionValues=splitArrayByValue(text_attributes,values);
        // text_attributes=restSplitArrayByValue(text_attributes,values);
        //TODO YOU CAN RETURN HERE AND MAKE IT BETTER
        //text_attributes=[]

        // let inputs=this.generateTextInputs(containerDiv,positionValues, {type:"number", step:"0.1"},label_values)
  
        var display_values=['position_x', 'position_y', 'door_height', 'door_width']
        var display_label_value=['przesunięcie x', 'przesunięcie y (pewnie skasować)', 'wysokość obiektu', 'szerokość obiektu']
       var selected_text_attributes = getOrderedAttributes(text_attributes, display_values);

        let generate_all=this.generateTextInputs(containerDiv,selected_text_attributes, {type:"number", step:"0.1"}, display_label_value)
        
 

        // positionValues.forEach(attr => {
        //     const textLabel = document.createElement('label');
        //     textLabel.textContent = attr;
        //     containerDiv.appendChild(textLabel);

        //     const filler = document.createElement('div');
        //     containerDiv.appendChild(filler);

        //     const textInput = document.createElement('input');
        //     textInput.type = 'text';
        //     textInput.value = this.mediator.state.state[attr] || '';  // default to empty string if not set

        //     // Event listener for input changes
        //     textInput.addEventListener('input', function (e) {
        //         this.mediator.state[attr] = e.target.value;
               
        //         this.notifyMediator('debugStateChange', { [attr]: e.target.value });
              
        //         console.log(this.mediator.state.state)
        //     }.bind(this));

        //     containerDiv.appendChild(textInput);
        // });



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

        // ... your previous code ...



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
    createMarkupColors() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container');

        const squareButtons = [
            { value: '#972727', display_value: "RAL2003", display_image: '/assets/display/colors/RAL2003' },
            { value: '#822727', display_value: "RAL2005", display_image: '/assets/display/colors/RAL2005' },
            { value: '#353335', display_value: "RAL2007", display_image: '/assets/display/colors/RAL2007' },
            { value: '#454345', display_value: "RAL2009", display_image: '/assets/display/colors/RAL2009' },
            { value: '#555355', display_value: "RAL2011", display_image: '/assets/display/colors/RAL20011' },
            { value: '#656365', display_value: "RAL2011", display_image: '/assets/display/colors/RAL20013' },
            { value: '#757375', display_value: "RAL2015", display_image: '/assets/display/colors/RAL2015' },
            { value: '#858385', display_value: "RAL2017", display_image: '/assets/display/colors/RAL2017' },
            { value: '#959395', display_value: "RAL2019", display_image: '/assets/display/colors/RAL2019' },
            { value: '#A5A3A5', display_value: "RAL2021", display_image: '/assets/display/colors/RAL2021' },
            { value: '#B5B3B5', display_value: "RAL2023", display_image: '/assets/display/colors/RAL2023' },
            { value: '#C5C3C5', display_value: "RAL2025", display_image: '/assets/display/colors/RAL2025' },
            { value: '#D5D3D5', display_value: "RAL2027", display_image: '/assets/display/colors/RAL2027' },
            { value: '#E5E3E5', display_value: "RAL2029", display_image: '/assets/display/colors/RAL2029' },


        ];

        squareButtons.forEach(button => {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            // squareDiv.style.backgroundColor = button.color;
            squareDiv.dataset.value = button.value;

            // Create the image element
            const imageEl = document.createElement('div');
            imageEl.style.backgroundColor = button.value;
            imageEl.style.aspectRatio = "1 / 1"
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

                this.notifyMediator('changeObject', `${squareDiv.dataset.value}`)

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
    createMarkupCoverType() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container');

        const squareButtons = [
            { value: 'material_type_1', display_value: "Blacha typ 1", display_image: '/assets/display/material/1.jpg' },
            { value: 'material_type_2', display_value: "Blacha typ 2", display_image: '/assets/display/material/2.jpg' },
            { value: 'material_type_3', display_value: "Blacha typ 3", display_image: '/assets/display/material/3.jpg' },
            { value: 'material_type_4', display_value: "Blacha typ 4", display_image: '/assets/display/material/4.jpg' },
            { value: 'material_type_5', display_value: "Blacha typ dodatkowa", display_image: '/assets/display/material/5.jpg' },

        ];

        squareButtons.forEach(button => {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            // squareDiv.style.backgroundColor = button.color;
            squareDiv.dataset.value = button.value;

            // Create the image element
            const imageEl = document.createElement('img');
            //  imageEl.style.backgroundColor = button.value;
            imageEl.src = button.display_image;

            imageEl.style.aspectRatio = "1 / 1"
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
                this.notifyMediator('genericChangeObject', accessers)

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
    notifyMediator(event, value = "") {
    }

    createSquaresMarkup() {
    }

    listenToChanges() {
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
        accordionButton.textContent = "Budowa systemu";
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

        const attributes = ['position_x', 'position_y', 'position_z', 'rotation_x', 'rotation_y', 'rotation_z', 'width', 'height', 'depth'];

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
export { UconfigGui, UconfigInvisibleGui, UconfigDebugGui , UconfigUserGui}