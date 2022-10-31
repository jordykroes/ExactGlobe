class Transformer {
    constructor(inputText : string) {
        this.inputText = inputText;
    }

    inputText : string;

    applyWrap(length : number) {
        // TODO
        this.inputText = Transformer.wrap(this.inputText, length);
    }

    static wrap (text : string, limit : number) {
        if (text.length > limit) {
          // find the last space within limit
          var edge = text.slice(0, limit).lastIndexOf(' ');
          if (edge > 0) {
            var line = text.slice(0, edge);
            var remainder = text.slice(edge + 1);
            return line + '\n' + Transformer.wrap(remainder, limit);
          }
        }
        return text;
      }

    getCharacterLength(text : string) : number {
        return [...text].length;
    }

    applyTabsToSpaces(repetition : number) {
        this.inputText = this.inputText.replace(/\t/gm, " ".repeat(repetition));
    }

    applyIndentTransform() {
        this.inputText = this.inputText.replace(/\uF0E0/gm, " > ");
        this.inputText = this.inputText.replace(/\uF02D/gm, " > ");
    }

    applyCRLF() {
        this.inputText = this.inputText.replace(/(\n|\r)/gm, "\r\n");
    }

    setText(inputText : string) {
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
        return this.inputText === "" ? 0 : this.inputText.split("\n").length;
    }

    getCharacters() {
        return this.inputText.length - ((this.getNewLines() < 1) ? 0 : this.getNewLines() - 1);
    }

    getSlice(index : number, linesPerSlice : number) {
        return this.inputText.split('\n').slice(index * linesPerSlice, (index + 1) * linesPerSlice).join('\r\n');
    }

    toClipboard()
    {
        navigator.clipboard.writeText(this.inputText);
    }
}