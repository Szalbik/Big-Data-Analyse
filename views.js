class Views {
  constructor() {
    this.views = {};
  }

  addView(user_id, track_id, date) {
    this.views[id] = { id: track_id, userId: user_id, date }
  }

  getView(id) {
    return this.views[id];
  }

  getViews() {
    return this.views;
  }
}

module.exports = { Views };