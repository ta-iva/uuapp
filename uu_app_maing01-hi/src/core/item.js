//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

const Item = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Item",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const {id, name, amount, onRemove} = props;

    //@@viewOn:render
    return (
        <Uu5Elements.ListItem actionList={[{icon: "uugds-delete", colorScheme: "negative", onClick: onRemove}]}>
            <div>
                {name} {amount && <i>&nbsp;({amount})</i>}
            </div>
        </Uu5Elements.ListItem>
    )
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Item };
export default Item;
//@@viewOff:exports
