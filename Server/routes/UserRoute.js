const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/UserController");

router.post("/register", userCtrl.register);

/**
 * @openapi
 * tags:
 *  name: User Routes
 *  description: The routes for the users
 */

/**
 * @openapi
 *  /api/user/users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       isBanned:
 *                         type: boolean
 *                         description: user status
 *                         example: false
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 60625b18a738d623f059fe44
 *                       firstName:
 *                         type: string
 *                         description: The user's first name.
 *                         example: Aliii
 *                       lastName:
 *                         type: string
 *                         description: The user's last name.
 *                         example: ghanmi
 *                       userName:
 *                         type: string
 *                         description: The user's username.
 *                         example: ali123
 *                       phoneNumber:
 *                         type: integer
 *                         description: The user's phone number.
 *                         example: 22556110
 *                       email:
 *                         type: string
 *                         description: The user's email.
 *                         example: user@user.com
 *                       password:
 *                         type: string
 *                         description: The user's password
 *                         example:
 *                       location:
 *                         type: string
 *                         description: The user's address
 *                         example: Unnamed Road, Tunisie
 *                       createdAt:
 *                         type: string
 *                         description: account creation date
 *                         example: 2021-03-29T22:56:24.152Z
 *                       updateddAt:
 *                         type: string
 *                         description: account update date
 *                         example: 2021-03-29T22:56:24.152Z
 *                       imageUrl:
 *                         type: string
 *                         description: user's profile picture
 *                         example: http://res.cloudinary.com/drtlodcal/image/upload/v1617450879/nroofuz6varmivjixrfo.jpg
 */
router.get("/users", userCtrl.getAll);

/**
 * @swagger
 *
 * /api/user/login:
 *   post:
 *     description: Login to the application as a user
 *     produces:
 *       - application/json
 */

router.post("/login", userCtrl.login);

router.get("/verify", userCtrl.verify);

router.get("/logout", userCtrl.logout);
router.get("/:id", userCtrl.getUserDataById);
router.put("/updateUserData/:id", userCtrl.update);
router.patch("/updatePassword/:id", userCtrl.updatePassword);
router.put("/updateUserImage/:id", userCtrl.updateUserImage);
// added

module.exports = router;
