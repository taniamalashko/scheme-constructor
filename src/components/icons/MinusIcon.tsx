import React from 'react';

interface MinusIconProps {
  className?: string;
  width?: number;
  height?: number;
}

function MinusIcon({ className, width, height }: MinusIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      fill="#000"
    >
      <path
        d="M16.5,13.5h-9a1.5,1.5,0,0,1,0-3h9a1.5,1.5,0,0,1,0,3Z"
      />
    </svg>
  );
}

MinusIcon.defaultProps = {
  className: '',
  width: 24,
  height: 24,
};

export default MinusIcon;
