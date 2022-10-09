function inputChange() {
    let senderElement = document.getElementById("id_sender")
    let errorElement = document.getElementById("error_text")
    if (senderElement == null) {
      return;
    }
    senderElement.style.backgroundColor = "white";
    if (errorElement == null) {
      return;
    }
    errorElement.style.cssText = "opacity: 0;";
  }
function checkedMyself(checked){
    let checkElement = document.getElementById("id_myself");
    let senderInput = document.getElementById("id_sender");
    if(checkElement == null || senderInput == null) {
        return;
    }
    if (checked) {
        checkElement.checked = true;
        senderInput.disabled = false;
        senderInput.required = true;
    } else {
        checkElement.checked = false;
        senderInput.disabled = true;
        senderInput.required = false;
        senderInput.style.cssText = "background-color:#CCCCCC;cursor:not-allowed;";
  }
  }
function addCheckedEvent(isError) {
    let checkElement = document.getElementById("id_myself");
    let senderInput = document.getElementById("id_sender");
    if(checkElement == null || senderInput == null) {
        return;
    }
    checkElement.addEventListener('change', () => {
    if (checkElement.checked) {
      senderInput.disabled = false;
      senderInput.required = true;
      senderInput.style.cssText = "background-color:white;";
    } else {
      senderInput.disabled = true;
      senderInput.value = '';
      senderInput.required = false;
      senderInput.style.cssText = "background-color:#CCCCCC;cursor:not-allowed;";
      if(isError) {
        let errorText = document.getElementById("error_text")
        errorText.style.cssText = "opacity: 0;";
      }
    }
  });
}