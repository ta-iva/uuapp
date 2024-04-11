//@@viewOn:imports
import { createVisualComponent, useState, Utils } from "uu5g05";
import Config from "./config/config.js";
import {useUser} from "./user.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
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

    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);

    return (
        <>
            <Uu5Elements.Block header = "Shopping List" 
                headerType = "title" 
                card = "full" 
                actionList = {[{icon: "uugds-plus", children: "Add item", onClick: () => setOpen(true) }]}
            >
                <div>Current member: {user.name}</div>
                {items.map((item) => (
                    <div>
                        {item.name}
                    </div>

                ))}
            </Uu5Elements.Block>
            <Uu5Forms.Form.Provider key={open}>
                <Uu5Elements.Modal 
                    open={open} 
                    onClose={() => setOpen(false)} 
                    header="Add item"
                    footer={
                        <div className={Config.Css.css({display: "flex", gap: 8, justifyContent:"end"})}>
                            <Uu5Forms.SubmitButton />
                            <Uu5Forms.CancelButton onClick={() => setOpen(false)} />
                        </div>
                    }
                >
                    <Uu5Forms.Form.View gridLayout={{xs: "name, amount", s: "name name amount"}}>
                        <Uu5Forms.FormText name="name" label="Item description" required/>
                        <Uu5Forms.FormText name="amount" label="Amount"/>
                    </Uu5Forms.Form.View>
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
