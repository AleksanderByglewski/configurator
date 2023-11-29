import { v4 as uuidv4 } from 'uuid';
import { accesser } from '../../base.js'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
import { CubeObject,UconfigObject,WallGarageObject, genericGarageObject } from './object.js'
import { UconfigInvisibleGui,UconfigGui} from './gui.js'
import {UconfigController,CubeController,WallGarageController,groupGenericGarageController,genericGarageController} from './controller.js'
