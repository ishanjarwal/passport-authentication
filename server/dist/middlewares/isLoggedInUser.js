"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isLoggedInUser = async (req, res, next) => {
    try {
        // check if user logged in
        // const {id} =
        // const existing = await UserModel.findOne({_id: user.id})
        // req.body.user = existing
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "something went wrong" });
    }
};
