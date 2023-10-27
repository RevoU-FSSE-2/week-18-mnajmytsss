const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SIGN } = require('../config');

const validRoles = ['admin', 'user']

const register = async (req, res) => {
    const userCollection = req.usersCollection;
    const {username, password, role} = req.body;

    try {
        if (username ==='') {
            throw new Error('username can not be blank');
        } 
        if (!validRoles.includes(role)) {
            throw new Error('Invalid role')
        }
        const user = await userCollection.findOne({ username });
        if (user) {
            throw new Error('usernmae is already exist')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await req.usersCollection.insertOne({ username, password: hashedPassword, role});
        res.status(200).json({
            message: 'user successfully registered',
            data: newUser
        })
        
    } catch (error) {
        res.status(401).json({
            error: error.message
        })
    }
}

const login = async (req, res) => {
  const { usersCollection } = req;
  const { username, password } = req.body;

  try {
      const user = await usersCollection.findOne({ username });

      if (user) {
          const isPasswordCorrect = await bcrypt.compare(password, user.password);

          if (isPasswordCorrect) {
              const tokenPayload = {
                  username: user.username,
                  id: user._id,
                  role: user.role,
              };

              const token = jwt.sign(tokenPayload, JWT_SIGN);

              res.status(200).json({
                  message: "User successfully logged in",
                  data: {
                      token,
                      user: {
                          username: user.username,
                          role: user.role,
                      },
                  },
              });
          } else {
              res.status(400).json({ error: "Password is incorrect" });
          }
      } else {
          res.status(400).json({ error: "User not found" });
      }
  } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    register,
    login
}
