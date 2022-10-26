Cookie.setupCookies();

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
  process();
});

document.getElementById("inputPerLine").addEventListener("change", function (e) {
  if (isNaN(e.target.value)) {
    Cookie.setCookie(Cookie.jar[0], (e.target).value);
  }
  e.target.value = Cookie.getCookie(Cookie.jar[0]);
  process();
});

document.getElementById("inputPerGroup").addEventListener("change", function (e) {
  if (isNaN(e.target.value)) {
    Cookie.setCookie(Cookie.jar[1], e.target.value);
  }
  e.target.value = Cookie.getCookie(Cookie.jar[1]);
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
  toastText.innerHTML = text.slice(0, 59) + "...";

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

  document.getElementById("outputField").value = transform.getText();
}