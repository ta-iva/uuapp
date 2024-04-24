//@@viewOn:imports
import { createVisualComponent, useState, Utils } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
//import Uu5TilesElements from "uu5tilesg02";

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
        {shoppingListName: "Večerka", id: Utils.String.generateId(), owner: "Vašek", members: ["Andrea", "Karel", "Jitka"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Koloniál", id: Utils.String.generateId(), owner: "Vašek", members: ["Andrea", "Karel", "Jitka"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Supermarket", id: Utils.String.generateId(), owner: "Vašek", members: ["Andrea", "Karel", "Jitka"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Hypermarket", id: Utils.String.generateId(), owner: "Vašek", members: ["Andrea", "Karel", "Jitka"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Ultramarket", id: Utils.String.generateId(), owner: "Vašek", members: ["Andrea", "Karel", "Jitka"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Večerka 2", id: Utils.String.generateId(), owner: "Vašek", members: ["Andrea", "Karel", "Jitka"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Koloniál 2", id: Utils.String.generateId(), owner: "Vašek", members: ["Andrea", "Karel", "Jitka"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Supermarket 2", id: Utils.String.generateId(), owner: "Vašek", members: ["Andrea", "Karel", "Jitka"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Hypermarket 2", id: Utils.String.generateId(), owner: "Vašek", members: ["Andrea", "Karel", "Jitka"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Ultramarket 2", id: Utils.String.generateId(), owner: "Vašek", members: ["Andrea", "Karel", "Jitka"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]}
    ]);

    return (
        <>
            <Uu5Elements.Block header = "Přehled všech seznamů"
                headerType = "title" 
                card = "full" 
                actionList = {[
                    {icon: "uugdsstencil-education-exam", children: "Vytvoř nový seznam", onClick: () => setModal(true) },
                ]}
            >
                    <Uu5Elements.Grid templateColumns="repeat(auto-fit, minmax(min(250px, 100%), 1fr))" rowGap={16} columnGap={32}>
                        {data.map((data) => (
                            <Uu5Elements.Box className={Config.Css.css({ padding: 16 })}>
                                <h4>{data.shoppingListName}</h4>
                                <tr>
                                    <td><i>vlastník:</i></td><td>{data.owner}</td>
                                </tr>
                                <tr>
                                    <td><i>členové:</i></td><td></td>
                                </tr>
                                 {data.members.map((member) => (
                                    <tr>
                                    <td></td><td>{member}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td><i>položky:</i></td><td></td>
                                </tr> 
                                {data.items.map((item) => (
                                    <tr>
                                    <td></td><td>{item.name}&nbsp;({item.amount})</td>
                                    </tr>
                                ))}
                            </Uu5Elements.Box>
            ))}
                    </Uu5Elements.Grid>

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
