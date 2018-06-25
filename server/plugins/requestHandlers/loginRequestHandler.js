exports.plugin = {
    name: "loginRequestHandler",
    register: async (server, options) =>{

        server.route({
            method: 'POST',
            path: '/api/adduser',
            handler: async (request, h) => {

                let email = request.payload.email;
                let password = request.payload.password;

                return await server.methods.addUser(email, password);
            }
        });

        server.route({
            method: 'DELETE',
            path: '/api/deleteuser',
            handler: async (request, h) => {

                let email = request.payload.email;
                let password = request.payload.password;

                return await server.methods.deleteUser(email, password);
            }
        });

        server.route({
            method: 'PUT',
            path: '/api/updatepassword',
            handler: async (request, h) => {

                let email = request.payload.email;
                let password = request.payload.password;

                return await server.methods.setPassword(email, password);
            }
        });

        server.route({
            method: 'POST',
            path: '/api/validateuser',
            handler: async (request, h) => {

                let email = request.payload.email;
                let password = request.payload.password;

                return await server.methods.validateUser(email, password);
            }
        });
    }
}