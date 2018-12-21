class Tracks {
  constructor() {
    this.tracks = {};
  }

  addTrack(id, exec_id, artist, title) {
    this.tracks[exec_id] = { id, execId: exec_id, artist, title }
  }

  getTrack(id) {
    return this.tracks[id];
  }

  getTracks() {
    return this.tracks;
  }
}

module.exports = { Tracks };