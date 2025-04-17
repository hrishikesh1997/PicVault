const { query } = require("express");
const axiosinstance = require("../lib/axios.lib");
const { Photo, Tag ,searchHistory } = require("../models");  // ✅ Corrected model import
const { where } = require("sequelize");

const searchImages = async (req, res) => {
    try {
        const query = req.query.query || "nature"; // Extract query properly (default: 'nature')

        if (!query) {
            return res.status(400).json({ error: "Search term is required" });
        }

        if (!process.env.UNSPLASH_ACCESS_KEY) {
            throw new Error("Unsplash API key is missing. Please configure the .env file.");
        }

        const response = await axiosinstance.get("/search/photos", {
            params: {
                query,
                per_page: 10,
                client_id: process.env.UNSPLASH_ACCESS_KEY
            }
        });

        if (!response.data.results || response.data.results.length === 0) {
            return res.status(404).json({ error: `No images found for the query '${query}'.` });
        }

        const photos = response.data.results.map(img => ({
            imageUrl: img.urls.regular,
            description: img.description || "No description available",
            altDescription: img.alt_description || "No alternative description available"
        }));

        res.json({ photos }); // Send only relevant API response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const SavePhoto = async (req, res) => {
    try {
        const { imageUrl, description, altDescription, tags, userId } = req.body;

        if (!imageUrl.startsWith("https://images.unsplash.com/")) {
            return res.status(400).json({ message: "Invalid image URL." });
        }

        if (tags && tags.length > 5) {
            return res.status(400).json({ message: "You can provide a maximum of 5 tags." });
        }

        const newPhoto = await Photo.create({ imageUrl, description, altDescription, userId });

        if (tags && tags.length > 0) {
            const tagObjects = tags.map(tag => ({ name: tag, photoId: newPhoto.id }));
            await Tag.bulkCreate(tagObjects);  // ✅ Corrected 'bulkcreate' to 'bulkCreate'
        }

        res.status(201).json({ message: "Photo saved successfully" });

    } catch (error) {
        console.error("Error saving photo:", error.message);  // Log the actual error
        res.status(500).json({ message: "Internal server error" });
    }
};

   const AddTagsTophoto = async (req,res)=>{
    const {photoId} =req.params;
    const {tags} =req.body;

    try {
        if (!Array.isArray(tags) || tags.some(tag => typeof tag !== "string" || tag.trim() === "")) {
            return res.status(400).json({ error: "Tags must be an array of non-empty strings." });
          }
          

         const photo = await Photo.findByPk(photoId,{
            include:{
                model :Tag, as:"Tags"
            }
         })

         if(!photo){
            return res.status(404).json({error:"photo not found "})
         }

         const currenttags = photo.Tags.length;
         const newtgasCount = tags.length;

         if(currenttags + newtgasCount >5){
            return res.status(400).json({error:"maximum 5 tags allowed "})
         }

         const tagInstance = tags.map(tagname =>(
            {
                name : tagname,

                photoId : photoId
            }
         ))

         await Tag.bulkCreate(tagInstance)
         res.status(200).json({message:"tags added succsfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }

 
   }

   const SerchBytags =async(req,res)=>{
      const { tags ,sort="ASC",userId } = req.query;

       try {
        if(!tags || typeof tags !=="string"){
            return res.status(400).json({error:'A valid tags must provided as query parameter '})
          }
    
          if(!['ASC','DESC'].includes(sort.toUpperCase())){
            return res.status(400).json({error:'Invalid sort value useASC or DESC'})
          }
    
          if(userId){
            await searchHistory.create({
                userId,
                query:tags
            })
          }
    
          const tagRecorad = await Tag.findAll({
            where :{
                name : tags
            }
          })
    
          if(!tagRecorad){
            return res.status(404).json({error:"No photos found for the provided tag"})
          }
    
          const photoIDs = tagRecorad.map(tag=>tag.photoId)
          const photos = await Photo.findAll({
            where:{
                id:photoIDs
            },
            order:[['dateSaved',sort.toUpperCase()]],
            include:[{model :Tag ,attributes:['name']}]
          })
    
          const response = photos.map(photo =>({
            
            imageUrl:photo.imageUrl,
            description:photo.description,
            dateSaved:photo.dateSaved,
            tags:photo.Tags.map(tag=> tag.name)
            
          }))
    
          return res.json({photos:response})
       } catch (error) {
        console.log(error)
          return res.status(500).json({error:error.message})
       }

       
   }

   const getSerchhistorey =async(req,res)=>{
    const {userId} = req.query;
    try {
        if(!userId){
            return res.status(404).json({error:"userId is required"})
        }

        const serchHistry = await searchHistory.findAll({
            where:{userId},
            order:[['createdAt','DESC']],
            attributes:['query','createdAt']
        })

        if(serchHistry.length === 0){
            return res.status(404).json({error:"No serch Historey found"})
        }

        const response = serchHistry.map(history=>({
            query:history.query,
            timestamp:history.timestamp
        }))

        return res.status(200).json({searchHistory:response})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
   }

module.exports = { searchImages, SavePhoto ,AddTagsTophoto ,SerchBytags ,getSerchhistorey };
