import React from 'react';

export default function ZipperDefs(){
  return(
    <svg aria-hidden width="0" height="0" style={{position:'absolute'}}>
      <defs>
        <linearGradient id='zip-metal-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#DFE3E6'/>
          <stop offset='100%' stopColor='#7E848A'/>
        </linearGradient>
        <filter id='zip-grain' x='-10%' y='-10%' width='120%' height='120%'>
          <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch' result='t'/>
          <feColorMatrix type='saturate' values='0'/>
          <feComponentTransfer>
            <feFuncA type='table' tableValues='0 0.06'/>
          </feComponentTransfer>
          <feBlend mode='overlay' in='SourceGraphic' in2='t'/>
        </filter>
        <linearGradient id='zip-head-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#F36A32'/>
          <stop offset='100%' stopColor='#B93D17'/>
        </linearGradient>
        <filter id='zip-drop'>
          <feDropShadow dx='0' dy='3' stdDeviation='3' floodColor='rgba(0,0,0,.35)'/>
        </filter>
        <pattern id="zip-teeth" width="20" height="14" patternUnits="userSpaceOnUse">
          <g filter='url(#zip-grain)'>
            <rect x='1' y='2' width='8' height='10' rx='1' fill='url(#zip-metal-grad)'/>
            <rect x='11' y='2' width='8' height='10' rx='1' fill='url(#zip-metal-grad)'/>
          </g>
        </pattern>
      </defs>
    </svg>
  )
}