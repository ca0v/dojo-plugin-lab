import "./plugin"; // forces proper definition sequence in index.js (must be relative)
import plugin = require("app/plugin!echo"); // must match wildcard template (cannot be relative)

export function run() {
    console.log("test-plugin", plugin.content);
}