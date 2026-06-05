require("dotenv").config();
const http   = require("http");
const { Server } = require("socket.io");
const jwt    = require("jsonwebtoken");
const app    = require("./app");

const PORT   = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true },
});

// Authenticate socket connections
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("No token"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

// Track driver sockets: driverId → socketId
const driverSockets = new Map();
// Track ride rooms: bookingId → { customerId, driverId }
const rideRooms = new Map();

io.on("connection", (socket) => {
  const { id: userId, role } = socket.user;

  if (role === "DRIVER") {
    driverSockets.set(userId, socket.id);
    socket.on("disconnect", () => driverSockets.delete(userId));
  }

  // Driver sends live location
  socket.on("driver:location", ({ bookingId, lat, lng }) => {
    const room = rideRooms.get(Number(bookingId));
    if (room) {
      io.to(`ride:${bookingId}`).emit("driver:location", { lat, lng, timestamp: Date.now() });
    }
  });

  // Customer joins a ride room
  socket.on("ride:join", ({ bookingId }) => {
    socket.join(`ride:${bookingId}`);
  });

  // Driver joins a ride room
  socket.on("driver:join", ({ bookingId }) => {
    socket.join(`ride:${bookingId}`);
  });

  // Notify customer when driver accepts ride
  socket.on("ride:accepted", ({ bookingId, customerId }) => {
    rideRooms.set(Number(bookingId), { customerId, driverId: userId });
    io.to(`ride:${bookingId}`).emit("ride:accepted", { bookingId, driverId: userId });
  });

  socket.on("ride:started", ({ bookingId }) => {
    io.to(`ride:${bookingId}`).emit("ride:started", { bookingId });
  });

  socket.on("ride:completed", ({ bookingId }) => {
    io.to(`ride:${bookingId}`).emit("ride:completed", { bookingId });
    rideRooms.delete(Number(bookingId));
  });
});

// Expose io to controllers via app
app.set("io", io);

server.listen(PORT, () => {
  console.log(`BearRide server + Socket.io running on port ${PORT}`);
});
