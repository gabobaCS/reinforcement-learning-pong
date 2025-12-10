import { useEffect, useRef, useState } from 'react';
import type { Paddle, Ball, GameConfig } from './types';

interface PongGameProps {
  width?: number;
  height?: number;
}

const PongGame = ({ width = 800, height = 400 }: PongGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);

  const gameConfig: GameConfig = {
    canvasWidth: width,
    canvasHeight: height,
    paddleWidth: 10,
    paddleHeight: 100,
    ballRadius: 8,
    ballSpeed: 5,
  };

  const playerRef = useRef<Paddle>({
    x: 20,
    y: height / 2 - 50,
    dy: 0,
  });

  const aiRef = useRef<Paddle>({
    x: width - 30,
    y: height / 2 - 50,
    dy: 0,
  });

  const ballRef = useRef<Ball>({
    x: width / 2,
    y: height / 2,
    radius: gameConfig.ballRadius,
    speed: gameConfig.ballSpeed,
    dx: 5,
    dy: 5,
  });

  const scoresRef = useRef({
    player: 0,
    ai: 0,
  });

  const drawRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    color = 'white'
  ) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  };

  const drawCircle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    color = 'white'
  ) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  };

  const resetBall = () => {
    const ball = ballRef.current;
    ball.x = width / 2;
    ball.y = height / 2;
    ball.dx *= -1;
  };

  const update = () => {
    if (paused) return;

    const player = playerRef.current;
    const ai = aiRef.current;
    const ball = ballRef.current;
    const { paddleWidth, paddleHeight } = gameConfig;

    // Player paddle
    player.y += player.dy;
    player.y = Math.max(0, Math.min(height - paddleHeight, player.y));

    // Simple AI
    ai.y += (ball.y - (ai.y + paddleHeight / 2)) * 0.05;

    // Ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Scoring
    if (ball.x < 0) {
      scoresRef.current.ai++;
      resetBall();
      console.log('CPU Score');
    }

    if (ball.x > width) {
      scoresRef.current.player++;
      resetBall();
      console.log('Player Score');
    }

    // Wall collision
    if (ball.y < 0 || ball.y > height) {
      ball.dy *= -1;
    }

    // Paddle collision - Player
    if (
      ball.x - ball.radius < player.x + paddleWidth &&
      ball.y > player.y &&
      ball.y < player.y + paddleHeight
    ) {
      ball.dx *= -1;
      console.log('Collision Player');
    }

    // Paddle collision - AI
    if (
      ball.x + ball.radius > ai.x &&
      ball.y > ai.y &&
      ball.y < ai.y + paddleHeight
    ) {
      ball.dx *= -1;
      ball.x = ai.x - ball.radius; // Prevent sticking
      console.log('Collision CPU');
    }

    // Out of bounds
    if (ball.x < 0 || ball.x > width) {
      resetBall();
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const player = playerRef.current;
    const ai = aiRef.current;
    const ball = ballRef.current;
    const { paddleWidth, paddleHeight } = gameConfig;

    ctx.clearRect(0, 0, width, height);

    // Draw scores
    ctx.fillStyle = 'white';
    ctx.font = "50px 'Roboto Mono', monospace";
    ctx.fillText(
      `Player: ${scoresRef.current.player} | AI: ${scoresRef.current.ai}`,
      120,
      450
    );

    // Draw paddles and ball
    drawRect(ctx, player.x, player.y, paddleWidth, paddleHeight);
    drawRect(ctx, ai.x, ai.y, paddleWidth, paddleHeight);
    drawCircle(ctx, ball.x, ball.y, ball.radius);

    // Debug markers (from original)
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, 5, 5);
    ctx.fillStyle = 'green';
    ctx.fillRect(ai.x, ai.y, 5, 5);
  };

  const loop = () => {
    update();
    draw();
    requestAnimationFrame(loop);
  };

  // Keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const player = playerRef.current;
      if (e.key === 'ArrowUp') {
        player.dy = -6;
      } else if (e.key === 'ArrowDown') {
        player.dy = 6;
      } else if (e.key === 'p') {
        setPaused((prev) => !prev);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const player = playerRef.current;
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        player.dy = 0;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game loop
  useEffect(() => {
    const animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
    };
  });

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        background: '#000',
        border: '2px solid #fff',
      }}
    />
  );
};

export default PongGame;
