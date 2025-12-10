export interface Paddle {
  x: number;
  y: number;
  dy: number;
}

export interface Ball {
  x: number;
  y: number;
  radius: number;
  speed: number;
  dx: number;
  dy: number;
}

export interface GameConfig {
  canvasWidth: number;
  canvasHeight: number;
  paddleWidth: number;
  paddleHeight: number;
  ballRadius: number;
  ballSpeed: number;
}

export interface GameState {
  player: Paddle;
  ai: Paddle;
  ball: Ball;
  playerScore: number;
  aiScore: number;
  paused: boolean;
}
