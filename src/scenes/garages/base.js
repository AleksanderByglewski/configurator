import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
const gui = new GUI();
const GLOBAL_ORIENTATION="SIDEWAYS"
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

    /**
     * Generates text inputs and appends them to a container div.
     *
     * @param {Array} array - Array of attributes. Attributes can be strings or objects with properties to set on the input elements.
     * @param {Object} options - Options object to set the attributes of the input elements.
     */
    generateTextInputs(containerDiv, array , options = {}, labels=undefined) {
        array.forEach((attr,index) => {
            const textLabel = document.createElement('label');
            const attributeName = typeof attr === 'object' ? attr.name : attr;
           
            textLabel.textContent = attributeName;
            if(labels!==undefined){
            textLabel.textContent = labels[index]
            };
            containerDiv.appendChild(textLabel);

            const filler = document.createElement('div');
            containerDiv.appendChild(filler);

            const textInput = document.createElement('input');
            // Apply all properties from options object to the text input
            Object.keys(options).forEach(optionKey => {
                textInput[optionKey] = options[optionKey];
            });
            
            textInput.value = this.mediator.state.state[attributeName] || '';  // default to empty string if not set

            textInput.addEventListener('input', function (e) {
                this.mediator.state.state[attr] = e.target.value;
                //this.notifyMediator('stateChange', { [attr]: e.target.value });
                this.notifyMediator('buildingStep', {});
    
            }.bind(this));
        
            // Event listener for input changes
            // textInput.addEventListener('input', function (e) {
            //     this.mediator.state.state[attributeName] = parseFloat(e.target.value);

            //     this.notifyMediator('debugStateChange', { [attributeName]: e.target.value });

            //     console.log(this.mediator.state.state);
            // }.bind(this));

            containerDiv.appendChild(textInput);
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

export { Generic, genericGui, genericState, genericObject, genericDisplay, genericController , gui , GLOBAL_ORIENTATION} 