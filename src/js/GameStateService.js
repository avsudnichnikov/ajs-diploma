import GameState from './GameState';

export default class GameStateService {
  constructor(storage) {
    this.storage = storage;
    this.gameState = new GameState();
  }

  get maxScore() {
    return +this.storage.getItem('maxScore') || 0;
  }

  set maxScore(value) {
    this.storage.setItem('maxScore', value);
  }

  save() {
    this.storage.setItem('state', JSON.stringify(this.gameState));
  }

  load() {
    try {
      this.gameState = GameState.from(JSON.parse(this.storage.getItem('state')));
    } catch (e) {
      console.warn(e);
      throw new Error('Invalid state');
    }
  }
}
