import React from 'react';

export default function ZipperDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        {/* Градиенты для металлических частей */}
        <linearGradient id='zip-metal-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#DFE3E6' />
          <stop offset='100%' stopColor='#7E848A' />
        </linearGradient>

        {/* Градиент для бегунка */}
        <linearGradient id='zip-slider-gradient' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#B5BAC0' />
          <stop offset='50%' stopColor='#8E949A' />
          <stop offset='100%' stopColor='#6A7075' />
        </linearGradient>

        {/* Эффект зернистости для реалистичности */}
        <filter id='zip-grain' x='-10%' y='-10%' width='120%' height='120%'>
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.65'
            numOctaves='2'
            stitchTiles='stitch'
            result='t'
          />
          <feColorMatrix type='saturate' values='0' />
          <feComponentTransfer>
            <feFuncA type='table' tableValues='0 0.06' />
          </feComponentTransfer>
          <feBlend mode='overlay' in='SourceGraphic' in2='t' />
        </filter>

        {/* Градиент для акцентного цвета */}
        <linearGradient id='zip-head-grad' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#F36A32' />
          <stop offset='100%' stopColor='#B93D17' />
        </linearGradient>

        {/* Тень для бегунка */}
        <filter id='zip-slider-shadow'>
          <feDropShadow
            dx='0'
            dy='2'
            stdDeviation='4'
            floodColor='rgba(0,0,0,.4)'
          />
        </filter>

        {/* Паттерн зубцов молнии - интерлокинг дизайн */}
        <pattern
          id='zip-teeth-pattern'
          width='16'
          height='20'
          patternUnits='userSpaceOnUse'
        >
          {/* Верхний ряд зубцов */}
          <rect
            x='2'
            y='0'
            width='12'
            height='8'
            rx='1'
            fill='url(#zip-metal-grad)'
            filter='url(#zip-grain)'
          />
          {/* Нижний ряд зубцов - смещены для интерлокинга */}
          <rect
            x='2'
            y='12'
            width='12'
            height='8'
            rx='1'
            fill='url(#zip-metal-grad)'
            filter='url(#zip-grain)'
          />
          {/* Центральная соединительная линия */}
          <rect
            x='0'
            y='9'
            width='16'
            height='2'
            fill='#5A6066'
            opacity='0.8'
          />
        </pattern>

        {/* Альтернативный паттерн для fallback */}
        <pattern
          id='zip-teeth-simple'
          width='10'
          height='10'
          patternUnits='userSpaceOnUse'
        >
          <rect
            x='1'
            y='1'
            width='8'
            height='8'
            rx='0.5'
            fill='var(--zip-metal)'
            opacity='0.8'
          />
        </pattern>

        {/* Тень для всего элемента */}
        <filter id='zip-drop'>
          <feDropShadow
            dx='0'
            dy='3'
            stdDeviation='3'
            floodColor='rgba(0,0,0,.35)'
          />
        </filter>
      </defs>
    </svg>
  )
}