/* const { DataTypes } = require("sequelize");   remove this causing  error 
const { sequelize } = require("."); */


module.exports =(sequelize,DataTypes)=>{
   const  searchHistory =sequelize.define("searchHistory",{
        query: DataTypes.STRING,
      userId: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' }
  },
     timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
    })
    return searchHistory;  
}

/* if we miss return 
// db[model.name] = model;
^
   
TypeError: Cannot read properties of undefined (reading 'name')
    at C:\Backend\MS1\models\index.js:45:14
    at Array.forEach (<anonymous>)
    at Object.<anonymous> (C:\Backend\MS1\models\index.js:43:4) */