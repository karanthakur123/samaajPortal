const {Router} = require('express');
const controller = require('./controller');
const router =Router();

router.get("/getUsers",controller.getUserData);
router.post("/createUser",controller.createUserData);
router.put("/updateUser/:id",controller.editUserData);
router.delete("/deleteUser/:id",controller.deleteUserData);



module.exports=router;