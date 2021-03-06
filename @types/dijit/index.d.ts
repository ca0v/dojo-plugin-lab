// Type definitions for Dojo v1.9
// Project: http://dojotoolkit.org
// Definitions by: Michael Van Sickle <https://github.com/vansimke>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="../dojo" />

declare module dijit {

  class _WidgetBase {
    domNode: HTMLElement;
    constructor(args: any);
    addChild(c: _WidgetBase): void;
    startup(): void;
  }

module layout {
    
    class ContentPane extends _WidgetBase {
      constructor(args: any);
    }
  }
}

declare module "dijit/_WidgetBase" {
  var exp: typeof dijit._WidgetBase;
  export = exp;
}

declare module "dijit/layout/ContentPane" {
  var exp: typeof dijit.layout.ContentPane;
  export = exp;
}

declare module "dijit/layout/AccordionContainer" {
  var exp: typeof dijit.layout.ContentPane;
  export = exp;
}

declare module "dijit/form/ComboBox" {
  var exp: typeof dijit._WidgetBase;
  export = exp;
}

declare module "dijit/layout/TabContainer" {
  var exp: typeof dijit.layout.ContentPane;
  export = exp;
}

declare module "dijit/TitlePane" {
  var exp: typeof dijit.layout.ContentPane;
  export = exp;
}

declare module "dijit/registry" {
  export function byNode(node: HTMLElement): dijit._WidgetBase;
}
