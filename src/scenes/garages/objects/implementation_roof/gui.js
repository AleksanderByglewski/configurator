
import { v4 as uuidv4 } from 'uuid';
import { accesser, GLOBAL_ORIENTATION } from '../../base'
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { Generic, genericGui, genericState, genericObject, genericDisplay, genericController } from '../../base.js'
import { PlanetGui, PlanetObject, Planet, System } from '../introduction.js'
import { CubeObject,UconfigObject,WallGarageObject, genericGarageObject } from '../base/object'
import {UconfigController,CubeController,WallGarageController,groupGenericGarageController,genericGarageController} from '../base/controller'

class UconfigImplementationRoofGui extends genericGui {
    constructor() {
        super();
    }
     generateSep(){
        const sepElem= document.createElement('hr');
        sepElem.classList.add('my-2' , 'my-lg-4')
        return sepElem
     }
    generateInputs(attributes) {
      
        function generateAccordion(who_to_collapse="collapseTwo", pass_name="Kontroler", show=false, master=false){
            const accordionDiv = document.createElement('div');
            accordionDiv.classList.add('accordion');
            accordionDiv.id = 'parent-inputs-accordion-' + this.id;
    
            const accordionItemDiv = document.createElement('div');
            accordionItemDiv.classList.add('accordion-item', 'rounded-0', 'border-end-0', 'border-top-0', 'border-start-0');
            accordionDiv.appendChild(accordionItemDiv);
    
            const accordionHeaderH3 = document.createElement('h3');
            accordionHeaderH3.classList.add('accordion-header');
            accordionHeaderH3.id = 'headingTwo-' + this.id;
            accordionItemDiv.appendChild(accordionHeaderH3);
    
            const accordionButton = document.createElement('button');
            accordionButton.classList.add('accordion-button', 'accordion-button' ,'bg-primary' ,'text-light', 'rounded-0');
            accordionButton.classList.add('collapsed');
            accordionButton.type = 'button';
            accordionButton.dataset.bsToggle = "collapse";
            accordionButton.dataset.bsTarget = '#'+who_to_collapse+'-' + this.id;
            accordionButton.setAttribute('aria-expanded', 'true');
            accordionButton.setAttribute('aria-controls', ''+who_to_collapse+'-' + this.id);
    
            let name= pass_name
    
            accordionButton.textContent = name;
        
            accordionHeaderH3.appendChild(accordionButton);
    
            const accordionCollapseDiv = document.createElement('div');
            accordionCollapseDiv.id = ''+who_to_collapse+'-' + this.id;
            accordionCollapseDiv.classList.add('accordion-collapse', 'collapse');
            //You can add remove this line to collapse it by default
            if(show){
            accordionCollapseDiv.classList.add('show');
            }
            accordionCollapseDiv.setAttribute('aria-labelledby', 'headingTwo-' + this.id);
            accordionCollapseDiv.dataset.bsParent = '#parent-inputs-accordion-' + this.id;
            accordionItemDiv.appendChild(accordionCollapseDiv);
    
            const accordionBodyDiv = document.createElement('div');
            if(!master){
            accordionBodyDiv.classList.add('accordion-body' ,'px-0');
            }
            // accordionBodyDiv.textContent = 'Control system for a body';
            accordionCollapseDiv.appendChild(accordionBodyDiv);
    
            const inputGroupDiv = document.createElement('div');
            inputGroupDiv.classList.add('input-group', 'align-items-center');
            accordionBodyDiv.appendChild(inputGroupDiv);
                return {
                accordionDiv: accordionDiv,
                accordionBodyDiv: accordionBodyDiv
            };
    }


        function generateSimpleContainer(who_to_collapse="collapseTwo", pass_name="Kontroler", show=false, master=false){
            const accordionDiv = document.createElement('div');
            accordionDiv.classList.add('accordion');
            accordionDiv.id = 'parent-inputs-accordion-' + this.id;
    
            const accordionItemDiv = document.createElement('div');
            accordionItemDiv.classList.add('accordion-item', 'rounded-0', 'border-end-0', 'border-top-0', 'border-start-0', 'border-bottom-0');
            accordionDiv.appendChild(accordionItemDiv);
    
            const accordionHeaderH3 = document.createElement('h3');
            accordionHeaderH3.classList.add('accordion-header');
            accordionHeaderH3.id = 'headingTwo-' + this.id;
            accordionItemDiv.appendChild(accordionHeaderH3);
    
            const accordionButton = document.createElement('div');
            accordionButton.classList.add('fs-lg', 'px-4' ,'py-2', 'border-bottom', 'border-primary');
            accordionButton.classList.add('collapsed');
            accordionButton.type = 'button';
            accordionButton.dataset.bsToggle = "collapse";
            accordionButton.dataset.bsTarget = '#'+who_to_collapse+'-' + this.id;
            accordionButton.setAttribute('aria-expanded', 'true');
            accordionButton.setAttribute('aria-controls', ''+who_to_collapse+'-' + this.id);
    
            let name= pass_name
    
            accordionButton.textContent = name;
        
            accordionHeaderH3.appendChild(accordionButton);
    
            const accordionCollapseDiv = document.createElement('div');
            // accordionCollapseDiv.id = ''+who_to_collapse+'-' + this.id;
            // accordionCollapseDiv.classList.add('accordion-collapse', 'collapse');
            //You can add remove this line to collapse it by default
            if(show){
            accordionCollapseDiv.classList.add('show');
            }
            // accordionCollapseDiv.setAttribute('aria-labelledby', 'headingTwo-' + this.id);
            accordionCollapseDiv.dataset.bsParent = '#parent-inputs-accordion-' + this.id;
            accordionItemDiv.appendChild(accordionCollapseDiv);
    
            const accordionBodyDiv = document.createElement('div');
            if(!master){
            accordionBodyDiv.classList.add('accordion-body');
            }
            // accordionBodyDiv.textContent = 'Control system for a body';
            accordionCollapseDiv.appendChild(accordionBodyDiv);
    
            const inputGroupDiv = document.createElement('div');
            inputGroupDiv.classList.add('input-group', 'align-items-center');
            accordionBodyDiv.appendChild(inputGroupDiv);
                return {
                accordionDiv: accordionDiv,
                accordionBodyDiv: accordionBodyDiv
            };



        }

        // let {accordionBodyDiv, accordionDiv}=
        // generateAccordion.bind(this)('collapseTwo',"Wybór dachu")



        let masterAccordionName = "Kontrola Dachu"; // The name for the master accordion
        let {accordionBodyDiv: masterAccordionBody, accordionDiv: masterAccordionDiv} = generateAccordion.bind(this)('collapseMaster', masterAccordionName, true);
    
        // Roof type accordion
        let {accordionBodyDiv, accordionDiv} = generateSimpleContainer.bind(this)('collapseTwo', "Wybór dachu", true);
        accordionBodyDiv.appendChild(this.createMarkupType());
        masterAccordionBody.appendChild(accordionDiv); // Append to master accordion body
    
        // Roof color accordion
        let {accordionBodyDiv: accordionBodyDiv2, accordionDiv: accordionDiv2} = generateSimpleContainer.bind(this)('collapseThree', "Kolor dachu", true);
        accordionBodyDiv2.appendChild(this.createMarkupColors());
        accordionBodyDiv2.appendChild(this.generateSep());
        masterAccordionBody.appendChild(accordionDiv2); // Append to master accordion body
    
        // Roof cover type accordion
        let {accordionBodyDiv: accordionBodyDiv3, accordionDiv: accordionDiv3} = generateSimpleContainer.bind(this)('collapseFour', "Pokrycie dachu", true);
        accordionBodyDiv3.appendChild(this.createMarkupCoverType());
        masterAccordionBody.appendChild(accordionDiv3); // Append to master accordion body
    
      // Roof cover type accordion
      let {accordionBodyDiv: accordionBodyDiv4, accordionDiv: accordionDiv4} = generateSimpleContainer.bind(this)('collapseFive', "Dodatkowe opcje dachu", true);
      accordionBodyDiv4.appendChild(this.createMarkupAdditionalElements());
      masterAccordionBody.appendChild(accordionDiv4); // Append to master accordion body
  

        const masterContainerId = '#master-container-' + this.id; 
        this.insertContent(masterAccordionDiv, masterContainerId, 'master-accordion', this.id);
    
        this.listenToChanges();
    
    }

