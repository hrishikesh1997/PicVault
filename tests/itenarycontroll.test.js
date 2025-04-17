const request = require("supertest")
const app = require("../app")
const { Photo ,Tag ,searchHistory } = require("../models")
const { DESCRIBE } = require("sequelize/lib/query-types");
const { query } = require("express");
process.env.NODE_ENV = 'test';  // Force using the test configuration

jest.mock("../models")

describe("Serch by tags",()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })
    
    it("should return photos of valid tags",async ()=>{
        const mockphotos = [{
            id:1,
            imageUrl: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTY3ODl8MHwxfHNlYXJjaHw4fHxuYXR1cmV8ZW58MHx8fHwxNzQyNTA5MTEzfDA&ixlib=rb-4.0.3&q=80&w=1080",
            description: "No description available",
            altDescription: "white clouds during daytime",
            dateSaved: new Date(),
            Tags:[{name : "mountain" },{name :"nature"}]
        },
        {
            imageUrl: "https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTY3ODl8MHwxfHNlYXJjaHw5fHxuYXR1cmV8ZW58MHx8fHwxNzQyNTA5MTEzfDA&ixlib=rb-4.0.3&q=80&w=1080",
            description: "No description available",
            altDescription: "macro photography of drop of water on top of green plant",
            dateSaved: new Date(),
            Tags:[{name : "mountain"}]
        }
    ]

      Tag.findAll.mockResolvedValue([{photoId:1},{photoId:2}])
      Photo.findAll.mockResolvedValue(mockphotos)

      const res = await request(app).get("/api/photos/tag/search?tags=mountain&sort=ASC&userId=1")

      expect(res.statusCode).toBe(200);
      expect(res.body.photos).toHaveLength(2);
      expect(res.body.photos[0].tags).toContain("mountain")
    })

    it("should return 404 error if no photos found ",async()=>{
        Tag.findAll.mockResolvedValue(null)

        const res =await request(app).get("/api/photos/tag/search?tags=invalid&sort=ASC&userId=1")
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("No photos found for the provided tag")
    })

    it("should return history for valid userId",async()=>{
        const mockHistroery =[
            {
              query :"mountains" ,createdAt:"2024-01-01T12:00:00Z"
            },
            {
                query: "nature", createdAt: "2024-01-05T08:00:00Z"
            }
        ]

        searchHistory.findAll.mockResolvedValue(mockHistroery)

        const res = await request(app).get("/api/search-history").query({userId:1})

        expect(res.statusCode).toBe(200)
        expect(res.body.searchHistory).toHaveLength(2)
        expect(res.body.searchHistory[0].query).toContain("mountains")
    })

    it("should return 404 if userId is not provide ",async()=>{
        const res = await request(app).get("/api/search-history")

        expect(res.statusCode).toBe(404)
        expect(res.body.error).toBe("userId is required")
    })

    it("should return 404 if no history found for user ",async()=>{
        searchHistory.findAll.mockResolvedValue([])
       
        const res = await request(app).get("/api/search-history").query({userId:99})
        expect(res.statusCode).toBe(404)
        expect(res.body.error).toBe("No serch Historey found")
    })
})