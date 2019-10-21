import * as registry from "dijit/registry";
import test = require("./test-plugin");
import { accordionContainer as helloWorld, programmatic } from "../templates/template1";
import "dojo/domReady!";

function run() {
  test.run();
  // document.body.appendChild(helloWorld);
  // console.log(helloWorld.outerHTML);
  // registry.byNode(helloWorld).startup();

  let tabs = helloWorld.domNode;// || programmatic();
  document.body.appendChild(tabs);
  registry.byNode(tabs).startup();
}

export = run;
