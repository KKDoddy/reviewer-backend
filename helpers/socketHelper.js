import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';

dotenv.config();

const { User } = models;
const { Token } = models;

const verifyToken = async (token) => {
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const userExists = await User.findOne({
      where: { id: verify.id }
    });
    const tokenExists = await Token.findOne({
      where: { tokenValue: token }
    });

    if (userExists) {
      if (tokenExists) {
        return {verdict: true, user: userExists};
      }
      return {verdict: false};
    }
    return false;
  } catch (error) {
      console.log(error);
      return {verdict: false};
  }
};

let drivers = [];

const registerSocket = async (socket) => {
    socket.on('authenticate', async ({token}) => {
        const tokenVerifies = await verifyToken(token);
        if(tokenVerifies.verdict) {
          // console.log(`socket id: ${socket.id}`);
          const { id, name, profilePhoto, role } = tokenVerifies.user;
          console.log(`tokenVerifies: ${id}, name: ${name}, role: ${role}`);
            socket.on('broadcastLocation', (location) => {
                if(role === 'DRIVER'){
                    socket.driverDetails = {id, name};
                    const driverExists = drivers.find(driver => driver.id === id);
                    console.log(`driverExists: ${JSON.stringify(driverExists)}`);
                    if(!driverExists){
                      console.log('if worked');
                      drivers.push({ id, name, profilePhoto, longitude: location.longitude, latitude: location.latitude });
                      socket.broadcast.emit('addDriver', [{ id, name, profilePhoto, longitude: location.longitude, latitude: location.latitude }]);
                    }
                    // console.log(`drivers: ${JSON.stringify(drivers)}`);
                } else {
                    socket.emit('addDriver', drivers);
                }
            });
            
            return;
        }
        console.log('disconnected this socket');
        socket.disconnect();
    });
    socket.on('disconnect', async() => {
      console.log(`disconnected Driver details: ${JSON.stringify(socket.driverDetails)}`);
      if (socket.driverDetails) {
        drivers = drivers.filter(driver => driver.id !== socket.driverDetails.id);
        socket.broadcast.emit('removeDriver', socket.driverDetails);
      }
    });
};

export { registerSocket }
