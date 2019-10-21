import { dom, ContentPane, TabContainer, AccordionContainer, TitlePane, Dictionary, ComboBox } from "../templates/dom";

let resx = {
    GetString: (v: string) => v,
}

let mapOptionTitlePane = {
    "min-width": "100px",
    "max-width": "320px",
} as Dictionary<string>

let infoArea = {
    "min-height": "320px",
    "height": "50%",
    overflow: "auto"
}

export let titlePane =
    <TitlePane title="Search &amp; Options" class="mapOptionTitlePane searchOptions" style={mapOptionTitlePane}>
        <ContentPane class="infoArea" style={infoArea}>
            <AccordionContainer class="map_tab_body">
                <ContentPane title="Search and Query">
                    <TabContainer tabPosition="bottom">
                        <ContentPane title="Basic">
                            <div>
                                <button title="Search for matching criteria">Search</button>
                                <span>&nbsp;&nbsp;</span>
                                <ul>
                                    <li><button class="urlField search advanced">Advanced Search</button></li>
                                    <li><button class="urlField search extent">Search in Extent</button></li>
                                    <li><button class="urlField search gis">GIS Search</button></li>
                                </ul>
                            </div>
                        </ContentPane>
                        <ContentPane title="My Queries"></ContentPane>
                    </TabContainer>
                </ContentPane>
                <ContentPane title="Layers">
                    <TabContainer tabPosition="bottom">
                        <ContentPane title="Layers">
                            <div>
                                <table class="MapLegend">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label id="layerGroupLabel">Profile:</label>
                                                <ComboBox id="layerGroup" value="todo" name="layerGroupSelect" searchAttr="display"></ComboBox>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <hr />
                                                <div height="10px"></div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input type="radio" title="Activate Layer"></input>
                                                <input type="checkbox" title="Turn on layer"></input>
                                                <span>&nbsp;FeatureLayer</span>
                                                <span class="MapLayerError" style="display:none"></span>
                                                <span class="MapLayerProgress" style="display:none"></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </ContentPane>
                        <ContentPane title="Basemaps">
                            <table class="MapLegend">
                                <thead><tr><th></th></tr></thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="radio" title="Show as base map" />
                                            <span>&nbsp;Bing Roadway</span>
                                            <span class="MapLayerError" style="display:none"></span>
                                            <span class="MapLayerProgress" style="display:none"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </ContentPane>
                    </TabContainer>
                </ContentPane>
                <ContentPane title="Legend">
                    <img/>
                </ContentPane>
                <ContentPane title="Contents">
                    <table class="grid" cellpadding="2" cellspacing="0" border="0" style="height: auto; border-collapse: collapse; table-layout: fixed;">
                        <thead>
                            <tr>
                                <td class="Title" width="28">&nbsp;</td>
                                <td class="Title">Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Icon of this marker</td>
                                <td>Description of this marker</td>
                            </tr>
                        </tbody>
                    </table>
                </ContentPane>
            </AccordionContainer>
        </ContentPane>
    </TitlePane>