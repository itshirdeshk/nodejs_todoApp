import express from "express";
import { getMyProfile, login, register, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post('/new', register);
router.post('/login', login);

// Always write the dynamic route in the last
router.get('/me', isAuthenticated, getMyProfile);

router.get('/logout', logout);
// router.get("/userid/:id", getUserDetails);
// router.put("/userid/:id", updateUserDetails);
// router.delete("/userid/:id", deleteUser);



export default router;