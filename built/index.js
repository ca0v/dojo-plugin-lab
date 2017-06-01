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
    function run() {
        console.log("test-plugin", plugin.content);
    }
    exports.run = run;
});
define("app/index", ["require", "exports", "app/test-plugin"], function (require, exports, test) {
    "use strict";
    function run() {
        test.run();
    }
    return run;
});
define("index", ["require", "exports", "app/index"], function (require, exports, app) {
    "use strict";
    return app;
});
//# sourceMappingURL=index.js.map