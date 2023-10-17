To start the server run:  npm run start
To build for production run: npm run build

//Adding additional elements to the system 
Start by duplicating the advanced object folder
Rename the object in this copied folder 
Extend the object in this copied folder
Import the object from the copied folder
Initialize the object in the scene



Import the object from the copied folder
    To import the object do something along these lines :
        import { UconfigsImplementationCanopyController as CanopySystem } from './objects/implementation_canopy/implementation'


To force a rebuild of parent objects as well call hardBuildingStep
 CanopySystem1.handleEvent('hardBuildingStep')