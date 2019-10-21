export interface Dictionary<T> {
  [index: string]: T;
}

export type ContentPaneFactory = (args: Dictionary<string>) => {setContent: Function; addChild: Function};

export function dom(tag: string | ContentPaneFactory, args?: Dictionary<string>, ...children: HTMLElement[]) {
  if (typeof tag === "string") {
    let element = document.createElement(tag);
    if (args) {
      Object.keys(args).forEach(key => {
        let value = args[key];
        if (key === "class") key = "className";
        element.setAttribute(key, value);
      });
    }
    if (children) {
      children.forEach(c => {
        if (typeof c === "string") {
          element.appendChild(document.createTextNode(c));
        } else if (c instanceof HTMLElement) {
          element.appendChild(c);
        } else {
          element.appendChild(c.domNode);
        }
      });
    }
    return element;
  }

  {
    let element = tag(args);
    if (children) {
      children.forEach(c => {
        if (typeof c === "string" || c instanceof HTMLElement) {
          element.setContent(c);
        } else {
          element.addChild(c);
        }
      });
    }
    return element;
  }
}
