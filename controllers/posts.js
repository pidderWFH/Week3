const serviceHandle = require("../service/handle");
const Post = require("../model/posts");

const posts = {
    async getAllPosts(req, res){
        const allPost = await Post.find();
        serviceHandle.handleSucess(res, allPost);
    },
    async createdPosts(req, res){
        try{
            // const data = JSON.parse(body); express已經有做了
            const { body } = req;
            
            if(body.content !== undefined && body.content != " " && body.name !== " "){
                const newPost = await Post.create(
                    {
                        name: body.name,
                        content: body.content,
                        tags: body.tags,
                        type: body.type,
                        likes: body.likes
                    }
                );
                serviceHandle.handleSucess(res, newPost)
                
            }else{
                serviceHandle.handleError(res, errCode=401, "欄位不能空白");
            }
        }catch( err ){
            
            serviceHandle.handleError(res, 400, err.message);
        }
    },
    async deleteAllPosts(req, res){
        const posts = await Post.deleteMany({});
        serviceHandle.handleSucess(res, posts);
    },
    async deleteOnePosts(req, res){
        try {
            const id = req.url.split('/').pop();
            deleteOne = await Post.findByIdAndDelete(id);
    
            if (deleteOne){
                const post = await Post.find(id);
                serviceHandle.handleSucess(res, post);
            }else{
                serviceHandle.handleError(res, 402, "查無此ID")
            }
        } catch (err) {
            serviceHandle.handleError(res, 400, err.message)
        }
    },
    async patchPosts(req, res){
        try {
            const id = req.url.split("/").pop();
            const { body } = req;
            let { name, content, tags, type, likes } = body;
            const patchPost = await Post.findByIdAndUpdate(id, { $set: {name, content, tags, type, likes} });


            if (body.content == undefined || body.content == "" || body.name == "" || body.content == " " || body.name == " "){
                return serviceHandle.handleError(res, 401, "內容未填寫或為空白");
            }

    
            if (patchPost === null){
                return serviceHandle.handleError(res, 402, "查無此ID");
            }else {
                const post = await Post.findOne({_id: id});
                serviceHandle.handleSucess(res, post);
            } 
        } catch (err) {
            serviceHandle.handleError(res, 400, err.message);
        }
    },
}

module.exports = posts;