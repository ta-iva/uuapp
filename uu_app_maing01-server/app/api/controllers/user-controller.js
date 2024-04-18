"use strict";
const UserAbl = require("../../abl/user-abl.js");

class UserController {

  get(ucEnv) {
    return UserAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new UserController();
