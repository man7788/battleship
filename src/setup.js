import Gameboard from './gameboard';
import Player from './player';
import setPlayerShip from './set-player-ship';
import setComputerShip from './set-computer-ship';

const setGame = () => {
  const playerBoard = Gameboard();
  const computerBoard = Gameboard();
  const computerPlayer = Player(playerBoard);
  computerPlayer.computerOn();
  const humanPlayer = Player(computerBoard, computerPlayer, playerBoard);

  setPlayerShip(playerBoard, humanPlayer, computerBoard);
  setComputerShip(computerBoard);
};

export default setGame;
