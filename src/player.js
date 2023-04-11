const Player = (enemyBoard, computerPlayer, ownBoard) => {
  // Add human on
  // Human only for testing, remove after
  let ai = false;

  const computerOn = () => {
    ai = true;
  };

  const computer = () => ai;

  const attack = (x, y) => {
    enemyBoard.receiveAttack(x, y);
    if (computerPlayer !== undefined) {
      if (computerPlayer.computer() === true) {
        // autoMove();
        humanAutoMove();
      }
    }
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Add autoMove if human on, target coord in ship record
  // Human autoMove only for testing, remove after
  const humanAutoMove = () => {
    const coords = [];
    const shipKeys = Object.keys(ownBoard.shipRecord);
    const hitKeys = Object.keys(ownBoard.hitRecord);
    shipKeys.forEach((ship) => {
      const coordObj = ownBoard.shipRecord[ship];
      const coordKeys = Object.keys(coordObj);
      coordKeys.forEach((coord) => {
        coords.push(coord);
      });
    });

    ownBoard.receiveAttack(
      Number(coords[hitKeys.length][0]),
      Number(coords[hitKeys.length][2])
    );
    // console.log(coords, coords[0][0], coords[0][2], ownBoard.hitRecord);
  };

  const autoMove = () => {
    const x = getRandomInt(0, 9);
    const y = getRandomInt(0, 9);

    const response = ownBoard.receiveAttack(x, y);

    if (response !== undefined) {
      return autoMove();
    }
  };

  return { attack, computerOn, computer, getRandomInt };
};

export default Player;
