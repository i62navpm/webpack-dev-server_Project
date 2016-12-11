/* global alert XMLHttpRequest ActiveXObject */

var http_request = false;

export default function makeRequest(droid, url, data, callback, callbackError, context) {

    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
          http_request.overrideMimeType('application/json');
        }
    } else if (window.ActiveXObject) { // IE
      try {
        http_request = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          http_request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          console.log(e);
        }
      }
    }

    if (!http_request) {
      alert('Falla :( No es posible crear una instancia XMLHTTP');
      return false;
    }
    http_request.onreadystatechange = function() {
      
        if (http_request.readyState == XMLHttpRequest.DONE) {
          if(http_request.status === 200) {
            callback.apply(context, [JSON.parse(http_request.responseText), droid]);
          } else {
            callbackError.apply(context, [droid]);
          }
        }
    };
    http_request.open('POST', url, true);
    http_request.send(JSON.stringify(data));
}