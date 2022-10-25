const defaultChunk = 80;
const defaultGroupChunk = 5;

const cookie = (e) => {
   document.split('; ')
  .find((row) => row.startsWith(`${e};`))
};

function initialize() {
  document.cookie = `defaultChunk=${defaultChunk}`;  
  document.cookie = `defaultGroupChunk=${defaultGroupChunk}`;
  
  console.log(document.cookie);
}

initialize();

document.getElementById("input").addEventListener("keydown", function (e) {
  // Allow usage of tab key by preventing default
  if (e.key == "Tab") {
    e.preventDefault();

    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value =
      this.value.substring(0, start) + "\t" + this.value.substring(end);

    // put caret at right position again
    this.selectionStart = this.selectionEnd = start + 1;
  }
});

document.getElementById("input").addEventListener("keyup", function (e) {
  process(e);
});

function cleanText(text) {
  // Change new line character to Exact format.
  text = text.replace(/(\n|\r)/gm, "\r\n");
  // Adjust special character (list item) to arrow character.
  text = text.replace(/\uF02D/gm, "   > ");

  // Replace tabs to three spaces
  if (isTabConversion()) {
    text = text.replace(/\t/gm, " ".repeat(3));
  }

  // Create chunks of n-size based on smart regex
  const wrap = (s, w) => s.replace(
    new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n'
  );
  
  text = wrap(text, getCharactersPerLine());

  return text;
}

function process(event) {
  var output = document.getElementById("output");
  var text = cleanText(event.srcElement.value);
  
  output.value = text;
  addGroupButtons(text);
  updateLines();
}

function toClipboard(event) {
  var output = document.getElementById("output");
  var text = cleanText(output.value);
  navigator.clipboard.writeText(text);
  showToast(text);
}

function updateLines() {
  var output = document.getElementById("output");
  var information = document.getElementById("lines");
  var char = document.getElementById("char");

  var lines = output.value.split("\n").length;
  var characters = 0;
  
  if (lines == 1) {
    characters = output.value.length;
  } else {
    characters = output.value.length - (lines - 1);
  }

  information.innerText = "Text lines: " + lines;
  char.innerText = "Characters: " + characters;
}

function getCharactersPerLine() {
  var chunkSize = document.getElementById("inputPerLine")
  
  if (!isNaN(parseInt(chunkSize.value))) {
    return chunkSize.value;
  } else {
    chunkSize.value = defaultChunk;
    return defaultChunk;
  }
}

function getLinesPerGroup() {
var chunkSize = document.getElementById("inputPerGroup")
  
  if (!isNaN(parseInt(chunkSize.value))) {
    return chunkSize.value;
  } else {
    chunkSize.value = defaultGroupChunk;
    return defaultGroupChunk;
  }
}

function isTabConversion() {
  if (document.getElementById("inputTabs").checked == true) {
    return true;
  } else {
    return false;
  }
}

function swap(event) {
  document.getElementById("input").value = document.getElementById("output").value;
}

function addGroupButtons(text) {
  var container = document.getElementById("buttonGroup");
  container.innerHTML = "<h5>Copy in parts</h5>"
  
  if (text == "") {
    return;
  }
  
  var output = document.getElementById("output");
  var groupSize = getLinesPerGroup();
  var lines = output.value.split("\n").length;
  
  for (let i = 0; i < Math.ceil(lines / groupSize); i++) {
      var button = document.createElement("button")
      button.className = "btn btn-secondary";
      button.innerHTML = i + 1;
      button.setAttribute('sliceIndex', i);
      
      container.appendChild(button);
  }
}

function showToast(text) {
   var toastElList = [].slice.call(document.querySelectorAll('.toast'));
   var toastText = document.getElementById("toast-text");
   toastText.innerHTML = text.slice(0, 59) + "..."; 

   var toastList = toastElList.map(function(toastEl) {
   // Creates an array of toasts (it only initializes them)
      return new bootstrap.Toast(toastEl) // No need for options; use the default options
   });
   toastList.forEach(toast => toast.show()); // This show them
}