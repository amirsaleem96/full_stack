/**
  * method for debugging purpose, this shows alert/console with the message
  * @param {string} message message to be shown
  * @param {string} type the way to display message (console or alert)
*/
function debug(message, type){

  if(type == 'alert') {
    alert(message);
  } else if (type == 'console') {
    console.log(message);
  }

}
