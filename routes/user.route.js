// inside of user.routes.js
const UserController = require('../controllers/user.controller');

const { authenticate } = require('../config/jwt.config');
module.exports = app => {
  app.post('/api/users/register', UserController.register);
  app.post('/api/users/login', UserController.login);
  app.post('/api/users/logout', UserController.logout);
  app.post('/api/users/isLoggedIn', UserController.isLoggedIn);
  app.get('/api/users/',authenticate, UserController.findAll);
 
  app.get("/api/users/:id",authenticate,UserController.findUserWithProduct)
app.post("/api/users",authenticate,UserController.addProductToUser)
app.delete("/api/users",authenticate,UserController.deleteProductFromUser)





}

