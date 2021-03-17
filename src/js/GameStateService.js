import GameState from './GameState';

export default class GameStateService {
  constructor(storage) {
    this.storage = storage;
    this.gameState = new GameState();
  }

  save() {
    this.storage.setItem('state', JSON.stringify(this.gameState));
  }

  load() {
    try {
      this.gameState = GameState.from(JSON.parse(this.storage.getItem('state')));
    } catch (e) {
      throw new Error('Invalid state');
    }
  }
}