    createMarkupAdditionalElements() {
        const form = document.createElement('form');
        form.classList.add('contact-form', 'squares-container--1');
    
        const options = [
            { value: 'felt', description: 'Filc pod dachem' },
            { value: 'gutters', description: 'Rynny' },
            
        ];
    
        options.forEach(option => {
            const inputGroupDiv = document.createElement('div');
            inputGroupDiv.classList.add('input-group', 'mb-2');
    
            const inputGroupTextDiv = document.createElement('div');
            inputGroupTextDiv.classList.add('input-group-text');
    
            const checkboxInput = document.createElement('input');
            checkboxInput.classList.add('form-check-input');
            checkboxInput.type = 'checkbox';
            checkboxInput.value = option.value;
            checkboxInput.name = option.value.toLowerCase().replace(/\s+/g, '-');
    
            const formControlDiv = document.createElement('div');
            formControlDiv.classList.add('form-control');
            formControlDiv.setAttribute('disabled', '');
            formControlDiv.textContent = option.description;
    
            inputGroupTextDiv.appendChild(checkboxInput);
            inputGroupDiv.appendChild(inputGroupTextDiv);
            inputGroupDiv.appendChild(formControlDiv);
            form.appendChild(inputGroupDiv);
        });
    
        return form;
    }
    createMarkup() {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container--three');


        const text_attributes = ['name'];

        text_attributes.forEach(attr => {
            const textLabel = document.createElement('label');
            textLabel.textContent = attr;
            containerDiv.appendChild(textLabel);

            const filler = document.createElement('div');
            containerDiv.appendChild(filler);

            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.value = this.mediator.state[attr] || 'State name';  // default to empty string if not set

            // Event listener for input changes
            textInput.addEventListener('input', function (e) {
                this.mediator.state[attr] = e.target.value;
                this.notifyMediator('stateChange', { [attr]: e.target.value });
                
                console.log(this.mediator.state.state)
            }.bind(this));

            containerDiv.appendChild(textInput);
        });

        const attributes = ['position_x', 'position_y', 'position_z','rotation_x','rotation_y', 'rotation_z',  'width', 'height', 'depth'];

        attributes.forEach(attr => {
            const sliderLabel = document.createElement('label');
            sliderLabel.textContent = attr;
            containerDiv.appendChild(sliderLabel);

            const sliderInput = document.createElement('input');
            sliderInput.type = 'range';
            sliderInput.min = -10; // You can set min/max/default values according to your needs
            sliderInput.max = 10;
            sliderInput.step = 0.1;
            sliderInput.value = this.mediator.state[attr] || 0;  // default to 0 if not set, adjust as needed
            sliderInput.addEventListener('input', function (e) {
                this.mediator.state[attr] = e.target.value;
                this.notifyMediator('stateChange', { [attr]: e.target.value });
                this.notifyMediator('buildingStep', { });
                this.notifyMediator('hardBuildingStep', {})
            }.bind(this));

            const sliderValueDisplay = document.createElement('span');
            sliderValueDisplay.textContent = sliderInput.value;
            sliderInput.addEventListener('input', function (e) {
                sliderValueDisplay.textContent = e.target.value;
            });

            containerDiv.appendChild(sliderInput);
            containerDiv.appendChild(sliderValueDisplay);
        });

        // ... your previous code ...

       

        // const removeModelBtn = document.createElement('button');
        // removeModelBtn.textContent = "Remove Model";
        // removeModelBtn.classList.add('remove-model-btn');
        // removeModelBtn.addEventListener('click', function () {
        //     // Call notifyMediator with 'recursivelyRemoveModel' event
        //     this.notifyMediator('recursivelyRemoveModel');
        // }.bind(this));

        // containerDiv.appendChild(removeModelBtn);


        return containerDiv;
    }
    createMarkupColorsOld(){
   const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container--material', 'squares-container--4');

        const squareButtons = [
           
            { value: '#8781a3',  display_value:"RAL2007", color_value:"#656179"},
            { value: '#a7a1c3',  display_value:"RAL2009", color_value:"#858199"},
            { value: '#c7c1e3',  display_value:"RAL2000", color_value:"#a5a1b9"},
            { value: '#e7e1f3',  display_value:"RAL2011", color_value:"#c5c1d9"},
            { value: '#757375',  display_value:"RAL2015", color_value:"#434143"},
            { value: '#858385',  display_value:"RAL2017", color_value:"#535153"},
            { value: '#959395',  display_value:"RAL2019", color_value:"#737173"},
            { value: '#A5A3A5',  display_value:"RAL2021", color_value:"#838183"},
            { value: '#B5B3B5',  display_value:"RAL2023", color_value:"#939193"},
            { value: '#C5C3C5',  display_value:"RAL2025", color_value:"#a3a1a3"},
            { value: '#D5D3D5',  display_value:"RAL2027", color_value:"#b4b1b3"},
            { value: '#E5E3E5',  display_value:"RAL2029", color_value:"#c4c1c3"},
         
        ]

        squareButtons.forEach(button => {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            // squareDiv.style.backgroundColor = button.color;
            squareDiv.dataset.value = button.value;

            // Create the image element
            const imageEl = document.createElement('div');
            imageEl.style.backgroundColor = button.color_value;
            imageEl.style.aspectRatio= "2 / 1"
            imageEl.alt = button.display_value;  // for accessibility
            squareDiv.appendChild(imageEl);  // append the image to the squareDiv

            const textDiv = document.createElement('div');
            textDiv.textContent = button.display_value;
            squareDiv.appendChild(textDiv)


   

            // Attach event listener directly to the squareDiv
            squareDiv.addEventListener('click', function (e) {
                
                // Notify the mediator or perform some action
                
              

                // this.notifyMediator('changeState',{color:`${squareDiv.dataset.value}`})
                // this.notifyMediator('recursivelyRemoveModel');
                // this.notifyMediator('buildingStep');
             
                //this.mediator.state[attr] = e.target.value;
                this.notifyMediator('stateChange', { 'object_color': squareDiv.dataset.value});
                this.notifyMediator('buildingStep', { });
                this.notifyMediator('hardBuildingStep', {})
            }.bind(this));



            
            containerDiv.appendChild(squareDiv);
        });


        // const removeModelBtn = document.createElement('button');
        // removeModelBtn.textContent = "Remove Model";
        // removeModelBtn.classList.add('remove-model-btn');
        // removeModelBtn.addEventListener('click', function() {
        //     // Call notifyMediator with 'recursivelyRemoveModel' event
        //     this.notifyMediator('recursivelyRemoveModel');
        // }.bind(this));
        
        // containerDiv.appendChild(removeModelBtn);

        
        return containerDiv;
    }
    createMarkupColors(){
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('squares-container--8', 'grid--colors');

        const squareButtons = [
            // { value: '#ED972A',  display_value:"Złoty dąb",font_color:"white", additonal_desc:'' ,color_value:"#ED972A"},
            
            // { value: '#C76E3C',  display_value:"Jasny orzech",font_color:"white", additonal_desc:'' ,color_value:"#C76E3C"},
            // { value: '#925f50',  display_value:"Ciemny Orzech",font_color:"white", additonal_desc:'' ,color_value:"#623B2F"},
       


            // { value: '#ED972A',  display_value:"Złoty dąb",font_color:"white", additonal_desc:'' ,color_value:"#ED972A"},
            
            // { value: '#C76E3C',  display_value:"Jasny orzech",font_color:"white", additonal_desc:'' ,color_value:"#C76E3C"},
            // { value: '#925f50',  display_value:"Ciemny Orzech",font_color:"white", additonal_desc:'' ,color_value:"#623B2F"},
            // { value: '#c6eaff',  display_value:"Ocynk",font_color:"white", additonal_desc:'' ,color_value:"#c6e9fd"},

            { value: '#5a5d61',  display_value:"Grafit",font_color:"white", additonal_desc:'RAL7016' ,color_value:"#414549"},
            { value: '#476242',  display_value:"Ciemny zielony",font_color:"white", additonal_desc:'RAL6005' ,color_value:"#0d5733"},
            { value: '#785756',  display_value:"Ciemny brąz",font_color:"white", additonal_desc:'RAL8017' ,color_value:"#653d3c"},
            { value: '#d2ba92',  display_value:"Piasek",font_color:"black", additonal_desc:'RAL1012' ,color_value:"#c6ae88"},



            { value: '#bebdbd',  display_value:"Srebrny",font_color:"white", additonal_desc:'RAL9006' ,color_value:"#a8a8a8"},
            { value: '#5e7d58',  display_value:"Jasny zielony",font_color:"white", additonal_desc:'RAL6020' ,color_value:"#00a35e"},
            { value: '#b66e4f',  display_value:"Jasny brąz",font_color:"white", additonal_desc:'RAL8004' ,color_value:"#b25228"},
            { value: '#fafafa',  display_value:"Biały",font_color:"black", additonal_desc:'RAL9010' ,color_value:"#fafafa"},

  
         
            { value: '#4d4f50',  display_value:"Czarny",font_color:"white", additonal_desc:'RAL9005' ,color_value:"#1c1e1f"},
            { value: '#a0394c',  display_value:"Jasna wiśnia",font_color:"white", additonal_desc:'RAL3011' ,color_value:"#a62926"},
            { value: '#79363a',  display_value:"Wiśnia",font_color:"white", additonal_desc:'RAL3005' ,color_value:"#781e27"},

            { value: '#c6eaff',  display_value:"Ocynk",font_color:"white", additonal_desc:'' ,color_value:"#c6e9fd"},


            // { value: '#393c3e',  display_value:"Grafit",font_color:"white", additonal_desc:'RAL7016' ,color_value:"#303234"},
            // { value: '#476242',  display_value:"Ciemny zielony",font_color:"white", additonal_desc:'RAL6005' ,color_value:"#0d5733"},
            // { value: '#785756',  display_value:"Ciemny brąz",font_color:"white", additonal_desc:'RAL8017' ,color_value:"#653d3c"},
            // { value: '#d2ba92',  display_value:"Piasek",font_color:"black", additonal_desc:'RAL1012' ,color_value:"#c6ae88"},
            // { value: '#bebdbd',  display_value:"Srebrny",font_color:"white", additonal_desc:'RAL9006' ,color_value:"#a8a8a8"},
            // { value: '#5e7d58',  display_value:"Jasny zielony",font_color:"white", additonal_desc:'RAL6020' ,color_value:"#00a35e"},
            // { value: '#b66e4f',  display_value:"Jasny brąz",font_color:"white", additonal_desc:'RAL8004' ,color_value:"#b25228"},
            // { value: '#fafafa',  display_value:"Biały",font_color:"black", additonal_desc:'RAL9010' ,color_value:"#fafafa"},
            // { value: '#4d4f50',  display_value:"Czarny",font_color:"white", additonal_desc:'RAL9005' ,color_value:"#1c1e1f"},
            // { value: '#a0394c',  display_value:"Jasna wiśnia",font_color:"white", additonal_desc:'RAL3011' ,color_value:"#a62926"},
            // { value: '#79363a',  display_value:"Wiśnia",font_color:"white", additonal_desc:'RAL3005' ,color_value:"#781e27"},
            // { value: '#c6eaff',  display_value:"Ocynk",font_color:"white", additonal_desc:'' ,color_value:"#c6e9fd"},
        
         

        ];
        //'#661d24
        squareButtons.forEach((button,index) => {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            // squareDiv.style.backgroundColor = button.color;
            squareDiv.dataset.value = button.value;

            // Create the image element
            let imageEl = document.createElement('div');
            // imageEl.style.backgroundColor = button.color_value;
            // imageEl.style.aspectRatio= "2 / 1"
            
            let available_wood=false
            if (available_wood){
            switch (index) {
                case 0:
                    imageEl = document.createElement('img');
                    // let formattedDisplayValue = button.display_value.toLowerCase().replace(/\s+/g, '_');
                    imageEl.style.objectFit="cover"
                    imageEl.src = `assets/display/colors/wood/zloty_dab.jpg`; // Construct the image path
                    break
                case 1:
                    imageEl = document.createElement('img');
                    imageEl.style.objectFit="cover"
                    //let formattedDisplayValue = button.display_value.toLowerCase().replace(/\s+/g, '_');
                    imageEl.src = `assets/display/colors/wood/jasny_orzech.jpg`; // Construct the image path
                    break
                case 2:
                    // For the first three buttons, use an 'img' element with custom image
                    imageEl = document.createElement('img');
                    imageEl.style.objectFit="cover"
                    //let formattedDisplayValue = button.display_value.toLowerCase().replace(/\s+/g, '_');
                    imageEl.src = `assets/display/colors/wood/ciemny_orzech.jpg`; // Construct the image path
                    break;
                case 3:
                        // For the first three buttons, use an 'img' element with custom image
                        imageEl = document.createElement('img');
                        imageEl.style.objectFit="cover"
                        //let formattedDisplayValue = button.display_value.toLowerCase().replace(/\s+/g, '_');
                        imageEl.src = `assets/display/colors/wood/ocynk.jpg`; // Construct the image path
                        break;
                default:

               

                    // For the rest, use a 'div' element with background color
                    imageEl = document.createElement('div');
                    imageEl.style.backgroundColor = button.color_value;


                    const descText = document.createElement('div');
                    descText.textContent = button.additonal_desc;
                    descText.style.position = 'absolute';
                    descText.style.color = button.font_color;
                    descText.style.fontWeight = 'normal';
                    descText.style.fontSize = '14px';
                    // descText.style.transform=t
                    descText.style.top = '0px'; // Adjust as needed
                    descText.style.right= '5px'; // Adjust as needed
                    imageEl.style.position = 'relative'; // To position descText absolutely within squareDiv
                    imageEl.appendChild(descText);

           
                    break;
            }
            
            }
            else{
                if(index==squareButtons.length-1){
                    imageEl = document.createElement('img');
                    imageEl.style.objectFit="cover"
                    //let formattedDisplayValue = button.display_value.toLowerCase().replace(/\s+/g, '_');
                    imageEl.src = `assets/display/colors/wood/ocynk.jpg`; // Construct the image path
                  
                }
                else{


                imageEl = document.createElement('div');
                imageEl.style.backgroundColor = button.color_value;


                const descText = document.createElement('div');
                descText.textContent = button.additonal_desc;
                descText.style.position = 'absolute';
                descText.style.color = button.font_color;
                descText.style.fontWeight = 'normal';
                descText.style.fontSize = '14px';
                // descText.style.transform=t
                descText.style.top = '0px'; // Adjust as needed
                descText.style.right= '5px'; // Adjust as needed
                imageEl.style.position = 'relative'; // To position descText absolutely within squareDiv
                imageEl.appendChild(descText);
                }
            }
            imageEl.style.aspectRatio= "2 / 1"
            imageEl.alt = button.display_value;  // for accessibility
            squareDiv.appendChild(imageEl);  // append the image to the squareDiv

            const textDiv = document.createElement('div');
            textDiv.textContent = button.display_value;
            squareDiv.appendChild(textDiv)


   

            // Attach event listener directly to the squareDiv
            squareDiv.addEventListener('click', function (e) {
                
                // Notify the mediator or perform some action
                
              

                // this.notifyMediator('changeState',{color:`${squareDiv.dataset.value}`})
                // this.notifyMediator('recursivelyRemoveModel');
                // this.notifyMediator('buildingStep');
                    //this.mediator.state[attr] = e.target.value;
                    // this.notifyMediator('requestParentAssistance', { })
             
                    this.notifyMediator('stateChange', { 'object_color': squareDiv.dataset.value});
                    
                    this.notifyMediator('stateChange', { 'wall_color': squareDiv.dataset.value});
                    this.notifyMediator('buildingStep', { });
          
            }.bind(this));



            
            containerDiv.appendChild(squareDiv);
        });


        // const removeModelBtn = document.createElement('button');
        // removeModelBtn.textContent = "Remove Model";
        // removeModelBtn.classList.add('remove-model-btn');
        // removeModelBtn.addEventListener('click', function() {
        //     // Call notifyMediator with 'recursivelyRemoveModel' event
        //     this.notifyMediator('recursivelyRemoveModel');
        // }.bind(this));
        
        // containerDiv.appendChild(removeModelBtn);

        
        return containerDiv;
    }
    createMarkupType(){
        const containerDiv = document.createElement('div');
             containerDiv.classList.add('squares-container', 'squares-container--8');
     
             const squareButtons = [
                 { value: 'roof_type_1',  display_value:"Spad w tył",  display_image:'/assets/display/roof/1.jpg'},
                 { value: 'roof_type_2',  display_value:"Spad w lewo",  display_image:'/assets/display/roof/2.jpg'},
                 { value: 'roof_type_3',  display_value:"Spad w przód",  display_image:'/assets/display/roof/3.jpg'},
                 { value: 'roof_type_4',  display_value:"Dach w prawo",  display_image:'/assets/display/roof/4.jpg'},
                 { value: 'roof_type_5',  display_value:"Dach dwuspadowy w przód",  display_image:'/assets/display/roof/5.jpg'},
                 { value: 'roof_type_6',  display_value:"Dach dwuspadowy na boki",  display_image:'/assets/display/roof/6.jpg'},
                //  { value: 'material_type_5',  display_value:"Blacha typ dodatkowa",  display_image:'/assets/display/material/5.jpg'},
                
             ];
     
             squareButtons.forEach(button => {
                 const squareDiv = document.createElement('div');
                 squareDiv.classList.add('square');
                 // squareDiv.style.backgroundColor = button.color;
                 squareDiv.dataset.value = button.value;
     
                 // Create the image element
                 const imageEl = document.createElement('img');
                //  imageEl.style.backgroundColor = button.value;
                imageEl.src =button.display_image;

                 imageEl.style.aspectRatio= "1 / 1"
                 imageEl.alt = button.display_value;  // for accessibility
                 squareDiv.appendChild(imageEl);  // append the image to the squareDiv
     
                 const textDiv = document.createElement('div');
                 textDiv.textContent = button.display_value;
                 squareDiv.appendChild(textDiv)
     
     
        
     
                 // Attach event listener directly to the squareDiv
                 squareDiv.addEventListener('click', function (e) {
                     
                     // Notify the mediator or perform some action
                     
                   
     
                     // this.notifyMediator('changeState',{color:`${squareDiv.dataset.value}`})
                     // this.notifyMediator('recursivelyRemoveModel');
                     // this.notifyMediator('buildingStep');
                  
                    // const accessers = [
                    //     new accesser('material_type', squareDiv.dataset.value),
                    // ]
                    //  this.notifyMediator('genericChangeObject',accessers)
                    
                    this.notifyMediator('stateChange', { 'roof_type': squareDiv.dataset.value});
                    this.notifyMediator('buildingStep', { });
                    this.notifyMediator('hardBuildingStep', {})
                 }.bind(this));
     
     
     
                 
                 containerDiv.appendChild(squareDiv);
             });
     
     
             // const removeModelBtn = document.createElement('button');
             // removeModelBtn.textContent = "Remove Model";
             // removeModelBtn.classList.add('remove-model-btn');
             // removeModelBtn.addEventListener('click', function() {
             //     // Call notifyMediator with 'recursivelyRemoveModel' event
             //     this.notifyMediator('recursivelyRemoveModel');
             // }.bind(this));
             
             // containerDiv.appendChild(removeModelBtn);
     
             
             return containerDiv;
         }

