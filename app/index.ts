declare var runMochaTests: Function;

import test = require("./test-plugin");
import { titlePan as template1 } from "../templates/template1";
import { titlePane as template2 } from "../templates/template2";
import "dojo/domReady!";
import { jsonStyleTest, checkedAsBoolTest, nestedElements, mixedTypes, inlineStyleTest } from "../tests/templates";
import { assert } from "chai";

describe("tsx tests", () => {

  it("tests inline style", () => {
    let div = inlineStyleTest();
    assert.equal(div.style.backgroundColor, "black");
    assert.equal(div.style.color, "white");
  });

  it("tests json style", () => {
    let div = jsonStyleTest();
    assert.equal(div.style.backgroundColor, "black");
    assert.equal(div.style.color, "white");
  });

  it ("tests boolean", () => {
    let input = checkedAsBoolTest();
    assert.equal(input.checked, true);
  });

  it("tests nested", () => {
    assert.equal(nestedElements().outerHTML, "<div><span>I am <b>Bold</b> and <i>Italic</i></span></div>");
  });

  it("tests mixed types", () => {
    let markup = mixedTypes();
    assert.exists(markup.querySelector("label.outside"), "outside label preserved");
    assert.exists(markup.querySelector("span.inside"), "inside span preserved");
  });


});

function run() {
  test.run();
  document.body.appendChild(template1.domNode);
  document.body.appendChild(template2.domNode);
  template1.startup();
  template2.startup();
  runMochaTests();
}

export = run;
