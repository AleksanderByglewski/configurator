import { v4 as uuidv4 } from 'uuid';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from './base'
import { PlanetGui, PlanetObject, Planet, System } from './objects/introduction.js'
import { genericGarageObject, genericGarageController} from './objects/generic'
import {GarageSystem, GarageSystemGui} from './objects/garageSystem'
import * as Objects from './objects/roof'


class Garage extends genericGarageController {
    constructor() {
        super();
        this.model = new genericGarageObject();
        this.model.set_mediator(this)
        this.gui = new PlanetGui();
        this.gui.set_mediator(this)
    }

    modifyState(iterationStepLength = 0.1) {
        const newPositionX = parseFloat(this.state.get('position_x'));
        const newPositionY = parseFloat(this.state.get('position_y'));
        const newPositionZ = parseFloat(this.state.get('position_z'));

        this.state.update('position_x', parseFloat(newPositionX));
        this.state.update('position_y', parseFloat(newPositionY));
        this.state.update('position_z', parseFloat(newPositionZ));
    }
}




export { System, Planet, Garage, genericGarageController, GarageSystem }
