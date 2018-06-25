const Blogs = require('../models/blog');

exports.plugin = {
    name: "blogs",
    register: async (server, options) => {

        const insertBlog = async (title, text, createDate, lastModified, email) =>{

            let isInserted = false;
            let isBlogAvaiable = await server.methods.isBlogAvaiable(title, email)

            if(!isBlogAvaiable){

                const newBlog = new Blogs({
                    title: title,
                    text: text,
                    createDate: createDate,
                    lastModified: lastModified,
                    email: email
                });
    
                let saved = await newBlog.save();
    
                if(saved)
                    isInserted = true;
            }

            return isInserted;
        }

        const deleteBlog = async (id) => {

            let isDeleted = false;

            await Blogs.deleteOne({_id: id}, (err)=>{
                if(err)
                    console.log(err);
                else
                    isDeleted = true;
            });

            return isDeleted;
        }  

        const updateBlog = async (blogId, newTitle, newText) => {

            let isUpdated = false;

            await Blogs.update({_id: blogId}, 
                {
                    $set:{
                        title: newTitle,
                        text: newText,
                        lastModified: new Date()
                    }
                }, (err) => {
                    
                    if(err)
                        console.log();
                    else
                        isUpdated = true;
                }
            );

            return isUpdated;
        }
        
        const getAllBlogs = async () => {

            let blogs = await Blogs.find({});

            return blogs;
        }

        const userSpecificBlogs = async (email) => {

            let blogs = Blogs.find({email: email})

            return blogs;
        }

        const isBlogAvaiable = async (title, userId) => {

            let isAvaiable = false;

            await Blogs.find({title: title, userId: userId}, (err, blogsData) => {
                if(err) 
                    console.log()
                else if(blogsData.length != 0)
                    isAvaiable = true   
            })

            return isAvaiable
        }

        server.method('insertBlog', insertBlog);
        server.method('deleteBlog', deleteBlog);
        server.method('updateBlog', updateBlog);
        server.method('getAllBlogs', getAllBlogs);
        server.method('userSpecificBlogs', userSpecificBlogs);
        server.method('isBlogAvaiable', isBlogAvaiable);
    }
}