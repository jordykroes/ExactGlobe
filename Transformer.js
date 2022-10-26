class Transformer {
    constructor(inputText) {
        this.inputText = inputText;
    }

    applyWrap(length) {
        this.inputText = this.inputText.replace(new RegExp(`(?![^\\n]{1,${length}}$)([^\\n]{1,${length}})\\s`, "g"), "$1\n")
    }

    applyTabsToSpaces(repetition) {
        this.inputText = this.inputText.replace(/\t/gm, " ".repeat(repetition));
    }

    applyIndentTransform() {
        this.inputText = this.inputText.replace(/\uF02D/gm, "   > ");
    }

    applyCRLF() {
        this.inputText = this.inputText.replace(/(\n|\r)/gm, "\r\n");
    }

    setText(inputText) {
        this.inputText = inputText;
    }

    getText() {
        return this.inputText;
    }

    getEscapedText() {
        return this.inputText.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;");        
    }

    getNewLines() {
        return this.inputText.split("\n").length;
    }

    getCharacters() {
        return this.inputText.length - ((this.getNewLines() < 1) ? 0 : this.getNewLines() - 1);
    }

    getSlice(index, linesPerSlice) {
        return this.inputText.split('\r\n').slice(index * linesPerSlice, (index + 1) * rlinesPerSlice).join('\r\n');
    }

    toClipboard()
    {
        navigator.clipboard.writeText(this.inputTex);
    }
}