import Gameboard from './gameboard';
import Player from './player';

const playerBoard = Gameboard();
const computerBoard = Gameboard();
const computerPlayer = Player(playerBoard);
computerPlayer.computerOn();
const humanPlayer = Player(computerBoard, computerPlayer, playerBoard);

export { playerBoard, computerBoard, humanPlayer };
