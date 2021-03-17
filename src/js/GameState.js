import Player from './models/Player';
import CharacterController from './CharacterController';
import PositionedCharacter from './models/PositionedCharacter';

export default class GameState {
  constructor(turn = -1, level = 1, score = 0) {
    this.players = [];
    this.turn = turn;
    this.level = level;
    this.score = score;
  }

  static from(object) {
    const state = new GameState(object.turn, object.level, object.score);
    state.players = object.players.map((rowPlayer) => {
      const team = rowPlayer.team.map(
        (member) => {
          const character = CharacterController.restoreChar(member.character);
          return new PositionedCharacter(character, member.position);
        },
      );
      return new Player(rowPlayer.nation, rowPlayer.startPos, rowPlayer.ai, team);
    });

    return state;
  }
}
