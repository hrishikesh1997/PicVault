module.exports = (sequelize, DataTypes) => {
    const Tag = require("./tag")(sequelize, DataTypes); // Import Tag model

    const Photo = sequelize.define("Photo", {  // Model name can be "Photo" but the tableName must match
        imageUrl: { 
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isValidUnsplashUrl(value) {  
                    if (!value.startsWith("https://images.unsplash.com/")) {
                        throw new Error("Invalid image URL. Must be from Unsplash.");
                    }
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        altDescription: { 
            type: DataTypes.STRING,
            allowNull: true,
        },
        dateSaved: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' }
        }
    }, {
        tableName: 'photos',  // Ensure lowercase 'photos'
    });

    // Define associations
    Photo.hasMany(Tag, { foreignKey: "photoId", onDelete: "CASCADE" ,as:"Tags"});
    Tag.belongsTo(Photo, { foreignKey: "photoId" });

    return Photo;
};
 