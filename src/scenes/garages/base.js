import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import noUiSlider from 'nouislider';

const gui = new GUI();
let GLOBAL_ORIENTATION
let CANOPIES_AUTOMATIC
// GLOBAL_ORIENTATION="SIDEWAYS"
 GLOBAL_ORIENTATION="STANDARD"
 CANOPIES_AUTOMATIC=true
export class accesser {
    constructor(resource_locator, value = "", name = "") {
      this.resource_locator = resource_locator
      this.value = value
      this.name = name
    }
  }

class Generic {
    constructor() {
        this.mediator = null;
    }

    notify(event, data) {
        if (this.mediator) {
            this.mediator.handleEvent(event, data);
        }
    }

    set_mediator(mediator) {
        this.mediator = mediator;
    }
}

class genericGui extends Generic {
    constructor() {
        super();
        // assuming uuidv4 is available
        this.id = uuidv4();
    }

     initializeCustomSlider(containerDiv, options = {}) {
        const sliderHTML = `
        <div class="range-slider" data-pips="true">
          <div class="range-slider-ui"></div>
          <div class="d-flex align-items-center">
          
    
            <div class="mx-1 px-2 fs-xs">—</div>
        
          </div>
        </div>
        `;
    
        // Append the slider HTML
        const sliderWrapper = document.createElement('div');
        sliderWrapper.innerHTML = sliderHTML;
        sliderWrapper.classList.add("container__range");
        containerDiv.appendChild(sliderWrapper);


        const sliderElement = sliderWrapper.querySelector('.range-slider-ui');
        

        
        // Initialize noUiSlider with corrected options
        noUiSlider.create(sliderElement, {
            start: 0, // Starting value
            range: { min: options.min, max: options.max }, // Range from 0 to 5
            step: 0.1, // Move by 0.1
            tooltips: true,
            format: {
                // Format the tooltip display and the value formatting from and to the slider
                to: function(value) {
                    // Round the value to 1 decimal place and return
                    return value;
                },
                from: function(value) {
                    // Convert the formatted value back to a float
                    return value;
                }
            },
            pips: {
                mode: 'steps',
                density: 10 // Adjust density to control the number of pips shown
            }
            
        });
    
        //valuesSlider.noUiSlider.set(['7', '28']);

        // Setup synchronization between noUiSlider and input fields
        sliderElement.noUiSlider.on('update', function (values) {
            // sliderWrapper.querySelector('.range-slider-value-min').value = Math.round(values[0]);
           
        });

        return {
        
            sliderElement: sliderElement, // The noUiSlider instance
            minInput: sliderWrapper.querySelector('.range-slider-value-min'), // Min value input
    
        };
    
        // Add event listeners to input fields if needed...
    }

