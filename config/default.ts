export default {
  server_port: process.env.SERVER_PORT,
  jwt_secret: process.env.JWT_SECRET,
  environment: process.env.DEBUG,
  mongodb_connect: process.env.MONGODB_CONNECT,
};
