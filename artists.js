class Artists {
  constructor() {
    this.artists = {};
  }

  addArtist(name, execId) {
    if(this.artists[name]) {
      this.artists[name].execIds.push(execId)
    } else {
      this.artists[name] = { name, execIds: [execId] };
    }
  }

  getArtist(name) {
    return this.artists[name];
  }

  getArtists() {
    return this.artists;
  }
}

module.exports = { Artists };