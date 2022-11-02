const NUMERICAL = /^[0-9]+$/;

(function initialize() {
  Cookie.setupCookies();

  let node: HTMLInputElement = <HTMLInputElement>(
    document.getElementById('settingTabs')
  );
  node.checked = Cookie.getCookie(BrowserCookies.ConvertTabs) === 'true';

  node = <HTMLInputElement>document.getElementById('settingWrap');
  node.value = Cookie.getCookie(BrowserCookies.WrapLength);

  node = <HTMLInputElement>document.getElementById('settingGroup');
  node.value = Cookie.getCookie(BrowserCookies.SliceLength);
  
  document.getElementById('inputField').addEventListener('keydown', function (e) {
    // Allow usage of tab key by preventing default
    if (e.key == 'Tab') {
      e.preventDefault();

      const node = <HTMLInputElement>this;
      const start = node.selectionStart;
      const end = node.selectionEnd;

      node.value =
        node.value.substring(0, start) + '\t' + node.value.substring(end);
      node.selectionStart = node.selectionEnd = start + 1;
    }
  });

  document.getElementById('inputField').addEventListener('keyup', () => {
    process();
  });

  document.getElementById('settingTabs').addEventListener('change', (e) => {
    const node = <HTMLInputElement>e.target;

    Cookie.setCookie(BrowserCookies.ConvertTabs, String(node.checked));
    process();
  });

  document.getElementById('settingWrap').addEventListener('change', (e) => {
    const node = <HTMLInputElement>e.target;

    if (NUMERICAL.test(node.value)) {
      Cookie.setCookie(BrowserCookies.WrapLength, node.value);
    }
    node.value = Cookie.getCookie(BrowserCookies.WrapLength);
    process();
  });

  document.getElementById('settingGroup').addEventListener('change', (e) => {
    const node = <HTMLInputElement>e.target;

    if (NUMERICAL.test(node.value)) {
      Cookie.setCookie(BrowserCookies.SliceLength, node.value);
    }
    node.value = Cookie.getCookie(BrowserCookies.SliceLength);
    process();
  });

  document.getElementById('swapButton').addEventListener('click', () => {
    const inputNode: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('inputField')
    );
    const outputNode: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('outputField')
    );
    inputNode.value = outputNode.value;
  });

  document.getElementById('copyButton').addEventListener('click', () => {
    const inputNode: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('inputField')
    );
    const transform = new Transformer(inputNode.value);
    transform.toClipboard();
  });

  document.getElementById('buttonGroup').addEventListener('click', (e) => {
    const node = <HTMLElement>e.target;

    if (node.className === 'copyButton') {
      navigator.clipboard.writeText(getSlicedText(node));
    }
  });

  process();
})();

function process() {
  const inputNode: HTMLInputElement = <HTMLInputElement>(
    document.getElementById('inputField')
  );
  const transform = new Transformer(inputNode.value);

  document.getElementById(
    'infoLines'
  ).innerHTML = `Text lines: ${transform.getNewLines()}`;
  document.getElementById(
    'infoCharacters'
  ).innerHTML = `Characters: ${transform.getCharacters()}`;

  if ((<HTMLInputElement>document.getElementById('settingTabs')).checked) {
    transform.applyTabsToSpaces(3);
  }

  transform.applyCRLF();
  transform.applyIndentTransform();

  const settingNode = <HTMLInputElement>document.getElementById('settingWrap');
  transform.applyWrap(Number.parseInt(settingNode.value));

  const outputNode = <HTMLInputElement>document.getElementById('outputField');
  outputNode.value = transform.getText();

  createSliceButtons(transform);
}

function createSliceButtons(text) {
  const container = document.getElementById('buttonGroup');
  const size = Number.parseInt(Cookie.getCookie(BrowserCookies.SliceLength));
  const lines = text.getNewLines();

  container.innerHTML = '';

  for (let i = 0; i < Math.ceil(lines / size); i++) {
    const node = document.createElement('div');
    node.classList.add('copyButton');
    node.innerHTML = String(i + 1);
    node.setAttribute('slice', String(i + 1));

    const tooltip = document.createElement('span');
    tooltip.className = 'copyTooltip';
    tooltip.innerHTML = getSlicedText(node).replace(/(\r\n|\n|\r)/g, "<br>");

    node.appendChild(tooltip);
    container.appendChild(node);
  }
}

function getSlicedText(node : HTMLElement) {
  const index = Number.parseInt(node.getAttribute('slice'));
  const row = Number.parseInt(Cookie.getCookie(BrowserCookies.SliceLength));
  const outputNode = <HTMLInputElement>document.getElementById('outputField');
  const transform = new Transformer(outputNode.value);
  return transform.getSlice(index - 1, row);
}
