import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';

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

    // render_GUI(for_target) {
    //     // Implementation as per your code
    //     // ...
    //     myInput.addEventListener('change', () => {
    //         let inputValue = myInput.value;
    //         this.notify('stateChange', { key: 'position.x', value: inputValue });
    //     });
    //     // ...
    // }
}

class genericState extends Generic {
    constructor(initialState = {}) {
        super();
        this.state = initialState;
    }

    update(key, value) {
        this.state[key] = value;
        // console.log(`State updated: ${key} changed to ${value}`)
    }

    get(key) {
        return this.state[key];
    }
}

class genericObject extends Generic {
    constructor(model) {
        super()
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
}

class genericDisplay extends Generic {
    constructor(scene = undefined) {
        super()
        this.scene = scene
      }
      add_to_scene(model) {
        this.scene.add(model)
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
            case 'stateChange':
                this.state.update(data.key, data.value);
                break;
            // Handle other events...
            default:
                break;
        }
    }
}

export {Generic,genericGui,genericState,genericObject,genericDisplay, genericController } 