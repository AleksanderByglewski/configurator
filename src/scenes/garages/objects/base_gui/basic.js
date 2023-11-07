import { v4 as uuidv4 } from 'uuid';

class ComponentFactory {
    
    static createSquareButton(args) {

        let buttonData = args['buttonData']
        let clickCallback = args['clickCallback']



        const squareDiv = document.createElement('div');
        squareDiv.className = 'square-button';
        squareDiv.dataset.value = buttonData.value;

//       <div style="position: absolute; bottom: 0; width: 100%; height: 100%; background-image: linear-gradient(0deg, #00000088 16px, #ffffff44 100%);"></div>
//        <div style="line-height: 1.3;" class="position-absolute bottom-0 text-white w-100 ps-1 pb-1">${button.display_value}</div>
//        <img src="${button.display_image}" alt="${button.display_value}" style="aspect-ratio: 1 / 1; object-fit: cover;">

        squareDiv.innerHTML = `
        <div class="overlay"></div>
        <div class="label">${buttonData.display_value}</div>
        <img class="image" src="${buttonData.display_image}" alt="${buttonData.display_value}">
      `;

        // Attach the passed callback function to the click event
        squareDiv.addEventListener('click', (e) => {
            if (typeof clickCallback === 'function') {
                clickCallback(e, buttonData.value);
            }
        });

        return squareDiv;
    }

    static createInputField(args) {
        let { label, inputType, step, inputAttributes, changeCallback, uuidGenerator } = args;

        // Generate a unique ID for the input to link it with the label
        
          const uniqueId =uuidv4();

        // Create the container for the input using a template literal
        const inputHTML = `
            <div class="input-container  d-flex align-items-center">
                <input id="${uniqueId}" type="${inputType || 'text'}" ${step ? `step="${step}"` : ''} ${ComponentFactory.inputAttributesToString(inputAttributes)}>
                <label style="width: 100%;
                text-align: end;" for="${uniqueId}">${label}</label>
            </div>
        `;

  


        

        // Convert the template string into actual DOM nodes
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = inputHTML.trim();
        const inputContainer = tempDiv.firstChild;

        // Find the input within the template to attach the change event listener
        const input = inputContainer.querySelector('input');

        // Attach the passed callback function to the input's change event
        if (typeof changeCallback === 'function') {
            input.addEventListener('change', (e) => changeCallback(e.target.value, e));
        }

        return inputContainer;
    }

    static confirmationButton(args){
        let { text, additionalClasses, changeCallback } = args;

        // Create the header element using a template literal
        const headerHTML = `
        <button type="button" class="btn btn-outline-primary ${additionalClasses || ''}">${text}</button>
        `;

        // Convert the template string into actual DOM nodes
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = headerHTML.trim();
        const headerElement = tempDiv.firstChild;
       
        if (typeof changeCallback === 'function') {
            headerElement.addEventListener('click', (e) => changeCallback(e.target.value, e));
        }

        return headerElement;
    }
    // Helper function to convert inputAttributes object to string
    static inputAttributesToString(attributes) {
        if (!attributes) return '';
        return Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(' ');
    }


    static createCheckboxField(args) {
        let { label, value, name, inputAttributes, changeCallback } = args;

        // Create a unique ID for the input to link it with the label
        const uniqueId = uuidv4()

        // Create the container for the checkbox using a template literal
        const checkboxHTML = `
            <div class="input-group mb-2">
                <div class="input-group-text">
                    <input class="form-check-input" type="checkbox" id="${uniqueId}" value="${value}" name="${name}" ${ComponentFactory.inputAttributesToString(inputAttributes)}>
                </div>
                <label class="form-control" for="${uniqueId}" disabled="">${label}</label>
            </div>
        `;

        // Convert the template string into actual DOM nodes
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = checkboxHTML.trim();
        const checkboxContainer = tempDiv.firstChild;

        // Find the checkbox within the template to attach the change event listener
        const checkbox = checkboxContainer.querySelector('input');

        // Attach the passed callback function to the checkbox's change event
        if (typeof changeCallback === 'function') {
            checkbox.addEventListener('change', (e) => changeCallback(e.target.checked, e));
        }

        return checkboxContainer;
    }

    static createHeader(args) {
        let { text, additionalClasses } = args;

        // Create the header element using a template literal
        const headerHTML = `
            <div class="h3 fs-lg px-4 py-2 pb-3 border-bottom border-primary ${additionalClasses || ''}">${text}</div>
        `;

        // Convert the template string into actual DOM nodes
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = headerHTML.trim();
        const headerElement = tempDiv.firstChild;

        return headerElement;
    }
    // Helper function to convert inputAttributes object to string
    static inputAttributesToString(attributes) {
        if (!attributes) return '';
        return Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(' ');
    }


}

export {ComponentFactory}