import { getUserInfo } from "../../controller/account";
import { editAccountBio, editAccountPassword } from "../../controller/account/edit";
import { extractJWT } from "../../ultility/passwordHandler";

const express = require('express');
const accountRouter = express.Router();
accountRouter.use(extractJWT)
accountRouter.get('/info', getUserInfo);
/*
  body {
    oldPassword,
    newPassword
  }
*/
accountRouter.put('/editPassword', editAccountPassword)
accountRouter.put('/editBio', editAccountBio)

export default accountRouter