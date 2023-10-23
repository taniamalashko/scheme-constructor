import React from 'react';

interface PlusIconProps {
  className?: string;
  width?: number;
  height?: number;
}

function PlusIcon({ className, width, height }: PlusIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      fill="#fff"
    >
      <path
        d="M16.5,10.5h-3v-3a1.5,1.5,0,0,0-3,0v3h-3a1.5,1.5,0,0,0,0,3h3v3a1.5,1.5,0,0,0,3,0v-3h3a1.5,1.5,0,0,0,0-3Z"
      />
    </svg>
  );
}

PlusIcon.defaultProps = {
  className: '',
  width: 24,
  height: 24,
};

export default PlusIcon;
