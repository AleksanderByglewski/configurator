import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
// import { genericGarageController, InvisibleWallGarageObject } from '../generic.js';
import { metalMaterial, metalMaterial2 } from '../../textures/material_spawn';
const loader = new THREE.TextureLoader();
const global_texture = loader.load('/assets/config/default_1k.jpg');


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
        accordionButton.textContent = "Wymiary garażu";
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

        const attributes = ['position_x', 'position_y', 'position_z', 'width', 'height', 'depth'];

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
            console.log(this.mediator)
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
class genericGarageObject extends genericObject {
    constructor() {
        super();
    }
    recreate(attributes) {
        this.mediator.handleEvent('removeModel')
        this.create(attributes)
    }
    create(attributes) {
        let loader = new THREE.TextureLoader();
        let texture = loader.load('/assets/config/default_1k.jpg');
        var material = new THREE.MeshPhysicalMaterial({
            map: texture,
            color: attributes.color || "#ffffff",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });

        let geometry = new RoundedBoxGeometry(
            parseFloat(attributes.width) || 1,
            parseFloat(attributes.height) || 1,
            parseFloat(attributes.depth) || 1,
            1 || 1,
            attributes.radius || 0.005
        );

        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(
            parseFloat(attributes.position_x) || 0,
            parseFloat(attributes.position_y) || 0,
            parseFloat(attributes.position_z) || 0
        );
        // if(attributes.invisible_controller=="true"){
        //     sphere.visible=false
        // }
        this.set(sphere);
        return
    }
    update(attributes) {
        if (!this.model) return;

        if (attributes.position_x !== undefined) {
            this.model.position.setX(attributes.position_x);
        }

        if (attributes.position_y !== undefined) {
            this.model.position.setY(attributes.position_y);
        }

        if (attributes.position_z !== undefined) {
            this.model.position.setZ(attributes.position_z);
        }

        if (attributes.color !== undefined) {
            this.model.material.color = new THREE.Color(attributes.color)
        }

        if (attributes.width !== undefined || attributes.depth !== undefined || attributes.height !== undefined) {
            this.mediator.handleEvent('recreateModel')
        }
    }
}
class genericGarageController extends genericController {
    constructor() {
        super();
        // alert("hello")
        this.setModel(genericGarageObject);
        this.setGui(PlanetGui);
        this.children = []
    }
    set_the_options(passedObject, accessers) {
        for (let i = 0; i < accessers.length; i++) {
            passedObject.state.update(accessers[i].resource_locator, accessers[i].value);
        }
    }
    object_substraction() {
        this.removeChild(added_object)
    }
    object_addition(objectOptions, classInstance) {
        const added_object = new classInstance()
        // added_object.display.set_scene(this.display.get_scene())
        this.set_the_options(added_object, objectOptions)
        this.addChild(added_object)
        return added_object
    }
    object_addition_existing(added_object) {
        // added_object.display.set_scene(this.display.get_scene())
        // this.set_the_options(added_object, objectOptions)
        this.addChild(added_object)

    }
    setGui(ObjectClass) {
        this.gui = new ObjectClass();
        this.gui.set_mediator(this);
    }
    setModel(ObjectClass) {
        this.model = new ObjectClass();
        this.model.set_mediator(this);
    }
    addChild(child) {
        if (child instanceof genericGarageController) {
            this.children.push(child);
            child.set_mediator(this);
        } else {
            console.error("Only instances of genericGarageController can be added.");
        }
    }
    removeChild(child) {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            this.children.splice(index, 1);
            child.set_mediator(null);
        }
    }
    getChildren() {
        return this.children;
    }
    getChildByName(name) {
        if (this.name !== undefined && this.name === name) {
            return this
        }
        if (this.children) {
            this.children.forEach((child) => { child.getChildByName(name) })
        }
    }
    handleEvent(event, data) {
        switch (event) {
            case 'guiInputChange':

            // Object.entries(data).forEach(([name, value]) => {
            //     this.state.update(name, value);
            // });
            // if (typeof this.calculateState === 'function') {
            //     this.calculateState();
            // }
            // //This is dubious at best
            // this.children.forEach((child) => {
            //     child.handleEvent('guiInputChange', {})
            //     if (typeof child.calculateState === 'function') {
            //         console.log(this.state.state)

            //     //   child.calculateState();
            //     }
            //   });

            // case 'recreateModel':
            //     {
            //         const modelMesh = this.model.get_model();
            //         const scene = this.display.get_scene();
            //         scene.remove(modelMesh);

            //         this.children.forEach((child) => { child.handleEvent('removeModel') });
            //         this.handleEvent("creationStep")
            //         this.children.forEach((child) => { child.handleEvent('creationStep') });
            //         break;
            //     }
            case 'recursivelyRemoveModel':

                // while (this.children.length > 0) {
                //         let child = this.children[0];
                //         // debug()
                //         child.handleEvent('recursivelyRemoveModel');
                //         // child.removeChild(child);
                //         this.children.shift()

                //     }
                this.handleEvent('removeModel');
                this.children.forEach(child => {
                    if (child && typeof child.handleEvent === 'function') {
                        child.handleEvent('recursivelyRemoveModel');

                    }
                });
                // Remove the model of the current instance (parent)
                // controller.model = null;


                // const modelMesh = this.model.get_model();
                // const scene = this.display.get_scene();
                // scene.remove(modelMesh);


                break;

            case 'removeModel':
                {
                    const modelMesh = this.model.get_model();
                    const scene = this.display.get_scene();
                    scene.remove(modelMesh);
                    break;
                }
            // case 'iterationStep':
            //     this.modifyState()
            //     this.model.update(this.state.state)
            //     break;
            case 'creationStep':
                // const existingModel = this.model.get_model();
                // if (existingModel) {
                //     this.display.get_scene().remove(existingModel);

                //     existingModel.geometry.dispose();
                //     existingModel.material.dispose();
                //     if (existingModel.parent) {
                //         existingModel.parent.remove(existingModel);
                //     }
                // }



                this.handleEvent('recursivelyRemoveModel')
                this.model.create(this.state.state);
                const basicMesh = this.model.get_model();
                // if(this.state.state.get("position_relative")==true){
                // this.display.add_to_scene(basicMesh);
                // }
                if(this.display.scene) {
                    this.display.add_to_scene(basicMesh);
                } else {
                    console.error("Scene does not exist, you should probably trace this error");
                }
                

                this.children.forEach((child) => { child.handleEvent('creationStep') });
                // if (this.state.get('position_relative') !== undefined && this.state.get('position_relative')) {
                //     const parentMesh = this.mediator.model.get_model();
                //     const childMesh = this.model.get_model();
                //     parentMesh.add(childMesh);

                // }
                // else {

                // }



                break;
            // case 'stateChange':
            //     //Is this the correct way to check if the function exists in the class
            //     // if (typeof this.calculateState === 'function'){
            //     // this.calculateState()}
            //     // this.model.update(this.state.state)
            //     // this.children.forEach((child) => { child.handleEvent('stateChange') });
            //     // break;
            // case 'guiChange':
            // if (this.mediator!==undefined){this.mediator.notify('guiChange')}
            // if (typeof this.calculateState === 'function'){this.calculateState()}

            // this.notify('stateChange')
            // break;
            case 'generateInputs':
                this.gui.generateInputs(this.state.state)
                if (this.children) {
                    this.children.forEach(child => {
                        child.gui.generateInputs(child.state.state)
                    });
                }
                break;
            default:
                super.handleEvent(event, data);
                break;
        }
    }
}
class groupGenericGarageController extends genericGarageController {

