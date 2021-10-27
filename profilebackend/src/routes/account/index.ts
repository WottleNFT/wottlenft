import { getUserInfo } from "../../controller/account";
import { editAccountBio, editAccountPassword, editAccountPictureHash, editAccountUNGoal } from "../../controller/account/edit";
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
/*
  body {
    newBio
  }
*/
accountRouter.put('/editBio', editAccountBio)
/*
  body {
    newProfilePictureHash
  }
*/
accountRouter.put('/editProfilePicture', editAccountPictureHash)
/*
  body {
    newUNGoal
  }
*/
accountRouter.put('/editUNGoal', editAccountUNGoal)
export default accountRouter