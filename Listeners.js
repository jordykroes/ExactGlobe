// Initialize default values
Cookie.setupCookies();

document.getElementById("inputPerLine").value = Cookie.getCookie(Cookie.jar[1]);
document.getElementById("inputPerGroup").value = Cookie.getCookie(Cookie.jar[2]);

// Text area listeners
document.getElementById("inputField").addEventListener("keydown", function (e) {
  // Allow usage of tab key by preventing default
  if (e.key == "Tab") {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;
    this.value =
      this.value.substring(0, start) + "\t" + this.value.substring(end);
    this.selectionStart = this.selectionEnd = start + 1;
  }
});

document.getElementById("inputField").addEventListener("keyup", function () {
  process();
});

// Config listeners
document.getElementById("inputTabs").addEventListener("change", function (e) {
  Cookie.setCookie(Cookie.jar[0], e.target.checked);
  process();
});

document.getElementById("inputPerLine").addEventListener("change", function (e) {
  if (!isNaN(Number.parseInt(e.target.value))) {
    Cookie.setCookie(Cookie.jar[1], e.target.value);
  }
  e.target.value = Cookie.getCookie(Cookie.jar[1]);
  process();
});

document.getElementById("inputPerGroup").addEventListener("change", function (e) {
  if (!isNaN(Number.parseInt(e.target.value))) {
    Cookie.setCookie(Cookie.jar[2], e.target.value);
  }
  e.target.value = Cookie.getCookie(Cookie.jar[2]);
  process();
});

// Button listeners
document.getElementById("swapButton").addEventListener("click", function () {
  document.getElementById("inputField").value = document.getElementById(
    "outputField"
  ).value;

  showToast("Output has been swapped to input");
})

document.getElementById("copyButton").addEventListener("click", function () {
  var transform = new Transformer(document.getElementById("inputField").value);
  transform.toClipboard();
  showToast('Copied text:<br>' + transform.getText().slice(0, 60));
})

// Functions
function showToast(text) {
  var toastElList = [].slice.call(document.querySelectorAll(".toast"));
  var toastText = document.getElementById("toast-text");
  toastText.innerHTML = text.slice(0, 59);

  var toastList = toastElList.map(function (toastEl) {
    // Creates an array of toasts (it only initializes them)
    return new bootstrap.Toast(toastEl); // No need for options; use the default options
  });
  toastList.forEach((toast) => toast.show());
}

function process() {
  var transform = new Transformer(document.getElementById("inputField").value);

  document.getElementById("infoLines").innerHTML = `Text lines: ${transform.getNewLines()}`;
  document.getElementById("infoCharacters").innerHTML = `Characters: ${transform.getCharacters()}`;

  if (document.getElementById("inputTabs").checked) {
    transform.applyTabsToSpaces(3);
  }

  
  transform.applyCRLF();
  transform.applyIndentTransform();

  transform.applyWrap(document.getElementById("inputPerLine").value);

  document.getElementById("outputField").value = transform.getText();

  createCopyButtons(transform);
}

function createCopyButtons(text) {
  var container = document.getElementById("buttonGroup");
  var size = Number.parseInt(Cookie.getCookie(Cookie.jar[2]));
  var lines = text.getNewLines();

  container.innerHTML = "";

  for (let i = 0; i < (Math.ceil(lines / size)); i++) {
    var node = document.createElement('div');
    node.classList.add("p-2")
    node.innerHTML = (i + 1);
    container.appendChild(node);
  }
}