    addChild(child) {
        if (child instanceof genericGarageController) {
            this.group.add(child.model.get_model()); // Add child's mesh to group
            child.set_mediator(this);
        } else {
            console.error("Only instances of genericGarageController can be added.");
        }
    }
}
class InvisibleWallGarageObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes) {
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Creates a red material
        let geometry = new THREE.BoxGeometry(
            0, 0, 0
        );
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            parseFloat(attributes.position_x),
            parseFloat(attributes.position_y),
            parseFloat(attributes.position_z),
        );
        this.set(mesh);
    }
}
class WallGarageObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes) {
        let loader = new THREE.TextureLoader();
        let texture = global_texture
        let color=attributes.color || "#272727"
        var material = new THREE.MeshPhysicalMaterial({
            map: texture,
            color: color || "#272727",
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });
        // Use BoxGeometry for the roof with adjusted width
        let width = parseFloat(attributes.width)
        let height = parseFloat(attributes.height)
        const rotation_y = (attributes.rotation_y || 0) * (Math.PI / 180);
        let geometry = new THREE.BoxGeometry(
            2,
            2,
            2, // Assuming depth is always 1, adjust as needed
        );
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
    update(attributes) {
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
class WallGarageController extends genericGarageController {
    constructor() {
        super();
        this.setModel(WallGarageObject)
    }
    handleEvent(event, data) {
        switch (event) {
            case 'removeModel':

                break;
            default:
                super.handleEvent(event, data);
                break;
        }
    }
}
class UconfigObject extends genericObject {
    constructor() {
        super();

    }
    update() { }
    create(attributes) {

        // const material_color=(attributes.colored).replace('#','0x')

        let width = parseFloat(attributes.width) || 5
        let height = parseFloat(attributes.height) || 5


        const texture_value = attributes.material ? `${attributes.material}` : '/assets/config/default_1k.jpg'



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

        let color=attributes.color || "#272727"
        const material = new THREE.MeshPhysicalMaterial({
            metalness: 0.0,
            roughness: 0.95,
            clearcoat: 0.0,
            clearcoatRoughness: 0.0,
            color: color ? `#${attributes.color}` : '#272727',
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
        mesh.visible = attributes.visibility || true
        this.set(mesh);
    }
}
class CubeObject extends genericObject {
    constructor() {
        super();
    }
    create(attributes) {

    
        let position_x= (attributes && attributes.position_x) ? parseFloat(attributes.position_x) : -4;
        let color = (attributes && attributes.color) ? attributes.color : "#372727";
        var material = new THREE.MeshPhysicalMaterial({
            color: color,
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });
    

        // let geometry = new RoundedBoxGeometry(
        //     parseFloat(attributes.width) || 5,
        //     parseFloat(attributes.height) || 1,
        //     parseFloat(attributes.depth) || 1, // Assuming depth is always 1, adjust as needed
        //     parseFloat(attributes.segments) || 2,
        //     parseFloat(attributes.radius) || 0.005
        // );
        let geometry;

        geometry = new THREE.BoxGeometry(
            1,
            1,
            1, // Assuming depth is always 1, adjust as needed
        );

        const mesh = new THREE.Mesh(geometry, material);
     
         position_x = Math.random() * 10-5;
        console.log(position_x);


        mesh.position.set(
            parseFloat(position_x), // Assuming x position is always 0, adjust as needed
            parseFloat(3),
            parseFloat(0),  // Assuming z position is always 0, adjust as needed
        );
        mesh.rotation.y = 0.70; // Rotate by the given roof angle
        this.set(mesh);
    }

    update(attributes) {
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
class CubeController extends genericGarageController {
    constructor() {
        super();
        this.setModel(CubeObject)
    }
    handleEvent(event, data) {
        switch (event) {
            case 'removeModel':

                break;
            default:
                super.handleEvent(event, data);
                break;
        }
    }
}
class UconfigController extends genericGarageController {
    constructor() {
        super();
        this.setModel(UconfigObject)
        this.gui = new UconfigInvisibleGui();
        this.gui.set_mediator(this)
        //Create a new three.js group
        this.group = new THREE.Group()
    }
}
class UconfigsController extends genericGarageController {
    constructor() {
        super()
        this.setModel(WallGarageObject)
        this.gui = new UconfigGui();
        this.gui.set_mediator(this)
        this.group = new THREE.Group()
    }
    determineState() {
        //You can get the current state of the object by using the 
        let name = this.state.get('name') || 'Wall'
        let object_type = this.state.get('object_type') || 'flat'
        let object_width = parseFloat(this.state.get('object_width')) || 3
        let object_height = parseFloat(this.state.get('object_height')) || 2.43
        let object_depth = parseFloat(this.state.get('object_depth')) || 2
        let object_color = this.state.get('color') || "#272727"

        let position_x = this.state.get('position_x') || 0
        let position_y = this.state.get('position_y') || 0
        let position_z = this.state.get('position_z') || 0

        let height = this.state.get('height') || 2.13
        let width = this.state.get('width') || 4.0
        let depth = this.state.get('depth') || 4.0
        object_height = height
        object_width = width
        object_depth = depth
        //let object_angle=parseFloat(this.state.get('object_angle'))||30
        let sheet_depth = parseFloat(this.state.get('sheet_depth')) || 0.0075

        const accessersWallFront = [
            new accesser('name', name + "_front"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 3.0 + position_x),
            new accesser('position_y', 10.0 + position_y + height / 2),
            new accesser('position_z', -0.5 * object_depth + position_z),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),

        ]
        const accessersWallBack = [
            new accesser('name', name + "_back"),
            new accesser('width', object_width),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 10.0 + position_x),
            new accesser('position_y', -10 + position_y + height / 2),
            new accesser('position_z', +0.5 * object_depth + position_z),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),

        ]
        const accessersWallLeft = [
            new accesser('name', name + "_left"),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 13+-0.5 * object_width + position_x),
            new accesser('position_y', 0 + position_y + height / 2),
            new accesser('position_z', 0 + position_z),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', '90'),

        ]
        const accessersWallRight = [
            new accesser('name', name + '_right'),
            new accesser('width', object_depth),
            new accesser('height', object_height),
            new accesser('sheet_depth', sheet_depth),
            new accesser('segments', 1),
            new accesser('radius', 0.01),
            new accesser('position_x', 15+0.5 * object_width + position_x),
            new accesser('position_y', 0 + position_y + height / 2),
            new accesser('position_z', 0 + position_z),
            new accesser('color', object_color),
            new accesser('position_relative', 'true'),
            new accesser('rotation_y', '90'),

        ]
        return { "accessersWallFront": accessersWallFront, "accessersWallBack": accessersWallBack, "accessersWallLeft": accessersWallLeft, "accessersWallRight": accessersWallRight }
    }
    calculateState() {
        //This is a function that updates the values of the children of the system
        const accessersDict = this.determineState();
        Object.keys(accessersDict).forEach((key, index) => {
            if (this.children[index]) {
                this.set_the_options(this.children[index], accessersDict[key]);
            }
        });
    }
    buildingStep() {
        const accessers = [
            new accesser('name', 'The floor grouping'),
            // new accesser('color','#373737' )

        ]
        this.set_mediator(this)
        this.set_the_options(this, accessers)

        

        const { accessersWallFront, accessersWallBack, accessersWallLeft, accessersWallRight } = this.determineState();


        //      let array = [
        //          { objectOptions: accessersWallFront, classInstance: WallGarageController },
        //          { objectOptions: accessersWallBack, classInstance: WallGarageController },
        //          { objectOptions: accessersWallLeft, classInstance: WallGarageController },
        //          { objectOptions: accessersWallRight, classInstance: WallGarageController }
        //  ]

        let array = [
        { objectOptions: accessersWallFront, classInstance:CubeController},
        { objectOptions: accessersWallBack, classInstance: CubeController },
        { objectOptions: accessersWallLeft, classInstance: CubeController },
        { objectOptions: accessersWallRight, classInstance: CubeController }
        ]
        // // array=[]

        // this.children.forEach((child) => {
        //     child.handleEvent('recursivelyRemoveModel')
        // });
        // this.children = []

        // array.forEach(({ objectOptions, classInstance }) => {
        //     this.display.set_scene(this.display.get_scene())
        //     const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
        //     // console.log(created_object)
        //     this.group.add(created_object)
        //     // console.log(t)
        // });
        let outer_scene=this.display.get_scene()
        array.forEach(({ objectOptions, classInstance }) => {

                this.display.set_scene(this.display.get_scene())
                //const completed_mesh = this.object_addition.bind(this)(objectOptions, classInstance);
        //     // console.log(created_object)
        //     this.group.add(created_object)
                const added_object = new classInstance()
                added_object.display.set_scene(outer_scene)
                added_object.model.create()
                // added_object.display.set_scene(this.display.get_scene())
                this.set_the_options(added_object, objectOptions)
                this.addChild(added_object)
                // added_object.display.set_scene(outer_scene)
                // debug()
                // const completed_mesh=added_object.model.get_model()
                // this.group.position.x += 10; // Move 10 units along X-axis
                // this.group.position.y += 20; // Move 20 units along Y-axis
                // this.group.position.z += 30; 
               
                this.group.rotation.y=Math.PI/4
                this.group.add(added_object.model.get_model())                
                // outer_scene.add(this.group)
               

                
                // I would like to rotate this group in three js by at least 45 degrees
        })

        // const scene = this.display.scene;
        // {
        //     let geometry22 = new THREE.BoxGeometry(1, 1, 1);
        //     let material22 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        //     // Create the first mesh and position it to the left (-2 on the x axis)
        //     var mesh1 = new THREE.Mesh(geometry22, material22);
        //     mesh1.position.set(-2, 0, 0);

        //     // Create the second mesh and position it to the right (2 on the x axis)
        //     var mesh2 = new THREE.Mesh(geometry22, material22);
        //     mesh2.position.set(2, 0, 0);

        //     // Create a group and add the meshes
        //     // this.group.add(mesh1);
        //     // this.group.add(mesh2);

        // }
        
      
        // array=[mesh1, mesh2]
        // array.forEach(({ objectOptions, classInstance }) => {

        //     let added_object=new classInstance()
        //     added_object.model.create(this.state.state);
        
           
        //     this.set_the_options(added_object, objectOptions)
        //     // this.display.set_scene(this.display.get_scene())
        //     // const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
        //     // console.log(created_object)
            
        //     let geometry22 = new THREE.BoxGeometry(1, 1, 1);
        //     let material22 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        //     // Create the first mesh and position it to the left (-2 on the x axis)
        //     var mesh1 = new THREE.Mesh(geometry22, material22);
        //     mesh1.position.set(-2, 0, 0);

        //     // Create the second mesh and position it to the right (2 on the x axis)
        //     var mesh2 = new THREE.Mesh(geometry22, material22);
        //     mesh2.position.set(2, 0, 0);


          

        //     // debug()
        //     // var mesh3 = new THREE.Mesh(geometry22, material22);

        //     // this.group.add(mesh3)
        //     // console.log(t)
        // });
        // let mesh3 = new CubeContr    oller();
        // mesh3.model.create()
        // mesh3.model.get_model()
        // mesh3.model.get_model().position.set(2, 2, 0);
        // let mesh3_model=mesh3.model.get_model()
    

        // array=[mesh1, mesh2, mesh3_model]
        // array.forEach((completed_mesh) => {
        //     // this.display.set_scene(this.display.get_scene())
        //     //const created_object = this.object_addition.bind(this)(objectOptions, classInstance);
        //     // console.log(created_object)
        //     this.group.add(completed_mesh)
        // });

    
        this.display.get_scene().add(this.group)
        this.group.position_y=-2.0
        this.handleEvent('stateChange')
        this.handleEvent('creationStep');
    }
    handleEvent(event, data) {
        switch (event) {
            case 'removeModel':
                //I would like to remove the curent model from this scene and current group as well
                this.display.remove_from_scene(this.model.get_model())
                this.display.remove_from_scene(this.group)
                //I would like to kill all objects in a group THREE.js

                while(this.group.children.length > 0){ 
                    this.group.remove(this.group.children[0]); 
                }
                
                if(this.group) {
                    if(this.group instanceof THREE.Group) {
                        while(this.group.children.length > 0){ 
                            this.remove(object.children[0]); 
                        }
                    }
                    //this.group = new THREE.Group();  // Assign a new empty group
                }
                break;
            case 'buildingStep':
                this.handleEvent('recursivelyRemoveModel');
                this.buildingStep()

                break;
            case 'creationStep':
                {
                    //this.handleEvent('recursivelyRemoveModel')
                    // this.handleEvent('removeModel')
                    // Create the geometry, material, and mesh for the cube
                    // const geometry = new THREE.BoxGeometry(1, 5, 1);  // Cube of size 1x1x1
                    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  // Green color
                    // const cube = new THREE.Mesh(geometry, material);

                    // // Add the cube to the scene
                    // this.display.add_to_scene(cube);
                    // this.display.remove_from_scene(cube)

                    if (this.model && typeof this.model.get_model === 'function') {
                        const modelInstance = this.model

                        if (modelInstance && typeof modelInstance.create === 'function') {
                            modelInstance.create(this.state.state);
                        }
                        if (this.display && typeof this.display.add_to_scene === 'function') {
                            this.display.add_to_scene(modelInstance.model);
                            this.display.add_to_scene(this.group);
                            // this.display.add_to_scene(cube)
                            // this.display.remove_from_scene(cube)
                        }
                    }
                    if (Array.isArray(this.children)) {
                        this.children.forEach((child) => {
                            if (child && typeof child.handleEvent === 'function') {
                                // child.handleEvent('creationStep');
                            }
                        });
                    }
                    break
                }
            case 'changeObject':
                // alert(data)
                {
                    const accessers = [
                        new accesser('color', data),
                    ]
                    this.handleEvent('recursivelyRemoveModel');
                    this.set_the_options(this, accessers)
                    this.handleEvent('buildingStep');

                    // this.handleEvent('creationStep');
                    // this.buildingStep()
                }
                break;
            case 'changeFloor':
                // alert(data)
                const accessers = [
                    new accesser('color', data),
                ]
                this.handleEvent('recursivelyRemoveModel');
                this.set_the_options(this, accessers)
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
export { UconfigsController as GroupControllableBasicSystem }