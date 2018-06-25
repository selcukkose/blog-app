exports.plugin = {
    name: "blogRequestHandler",
    register: async (server, options) => {

        server.route({
            method: 'POST',
            path: '/api/insertblog',
            handler: async (request, h) => {

                title = request.payload.title;
                text = request.payload.text;
                createDate = request.payload.createDate;
                lastModified = request.payload.lastModified;
                email = request.payload.email;

                return await server.methods.insertBlog(title, text, createDate, lastModified, email);
            }   
        });

        server.route({
            method: 'POST',
            path: '/api/deleteblog',
            handler: async (request, h) => {

                id = request.payload.id
            
                return await server.methods.insertBlog(id);
            }   
        });

        server.route({
            method: 'POST',
            path: '/api/updateblog',
            handler: async (request, h) => {

                blogId = request.payload.blogId;
                newTitle = request.payload.title;
                newText = request.payload.text;

                console.log(blogId + ' ' + newTitle + ' ' + newText)
            
                return await server.methods.updateBlog(blogId, newTitle, newText);
            }   
        });

        server.route({
            method: 'GET',
            path: '/api/allblogs',
            handler: async (request, h) => {
            
                return await server.methods.getAllBlogs();
            }   
        });

        server.route({
            method: 'POST',
            path: '/api/userblogs',
            handler: async (request, h) => {

                email = request.payload.email
                console.log(email)
            
                return await server.methods.userSpecificBlogs(email);
            }   
        });

        server.route({
            method: 'POST',
            path: '/api/isblogavaiable',
            handler: async (request, h) => {

                title = request.payload.title;
                userId = request.payload.userId;
            
                return await server.methods.isBlogAvaiable(title, userId);
            }   
        });
    }
}