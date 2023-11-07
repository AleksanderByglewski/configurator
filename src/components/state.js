
// Assuming guiElement is some form of GUI control (e.g., buttons, input fields) in your application

class StateMachine {
    constructor() {
      this.currentState = "SelectTypeState";
      this.dimensions = {
        width: null,
        height: null,
        depth: null,
      };
      this.componentIds = {}; // Object to store IDs of components
    }
    transition(event) {
      switch (this.currentState) {
        case "SelectTypeState":
          if (event === "SelectTypeState") {
            this.currentState = "InputDimensionsState";
            this.promptHeightInput();
          }
          break;
        case "InputDimensionsState":
          if (event === "InputDimensionsState") {
            this.currentState = "InputColorState";
            this.promptColorInput();
          } else if (event === "ValidationError") {
            this.handleError("Please input a valid height.");
          }
          break;
        case "InputColorState":
          if (event === "InputColorState") {
            this.currentState = "InputAdditiveState";
            this.promptAdditiveInput();
          } else if (event === "ValidationError") {
            this.handleError("Please input a valid width.");
          }
          break;
        case "InputAdditiveState":
            if (event === "InputAdditiveState") {
              this.currentState = "InputContactState";
              this.promptContactInput();
            } else if (event === "ValidationError") {
              this.handleError("Please input a valid width.");
            }
            break;

        case "InputContactState":
          // After rendering, if the GUI allows restarting the process
          console.log("mail sent, and everything is finished")
          this.currentState = "SelectTypeState";
          this.promptFinish();
          break;
        case "ErrorState":
          this.handleBackToInput();
          break;
      }
    }
    makeActive(element){
      element.removeAttribute("disabled");
      element.classList.add("active");
      const collapsibleItems = element.querySelectorAll(' .accordion-collapse');
      collapsibleItems.forEach((collapsible) => {
        // Remove 'show' class if it exists
        collapsible.classList.add('show');
      });
     

    }
    storeComponentId(key, id) {
        this.componentIds[key] = id;
    }
    promptTypeSelection() {
      // Code to prompt the user to select a type
    }
    promptHeightInput() {
     
        
        //Hey chat i am writing code for the control of gui system in js
        //okay i would like to undisable an accordion with an id of this.components['HeightSystem']
        //and to add a class of finished to the component with id of this.components[TypeSystem]


        var currentSystem= document.getElementById(this.componentIds['DimensionsSystem']);
        // currentSystem.removeAttribute("disabled");
        // currentSystem.classList.add("active");
        this.makeActive(currentSystem)



        // To add a class 'finished' to the component with id of this.components['TypeSystem']
        var typeSystem = document.getElementById(this.componentIds['TypeSystem']);
        typeSystem.classList.add("finished");

        //We can collapse actually.
 
    }
    promptColorInput() {
      // Code to prompt the user for the width
 
      var currentSystem= document.getElementById(this.componentIds['ColorSystem']);
      // currentSystem.removeAttribute("disabled");
      // currentSystem.classList.add("active");
      this.makeActive(currentSystem)


      // To add a class 'finished' to the component with id of this.components['TypeSystem']
      var typeSystem = document.getElementById(this.componentIds['DimensionsSystem']);
      typeSystem.classList.add("finished");


    }
    promptAdditiveInput() {
      // Code to prompt the user for the width

      var currentSystem= document.getElementById(this.componentIds['AdditiveSystem']);
      // currentSystem.removeAttribute("disabled");
      // currentSystem.classList.add("active");
      this.makeActive(currentSystem)


      // To add a class 'finished' to the component with id of this.components['TypeSystem']
      var typeSystem = document.getElementById(this.componentIds['ColorSystem']);
      typeSystem.classList.add("finished");


    }
    promptContactInput() {
      // Code to prompt the user for the width


      var currentSystem= document.getElementById(this.componentIds['ContactSystem']);
      // currentSystem.removeAttribute("disabled");
      // currentSystem.classList.add("active");
      this.makeActive(currentSystem)


      // To add a class 'finished' to the component with id of this.components['TypeSystem']
      var typeSystem = document.getElementById(this.componentIds['AdditiveSystem']);
      typeSystem.classList.add("finished");


    }
    promptFinish() {
      // Code to prompt the user for the width


      // var currentSystem= document.getElementById(this.componentIds['ContactSystem']);
      // // currentSystem.removeAttribute("disabled");
      // // currentSystem.classList.add("active");
      // this.makeActive(currentSystem)


      // To add a class 'finished' to the component with id of this.components['TypeSystem']
      var typeSystem = document.getElementById(this.componentIds['ContactSystem']);
      typeSystem.classList.add("finished");


    }
    renderContent() {
      // Call the repaint function with the selected type, height, and width
    }
    handleError(errorMessage) {
      // Display error message and transition to ErrorState
      console.error(errorMessage);
      this.currentState = "ErrorState";
    }
    handleBackToInput() {
      // Logic to transition from ErrorState back to the previous input state
    }
}
  
  // Create a new instance of the state machine
  const stateMachine = new StateMachine();
  
  export {stateMachine}