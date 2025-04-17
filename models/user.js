/* 

module.exports =(sequelize,DataTypes)=>{
    const User = sequelize.define("User",{
        username: DataTypes.STRING,
        email: DataTypes.STRING,  
    })

    return User;
} */

    module.exports = (sequelize, DataTypes) => {
        const User = sequelize.define("User", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            tableName: "users", // Ensure this matches the migration file
            timestamps: true
        });
    
        return User;
    };
    