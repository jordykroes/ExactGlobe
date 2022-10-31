const IsNumerical = /^[0-9]+$/;
function Initialize() {
    Cookie.setupCookies();
    let node = document.getElementById("settingTabs");
    node.checked = Cookie.getCookie(BrowserCookies.ConvertTabs) === 'true';
    node = document.getElementById("settingWrap");
    node.value = Cookie.getCookie(BrowserCookies.WrapLength);
    node = document.getElementById("settingGroup");
    node.value = Cookie.getCookie(BrowserCookies.SliceLength);
}
Initialize();
document.getElementById("inputField").addEventListener("keydown", function (e) {
    // Allow usage of tab key by preventing default
    if (e.key == "Tab") {
        e.preventDefault();
        const node = this;
        const start = node.selectionStart;
        const end = node.selectionEnd;
        node.value = node.value.substring(0, start) + "\t" + node.value.substring(end);
        node.selectionStart = node.selectionEnd = start + 1;
    }
});
document.getElementById("inputField").addEventListener("keyup", () => {
    process();
});
document.getElementById("settingTabs").addEventListener("change", (e) => {
    const node = e.target;
    Cookie.setCookie(BrowserCookies.ConvertTabs, String(node.checked));
    process();
});
document.getElementById("settingWrap").addEventListener("change", (e) => {
    const node = e.target;
    if (IsNumerical.test(node.value)) {
        Cookie.setCookie(BrowserCookies.WrapLength, node.value);
    }
    node.value = Cookie.getCookie(BrowserCookies.WrapLength);
    process();
});
document.getElementById("settingGroup").addEventListener("change", (e) => {
    const node = e.target;
    if (IsNumerical.test(node.value)) {
        Cookie.setCookie(BrowserCookies.SliceLength, node.value);
    }
    node.value = Cookie.getCookie(BrowserCookies.SliceLength);
    process();
});
document.getElementById("swapButton").addEventListener("click", () => {
    const inputNode = document.getElementById("inputField");
    const outputNode = document.getElementById("outputField");
    inputNode.value = outputNode.value;
});
document.getElementById("copyButton").addEventListener("click", () => {
    const inputNode = document.getElementById("inputField");
    const transform = new Transformer(inputNode.value);
    transform.toClipboard();
});
document.getElementById("buttonGroup").addEventListener("click", (e) => {
    const node = e.target;
    if (node.className === "copyButton") {
        const index = Number.parseInt(node.innerHTML);
        const row = Number.parseInt(Cookie.getCookie(BrowserCookies.SliceLength));
        const outputNode = document.getElementById("outputField");
        var transform = new Transformer(outputNode.value);
        var partialText = transform.getSlice(index - 1, row);
        navigator.clipboard.writeText(partialText);
    }
});
function process() {
    const inputNode = document.getElementById("inputField");
    const transform = new Transformer(inputNode.value);
    document.getElementById("infoLines").innerHTML = `Text lines: ${transform.getNewLines()}`;
    document.getElementById("infoCharacters").innerHTML = `Characters: ${transform.getCharacters()}`;
    if (document.getElementById("settingTabs").checked) {
        transform.applyTabsToSpaces(3);
    }
    transform.applyCRLF();
    transform.applyIndentTransform();
    const settingNode = document.getElementById("settingWrap");
    transform.applyWrap(Number.parseInt(settingNode.value));
    const outputNode = document.getElementById("outputField");
    outputNode.value = transform.getText();
    createCopyButtons(transform);
}
function createCopyButtons(text) {
    var container = document.getElementById("buttonGroup");
    var size = Number.parseInt(Cookie.getCookie(BrowserCookies.SliceLength));
    var lines = text.getNewLines();
    container.innerHTML = "";
    for (let i = 0; i < (Math.ceil(lines / size)); i++) {
        var node = document.createElement('div');
        node.classList.add('copyButton');
        node.innerHTML = String(i + 1);
        container.appendChild(node);
    }
}