    createMarkupCoverType(){
        const containerDiv = document.createElement('div');
             containerDiv.classList.add('squares-container','squares-container--material','squares-container--4');
             let squareButtons
             if(GLOBAL_ORIENTATION!="SIDEWAYS"){
             squareButtons = [
                //  { value: 'material_type_1',  display_value:"Blacha typ 1",  display_image:'/assets/display/material/1.jpg'},
                //  { value: 'material_type_2',  display_value:"Blacha typ 2",  display_image:'/assets/display/material/2.jpg'},
                //  { value: 'material_type_3',  display_value:"Blacha typ 3",  display_image:'/assets/display/material/3.jpg'},
                 { value: 'material_type_9',  display_value:"Blacha T14",  display_image:'/assets/display/material/4.jpg'},
                 { value: 'material_type_8',  display_value:"Blachodachówka",  display_image:'/assets/display/material/8.jpg'},
                //  { value: 'material_type_5',  display_value:"Blacha typ dodatkowa",  display_image:'/assets/display/material/5.jpg'},
                
             ];
            }
             else{
                
            squareButtons = [
                { value: 'material_type_1',  display_value:"Blacha typ 14",  display_image:'/assets/display/material/1.jpg'},
                { value: 'material_type_8',  display_value:"Blachodachówka",  display_image:'/assets/display/material/8.jpg'},
           
               //  { value: 'material_type_5',  display_value:"Blacha typ dodatkowa",  display_image:'/assets/display/material/5.jpg'},
               
            ];
            } 

             squareButtons.forEach(button => {
                 const squareDiv = document.createElement('div');
                 squareDiv.classList.add('square');
                 // squareDiv.style.backgroundColor = button.color;
                 squareDiv.dataset.value = button.value;
     
                 // Create the image element
                 const imageEl = document.createElement('img');
                //  imageEl.style.backgroundColor = button.value;
                imageEl.src =button.display_image;

                 imageEl.style.aspectRatio= "2 / 1"
                 imageEl.alt = button.display_value;  // for accessibility
                 squareDiv.appendChild(imageEl);  // append the image to the squareDiv
     
                 const textDiv = document.createElement('div');
                 textDiv.textContent = button.display_value;
                 squareDiv.appendChild(textDiv)
     
     
        
     
                 // Attach event listener directly to the squareDiv
                 squareDiv.addEventListener('click', function (e) {
                     
                     // Notify the mediator or perform some action
                     
                   
     
                     // this.notifyMediator('changeState',{color:`${squareDiv.dataset.value}`})
                     // this.notifyMediator('recursivelyRemoveModel');
                     // this.notifyMediator('buildingStep');
                  
                    // const accessers = [
                    //     new accesser('material_type', squareDiv.dataset.value),
                    // ]
                    //  this.notifyMediator('genericChangeObject',accessers)
                    
                    this.notifyMediator('stateChange', { 'roof_material_type': squareDiv.dataset.value});
                    this.notifyMediator('buildingStep', { });
                    this.notifyMediator('hardBuildingStep', { });
               
                 }.bind(this));
     
     
     
                 
                 containerDiv.appendChild(squareDiv);
             });
     
     
             // const removeModelBtn = document.createElement('button');
             // removeModelBtn.textContent = "Remove Model";
             // removeModelBtn.classList.add('remove-model-btn');
             // removeModelBtn.addEventListener('click', function() {
             //     // Call notifyMediator with 'recursivelyRemoveModel' event
             //     this.notifyMediator('recursivelyRemoveModel');
             // }.bind(this));
             
             // containerDiv.appendChild(removeModelBtn);
     
             
             return containerDiv;
         }

