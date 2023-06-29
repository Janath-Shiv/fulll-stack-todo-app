const express = require("express");
const {getAll,addNew,deleteOne,todocheck} = require("../controller/todocontroller");
const router= express.Router()

router.route("/").get(getAll);
router.route("/new").post(addNew);
router.route("/delete/:id").delete(deleteOne);
router.route("/complete/:id").get(todocheck);


module.exports = router