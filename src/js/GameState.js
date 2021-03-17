import Player from './models/Player';
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

    console.log(object);

    state.players = object.players.map((rowPlayer) => {
      rowPlayer.team.forEach((member) => console.log(member.position));
      const team = rowPlayer.team.map((member) => new PositionedCharacter(member.character, member.position));
      console.log(team);
      const player = new Player(rowPlayer.nation, rowPlayer.startPos, rowPlayer.ai, team);
      return player;
    });

    console.log(state);

    return state;
  }
}
