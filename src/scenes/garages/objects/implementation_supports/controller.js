import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base.js'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { UconfigInvisibleGui,UconfigGui,UconfigDebugGui} from '../base/gui.js'
import { DoubleCubeObject,CubeObject,UconfigObject, UconfigInvisibleObject,WallGarageObject, genericGarageObject } from '../base/object.js'
import { UconfigsController } from '../base/controller.js'
import { RoofSideLeftObject,RoofSideRightObject, RoofSideSquareObject, RoofTopObject } from './object.js'

class SimpleController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(CubeObject)
    }
}
class RoofSideLeftController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(RoofSideLeftObject)
    }
}
class RoofSideRightController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(RoofSideRightObject)
    }
}

class RoofSideSquareController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(RoofSideSquareObject)
    }
}
class RoofTopController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(RoofTopObject)
    }
}


export {SimpleController, RoofSideLeftController, RoofSideRightController,  RoofSideSquareController, RoofTopController}