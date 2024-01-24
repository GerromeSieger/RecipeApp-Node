import UserModel from '../model/userModel.js';
import otpGenerator from 'otp-generator';
// import { cache } from '../app.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
//import { sendGenericOtpMail } from "./mailer.js";
dotenv.config()

export async function register(req, res) {

    try {
        const { username, email, number, password } = req.body;
        const existemail = await UserModel.exists({ email: email });
        if (existemail) {
            return res.status(400).send({ error: "Email Already Exists" })
        }
        const existename = await UserModel.exists({ username: username });
        if (existename) {
            return res.status(400).send({ error: "Username Already Exists" })
        }
        const existenumber = await UserModel.exists({ number: number });
        if (existenumber) {
            return res.status(400).send({ error: "Number Already Exists" })
        }
        if (password) {
            bcrypt.hash(password, 10)
                  .then(async hashedPassword => {

                    const user = new UserModel({
                        username,
                        email,
                        number,
                        password: hashedPassword,
                    });
                    // return save result as a response
                    user.save()
                        .then(async newprofile => {
                            const { password, ...responseUser } = user._doc;
                            return res.status(201).send({ message: "User Registered Successfully", User: responseUser})                                              
                          })
                }).catch(error => { 
                    return res.status(500).send({
                        error: "Unable to hashed password"
                    })
                })   
            }             
    } catch (error) {
        return res.status(500).send(error);
    }

}

export async function login(req, res) {

  const { email, password } = req.body;    
  try {

      const existemail = await UserModel.exists({ email: email });
      if (!existemail) {
        return res.status(400).send({ error: "Email Does not Exist" })
    }
      const user = await UserModel.findOne({ email })
      bcrypt.compare(password, user.password)
      .then(passwordCheck => {
          if (!passwordCheck) return res.status(400).send({ error: "Incorrect Password" });
          if (!user) {
              return res.status(404).send("User Not Found");
          }    
          const token = jwt.sign({
              userId: user._id,
              email: user.email
          }, process.env.JWT_SECRET, { expiresIn: "720h" });  
  
      const { password, ...responseUser } = user._doc;

      return res.status(200).send({ message: "Login Successful...!", user: responseUser, token: token });
  })
  } catch (error) {
      return res.status(500).send({ error });
  }
}


export async function getUser(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await UserModel.findById(userId);
    
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    const { password, ...rest } = Object.assign({}, user.toJSON());      
    res.status(200).send(rest);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
}

export async function getUserById (req, res) {
    try {
      const { userId } = req.params;

      const user = await UserModel.findById(userId);
      
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      const { password, ...rest } = Object.assign({}, user.toJSON());      
      res.status(200).send(rest);
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
}

export async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
}
export async function deleteUser(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
  
      if (userId) {
      const deluser = await UserModel.deleteOne({ _id: userId });
          return res.status(200).send({ message: "Record Deleted...!" });
      } else {
        return res.status(401).send({ error });
      }
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  }

  export async function updateUser(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    try {
      const body = req.body;  

      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).send("User Not Found");
      }

      if (body.email) {
        const existingemail = await UserModel.findOne({ email: body.email});
  
        if (existingemail) {
          throw new Error("Email already exists");
        }
      }      

      if (body.username) {
        const existingusername = await UserModel.findOne({ username: body.username});
  
        if (existingusername) {
          throw new Error("Username already exists");
        }
      }      

      if (body.number) {
        const existingnumber = await UserModel.findOne({ number: body.number});
  
        if (existingnumber) {
          throw new Error("Number already exists");
        }
      }      

      const updatep = await UserModel.updateOne({ _id: userId }, body);
      if (!updatep) {
        return res.status(401).send({ message: "User not updated" });
      }
      if (updatep) {
        return res.status(201).send({ message: "User updated...!", user: body });
      }
  } catch (error) {
    res.status(500).json({
      status: error.status,
      message: error.message,
    });
  }
}

  export async function changePassword(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    try {
      const { oldPassword, newPassword } = req.body;

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User Not Found");
      }
      const currentPass = user.password
      bcrypt.compare(oldPassword, currentPass)
      .then(passwordCheck => {
          if (!passwordCheck) return res.status(400).send({ error: "Incorrect Password" });
      bcrypt.compare(newPassword, currentPass)
      .then(passwordCheck2 => {
        if (passwordCheck2) return res.status(400).send({ error: "Please user a password different from your existing password!"})
        if (user) {
          bcrypt.hash(newPassword, 10)
                .then(async hashedPassword => {

                  const newpass = await UserModel.updateOne({ _id: userId}, {password: hashedPassword});

                  if (newpass){
                    return res.status(201).send({ msg: "Password Changed successfully"})
                    }
                  else {
                    return res.status(400).send({ msg: "Unable to change password" })  
                  }
              }).catch(error => {
                  return res.status(500).send({
                      error: "Unable to hashed password"
                  })
              })   
          }
      })
      })        
    } catch (error) {
      res.status(400).json({
        status: error.status,
        message: error.message,
      });
    }
  }
