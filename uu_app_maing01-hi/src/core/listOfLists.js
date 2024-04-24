//@@viewOn:imports
import { createVisualComponent, useState, Utils } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import {USERS, useUser} from "./user.js";

//import Uu5Forms from "uu5g05-forms";
//import Card from "@mui/material/Card";
//import CardContent from "@mui/material/CardContent";
//import Button from "@mui/material/Button";
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
    const [archive, setArchive] = useState([]);
    const user = useUser();

    
    const [data, setData] = useState([
        {shoppingListName: "Večerka", id: Utils.String.generateId(), owner: USERS[9].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Koloniál", id: Utils.String.generateId(), owner: USERS[4].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Supermarket", id: Utils.String.generateId(), owner: USERS[11].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Hypermarket", id: Utils.String.generateId(), owner: USERS[10].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Ultramarket", id: Utils.String.generateId(), owner: USERS[5].name, members: ["Alice", "Karel", "Denisa"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Večerka 2", id: Utils.String.generateId(), owner: USERS[6].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Koloniál 2", id: Utils.String.generateId(), owner: USERS[13].name, members: ["Alice", "Vašek", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Supermarket 2", id: Utils.String.generateId(), owner: USERS[8].name, members: ["Pavla", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Hypermarket 2", id: Utils.String.generateId(), owner: USERS[7].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Ultramarket 2", id: Utils.String.generateId(), owner: USERS[3].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]}
    ]);

    function handleRemove(data) {
        if (user.name === data.owner) {
            setData((item) => item.filter((item) => item.id !== data.id));
            if (!archive.some((item) => item.id === data.id)) {
                setArchive([...archive, item]);
            }
        } else {
            alert("Aktuální uživatel není vlastníkem daného nákupního seznamu, nemůže jej proto smazat.");
        }    
    };

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
                            <Uu5Elements.Box className={Config.Css.css({ padding: 16 })} key={data.id} {...data}>
                                <h4>{data.shoppingListName}</h4>
                                <i>vlastník:</i><br/>
                                <div style={{paddingLeft:"60px"}}>{data.owner}</div>
                                <i>členové:</i>
                                 {data.members.map((member) => (
                                    <div style={{paddingLeft:"60px"}}>{member}</div>
                                ))}
                                <i>položky:</i>
                                {data.items.map((item) => (
                                    <div style={{paddingLeft:"60px"}}>{item.name}&nbsp;({item.amount})</div>
                                    
                                ))}

                                {/* <Uu5Elements.Button effect="ground" icon="uugds-pencil" onClick={(e) => handleDetail(data.id)} /> */}
                                <Uu5Elements.Button effect="ground" icon="uugds-delete" onClick={(e) => handleRemove(data)} />
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
