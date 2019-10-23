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
define("templates/dom", ["require", "exports", "dijit/registry", "dijit/TitlePane", "dijit/layout/AccordionContainer", "dijit/layout/ContentPane", "dijit/layout/TabContainer", "dijit/form/ComboBox"], function (require, exports, registry, dijitTitlePane, dijitAccordionContainer, dijitContentPane, dijitTabContainer, dijitComboBox) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var rules = {
        style: asStyle,
    };
    function dom(tag, args) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        if (typeof tag === "string") {
            var element_1 = document.createElement(tag);
            if (args) {
                Object.keys(args).forEach(function (key) {
                    var value = rules[key] ? rules[key](args[key]) : args[key];
                    if (typeof value === "string") {
                        element_1.setAttribute(key, value);
                    }
                    else if (value instanceof Function) {
                        element_1.addEventListener(key, value);
                    }
                    else {
                        element_1.setAttribute(key, value + "");
                    }
                });
            }
            var addChildren_1 = function (children) {
                children &&
                    children.forEach(function (c) {
                        if (typeof c === "string") {
                            element_1.appendChild(document.createTextNode(c));
                        }
                        else if (c instanceof HTMLElement) {
                            element_1.appendChild(c);
                        }
                        else if (c instanceof dijit._WidgetBase) {
                            element_1.appendChild(c.domNode);
                        }
                        else if (c instanceof Array) {
                            addChildren_1(c);
                        }
                        else {
                            console.log("addChildren cannot add to dom node", c);
                        }
                    });
            };
            children && addChildren_1(children);
            return element_1;
        }
        {
            var element_2 = tag(args);
            var addChildren_2 = function (children) {
                children &&
                    children.forEach(function (c) {
                        if (typeof c === "string" || c instanceof HTMLElement) {
                            element_2.setContent(c);
                        }
                        else if (c instanceof Array) {
                            addChildren_2(c);
                        }
                        else if (typeof c === "object") {
                            element_2.addChild(c);
                        }
                        else {
                            console.log("addChildren cannot add to widget", c);
                        }
                    });
            };
            children && addChildren_2(children);
            return element_2;
        }
    }
    exports.dom = dom;
    function getWidget(container, selector) {
        if (selector)
            container = container.querySelector(selector);
        if (!container)
            return null;
        return registry.byNode(container);
    }
    exports.getWidget = getWidget;
    function byNode(node) {
        return registry.byNode(node);
    }
    exports.byNode = byNode;
    function TitlePane(args) {
        return new dijitTitlePane(args || {});
    }
    exports.TitlePane = TitlePane;
    function AccordionContainer(args) {
        return new dijitAccordionContainer(args || {});
    }
    exports.AccordionContainer = AccordionContainer;
    function ContentPane(args) {
        return new dijitContentPane(args || {});
    }
    exports.ContentPane = ContentPane;
    function TabContainer(args) {
        return new dijitTabContainer(args || {});
    }
    exports.TabContainer = TabContainer;
    function ComboBox(args) {
        return new dijitComboBox(args || {});
    }
    exports.ComboBox = ComboBox;
    function asStyle(o) {
        if (typeof o === "string")
            return 0;
        return Object.keys(o)
            .map(function (k) { return k + ":" + o[k]; })
            .join(";");
    }
});
define("templates/template1", ["require", "exports", "templates/dom"], function (require, exports, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.helloWorld = dom_1.dom("div", { id: "id" }, "Hello World");
    exports.contentPane = dom_1.dom(dom_1.ContentPane, null,
        dom_1.dom("div", { id: "id" }, "Hello World"));
    exports.tabContainer = dom_1.dom(dom_1.TabContainer, { style: "height: 100%; width: 100%;" },
        dom_1.dom(dom_1.ContentPane, { title: "Tab1", selected: "true" },
            dom_1.dom("div", null, "Hello World")),
        dom_1.dom(dom_1.ContentPane, { title: "Tab2" },
            dom_1.dom("div", null, "Hello World")),
        dom_1.dom(dom_1.ContentPane, { title: "Tab3" },
            dom_1.dom(dom_1.TabContainer, { style: "height: 100%; width: 100%;" },
                dom_1.dom(dom_1.ContentPane, { title: "Tab1", selected: "true" },
                    dom_1.dom("div", null, "Hello World")),
                dom_1.dom(dom_1.ContentPane, { title: "Tab2" },
                    dom_1.dom("div", null, "Hello World")),
                dom_1.dom(dom_1.ContentPane, { title: "Tab3", closable: "true" },
                    dom_1.dom("div", null, "Hello World")))));
    exports.accordionContainer = dom_1.dom(dom_1.AccordionContainer, { style: "height:300px" },
        dom_1.dom(dom_1.ContentPane, { title: "Tab1", selected: "true" },
            dom_1.dom("div", null, "Hello World")),
        dom_1.dom(dom_1.ContentPane, { title: "Tab2" },
            dom_1.dom(dom_1.TabContainer, { style: "height: 100%; width: 100%;", tabPosition: "right" },
                dom_1.dom(dom_1.ContentPane, { title: "Tab1", selected: "true" },
                    dom_1.dom("div", null, "Hello World 1")),
                dom_1.dom(dom_1.ContentPane, { title: "Tab2" },
                    dom_1.dom("div", null, "Hello World 2")),
                dom_1.dom(dom_1.ContentPane, { title: "Tab3", closable: "true" },
                    dom_1.dom("div", null, "Hello World 3")))),
        dom_1.dom(dom_1.ContentPane, { title: "Tab3" },
            dom_1.dom(dom_1.TabContainer, { style: "height: 100%; width: 100%;", tabPosition: "bottom" },
                dom_1.dom(dom_1.ContentPane, { title: "Tab1", selected: "true" },
                    dom_1.dom("div", null, "Hello World 1")),
                dom_1.dom(dom_1.ContentPane, { title: "Tab2" },
                    dom_1.dom("div", null, "Hello World 2")),
                dom_1.dom(dom_1.ContentPane, { title: "Tab3", closable: "true" },
                    dom_1.dom("div", null, "Hello World 3")))));
    exports.titlePan = dom_1.dom(dom_1.TitlePane, { title: "Title Pane", open: "", style: "width:320px; position:absolute; right: 20px; bottom: 20px" }, exports.accordionContainer);
    exports.programmatic = function () {
        var tc = dom_1.TabContainer({
            style: "height: 100%; width: 100%;"
        });
        var cp1 = dom_1.ContentPane({
            title: "Tab1",
        });
        cp1.domNode.appendChild(dom_1.dom("div", null, "Hello World"));
        tc.addChild(cp1);
        var cp2 = dom_1.ContentPane({
            title: "Tab2",
        });
        cp2.domNode.appendChild(dom_1.dom("div", null, "Hello World"));
        tc.addChild(cp2);
        return tc.domNode;
    };
});
define("templates/template2", ["require", "exports", "templates/dom"], function (require, exports, dom_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var resx = {
        GetString: function (v) { return v; },
    };
    var mapOptionTitlePane = {
        "min-width": "100px",
        "max-width": "320px",
    };
    var infoArea = {
        "min-height": "320px",
        "height": "50%",
        overflow: "auto"
    };
    function trigger(topic) {
        return function (args) { return alert(topic); };
    }
    var store = new dojo.store.Memory({});
    [0, 1, 2, 3, 4, 5].map(function (v) { return store.add({ id: v, display: "Profile Group " + v }); });
    exports.titlePane = dom_2.dom(dom_2.TitlePane, { title: "Search & Options", class: "mapOptionTitlePane searchOptions", style: mapOptionTitlePane },
        dom_2.dom(dom_2.ContentPane, { class: "infoArea", style: infoArea },
            dom_2.dom(dom_2.AccordionContainer, { class: "map_tab_body" },
                dom_2.dom(dom_2.ContentPane, { title: "Search and Query" },
                    dom_2.dom(dom_2.TabContainer, { tabPosition: "bottom" },
                        dom_2.dom(dom_2.ContentPane, { title: "Basic" },
                            dom_2.dom("div", null,
                                dom_2.dom("button", { title: "Search for matching criteria", click: trigger("search.basic") }, "Search"),
                                dom_2.dom("span", null, "\u00A0\u00A0"),
                                dom_2.dom("ul", null,
                                    dom_2.dom("li", null,
                                        dom_2.dom("button", { class: "urlField search advanced", click: trigger("search.advanced") }, "Advanced Search")),
                                    dom_2.dom("li", null,
                                        dom_2.dom("button", { class: "urlField search extent", click: trigger("search.extent") }, "Search in Extent")),
                                    dom_2.dom("li", null,
                                        dom_2.dom("button", { class: "urlField search gis", click: trigger("search.gis") }, "GIS Search"))))),
                        dom_2.dom(dom_2.ContentPane, { title: "My Queries" }))),
                dom_2.dom(dom_2.ContentPane, { title: "Layers" },
                    dom_2.dom(dom_2.TabContainer, { tabPosition: "bottom" },
                        dom_2.dom(dom_2.ContentPane, { title: "Layers" },
                            dom_2.dom("div", null,
                                dom_2.dom("table", { class: "MapLegend" },
                                    dom_2.dom("tbody", null,
                                        dom_2.dom("tr", null,
                                            dom_2.dom("td", null,
                                                dom_2.dom("label", { id: "layerGroupLabel" }, "Profile:"),
                                                dom_2.dom(dom_2.ComboBox, { id: "layerGroup", value: "todo", name: "layerGroupSelect", searchAttr: "display", store: store, onChange: trigger("group") }))),
                                        dom_2.dom("tr", null,
                                            dom_2.dom("td", null,
                                                dom_2.dom("hr", null),
                                                dom_2.dom("div", { height: "10px" })))),
                                    dom_2.dom("thead", null,
                                        dom_2.dom("tr", null,
                                            dom_2.dom("th", null))),
                                    dom_2.dom("tbody", null,
                                        dom_2.dom("tr", null,
                                            dom_2.dom("td", null,
                                                dom_2.dom("input", { type: "radio", title: "Activate Layer" }),
                                                dom_2.dom("input", { type: "checkbox", title: "Turn on layer" }),
                                                dom_2.dom("span", null, "\u00A0FeatureLayer"),
                                                dom_2.dom("span", { class: "MapLayerError", style: "display:none" }),
                                                dom_2.dom("span", { class: "MapLayerProgress", style: "display:none" }))))))),
                        dom_2.dom(dom_2.ContentPane, { title: "Basemaps" },
                            dom_2.dom("table", { class: "MapLegend" },
                                dom_2.dom("thead", null,
                                    dom_2.dom("tr", null,
                                        dom_2.dom("th", null))),
                                dom_2.dom("tbody", null,
                                    dom_2.dom("tr", null,
                                        dom_2.dom("td", null,
                                            dom_2.dom("input", { type: "radio", title: "Show as base map" }),
                                            dom_2.dom("span", null, "\u00A0Bing Roadway"),
                                            dom_2.dom("span", { class: "MapLayerError", style: "display:none" }),
                                            dom_2.dom("span", { class: "MapLayerProgress", style: "display:none" })))))))),
                dom_2.dom(dom_2.ContentPane, { title: "Legend" },
                    dom_2.dom("img", null)),
                dom_2.dom(dom_2.ContentPane, { title: "Contents" },
                    dom_2.dom("table", { class: "grid", cellpadding: "2", cellspacing: "0", border: "0", style: "height: auto; border-collapse: collapse; table-layout: fixed;" },
                        dom_2.dom("thead", null,
                            dom_2.dom("tr", null,
                                dom_2.dom("td", { class: "Title", width: "28" }, "\u00A0"),
                                dom_2.dom("td", { class: "Title" }, "Description"))),
                        dom_2.dom("tbody", null,
                            dom_2.dom("tr", null,
                                dom_2.dom("td", null, "Icon of this marker"),
                                dom_2.dom("td", null, "Description of this marker"))))))));
});
define("tests/templates", ["require", "exports", "templates/dom"], function (require, exports, dom_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.jsonStyleTest = function () {
        var style = { background: "black", color: "white" };
        return dom_3.dom("div", { style: style }, "White Font, Black Background?");
    };
    exports.checkedAsBoolTest = function () {
        return dom_3.dom("input", { checked: true });
    };
    exports.nestedElements = function () {
        return dom_3.dom("div", null,
            dom_3.dom("span", null,
                "I am ",
                dom_3.dom("b", null, "Bold"),
                " and ",
                dom_3.dom("i", null, "Italic")));
    };
    exports.mixedTypes = function () {
        return dom_3.dom("div", null,
            dom_3.dom("label", { class: "outside" }, "Outside CP"),
            dom_3.dom(dom_3.ContentPane, null,
                dom_3.dom("span", { class: "inside" }, "Inside CP")));
    };
});
define("app/index", ["require", "exports", "app/test-plugin", "templates/template1", "templates/template2", "tests/templates", "chai", "dojo/domReady!"], function (require, exports, test, template1_1, template2_1, templates_1, chai_1) {
    "use strict";
    describe("tsx tests", function () {
        it("tests style", function () {
            var div = templates_1.jsonStyleTest();
            chai_1.assert.equal(div.style.backgroundColor, "black");
            chai_1.assert.equal(div.style.color, "white");
        });
        it("tests boolean", function () {
            var input = templates_1.checkedAsBoolTest();
            chai_1.assert.equal(input.checked, true);
        });
        it("tests nested", function () {
            chai_1.assert.equal(templates_1.nestedElements().outerHTML, "<div><span>I am <b>Bold</b> and <i>Italic</i></span></div>");
        });
        it("tests mixed types", function () {
            var markup = templates_1.mixedTypes();
            chai_1.assert.exists(markup.querySelector("label.outside"), "outside label preserved");
            chai_1.assert.exists(markup.querySelector("span.inside"), "inside span preserved");
        });
    });
    function run() {
        test.run();
        document.body.appendChild(template1_1.titlePan.domNode);
        document.body.appendChild(template2_1.titlePane.domNode);
        template1_1.titlePan.startup();
        template2_1.titlePane.startup();
        runMochaTests();
    }
    return run;
});
define("index", ["require", "exports", "app/index"], function (require, exports, app) {
    "use strict";
    return app;
});
//# sourceMappingURL=index.js.map