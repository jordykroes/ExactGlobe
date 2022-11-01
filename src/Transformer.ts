class Transformer {
  constructor(inputText: string) {
    this.inputText = inputText;
  }

  inputText: string;

  applyWrap(length: number) {
    this.inputText = Transformer.wrapParagraph(this.inputText, length);
  }

  static wrapParagraph(text: string, maxlength: number) {
    const paragraphs = text.replace(/(\r\n|\n|\r)/g, "\n").split("\n");
    const wrappedParagraphs = [];
    paragraphs.forEach((e: string) => {
      wrappedParagraphs.push(Transformer.wrapLine(e, maxlength));
    });

    return wrappedParagraphs.join("\r\n");
  }

  static wrapLine(text: string, maxLength: number) {
    if (text.length > maxLength) {
      const edge = text.slice(0, maxLength).lastIndexOf(" ");

      // Will be -1 if space can't be found inside maximum length
      if (edge === -1) {
        const extendedEdge = text.indexOf(" ", maxLength);
        // No more spaces beyond extended edge
        if (extendedEdge === -1) {
          return text;
        }
        return (
          text.slice(0, extendedEdge) +
          "\n" +
          Transformer.wrapLine(text.slice(extendedEdge + 1), maxLength)
        );
      } else {
        return (
          text.slice(0, edge) +
          "\n" +
          Transformer.wrapLine(text.slice(edge + 1), maxLength)
        );
      }
    }

    return text;
  }

  getCharacterLength(text: string): number {
    return [...text].length;
  }

  applyTabsToSpaces(repetition: number) {
    this.inputText = this.inputText.replace(/\t/gm, " ".repeat(repetition));
  }

  applyIndentTransform() {
    this.inputText = this.inputText.replace(/\uF0E0/gm, " > ");
    this.inputText = this.inputText.replace(/\uF02D/gm, " > ");
  }

  applyCRLF() {
    this.inputText = this.inputText.replace(/(\n|\r)/gm, "\r\n");
  }

  setText(inputText: string) {
    this.inputText = inputText;
  }

  getText() {
    return this.inputText;
  }

  getEscapedText() {
    return this.inputText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  getNewLines() {
    return this.inputText === "" ? 0 : this.inputText.split("\n").length;
  }

  getCharacters() {
    return (
      this.inputText.length -
      (this.getNewLines() < 1 ? 0 : this.getNewLines() - 1)
    );
  }

  getSlice(index: number, linesPerSlice: number) {
    return this.inputText
      .split("\n")
      .slice(index * linesPerSlice, (index + 1) * linesPerSlice)
      .join("\r\n");
  }

  toClipboard() {
    navigator.clipboard.writeText(this.inputText);
  }
}
