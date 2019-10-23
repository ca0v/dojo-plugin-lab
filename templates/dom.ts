/**
 * tsx-compatible template reader for dijit 1.x
 * facilitates creating dijits via jsx syntax
 * switching to a different component library would require implementing
 * a compatible reader for different controls (the template would/could remain untouched)
 */
import registry = require("dijit/registry");
import dijitTitlePane = require("dijit/TitlePane");
import dijitAccordionContainer = require("dijit/layout/AccordionContainer");
import dijitContentPane = require("dijit/layout/ContentPane");
import dijitTabContainer = require("dijit/layout/TabContainer");
import dijitComboBox = require("dijit/form/ComboBox");

export interface Dictionary<T> {
  [index: string]: T;
}

const rules: Dictionary<(v: any) => string> = {
  style: asStyle,
};

type Args = Dictionary<string | Function | Dictionary<string>>;
type ChildTypes = HTMLElement | string | dijit._WidgetBase;
type ChildrenCollection = [ChildTypes | Array<ChildTypes>][];

export type WidgetFactory = (args: Args) => { setContent: Function; addChild: Function };

/**
 * This is a react.CreateElement implementation
 * import dom as the value in the tsconfig.json "jsxFactory"
 * @param tag
 * @param args
 * @param children
 */
export function dom(tag: string | WidgetFactory, args?: Args, ...children: ChildrenCollection) {
  if (typeof tag === "string") {
    let element = document.createElement(tag);
    if (args) {
      Object.keys(args).forEach(key => {
        let value = rules[key] ? rules[key](args[key]) : args[key];
        if (typeof value === "string") {
          //if (key === "class") key = "className";
          element.setAttribute(key, value);
        } else if (value instanceof Function) {
          element.addEventListener(<any>key, <any>value);
        } else {
          element.setAttribute(key, value + "");
        }
      });
    }

    let addChildren = (children: ChildrenCollection) => {
      children &&
        children.forEach(c => {
          if (typeof c === "string") {
            element.appendChild(document.createTextNode(c));
          } else if (c instanceof HTMLElement) {
            element.appendChild(c);
          } else if (c instanceof dijit._WidgetBase) {
            element.appendChild(c.domNode);
          } else if (c instanceof Array) {
            addChildren(<ChildrenCollection>(<unknown>c));
          } else {
            console.log("addChildren cannot add to dom node", c);
          }
        });
    };

    children && addChildren(children);

    return element;
  }

  {
    let element = tag(args);

    let addChildren = (children: ChildrenCollection) => {
      children &&
        children.forEach(c => {
          if (typeof c === "string" || c instanceof HTMLElement) {
            element.setContent(c);
          } else if (c instanceof Array) {
            addChildren(<ChildrenCollection>(<unknown>c));
          } else if (typeof c === "object") {
            element.addChild(c);
          } else {
            console.log("addChildren cannot add to widget", c);
          }
        });
    };

    children && addChildren(children);
    return element;
  }
}

export function getWidget(container: HTMLElement, selector?: string) {
  if (selector) container = container.querySelector(selector);
  if (!container) return null;
  return registry.byNode(container);
}

export function byNode<T extends dijit._WidgetBase>(node: HTMLElement) {
  return registry.byNode(node) as T;
}

/**
 * @param args TODO: strongly type before attempting to port to another control library
 */
export function TitlePane(args: Args) {
  return new dijitTitlePane(args || {});
}

/**
 * @param args TODO: strongly type before attempting to port to another control library
 */
export function AccordionContainer(args: Args) {
  return new dijitAccordionContainer(args || {});
}

/**
 * @param args TODO: strongly type before attempting to port to another control library
 */
export function ContentPane(args: Args) {
  return new dijitContentPane(args || {});
}

export function TabContainer(args: Args) {
  return new dijitTabContainer(args || {});
}

// more specific typings to  account for `store` being an object
export function ComboBox(args: {
  id?: string;
  value?: string;
  name: string;
  searchAttr?: string;
  store: any;
  onChange?: Function;
}) {
  return new dijitComboBox(args || {});
}

function asStyle(o: any) {
  if (typeof o === "string") return 0;
  return Object.keys(o)
    .map(k => `${k}:${o[k]}`)
    .join(";");
}
