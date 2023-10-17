import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { UconfigInvisibleGui,UconfigGui,UconfigDebugGui} from '../base/gui'
import { DoubleCubeObject,CubeObject,UconfigObject, UconfigInvisibleObject,WallGarageObject, genericGarageObject } from '../base/object'
import { UconfigsController } from '../base/controller'
import { DoorObject, DoorHandleObject } from './object'

class SimpleController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(CubeObject)
    }
}
class DoorController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(DoorObject)
    }
}
class DoorHandleController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(DoorHandleObject)
    }
}


export {SimpleController, DoorController, DoorHandleController}