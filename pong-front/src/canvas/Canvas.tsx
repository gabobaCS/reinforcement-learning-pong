import PongGame from './PongGame';

interface CanvasProps {
  width?: number;
  height?: number;
  className?: string;
}

const Canvas = ({ width = 800, height = 400, className }: CanvasProps) => {
  return (
    <div className={className}>
      <PongGame width={width} height={height} />
    </div>
  );
};

export default Canvas;
