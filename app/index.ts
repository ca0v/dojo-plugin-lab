import test = require("./test-plugin");
import { titlePan as template1 } from "../templates/template1";
import {titlePane as template2 } from "../templates/template2";
import "dojo/domReady!";

function run() {
  test.run();
  document.body.appendChild(template1.domNode);
  document.body.appendChild(template2.domNode);
  template1.startup();
  template2.startup();
}

export = run;
