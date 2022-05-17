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
            if(body.content !== undefined){
                const newPost = await Post.create(
                    {
                        name: body.name,
                        content: body.content,
                        tags: body.tags,
                        type: body.type
                    }
                );
                serviceHandle.handleSucess(res, newPost)
                
            }else{
                serviceHandle.handleError(res);
            }
        }catch( err ){
            serviceHandle.handleError(res, err);
        }
    },
    async deleteAllPosts(req, res){
        const posts = await Post.deleteMany({});
        serviceHandle.handleSucess(res, posts);
    },
    async deleteOnePosts(req, res){
        const id = req.url.split('/').pop();
        await Post.findByIdAndDelete(id);

        serviceHandle.handleSucess(res);
    },
    async patchPosts(req, res){
        try {
            const id = req.url.split("/").pop();
            const { body } = req;
            if(body.content !== " "){
                let { content } = body;
                const post = await Post.findByIdAndUpdate(id, { $set: {content}, });
                // console.log(post);
                serviceHandle.handleSucess(res, post);
            }else {
                serviceHandle.handleError(res, err);
            }
        } catch (err) {
            serviceHandle.handleError(res, err);
        }
    },
}

module.exports = posts;