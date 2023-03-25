const Player = (enemyBoard, computerPlayer, ownBoard) => {
  let ai = false;

  const computerOn = () => {
    ai = true;
  };

  const computer = () => ai;

  const attack = (x, y) => {
    enemyBoard.receiveAttack(x, y);
    if (computerPlayer !== undefined) {
      if (computerPlayer.computer() === true) {
        autoMove();
      }
    }
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const autoMove = () => {
    const x = getRandomInt(0, 9);
    const y = getRandomInt(0, 9);
    console.log(x, y);

    const response = ownBoard.receiveAttack(x, y);

    if (response !== undefined) {
      return autoMove();
    }
    console.log(ownBoard.hitRecord);
  };

  return { attack, computerOn, computer, getRandomInt };
};

export default Player;
