const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInpurchaseList} = require("../controllers/user");
const {updateStock}=require("../controllers/product");
const {getOrderById,
    createOrder,
    getAllOrder,
    updateStatus,
    getOrderStatus}= require("../controllers/order");

//params
router.param("userId",getUserById);
router.param("orderId", getOrderById);


//create route
router.post(
    "/order/create/:userId",
    isSignedIn, 
    isAuthenticated,
    pushOrderInpurchaseList,
    updateStock,
    createOrder
    );
//read route
router.get(
    "/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrder);
//status of order
router.get(
    "/oeder/status/:userid",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus);
router.put(
    "/order/:orderId/status/:userId", 
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus);
module.exports=router;