    // createMarkupCoverType(){
    //     const containerDiv = document.createElement('div');
    //          containerDiv.classList.add('squares-container');
     
    //          const squareButtons = [
    //              { value: 'material_type_1',  display_value:"Blacha typ 1",  display_image:'/assets/display/material/1.jpg'},
    //              { value: 'material_type_2',  display_value:"Blacha typ 2",  display_image:'/assets/display/material/2.jpg'},
    //              { value: 'material_type_3',  display_value:"Blacha typ 3",  display_image:'/assets/display/material/3.jpg'},
    //              { value: 'material_type_4',  display_value:"Blacha typ 4",  display_image:'/assets/display/material/4.jpg'},
    //              { value: 'material_type_5',  display_value:"Blacha typ dodatkowa",  display_image:'/assets/display/material/5.jpg'},
                
    //          ];
     
    //          squareButtons.forEach(button => {
    //              const squareDiv = document.createElement('div');
    //              squareDiv.classList.add('square');
    //              // squareDiv.style.backgroundColor = button.color;
    //              squareDiv.dataset.value = button.value;
     
    //              // Create the image element
    //              const imageEl = document.createElement('img');
    //             //  imageEl.style.backgroundColor = button.value;
    //             imageEl.src =button.display_image;

    //              imageEl.style.aspectRatio= "1 / 1"
    //              imageEl.alt = button.display_value;  // for accessibility
    //              squareDiv.appendChild(imageEl);  // append the image to the squareDiv
     
