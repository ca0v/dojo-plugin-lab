define("app/plugin", ["require", "exports"], function (require, exports) {
    "use strict";
    var plugin = {
        load: function (param, req, loadCallback) {
            loadCallback && loadCallback({ content: param });
        }
    };
    return plugin;
});
define("app/test-plugin", ["require", "exports", "app/plugin!echo", "app/plugin"], function (require, exports, plugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function run() {
        console.log("test-plugin", plugin.content);
    }
    exports.run = run;
});
define("templates/dom", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function dom(tag, args) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        if (typeof tag === "string") {
            var element_1 = document.createElement(tag);
            if (args) {
                Object.keys(args).forEach(function (key) {
                    var value = args[key];
                    if (key === "class")
                        key = "className";
                    element_1.setAttribute(key, value);
                });
            }
            if (children) {
                children.forEach(function (c) {
                    if (typeof c === "string") {
                        element_1.appendChild(document.createTextNode(c));
                    }
                    else if (c instanceof HTMLElement) {
                        element_1.appendChild(c);
                    }
                    else {
                        element_1.appendChild(c.domNode);
                    }
                });
            }
            return element_1;
        }
        {
            var element_2 = tag(args);
            if (children) {
                children.forEach(function (c) {
                    if (typeof c === "string" || c instanceof HTMLElement) {
                        element_2.setContent(c);
                    }
                    else {
                        element_2.addChild(c);
                    }
                });
            }
            return element_2;
        }
    }
    exports.dom = dom;
});
define("templates/template1", ["require", "exports", "templates/dom", "dijit/TitlePane", "dijit/layout/AccordionContainer", "dijit/layout/ContentPane", "dijit/layout/TabContainer"], function (require, exports, dom_1, dijitTitlePane, dijitAccordionContainer, dijitContentPane, dijitTabContainer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function TitlePane(args) {
        var v = new dijitTitlePane(args);
        return v;
    }
    function AccordionContainer(args) {
        var v = new dijitAccordionContainer(args);
        return v;
    }
    function ContentPane(args) {
        var cp = new dijitContentPane(args || {});
        return cp;
    }
    function TabContainer(args) {
        var cp = new dijitTabContainer(args);
        return cp;
    }
    exports.helloWorld = dom_1.dom("div", { id: "id" }, "Hello World");
    exports.contentPane = dom_1.dom(ContentPane, null,
        dom_1.dom("div", { id: "id" }, "Hello World"));
    exports.tabContainer = dom_1.dom(TabContainer, { style: "height: 100%; width: 100%;" },
        dom_1.dom(ContentPane, { title: "Tab1", selected: "true" },
            dom_1.dom("div", null, "Hello World")),
        dom_1.dom(ContentPane, { title: "Tab2" },
            dom_1.dom("div", null, "Hello World")),
        dom_1.dom(ContentPane, { title: "Tab3" },
            dom_1.dom(TabContainer, { style: "height: 100%; width: 100%;" },
                dom_1.dom(ContentPane, { title: "Tab1", selected: "true" },
                    dom_1.dom("div", null, "Hello World")),
                dom_1.dom(ContentPane, { title: "Tab2" },
                    dom_1.dom("div", null, "Hello World")),
                dom_1.dom(ContentPane, { title: "Tab3", closable: "true" },
                    dom_1.dom("div", null, "Hello World")))));
    exports.accordionContainer = dom_1.dom(AccordionContainer, { style: "height:300px" },
        dom_1.dom(ContentPane, { title: "Tab1", selected: "true" },
            dom_1.dom("div", null, "Hello World")),
        dom_1.dom(ContentPane, { title: "Tab2" },
            dom_1.dom(TabContainer, { style: "height: 100%; width: 100%;", tabPosition: "right" },
                dom_1.dom(ContentPane, { title: "Tab1", selected: "true" },
                    dom_1.dom("div", null, "Hello World")),
                dom_1.dom(ContentPane, { title: "Tab2" },
                    dom_1.dom("div", null, "Hello World")),
                dom_1.dom(ContentPane, { title: "Tab3", closable: "true" },
                    dom_1.dom("div", null, "Hello World")))),
        dom_1.dom(ContentPane, { title: "Tab3" },
            dom_1.dom(TabContainer, { style: "height: 100%; width: 100%;", tabPosition: "bottom" },
                dom_1.dom(ContentPane, { title: "Tab1", selected: "true" },
                    dom_1.dom("div", null, "Hello World")),
                dom_1.dom(ContentPane, { title: "Tab2" },
                    dom_1.dom("div", null, "Hello World")),
                dom_1.dom(ContentPane, { title: "Tab3", closable: "true" },
                    dom_1.dom("div", null, "Hello World")))));
    exports.programmatic = function () {
        var tc = TabContainer({
            style: "height: 100%; width: 100%;"
        });
        var cp1 = ContentPane({
            title: "Tab1",
        });
        cp1.domNode.appendChild(dom_1.dom("div", null, "Hello World"));
        tc.addChild(cp1);
        var cp2 = ContentPane({
            title: "Tab2",
        });
        cp2.domNode.appendChild(dom_1.dom("div", null, "Hello World"));
        tc.addChild(cp2);
        return tc.domNode;
    };
});
define("app/index", ["require", "exports", "dijit/registry", "app/test-plugin", "templates/template1", "dojo/domReady!"], function (require, exports, registry, test, template1_1) {
    "use strict";
    function run() {
        test.run();
        var tabs = template1_1.accordionContainer.domNode;
        document.body.appendChild(tabs);
        registry.byNode(tabs).startup();
    }
    return run;
});
define("index", ["require", "exports", "app/index"], function (require, exports, app) {
    "use strict";
    return app;
});
//# sourceMappingURL=index.js.map