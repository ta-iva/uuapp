//@@viewOn:imports
import { createVisualComponent, useState, Utils } from "uu5g05";
import Config from "./config/config.js";
import {USERS, useUser} from "./user.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
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

    const [shoppingListName, setShoppingListName] = useState("Nákupní seznam");
    const [items, setItems] = useState([
        {id: Utils.String.generateId(), name: "Rohlík", amount: "3 ks"}, 
        {id: Utils.String.generateId(), name: "Mlíko", amount: "1 krabice"},
        {id: Utils.String.generateId(), name: "Sardinky", amount: "1 konzerva"}
    ]);
 
    const owner = USERS[2];
    const [members, setMembers] = useState([USERS[1], USERS[3]]);

    const [openModalItem, setModalItem] = useState(false);
    const [openModalMember, setModalMember] = useState(false);
    const [openModalTitle, setModalTitle] = useState(false);

    //console.log(items);

    function removeItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }
    function removeMember(id) {
        if (user.id === owner.id || user.id === id) {
            setMembers((members) => members.filter((member) => member.id !== id));
        } else {
            console.log("Aktuální uživatel není vlastníkem nákupního seznamu ani odebíraným členem, nemůže tak odebrat jiného člena.");
        }
    }

    // nonMemberSelector - půjde do samostatné komponenty
    const memberIDs = members.map((member) => member.id);
    const nonMembers = USERS.filter((member) => member.id !== owner.id && !memberIDs.includes(member.id));
    const nonMemberList = nonMembers.map(nonMember => ({value: nonMember.id, children: nonMember.name}));

    return (
        <>
            <Uu5Elements.Block header = {shoppingListName} 
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
                </div>

                <Uu5Elements.Grid>
                    {items.map((item) => (
                        <Item key={item.id} {...item} onRemove={() => removeItem(item.id)} />
                    ))}
                </Uu5Elements.Grid>

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
                    console.log("Aktuální uživatel není vlastníkem nákupního seznamu, a nemůže tak přidávat nové členy.");
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
                    console.log("Aktuální uživatel není vlastníkem nákupního seznamu, a nemůže tak měnit jeho název.");
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
