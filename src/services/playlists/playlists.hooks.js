const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [],
    find: [
      hooks.restrictToOwner()
    ],
    get: [
      hooks.restrictToOwner()
    ],
    create: [
      hooks.associateCurrentUser(),
      (context) => {
        context.data.createdAt = new Date();
        context.data.updatedAt = new Date();
      },
      (context) => {
        if (context.data.title.trim() === '') {
          throw new Error("Title cannot be null!");
        }
      }
    ],
    update: [
      hooks.restrictToOwner()
    ],
    patch: [
      hooks.restrictToOwner()
    ],
    remove: [
      hooks.restrictToOwner()
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
