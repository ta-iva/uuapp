//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import ShoppingList from "../core/shoppingList.js";
import Uu5Elements from "uu5g05-elements";
import NavBar from "../bricks/navBar.js";
import ListOfLists from "../core/listOfLists.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  icon: () =>
    Config.Css.css({
      fontSize: 48,
      lineHeight: "1em",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Overview = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Overview",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Config.Css.css({padding: 16}));
    return (
      <div {...attrs}>
        <NavBar />
        <ListOfLists />
      </div>
    );
    //@@viewOff:render
  },
});

Overview = withRoute(Overview, { authenticated: true });

//@@viewOn:exports
export { Overview };
export default Overview;
//@@viewOff:exports
