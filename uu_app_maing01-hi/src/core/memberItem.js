//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

const MemberItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MemberList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const {id, name, onRemove} = props;

    //@@viewOn:render
    return (
        <Uu5Elements.ListItem actionList={[{icon: "uugds-delete", colorScheme: "negative", onClick: onRemove}]}>
            <div>
                {name}
            </div>
        </Uu5Elements.ListItem>
    )
    
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MemberItem };
export default MemberItem;
//@@viewOff:exports
