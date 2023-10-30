import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { UconfigInvisibleGui,UconfigGui,UconfigDebugGui} from '../base/gui'
import { DoubleCubeObject,CubeObject,UconfigObject, UconfigInvisibleObject,WallGarageObject, genericGarageObject } from '../base/object'
import { UconfigsController } from '../base/controller'
import { WindowObject, DoorHandleObject, CentralLineObject, LineObject } from './object'

class SimpleController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(CubeObject)
    }
}
class WindowController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(WindowObject)
    }
}
class DoorHandleController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(DoorHandleObject)
    }
}

class CentralLineController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(CentralLineObject)
    }
}

class LineController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(LineObject)
    }
}

export {SimpleController, WindowController, DoorHandleController, CentralLineController,LineController}