    /**
     * Generates text inputs and appends them to a container div.
     *
     * @param {Array} array - Array of attributes. Attributes can be strings or objects with properties to set on the input elements.
     * @param {Object} options - Options object to set the attributes of the input elements.
     */
    generateTextInputs(containerDiv, array, options = {}, labels = undefined) {
        array.forEach((attr, index) => {
            let sep=document.createElement('hr')
            sep.classList.add('mb-4')
            sep.style.gridColumn="1/-1"
            containerDiv.appendChild(sep);
            const textLabel = document.createElement('label');
           
            const attributeName = typeof attr === 'object' ? attr.name : attr;
    
            textLabel.textContent = labels !== undefined ? labels[index] : attributeName;
            textLabel.classList.add('d-flex', 'align-items-center')
            textLabel.style.gridColumn="1/3"
        
            containerDiv.appendChild(textLabel);
    
            const filler = document.createElement('div');
            filler.classList.add('d-none')
            containerDiv.appendChild(filler);
    
            const textInput = document.createElement('input');
            // Apply all properties from options object to the text input
            Object.keys(options).forEach(optionKey => {
                textInput[optionKey] = options[optionKey];
            });
    
            // Create increment and decrement buttons
            const incrementButton = document.createElement('button');
            incrementButton.textContent = '▲'; // Use a suitable arrow symbol or an icon
            incrementButton.addEventListener('click', () => {
                textInput.value = (parseFloat(textInput.value || 0) + 0.1).toFixed(2); // Increment the value
                textInput.dispatchEvent(new Event('input')); // Trigger the input event
                slider.value = textInput.value; // Sync with slider
            });
    
            const decrementButton = document.createElement('button');
            decrementButton.textContent = '▼'; // Use a suitable arrow symbol or an icon
            decrementButton.addEventListener('click', () => {
                textInput.value = (parseFloat(textInput.value || 0) - 0.1).toFixed(2); // Decrement the value
                textInput.dispatchEvent(new Event('input')); // Trigger the input event
                slider.value = textInput.value; // Sync with slider
            });
    
            filler.appendChild(decrementButton);
            filler.appendChild(incrementButton);
    
            textInput.value = this.mediator.state.state[attributeName] || ''; // Default to empty string if not set
            textInput.addEventListener('input', function(e) {
                this.mediator.state.state[attributeName] = e.target.value;
                this.notifyMediator('buildingStep', {});
               // slider.value = textInput.value; // Sync with slider
            }.bind(this));
    
            containerDiv.appendChild(textInput);
    
            // Create the slider
            const slider = document.createElement('input');
            slider.classList.add('d-none')
            // slider.type = 'range';
            // slider.min = options.min || '0'; // Default minimum
            // slider.max = options.max || '100'; // Default maximum
            // slider.step = options.step || '0.1'; // Default step
            // slider.value = this.mediator.state.state[attributeName] || 0; // Sync with text input value
    
            // Update text input when slider value changes
            // slider.addEventListener('input', () => {
            //     textInput.value = slider.value;
            //     textInput.dispatchEvent(new Event('input')); // Trigger the input event
            // });
    
            // It's a good idea to wrap the slider in a div for styling or layout purposes
            const sliderWrapper = document.createElement('div');
            sliderWrapper.appendChild(slider);
            sliderWrapper.classList.add("container__range")
            containerDiv.appendChild(sliderWrapper);
            const { sliderElement, minInput } = this.initializeCustomSlider(containerDiv, {
                // start: 0, // Default or dynamic values
                 min: options.min ||0,
                 max: options.max ||3,
                 step:options.step||0.1
                // step: 0.1
                // Add any other options needed
            });
            let isFirstUpdate = true;
            sliderElement.noUiSlider.on('update', function (values, handle) {
                const value = parseFloat(values[handle]).toFixed(1); // 
                console.log(value)
                // Assuming textInput is the input you want to update:
                textInput.value = value; // Update the text input value
                if (!isFirstUpdate) {
                    textInput.dispatchEvent(new Event('input')); // Trigger the input event for synchronization
                } else {
                    isFirstUpdate = false; // Update the flag after the first call
                }
            });
    
            
            
        });
    }

    insertContent(content, selector = "*", classes = "attribute-values", id = "") {
        this.waitForDOM(() => {
            const container = this.getContainer(selector);
            container.innerHTML = content;
            container.classList.add(classes);
            container.id = 'id-' + id;
        });
    }
    waitForDOM(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }
    generateChanges(attributes) {
        const markup = this.createGuiMarkup(attributes);
        const escapedId = '#id-' + this.id + '.attribute-values';
        this.insertContent(markup, escapedId, "attribute-values", this.id);
    }
    createGuiMarkup(attributes) {
        let content = ""
        for (const key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                content += `<div class="attribute"><strong>${key}:</strong> ${attributes[key]}</div>`;
            }
        }

