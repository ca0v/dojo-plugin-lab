import * as registry from "dijit/registry";
import { dom, Dictionary } from "../templates/dom";

import dijitTitlePane = require("dijit/TitlePane");
import dijitAccordionContainer = require("dijit/layout/AccordionContainer");
import dijitContentPane = require("dijit/layout/ContentPane");
import dijitTabContainer = require("dijit/layout/TabContainer");

function TitlePane(args: Dictionary<string>) {
    let v = new dijitTitlePane(args);
    return v;//.domNode;
}

function AccordionContainer(args: Dictionary<string>) {
    let v = new dijitAccordionContainer(args);
    return v;//.domNode;
}

function ContentPane(args: Dictionary<string>) {
    let cp = new dijitContentPane(args || {});
    return cp;//.domNode;
}

function TabContainer(args: Dictionary<string>) {
    let cp = new dijitTabContainer(args);
    return cp;//.domNode;
}


export let helloWorld = <div id="id">Hello World</div> as HTMLElement;

export let contentPane = <ContentPane><div id="id">Hello World</div></ContentPane>;

export let tabContainer =
    <TabContainer style="height: 100%; width: 100%;">
        <ContentPane title="Tab1" selected="true"><div>Hello World</div></ContentPane>
        <ContentPane title="Tab2"><div>Hello World</div></ContentPane>
        <ContentPane title="Tab3">
            <TabContainer style="height: 100%; width: 100%;">
                <ContentPane title="Tab1" selected="true"><div>Hello World</div></ContentPane>
                <ContentPane title="Tab2"><div>Hello World</div></ContentPane>
                <ContentPane title="Tab3" closable="true"><div>Hello World</div></ContentPane>
            </TabContainer>
        </ContentPane>
    </TabContainer>

export let accordionContainer = <AccordionContainer style="height:300px">
    <ContentPane title="Tab1" selected="true"><div>Hello World</div></ContentPane>
    <ContentPane title="Tab2">
        <TabContainer style="height: 100%; width: 100%;" tabPosition="right">
            <ContentPane title="Tab1" selected="true"><div>Hello World</div></ContentPane>
            <ContentPane title="Tab2"><div>Hello World</div></ContentPane>
            <ContentPane title="Tab3" closable="true"><div>Hello World</div></ContentPane>
        </TabContainer>
    </ContentPane>
    <ContentPane title="Tab3">
        <TabContainer style="height: 100%; width: 100%;" tabPosition="bottom">
            <ContentPane title="Tab1" selected="true"><div>Hello World</div></ContentPane>
            <ContentPane title="Tab2"><div>Hello World</div></ContentPane>
            <ContentPane title="Tab3" closable="true"><div>Hello World</div></ContentPane>
        </TabContainer>
    </ContentPane>
</AccordionContainer>

export let programmatic = () => {
    let tc = TabContainer({
        style: "height: 100%; width: 100%;"
    });

    var cp1 = ContentPane({
        title: "Tab1",
    });
    cp1.domNode.appendChild(<div>Hello World</div>);

    tc.addChild(cp1);
    //tc.domNode.appendChild(cp1.domNode);

    var cp2 = ContentPane({
        title: "Tab2",
    });
    cp2.domNode.appendChild(<div>Hello World</div>);

    tc.addChild(cp2);

    return tc.domNode;
}