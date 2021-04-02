const formatDigit = (digit: number) => (digit < 10 ? `0${digit}` : `${digit}`);

const calculateTimer = (timeInSeconds: number): Array<string> => {
  let hours: number = Math.floor(timeInSeconds / 3600);
  let minutes: number = Math.floor((timeInSeconds - hours * 3600) / 60);
  let seconds: number = timeInSeconds - hours * 3600 - minutes * 60;

  return [formatDigit(hours), formatDigit(minutes), formatDigit(seconds)];
};

export default calculateTimer;
