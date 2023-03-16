const Ship = (length, hits, sunk) => {
  const hit = () => {
    hits += 1;
  };

  const isSunk = () => {
    if (length === hits) {
      sunk = true;
    }
  };

  return { length, hits, sunk, hit, isSunk };
};

export default Ship;
