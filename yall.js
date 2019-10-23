let Mocha = window["mocha"];
Mocha.options.asyncOnly = false;

const timeout = 5000;
const debug = false;

require({
    packages: [
        {
            name: "chai",
            location: "/node_modules/chai",
            main: "chai"
        },
    ]
});

let mocha = Mocha.setup({
    timeout: timeout,
    ui: "bdd",
    bail: debug
});

describe("mocha is loaded?", () => {
    it("it is!", () => {
        console.log("mocha is ready!");
    });
});

function runMochaTests() {
    let events = mocha.run(failures => {
        console.log(failures);
        document.title = !!failures ? "FAILURE (" + failures + ")" : "SUCCESS";
    });

    events.on("test", function (args) {
        document.title = args.title;
        console.log("**************** running " + args.title + " ****************");
    });
}