        return content;
    }
    generateInputs(attributes) {
        const markup = this.createInputMarkup(attributes)
        const escapedId = '#id-' + this.id + '.input-values';
        this.insertContent(markup, escapedId, 'input-values', this.id)
        this.listenToChanges()
    }
    createInputMarkup(attributes) {
        let inputs = 'Control system for a body';
        for (const key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                inputs += `
                    <div class="input-group">
                        <label for="${key}">${key}</label>
                        <input type="text" id="${key}" name="${key}" value="${attributes[key]}">
                    </div>`;
            }
        }
        return inputs;
    }
    listenToChanges() {
        const container = document.getElementById('id-' + this.id);
        if (!container) {
            console.error('Container not found.');
            return;
        }

        const inputs = container.querySelectorAll('.input-values input');
        const newState = {};
        inputs.forEach(input => {
            newState[input.name] = parseFloat(input.value);
        });
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const newState = this.getInputValues();  // assuming you have the getInputValues method
                this.mediator.handleEvent("guiInputChange", newState);
            });
        });


    }
    getInputValues() {
        const container = document.getElementById('id-' + this.id);

        // Check if the container exists
        if (!container) {
            console.error('Container not found.');
            return {};
        }

        const inputs = container.querySelectorAll('.input-values input');
        const values = {};

        // Iterate over each input and store its name and value in the dictionary
        inputs.forEach(input => {
            values[input.name] = input.value;
        });

        return values;
    }
    getContainer(selector = `#${this.id}`, parent_container = this.getMenu()) {
        let container = document.querySelector(selector);

        if (!container) {
            let child_container = document.createElement('div');
            parent_container.appendChild(child_container);
            return child_container;
        }

        return container;
    }
    getMenu() {
        return document.querySelector('.side-menu')
    }
    setMenuSelector(selector = '.side-menu') {
        this.menuSelector = ".side-menu"
    }

    rerender() {
        // Clear the existing contents
        this.clearContainer();
        let container = document.querySelector(`#collapseTwo-${this.id}`);
        container.innerHTML = 'Hello container re-rendered!';
        // Rerender the GUI elements
        //this.generateInputs(/* attributes or other necessary parameters */);
    }

    clearContainer() {
        const container = this.getContainer(`#collapseTwo-${this.id}`);
        if (container) {
            container.innerHTML = '';
        }
    }
    killContainer(){
        const container = document.querySelector(`#id-${this.id}`);
        if (container) {
            container.remove();
        }
    }

}

class genericState extends Generic {
    constructor(initialState = {}) {
        super();
        this.state = initialState;
    }

    update(key, value) {
    
        if (key instanceof accesser) {
            // Use resource_locator as the key
            return this.state[key.resource_locator]=value;
        } else {
            // Use key directly
            return this.state[key]=value;
        }

        this.state[key] = value;
        // console.log(`State updated: ${key} changed to ${value}`)
    }

    get(key) {
        
        if (key instanceof accesser) {
            // Use resource_locator as the key
            return this.state[key.resource_locator];
        } else {
            // Use key directly
            return this.state[key];
        }

    }
}

class genericObject extends Generic {
    constructor(model) {
        super()
        this.id = uuidv4()
        this.model = model
    }

    set(model) {
        this.model = model
    }
    get_model() {
        return this.model;
    }
    create() {
        this.model.create(newState)
    }
    remove(){
        if (this.model) {
        this.model.geometry.dispose();  // Dispose the geometry of the mesh
        this.model.material.dispose();
        this.model = null;  // Optionally, you can set the model to null to indicate it's removed
    }
    }
}

class genericDisplay extends Generic {
    constructor(scene = undefined) {
        super()
        this.scene = scene
    }
    add_to_scene(model) {
        
        this.scene.add(model)
    }
    remove_from_scene(model){
        this.scene.remove(model)
    }
    set_scene(scene) {
        this.scene = scene
    }
    get_scene() {
        return this.scene
    }
}

class genericController extends Generic {
    constructor() {
        super();
        this.gui = new genericGui();
        this.state = new genericState();
        this.model = new genericObject();
        this.display = new genericDisplay();
    }

    handleEvent(event, data) {
        switch (event) {
            // case 'stateChange':
            //     if (data && data.key !== undefined && data.value !== undefined) {
            //         this.state.update(data.key, data.value);
            //     } else {
            //         console.log('Key or value does not exist');
            //     }
            
            //     break;
            // Handle other events...
            default:
                break;
        }
    }
}

export { Generic, genericGui, genericState, genericObject, genericDisplay, genericController , gui , GLOBAL_ORIENTATION, CANOPIES_AUTOMATIC} 