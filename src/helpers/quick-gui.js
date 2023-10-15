import * as THREE from 'three';
import GUI from 'lil-gui';

// const axesHelper = new THREE.AxesHelper(20); 
// scene.add(axesHelper);

function createThickGrid(size, divisions, color1, color2, lineWidth) {
  //How to call the function
//   const thickGrid = createThickGrid(10, 10, "white", "white", 10); // Adjust the lineWidth (last parameter) to your needs
//   scene.add(thickGrid);


  const vertices = [];
  const colors = [];

  const step = size / divisions;
  const halfSize = size / 2;

  const colorCenter = new THREE.Color(color1);
  const colorGrid = new THREE.Color(color2);

  // Generate vertices and colors
  for (let i = 0; i <= divisions; i++) {
      const j = (i * step) - halfSize;

      vertices.push(-halfSize, 0, j, halfSize, 0, j);
      vertices.push(j, 0, -halfSize, j, 0, halfSize);

      const isCenterLine = (j === 0);

      const gridColor = isCenterLine ? colorCenter : colorGrid;

      colors.push(gridColor.r, gridColor.g, gridColor.b);
      colors.push(gridColor.r, gridColor.g, gridColor.b);
      colors.push(gridColor.r, gridColor.g, gridColor.b);
      colors.push(gridColor.r, gridColor.g, gridColor.b);
  }

  // Create geometry and set the vertices and colors
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.LineBasicMaterial({ vertexColors: true, linewidth: lineWidth });
  const mesh=new THREE.LineSegments(geometry, material);
  mesh.name="ThickGrid"
  return mesh;
}

function setupGuiHelper(scene){
    const gui = new GUI();
    gui.add( { x: "system simulation" }, 'x' ).name( 'Project' );

    // obj = {
    //     myBoolean: true,
    //     myString: 'lil-gui',
    //     myNumber: 1,
    
    // }
    // gui.add( obj, 'myBoolean' ); 	// checkbox
    // gui.add( obj, 'myString' ); 	// text field
    // gui.add( obj, 'myNumber' ); 	// number field
    // gui.add( obj, 'myFunction' ); 	// button
    
    const element = {
        // myBoolean: true,
        // myString: 'lil-gui',
        // myNumber: 1,
        myFunction: ()=>{
            const existingGrid = scene.getObjectByName("ThickGrid");
            // If the grid already exists in the scene, remove it
            if (existingGrid) {
                scene.remove(existingGrid);
            }
            else{
            let grid=createThickGrid(10, 10, "white", "white", 10);
            scene.add(grid)}}
    }
    element.myFunction()
    // gui.add( element, 'myBoolean' ); 	// checkbox
    // gui.add( element, 'myString' ); 	// text field
    // gui.add( element, 'myNumber' ); 	// number field
    gui.add( element, 'myFunction').name("toggleGrid"); 	// button
    


}
export {setupGuiHelper}