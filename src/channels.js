module.exports = function (app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult, {connection}) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged in user from the connection
      const user = connection.user;

      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);
      app.channel(`users/${user.spotifyId}`).join(connection);

      app.service('playlists').publish((data, context) => {
        return app.channel(`users/${user.spotifyId}`);
      });
    }
  });


  // app.publish((data, hook) => { // eslint-disable-line no-unused-vars
  //   // Here you can add event publishers to channels set up in `channels.js`
  //   // To publish only for a specific event use `app.publish(eventname, () => {})`
  //
  //   console.log('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line
  //
  //   // e.g. to publish all service events to all authenticated users use
  //   return app.channel('authenticated');
  // });

  // Here you can also add service specific event publishers
  // e..g the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};
