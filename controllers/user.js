import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("User Already Exist", 400));

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword });

        sendCookie(user, res, "Registered SUccessfully", 201);
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("Invalid Email and Password", 400));

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return next(new ErrorHandler("Invalid Email and Password", 400));

        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
}

export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
}

export const logout = (req, res) => {
    res.status(200).cookie("token", "", { expires: new Date(Date.now()) }).json({
        success: true,
        user: req.user
    });
}

// export const special = (req, res) => {
//     res.json({
//         success: true,
//         message: "Special route"
//     })
// }



// export const updateUserDetails = async (req, res) => {
//     const { id } = req.params;
//     // console.log(req.params);
//     const user = await User.findById(id);
//     // console.log(user);


//     res.json({
//         success: true,
//         message: "Updated"
//     });
// }

// export const deleteUser = async (req, res) => {
//     const { id } = req.params;
//     // console.log(req.params);
//     const user = await User.findById(id);
//     // console.log(user);
//     res.json({
//         success: true
//     })
// }