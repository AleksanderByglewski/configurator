function draggableUI(){

 
    var sideMenu = document.querySelector('.side-menu');
    var resizeHandle = document.querySelector('.resize-handle');

    var startDimension;
    var startX, startY;
    var dragging = false;

    resizeHandle.addEventListener('mousedown', function(e) {
        if (dragging) {
            stopDrag();
        } else {
            e.stopPropagation();  // Prevents this mousedown event from triggering the document's mousedown event
            startX = e.clientX;
            startY = e.clientY;

            if(window.innerWidth <= 992){
                startDimension = parseInt(document.defaultView.getComputedStyle(sideMenu).height, 10);
            } else {
                startDimension = parseInt(document.defaultView.getComputedStyle(sideMenu).width, 10);
            }
            
            window.addEventListener('mousemove', drag);
            dragging = true;
        }
    });

    document.addEventListener('mousedown', function(e) {
        if (dragging) {
            stopDrag();
        }
    });

    function drag(e) {
        if (dragging) {
            if(window.innerWidth <= 992){
                sideMenu.style.height = startDimension - e.clientY + startY + 'px';
            } else {
                sideMenu.style.width = startDimension + e.clientX - startX + 'px';
            }
        }
    }

    function stopDrag() {
        window.removeEventListener('mousemove', drag);
        dragging = false;
    }

    // Function to reset inline styles when screen size changes
    window.addEventListener('resize', function(){
        if(window.innerWidth <= 992){
            sideMenu.style.width = '';
        } else {
            sideMenu.style.height = '';
        }
    });
      // Your code here...
}
export {draggableUI}