/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    async login(req, res) {
     try {
        const {username,password} = req.body;
        if(!username || !password) {
            return res.badRequest({
                message: 'Invalid username or password'
            })
        }
        const existingUser = await Admin.findOne({username})
        if(!existingUser) {
            return res.badRequest({
                message: "Wrong username",
            })
        }
        //so sánh password
        const isMatchPassword = await bcrypt.compare( 
            //so sánh password người dùng nhập lên với database
            password,
            existingUser.password
        )
        if(!isMatchPassword) {
            return res.badRequest({
                message: "Wrong password",
            })
        }
           //token
           const jwtPayload = {
            id: existingUser.id,
            admin: existingUser.admin,
            username: existingUser.username,
            password: existingUser.password
        }
        const token = jwt.sign(jwtPayload,process.env.SECRET_KEY,{
            expiresIn: '7d'
        })
        return res.ok({
            accessToken: token,
            message: 'Login successful'
        })
     } catch (error) {
        res.serverError(error)  
     }
     },
    async register(req, res) {
        try {
            const { username, email, password, isAdmin } = req.body;
            if (!username || !email || !password) {
                return res.badRequest({
                    message: "Missing required keys",
                });
            }
            const existingUser = await Admin.findOne({ email })
            if (existingUser) {
                return res.json({
                    message: "User already exists",
                })
            }
            //hash password
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const newUser = await Admin.create({
                username,
                email,
                password: hashPassword,
                admin: isAdmin ? true : false,
            }).fetch();
            return res.ok({
                data: newUser,
                message: 'Register successfully for a new user'
            });
        } catch (error) {
            res.serverError(error)
        }
    },
    async me(req, res) { 
      try {
        const {id} = req.user
      console.log(id);
        const currentUser = await Admin.findOne(id).omit(['password']);
  
        if (!currentUser) {
          res.notFound('Unauthorized user');
        }
      
        res.json({
          userInfo: currentUser,
        });
      } catch (error) {
        res.serverError(error)
      }
      
    },
};

