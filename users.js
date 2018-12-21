const _ = require('lodash');

class Users {
  constructor() {
    this.users = {};
  }

  addUser(user_id, sound_id) {
    if (this.users[user_id]) {
      this.users[user_id][sound_id] = true
    } else {
      this.users[user_id] = {}
      this.users[user_id][sound_id] = true
    }
  }

  getUser(id) {
    return this.users[id];
  }

  getUserUniqueSoundsLength(id) {
    return Object.keys(this.users[id]).length;
  }

  getUsersThatListenSpecifisSongs(songs) {
    let result = []

    _.forEach(Object.entries(this.users), (userSongsListened) => {
      if (Object.keys(userSongsListened[1]).includes(songs[0].id) && 
          Object.keys(userSongsListened[1]).includes(songs[1].id) && 
          Object.keys(userSongsListened[1]).includes(songs[2].id)) {
        result.push(userSongsListened[0])
      }
    })

    return result;
  }

  getUsers() {
    return this.users;
  }
}

module.exports = { Users };