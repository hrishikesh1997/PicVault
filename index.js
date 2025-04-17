require("dotenv").config()

const {sequelize} = require("./models")

const port =3000



const app = require("./app")




sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    //return sequelize.sync({ force: false }); // Set `force: true` to drop and recreate tables
  })
  .then(() => {
    console.log('Database synchronized.');
    app.listen(port ,()=>{
      console.log(`App listening on http://localhost:${port}`); // ✅ Fix `${port}`
  
  })
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    
  });


  

