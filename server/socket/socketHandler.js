const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinQueue', (orgId) => {
      socket.join(orgId);
      console.log(`Socket ${socket.id} joined queue: ${orgId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = socketHandler;