    //              const textDiv = document.createElement('div');
    //              textDiv.textContent = button.display_value;
    //              squareDiv.appendChild(textDiv)
     
     
        
     
    //              // Attach event listener directly to the squareDiv
    //              squareDiv.addEventListener('click', function (e) {
    
    //                  // Notify the mediator or perform some action
                     
                   
     
    //                  // this.notifyMediator('changeState',{color:`${squareDiv.dataset.value}`})
    //                  // this.notifyMediator('recursivelyRemoveModel');
    //                  // this.notifyMediator('buildingStep');
                  
    //                 const accessers = [
    //                     new accesser('material_type', squareDiv.dataset.value),
    //                 ]
    //                  this.notifyMediator('genericChangeObject',accessers)
               
    //              }.bind(this));
     
     
     
                 
    //              containerDiv.appendChild(squareDiv);
    //          });
     
     
    //          // const removeModelBtn = document.createElement('button');
    //          // removeModelBtn.textContent = "Remove Model";
    //          // removeModelBtn.classList.add('remove-model-btn');
    //          // removeModelBtn.addEventListener('click', function() {
    //          //     // Call notifyMediator with 'recursivelyRemoveModel' event
    //          //     this.notifyMediator('recursivelyRemoveModel');
    //          // }.bind(this));
             
