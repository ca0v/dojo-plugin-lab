Example of how to use AMD plugins when transpiling to a single file.  

* index.html defines dojoConfig and loads dojo
* dojoConfig defines an 'app' package and a callback
* the callback loads the application
* the application can now use relative paths
* test-plugin must indicate dependency on plugin via import "app/plugin"
* test-plugin can now rely on app/plugin being pre-defined and use "app/plugin!"

In short:

    import "./plugin"; // forces proper definition sequence in index.js (must be relative)
    import plugin = require("app/plugin!echo"); // must match wildcard template (cannot be relative)
