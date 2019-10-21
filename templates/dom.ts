import dijitTitlePane = require("dijit/TitlePane");
import dijitAccordionContainer = require("dijit/layout/AccordionContainer");
import dijitContentPane = require("dijit/layout/ContentPane");
import dijitTabContainer = require("dijit/layout/TabContainer");
import dijitComboBox = require("dijit/form/ComboBox");

export interface Dictionary<T> {
  [index: string]: T;
}

type Args = Dictionary<string|Dictionary<string>>;

export type ContentPaneFactory = (args: Args) => { setContent: Function; addChild: Function };

export function dom(
  tag: string | ContentPaneFactory,
  args?: Args,
  ...children: [HTMLElement | string | dijit.layout.ContentPane][]
) {
  if (typeof tag === "string") {
    let element = document.createElement(tag);
    if (args) {
      Object.keys(args).forEach(key => {
        let value = args[key];
        if (key === "class") key = "className";
        element.setAttribute(key, value+"");
      });
    }
    if (children) {
      children.forEach(c => {
        if (typeof c === "string") {
          element.appendChild(document.createTextNode(c));
        } else if (c instanceof HTMLElement) {
          element.appendChild(c);
        } else if (c instanceof dijit._WidgetBase) {
          element.appendChild(c.domNode);
        } else {
          throw "unkown child";
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

export function TitlePane(args: Args) {
  return new dijitTitlePane(args || {});
}

export function AccordionContainer(args: Args) {
  return new dijitAccordionContainer(args || {});
}

export function ContentPane(args: Args) {
  return new dijitContentPane(args || {});
}

export function TabContainer(args: Args) {
  return new dijitTabContainer(args || {});
}

export function ComboBox(args: Args) {
  return new dijitComboBox(args || {});
}