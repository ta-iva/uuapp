//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Config from "./config/config.js";
import Uu5Elements from "uu5g05-elements";

//@@viewOff:imports

const NavBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "NavBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    return (
        <div style={{display: 'flex', justifyContent: 'flex-start', padding: '10px', background: '#2196f3'}}>
            <Uu5Elements.Link style={{marginRight: '10px', padding: '10px', backgroundColor: '#d6f1fe', fontWeight: 500, color: 'black', borderRadius: '5px', boxShadow: '1px 1px 1px 0.5px #71797E'}} href="overview">Přehled všech seznamů</Uu5Elements.Link> 
            <Uu5Elements.Link style={{marginRight: '10px', padding: '10px', backgroundColor: '#d6f1fe', fontWeight: 500, color: 'black', borderRadius: '5px', boxShadow: '1px 1px 1px 0.5px #71797E'}} href="detail">Detail nákupního seznamu</Uu5Elements.Link> 
        </div>
    );
    
    //@@viewOff:render
  },
    
});

//@@viewOn:exports
export { NavBar };
export default NavBar;
//@@viewOff:exports
