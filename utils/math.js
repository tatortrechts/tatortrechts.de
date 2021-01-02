const round = (x, n) => {
  const tenN = Math.pow(10, n);
  return Math.round(x * tenN) / tenN;
};

export { round };
