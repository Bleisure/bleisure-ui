export default (
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER,
) => Math.floor(Math.random() * (max - min + 1)) + min
