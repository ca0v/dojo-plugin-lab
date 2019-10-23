import { dom, ContentPane } from "../templates/dom";

export let jsonStyleTest = () => {
    let style = { background: "black", color: "white" };
    return <div style={style}>White Font, Black Background?</div> as HTMLDivElement
}

export let checkedAsBoolTest = () => {
    return <input checked={true}></input> as HTMLInputElement
}

export let nestedElements = () => {
    return <div><span>I am <b>Bold</b> and <i>Italic</i></span></div> as HTMLDivElement
}

export let mixedTypes = () => {
    return <div><label class="outside">Outside CP</label><ContentPane><span class="inside">Inside CP</span></ContentPane></div> as HTMLDivElement;
}