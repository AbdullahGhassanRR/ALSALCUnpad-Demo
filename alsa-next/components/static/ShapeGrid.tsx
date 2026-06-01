'use client';

import {useEffect, useRef} from 'react';

import styles from './ShapeGrid.module.css';

type ShapeGridProps = {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  shape?: 'square' | 'hexagon' | 'circle' | 'triangle';
  hoverTrailAmount?: number;
  className?: string;
};

type GridCell = {
  x: number;
  y: number;
};

export default function ShapeGrid({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 40,
  hoverFillColor = '#222',
  shape = 'square',
  hoverTrailAmount = 0,
  className = '',
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const canvasSize = useRef({width: 0, height: 0});
  const gridOffset = useRef({x: 0, y: 0});
  const hoveredSquare = useRef<GridCell | null>(null);
  const trailCells = useRef<GridCell[]>([]);
  const cellOpacities = useRef(new Map<string, number>());

  useEffect(
    function () {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');

      if (!canvas || !context) return;

      const isHex = shape === 'hexagon';
      const isTri = shape === 'triangle';
      const hexHoriz = squareSize * 1.5;
      const hexVert = squareSize * Math.sqrt(3);

      function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;

        canvasSize.current = {width, height};
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      function drawHex(cx: number, cy: number, size: number) {
        context.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const vx = cx + size * Math.cos(angle);
          const vy = cy + size * Math.sin(angle);
          if (i === 0) context.moveTo(vx, vy);
          else context.lineTo(vx, vy);
        }
        context.closePath();
      }

      function drawCircle(cx: number, cy: number, size: number) {
        context.beginPath();
        context.arc(cx, cy, size / 2, 0, Math.PI * 2);
        context.closePath();
      }

      function drawTriangle(cx: number, cy: number, size: number, flip: boolean) {
        context.beginPath();
        if (flip) {
          context.moveTo(cx, cy + size / 2);
          context.lineTo(cx + size / 2, cy - size / 2);
          context.lineTo(cx - size / 2, cy - size / 2);
        } else {
          context.moveTo(cx, cy - size / 2);
          context.lineTo(cx + size / 2, cy + size / 2);
          context.lineTo(cx - size / 2, cy + size / 2);
        }
        context.closePath();
      }

      function paintHoveredCell(cellKey: string, drawShape: () => void) {
        const alpha = cellOpacities.current.get(cellKey);

        if (!alpha) return;

        context.globalAlpha = alpha;
        drawShape();
        context.fillStyle = hoverFillColor;
        context.fill();
        context.globalAlpha = 1;
      }

      function drawGrid() {
        const {width, height} = canvasSize.current;

        context.clearRect(0, 0, width, height);
        context.lineWidth = 1;

        if (isHex) {
          const colShift = Math.floor(gridOffset.current.x / hexHoriz);
          const offsetX = ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
          const offsetY = ((gridOffset.current.y % hexVert) + hexVert) % hexVert;
          const cols = Math.ceil(width / hexHoriz) + 3;
          const rows = Math.ceil(height / hexVert) + 3;

          for (let col = -2; col < cols; col++) {
            for (let row = -2; row < rows; row++) {
              const cx = col * hexHoriz + offsetX;
              const cy =
                row * hexVert + ((col + colShift) % 2 !== 0 ? hexVert / 2 : 0) + offsetY;
              const cellKey = `${col},${row}`;

              paintHoveredCell(cellKey, function () {
                drawHex(cx, cy, squareSize);
              });

              drawHex(cx, cy, squareSize);
              context.strokeStyle = borderColor;
              context.stroke();
            }
          }
        } else if (isTri) {
          const halfW = squareSize / 2;
          const colShift = Math.floor(gridOffset.current.x / halfW);
          const rowShift = Math.floor(gridOffset.current.y / squareSize);
          const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
          const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
          const cols = Math.ceil(width / halfW) + 4;
          const rows = Math.ceil(height / squareSize) + 4;

          for (let col = -2; col < cols; col++) {
            for (let row = -2; row < rows; row++) {
              const cx = col * halfW + offsetX;
              const cy = row * squareSize + squareSize / 2 + offsetY;
              const flip = ((col + colShift + row + rowShift) % 2 + 2) % 2 !== 0;
              const cellKey = `${col},${row}`;

              paintHoveredCell(cellKey, function () {
                drawTriangle(cx, cy, squareSize, flip);
              });

              drawTriangle(cx, cy, squareSize, flip);
              context.strokeStyle = borderColor;
              context.stroke();
            }
          }
        } else if (shape === 'circle') {
          const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
          const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
          const cols = Math.ceil(width / squareSize) + 3;
          const rows = Math.ceil(height / squareSize) + 3;

          for (let col = -2; col < cols; col++) {
            for (let row = -2; row < rows; row++) {
              const cx = col * squareSize + squareSize / 2 + offsetX;
              const cy = row * squareSize + squareSize / 2 + offsetY;
              const cellKey = `${col},${row}`;

              paintHoveredCell(cellKey, function () {
                drawCircle(cx, cy, squareSize);
              });

              drawCircle(cx, cy, squareSize);
              context.strokeStyle = borderColor;
              context.stroke();
            }
          }
        } else {
          const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
          const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
          const cols = Math.ceil(width / squareSize) + 3;
          const rows = Math.ceil(height / squareSize) + 3;

          for (let col = -2; col < cols; col++) {
            for (let row = -2; row < rows; row++) {
              const sx = col * squareSize + offsetX;
              const sy = row * squareSize + offsetY;
              const cellKey = `${col},${row}`;
              const alpha = cellOpacities.current.get(cellKey);

              if (alpha) {
                context.globalAlpha = alpha;
                context.fillStyle = hoverFillColor;
                context.fillRect(sx, sy, squareSize, squareSize);
                context.globalAlpha = 1;
              }

              context.strokeStyle = borderColor;
              context.strokeRect(sx, sy, squareSize, squareSize);
            }
          }
        }
      }

      function updateCellOpacities() {
        const targets = new Map<string, number>();

        if (hoveredSquare.current) {
          targets.set(`${hoveredSquare.current.x},${hoveredSquare.current.y}`, 1);
        }

        if (hoverTrailAmount > 0) {
          for (let i = 0; i < trailCells.current.length; i++) {
            const trailCell = trailCells.current[i];
            const key = `${trailCell.x},${trailCell.y}`;
            if (!targets.has(key)) {
              targets.set(key, (trailCells.current.length - i) / (trailCells.current.length + 1));
            }
          }
        }

        for (const [key] of targets) {
          if (!cellOpacities.current.has(key)) {
            cellOpacities.current.set(key, 0);
          }
        }

        for (const [key, opacity] of cellOpacities.current) {
          const target = targets.get(key) || 0;
          const next = opacity + (target - opacity) * 0.15;
          if (next < 0.005) {
            cellOpacities.current.delete(key);
          } else {
            cellOpacities.current.set(key, next);
          }
        }
      }

      function updateAnimation() {
        const effectiveSpeed = Math.max(speed, 0.1);
        const wrapX = isHex ? hexHoriz * 2 : squareSize;
        const wrapY = isHex ? hexVert : isTri ? squareSize * 2 : squareSize;

        switch (direction) {
          case 'right':
            gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
            break;
          case 'left':
            gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + wrapX) % wrapX;
            break;
          case 'up':
            gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + wrapY) % wrapY;
            break;
          case 'down':
            gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
            break;
          case 'diagonal':
            gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
            gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
            break;
        }

        updateCellOpacities();
        drawGrid();
        requestRef.current = requestAnimationFrame(updateAnimation);
      }

      function addTrailCell() {
        if (hoveredSquare.current && hoverTrailAmount > 0) {
          trailCells.current.unshift({...hoveredSquare.current});
          if (trailCells.current.length > hoverTrailAmount) {
            trailCells.current.length = hoverTrailAmount;
          }
        }
      }

      function setHoveredCell(nextCell: GridCell) {
        if (
          !hoveredSquare.current ||
          hoveredSquare.current.x !== nextCell.x ||
          hoveredSquare.current.y !== nextCell.y
        ) {
          addTrailCell();
          hoveredSquare.current = nextCell;
        }
      }

      function handleMouseMove(event: MouseEvent) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (isHex) {
          const colShift = Math.floor(gridOffset.current.x / hexHoriz);
          const offsetX = ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
          const offsetY = ((gridOffset.current.y % hexVert) + hexVert) % hexVert;
          const adjustedX = mouseX - offsetX;
          const adjustedY = mouseY - offsetY;
          const col = Math.round(adjustedX / hexHoriz);
          const rowOffset = (col + colShift) % 2 !== 0 ? hexVert / 2 : 0;
          const row = Math.round((adjustedY - rowOffset) / hexVert);

          setHoveredCell({x: col, y: row});
        } else if (isTri) {
          const halfW = squareSize / 2;
          const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
          const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
          const adjustedX = mouseX - offsetX;
          const adjustedY = mouseY - offsetY;
          const col = Math.round(adjustedX / halfW);
          const row = Math.floor(adjustedY / squareSize);

          setHoveredCell({x: col, y: row});
        } else if (shape === 'circle') {
          const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
          const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
          const adjustedX = mouseX - offsetX;
          const adjustedY = mouseY - offsetY;
          const col = Math.round(adjustedX / squareSize);
          const row = Math.round(adjustedY / squareSize);

          setHoveredCell({x: col, y: row});
        } else {
          const offsetX = ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
          const offsetY = ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
          const adjustedX = mouseX - offsetX;
          const adjustedY = mouseY - offsetY;
          const col = Math.floor(adjustedX / squareSize);
          const row = Math.floor(adjustedY / squareSize);

          setHoveredCell({x: col, y: row});
        }
      }

      function handleMouseLeave() {
        addTrailCell();
        hoveredSquare.current = null;
      }

      window.addEventListener('resize', resizeCanvas);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      resizeCanvas();
      requestRef.current = requestAnimationFrame(updateAnimation);

      return function () {
        window.removeEventListener('resize', resizeCanvas);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        if (requestRef.current !== null) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    },
    [direction, speed, borderColor, hoverFillColor, squareSize, shape, hoverTrailAmount],
  );

  return <canvas ref={canvasRef} className={`${styles.shapegridCanvas} ${className}`} />;
}
