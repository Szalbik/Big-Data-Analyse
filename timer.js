class Timer {
  constructor() {
    this.startTime = +new Date();
  }

  result() {
    this.endTime = +new Date();
    return this.endTime - this.startTime;
  }
};

module.exports = Timer;