    //          // containerDiv.appendChild(removeModelBtn);
     
             
    //          return containerDiv;
    //      }
    insertContent(element, selector = "*", classes = "attribute-values", id = "") {
        this.waitForDOM(() => {
            const container = this.getContainer(selector);
            // Clear any previous content inside the container

            if (!container) {
                console.warn(`Element with selector "${selector}" not found.`);
                return;  // Exit early if container is not found
            }
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            // Append the new element to the container
            container.appendChild(element);

            // Add the provided classes and id
            container.classList.add(classes);
            container.id = 'id-' + id;
        });
    }
    notifyMediator(event, value = "") {
        if (this.mediator) {
            // console.log(this.mediator.state.update('color',"#ff3030"))
            // The mediator should handle the square click with the value
            //console.log(this.mediator)
            this.mediator.handleEvent(event, value);
        }
    }
    createSquaresMarkup() {
        // Example: Define four values. Modify as needed.
        const values = ["Value1", "Value2", "Value3", "Value4"];

        let markup = '<div class="squares-container">';
        values.forEach(value => {
            markup += `<div class="gui-square" data-value="${value}">${value}</div>`;
        });
        markup += '</div>';

        return markup;
    }
    listenToChanges() {
    }
}
 export{UconfigImplementationRoofGui}