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

2019.20.21
* Added a TSX Writer capable of processing the following `tsx` content:
```
    <AccordionContainer style="height:300px">
        <ContentPane title="Tab1" selected="true"><div>Hello World</div></ContentPane>
        <ContentPane title="Tab2">
            <TabContainer style="height: 100%; width: 100%;" tabPosition="right">
                <ContentPane title="Tab1" selected="true"><div>Hello World 1</div></ContentPane>
                <ContentPane title="Tab2"><div>Hello World 2</div></ContentPane>
                <ContentPane title="Tab3" closable="true"><div>Hello World 3</div></ContentPane>
            </TabContainer>
        </ContentPane>
        <ContentPane title="Tab3">
            <TabContainer style="height: 100%; width: 100%;" tabPosition="bottom">
                <ContentPane title="Tab1" selected="true"><div>Hello World 1</div></ContentPane>
                <ContentPane title="Tab2"><div>Hello World 2</div></ContentPane>
                <ContentPane title="Tab3" closable="true"><div>Hello World 3</div></ContentPane>
            </TabContainer>
        </ContentPane>
    </AccordionContainer>
```
