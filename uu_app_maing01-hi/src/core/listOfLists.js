//@@viewOn:imports
import { createVisualComponent, useState, Utils } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Uu5TilesElements from "uu5tilesg02";
//@@viewOff:imports

const ListOfLists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListOfLists",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const [openModal, setModal] = useState(false);
    const [data, setData] = useState([
        {shoppingListName: "Večerka Na Růžku", id: Utils.String.generateId(), members: ["Vašek", "Jitka"], items: ["Rohlík", "Mlíko", "Sardinky"]},
        {shoppingListName: "Koloniál", id: Utils.String.generateId(), members: ["Vašek", "Jitka"], items: ["Rohlík", "Mlíko", "Sardinky"]},
        {shoppingListName: "Supermarket", id: Utils.String.generateId(), members: ["Vašek", "Jitka"], items: ["Rohlík", "Mlíko", "Sardinky"]},
        {shoppingListName: "Hypermarket", id: Utils.String.generateId(), members: ["Vašek", "Jitka"], items: ["Rohlík", "Mlíko", "Sardinky"]},
        {shoppingListName: "Ultrahypersupermarket", id: Utils.String.generateId(), members: ["Vašek", "Jitka"], items: ["Rohlík", "Mlíko", "Sardinky"]}
    ]);

    return (
        <>
            <Uu5Elements.Block header = {<h3>Přehled všech seznamů</h3>} 
                headerType = "title" 
                card = "full" 
                actionList = {[
                    {icon: "uugdsstencil-education-exam", children: "Vytvoř nový seznam", onClick: () => setModal(true) },
                ]}
            >
{/*                 <Uu5TilesElements.Grid data={data} tileMinWidth={100} tileMaxWidth={200}>
                    {Tile}
                </Uu5TilesElements.Grid>
 */}
            </Uu5Elements.Block>
        </> 
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListOfLists };
export default ListOfLists;
//@@viewOff:exports
