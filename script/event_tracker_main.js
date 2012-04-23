/* ========================================================================    
 *
 * event_tracker_main.js
 * ----------------------
 *
 *  Contains all the code for the event tracker 
 *
 * ======================================================================== */
//============================================================================
//
//Main App Object
//
//============================================================================
var EVENT_TRACKER = {
    load_data: undefined
}


//============================================================================
//
//Function definitions
//
//============================================================================
EVENT_TRACKER.load_data = function(params){
    //This function loads data from a passed in URL and does any additional
    //  setup steps
    params = params || {}
    url = params.url || ''
    callback = params.callback || function(){}
    
    //Make the request
    $.ajax({
        url: url
        beforeSend:
    })
}




//============================================================================
//
//UTIL functions
//
//============================================================================
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();
