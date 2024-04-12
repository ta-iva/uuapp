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

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    console.log(items);

    function removeItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }
    function removeMember(id) {
        setMembers((members) => members.filter((member) => member.id !== id));
    }


    return (
        <>
            <Uu5Elements.Block header = {shoppingListName} 
                headerType = "title" 
                card = "full" 
                actionList = {[
                    {icon: "uugds-basket", children: "Přidej položku", onClick: () => setOpen1(true) },
                    {icon: "uugds-account", children: "Přidej člena", onClick: () => setOpen2(true) },
                    {icon: "uugds-pencil", children: "Uprav název", onClick: () => setOpen3(true) }
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
                    <hr />
                    <br />
                    <h3>Seznam položek:</h3>
                </div>

                <Uu5Elements.Grid>
                    {items.map((item) => (
                        <Item key={item.id} {...item} onRemove={() => removeItem(item.id)} />

                    //  <div key={item.id}>
                    //     {item.name}
                    //  </div>

                    ))}
                </Uu5Elements.Grid>

            </Uu5Elements.Block>

            <Uu5Forms.Form.Provider key={open1} onSubmit={(e) => {
                const item = e.data.value;
                setItems((items) => [...items, {...item, id: Utils.String.generateId() }]);
                setOpen1(false);
            }}>
                <Uu5Elements.Modal 
                    open={open1} 
                    onClose={() => setOpen1(false)} 
                    header="Nová nákupní položka"
                    footer={
                        <div className={Config.Css.css({display: "flex", gap: 8, justifyContent:"end"})}>
                            <Uu5Forms.SubmitButton />
                            <Uu5Forms.CancelButton onClick={() => setOpen1(false)} />
                        </div>
                    }
                >
                    <Uu5Forms.Form.View gridLayout={{xs: "name, amount", s: "name name amount"}}>
                        <Uu5Forms.FormText name="name" label="Název položky" required/>
                        <Uu5Forms.FormText name="amount" label="Množství"/>
                    </Uu5Forms.Form.View>
                </Uu5Elements.Modal>
            </Uu5Forms.Form.Provider>

            <Uu5Forms.Form.Provider key={open3} onSubmit={(e) => {
                setShoppingListName(e.data.value.name);
                setOpen3(false);
            }}>
                <Uu5Elements.Modal 
                    open={open3} 
                    onClose={() => setOpen3(false)} 
                    header="Úprava názvu nákupního seznamu"
                    footer={
                        <div className={Config.Css.css({display: "flex", gap: 8, justifyContent:"end"})}>
                            <Uu5Forms.SubmitButton />
                            <Uu5Forms.CancelButton onClick={() => setOpen3(false)} />
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
