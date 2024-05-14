//@@viewOn:imports
import { createVisualComponent, useState, Utils } from "uu5g05";
import Config from "./config/config.js";
import {USERS, useUser} from "./user.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import { PieChart } from "uu5chartsg01";
import Item from "./item.js";
import MemberItem from "./memberItem.js";
//@@viewOff:imports

const ShoppingList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const user = useUser();
    console.log("user", user);

    const [shoppingListName, setShoppingListName] = useState("Večerka Na Růžku");
    const [items, setItems] = useState([
        {id: Utils.String.generateId(), name: "Rohlíky", amount: "3 ks", isSolved: true}, 
        {id: Utils.String.generateId(), name: "Mlíko", amount: "1 krabice", isSolved: false},
        {id: Utils.String.generateId(), name: "Sardinky", amount: "1 konzerva", isSolved: false},
        {id: Utils.String.generateId(), name: "Čokoláda", amount: "2 ks", isSolved: false},
        {id: Utils.String.generateId(), name: "Pivo", amount: "2 lahváče", isSolved: false},
        {id: Utils.String.generateId(), name: "Toaleťák", amount: "8 rolí", isSolved: true},
    ]);
    const [filter, setFilter] = useState("all");
 
    const owner = USERS[2];
    const [members, setMembers] = useState([USERS[1], USERS[3]]);

    const [openModalItem, setModalItem] = useState(false);
    const [openModalMember, setModalMember] = useState(false);
    const [openModalTitle, setModalTitle] = useState(false);

    function filterItems() {
        if (filter === "all"){
            return items;
        } else if (filter === "solved"){
            return items.filter(item => item.isSolved === true);
        } else if (filter === "unsolved"){
            return items.filter(item => item.isSolved === false);
        }
    }

    function removeItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }
    function removeMember(id) {
        if (user.id === owner.id || user.id === id) {
            setMembers((members) => members.filter((member) => member.id !== id));
        } else {
            alert("Aktuální uživatel není vlastníkem nákupního seznamu ani odebíraným členem, nemůže tak odebrat jiného člena.");
        }
    }

    function toggleSolvedItem(id) {
        setItems(prevItems => prevItems.map(item => item.id === id ? {...item, isSolved: !item.isSolved} : item));
    }
    //console.log(items);

    // nonMemberSelector - půjde do samostatné komponenty
    const memberIDs = members.map((member) => member.id);
    const nonMembers = USERS.filter((member) => member.id !== owner.id && !memberIDs.includes(member.id));
    const nonMemberList = nonMembers.map(nonMember => ({value: nonMember.id, children: nonMember.name}));

    return (
        <>
            <Uu5Elements.Block header = {<h3>{shoppingListName}</h3>} 
                headerType = "title" 
                card = "full" 
                actionList = {[
                    {icon: "uugds-basket", children: "Přidej položku", onClick: () => setModalItem(true) },
                    {icon: "uugds-account", children: "Přidej člena", onClick: () => setModalMember(true) },
                    {icon: "uugds-pencil", children: "Uprav název", onClick: () => setModalTitle(true) }
            ]}
            >
                <div><b>Vlastník:</b> {owner.name}<hr /></div>

                <div>
                    <br />
                    <h3>Seznam členů:</h3>
                </div>
                <Uu5Elements.Grid>
                    {members.map((member) => (
                        <MemberItem key={member.id} {...member} onRemove={() => removeMember(member.id)} />
                    ))}
                </Uu5Elements.Grid>

                <div>
                    <hr /><br />
                    <h3>Seznam položek:</h3>
                <Uu5Elements.Button effect="ground" colorScheme="light-blue" onClick={() => setFilter("all")}>Vše</Uu5Elements.Button>&nbsp;&nbsp;
                <Uu5Elements.Button effect="ground" colorScheme="light-blue" onClick={() => setFilter("unsolved")}>Nevyřešené</Uu5Elements.Button>&nbsp;&nbsp;
                <Uu5Elements.Button effect="ground" colorScheme="light-blue" onClick={() => setFilter("solved")}>Vyřešené</Uu5Elements.Button>
                </div>
                <br />

                <Uu5Elements.Grid>
                    {filterItems().map((item) => (
                        <Item key={item.id} {...item} onRemove={() => removeItem(item.id)} toggleSolved={() => toggleSolvedItem(item.id)} />
                    ))}
                </Uu5Elements.Grid>

                <div>
                    <hr /><br />
                    <h3>Poměr ne/vyřešených položek:</h3>
                    <PieChart
                        data={[{name: "VYŘEŠENÉ", count: filterItems(items).filter(item => item.isSolved === true).length || 0}, 
                            {name: "NEVYŘEŠENÉ", count: filterItems(items).filter(item => item.isSolved === false).length || 0}]}
                        serieList={[
                        {
                            valueKey: "count",
                            labelKey: "name",
                            color: (item) => {
                                const { name } = item;
                                switch (name) {
                                  case "VYŘEŠENÉ":
                                    return "#81C534";
                                  case "NEVYŘEŠENÉ":
                                    return "#E53D39";
                                }
                              },
                            label: [{ position: "inside", type: "value" }, { position: "outside", type: "label" }]
                        },
                        ]}
                    />
                </div>

            </Uu5Elements.Block>

            <Uu5Forms.Form.Provider key={openModalItem} onSubmit={(e) => {
                const item = e.data.value;
                setItems((items) => [...items, {...item, id: Utils.String.generateId() }]);
                setModalItem(false);
            }}>
                <Uu5Elements.Modal 
                    open={openModalItem} 
                    onClose={() => setModalItem(false)} 
                    header="Nová nákupní položka"
                    footer={
                        <div className={Config.Css.css({display: "flex", gap: 8, justifyContent:"end"})}>
                            <Uu5Forms.SubmitButton />
                            <Uu5Forms.CancelButton onClick={() => setModalItem(false)} />
                        </div>
                    }
                >
                    <Uu5Forms.Form.View gridLayout={{xs: "name, amount", s: "name name amount"}}>
                        <Uu5Forms.FormText name="name" label="Název položky" required/>
                        <Uu5Forms.FormText name="amount" label="Množství"/>
                    </Uu5Forms.Form.View>
                </Uu5Elements.Modal>
            </Uu5Forms.Form.Provider>

            <Uu5Forms.Form.Provider key={openModalMember} onSubmit={(e) => {
                const newMemberId = e.data.value.id;
                if (user.id === owner.id) {
                const newMember = nonMembers.find(nonMember => nonMember.id === newMemberId);
                setMembers((members) => [...members, {...newMember}]);
                } else {
                    alert("Aktuální uživatel není vlastníkem nákupního seznamu, a nemůže tak přidávat nové členy.");
                }
                setModalMember(false);
            }}>
                <Uu5Elements.Modal 
                    open={openModalMember} 
                    onClose={() => setModalMember(false)} 
                    header="Nový člen nákupního seznamu"
                    footer={
                        <div className={Config.Css.css({display: "flex", gap: 8, justifyContent:"end"})}>
                            <Uu5Forms.SubmitButton />
                            <Uu5Forms.CancelButton onClick={() => setModalMember(false)} />
                        </div>
                    }
                >
                    <Uu5Forms.FormTextSelect name="id" itemList={nonMemberList} required/>
                </Uu5Elements.Modal>
            </Uu5Forms.Form.Provider>

            <Uu5Forms.Form.Provider key={openModalTitle} onSubmit={(e) => {
                if (user.id === owner.id) {
                    setShoppingListName(e.data.value.name);
                } else {
                    alert("Aktuální uživatel není vlastníkem nákupního seznamu, a nemůže tak měnit jeho název.");
                }
                setModalTitle(false);
            }}>
                <Uu5Elements.Modal 
                    open={openModalTitle} 
                    onClose={() => setModalTitle(false)} 
                    header="Úprava názvu nákupního seznamu"
                    footer={
                        <div className={Config.Css.css({display: "flex", gap: 8, justifyContent:"end"})}>
                            <Uu5Forms.SubmitButton />
                            <Uu5Forms.CancelButton onClick={() => setModalTitle(false)} />
                        </div>
                    }
                >
                    <Uu5Forms.FormText name="name" label="Nový název" required/>
                </Uu5Elements.Modal>
            </Uu5Forms.Form.Provider>

        </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingList };
export default ShoppingList;
//@@viewOff:exports
