const Ship = (length, orient) => {
  let sunk = false;
  let totalHits = 0;

  const hit = () => {
    totalHits += 1;
  };

  const calSunk = () => {
    if (length === totalHits) {
      sunk = true;
    }
  };

  const hits = () => totalHits;
  const isSunk = () => sunk;

  return { length, hit, calSunk, hits, isSunk, orient };
};

export default Ship;
