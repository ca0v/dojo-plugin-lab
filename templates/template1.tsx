import { dom, ContentPane, TabContainer, AccordionContainer, TitlePane } from "../templates/dom";

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

export let accordionContainer =
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

export let titlePan = <TitlePane title="Title Pane" open="" style="width:320px; position:absolute; right: 20px; bottom: 20px">
    {accordionContainer}
</TitlePane>

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