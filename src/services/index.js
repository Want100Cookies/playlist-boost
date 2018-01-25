const playlists = require('./playlists/playlists.service.js');
const users = require('./users/users.service.js');
module.exports = function (app) {
  app.configure(playlists);
  app.configure(users);
};
