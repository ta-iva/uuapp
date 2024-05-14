//@@viewOn:imports
import { createVisualComponent, useState, Utils } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import { XyChart } from "uu5chartsg01";
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
        {shoppingListName: "Večerka", id: Utils.String.generateId(), owner: USERS[9].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}, {"name":"Čokoláda", "amount":"2 ks"}, {"name":"Pivo", "amount":"2 lahváče"}]},
        {shoppingListName: "Koloniál", id: Utils.String.generateId(), owner: USERS[4].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}, {"name":"Čokoláda", "amount":"2 ks"}]},
        {shoppingListName: "Supermarket", id: Utils.String.generateId(), owner: USERS[11].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}]},
        {shoppingListName: "Hypermarket", id: Utils.String.generateId(), owner: USERS[10].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]},
        {shoppingListName: "Ultramarket", id: Utils.String.generateId(), owner: USERS[5].name, members: ["Alice", "Karel", "Denisa"], items: [{"name":"Rohlík", "amount":"3 ks"}]},
        {shoppingListName: "Večerka 2", id: Utils.String.generateId(), owner: USERS[6].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}, {"name":"Čokoláda", "amount":"2 ks"}, {"name":"Toaleťák", "amount":"8 rolí"}]},
        {shoppingListName: "Koloniál 2", id: Utils.String.generateId(), owner: USERS[13].name, members: ["Alice", "Vašek", "Jana"], items: []},
        {shoppingListName: "Supermarket 2", id: Utils.String.generateId(), owner: USERS[8].name, members: ["Pavla", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}]},
        {shoppingListName: "Hypermarket 2", id: Utils.String.generateId(), owner: USERS[7].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}, {"name":"Čokoláda", "amount":"2 ks"}, {"name":"Pivo", "amount":"2 lahváče"}, {"name":"Maso na guláš", "amount":"0,5 kg"}]},
        {shoppingListName: "Ultramarket 2", id: Utils.String.generateId(), owner: USERS[3].name, members: ["Alice", "Karel", "Jana"], items: [{"name":"Rohlík", "amount":"3 ks"}, {"name":"Mlíko", "amount":"1 krabice"}, {"name":"Sardinky", "amount":"1 konzerva"}]}
    ]);
    const [listItems, setListItems] = useState(data);
    const [filterToggled, setFilterToggled] = useState(true);
    const chartData = listItems.map((item) => ({...item, itemsCount: item.items.length || 0}));

    function handleRemove(listItem) {
        if (user.name === listItem.owner) {
            const updatedData = data.filter((item) => item.id !== listItem.id);
            setData(updatedData);

            if (!filterToggled) {
                setListItems(updatedData);
              }

            if (!archive.some((item) => item.id === listItem.id)) {
                setArchive([...archive, listItem]);
            }
        } else {
            alert("Aktuální uživatel není vlastníkem daného nákupního seznamu, nemůže jej proto smazat.");
        }    
    };

    function toggleFilter() {
        setFilterToggled(!filterToggled);
        if (filterToggled) {
            setListItems(archive);
        } else {
            setListItems(data);
        }
    }

    return (
        <>
            <Uu5Elements.Block header = "Přehled nákupních seznamů"
                headerType = "title" 
                card = "full" 
                actionList = {[
                    {icon: "uugds-plus", children: "Vytvoř nový seznam", onClick: () => setModal(true) }
                ]}
            >
            <div align="right">
            <b>aktuální data&nbsp;</b>
            <Uu5Elements.Toggle size="l" value={!filterToggled} size="s" onChange={(e) => toggleFilter()} />
            <b>&nbsp;archiv</b>
            </div>

                <Uu5Elements.Grid templateColumns="repeat(auto-fit, minmax(min(250px, 100%), 1fr))" rowGap={16} columnGap={32}>
                    {listItems.map((listItem) => (
                        <Uu5Elements.Box className={Config.Css.css({ padding: 16, display: "flex", flexDirection: "column" })} key={listItem.id} {...listItem}>
                            <h4>{listItem.shoppingListName}</h4>
                            <i>vlastník:</i><br/>
                            <div style={{paddingLeft:"60px"}}>{listItem.owner}</div>
                                <i>členové:</i>
                                {listItem.members.map((member) => (
                                   <div style={{paddingLeft:"60px"}}>{member}</div>
                                ))}
                                <i>položky:</i>
                                {listItem.items.map((item) => (
                                    <div style={{paddingLeft:"60px"}}>{item.name}&nbsp;({item.amount})</div>
                                ))}
                            <Uu5Elements.Button style={{alignSelf:"flex-end", marginTop:"auto"}} effect="ground" icon="uugds-delete" onClick={(e) => handleRemove(listItem)} />
                        </Uu5Elements.Box>
                    ))}
                </Uu5Elements.Grid>

                <div>
                    <hr /><br />
                    <h3>Přehled nákupních seznamů podle počtu položek</h3>
                    <XyChart
                    data={chartData}
                    serieList={[{ valueKey: "itemsCount", bar: true, color: "light-green" }]}
                    labelAxis={{ dataKey: "shoppingListName" }}
                    />
                </div>

            </Uu5Elements.Block>

            <Uu5Forms.Form.Provider key={openModal} onSubmit={(e) => {
                const item = e.data.value;
                setData((data) => [...data, {...item, shoppingListName: shoppingListNameid, id: Utils.String.generateId(), user: user.name, members: members, items:[{name: itemsName, amount: itemsAmount}]}]);
                setModal(false);
            }}>
                <Uu5Elements.Modal 
                    open={openModal} 
                    onClose={() => setModal(false)} 
                    header="Nový nákupní seznam"
                    footer={
                        <div className={Config.Css.css({display: "flex", gap: 8, justifyContent:"end"})}>
                            <Uu5Forms.SubmitButton />
                            <Uu5Forms.CancelButton onClick={() => setModal(false)} />
                        </div>
                    }
                >
                    <Uu5Forms.Form.View gridLayout={{s: "shoppingListName shoppingListName, members members, itemsName itemsAmount", xs: "shoppingListName, members, itemsName, itemsAmount"}}>
                        <Uu5Forms.FormText name="shoppingListName" label="Název seznamu" required/>
                        <Uu5Forms.FormText name="members" label="Člen seznamu"/>
                        <Uu5Forms.FormText name="itemsName" label="Položka" required/>
                        <Uu5Forms.FormText name="itemsAmount" label="Množstvi" />
                    </Uu5Forms.Form.View>
                </Uu5Elements.Modal>
            </Uu5Forms.Form.Provider>

        </> 
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListOfLists };
export default ListOfLists;
//@@viewOff:exports
