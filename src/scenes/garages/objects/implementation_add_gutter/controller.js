import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base.js'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { UconfigInvisibleGui,UconfigGui,UconfigDebugGui} from '../base/gui.js'
import { DoubleCubeObject,CubeObject,UconfigObject, UconfigInvisibleObject,WallGarageObject, genericGarageObject } from '../base/object.js'
import { UconfigsController } from '../base/controller.js'

class SimpleController extends UconfigsController {
    constructor() {
        super(); 
        // this.setModel(GarageObjectSupportSquare)
        this.setModel(CubeObject)
    }
}
export {SimpleController}