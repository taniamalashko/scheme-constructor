import React from 'react';

interface AddIconProps {
  className?: string;
  width?: number;
  height?: number;
}

function AddIcon({ className, width, height }: AddIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      className={className}
      fill="#fff"
    >
      <g>
        <path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z" />
      </g>
    </svg>
  );
}

AddIcon.defaultProps = {
  className: '',
  width: 24,
  height: 24,
};

export default AddIcon;
