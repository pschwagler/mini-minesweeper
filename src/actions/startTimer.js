const startTimer = () => ({
  type: 'START_TIMER',
  startTime: Date.now()
});

export default startTimer;
