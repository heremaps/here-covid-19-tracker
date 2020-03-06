
import React from "react"

export default {
  heart: {
    viewBox: "0 0 24 24",
    path: (
      <path
        stroke="currentcolor"
        fill="none"
        strokeWidth={2}
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      />
    )
  },
  share: {
    viewBox: "0 0 24 24",
    path: (
      <g stroke="currentcolor" fill="none" strokeWidth={2}>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </g>
    ),
  },
  menu: {
    viewBox: "0 0 24 24",
    path: (
      <path
        stroke="currentcolor"
        strokeWidth={2}
        fill="none"
        d="M3,12L21,12M3,6L21,6M3,18,21,18"
      />
    ),
  },
  pin: {
    viewBox: "0 0 24 24",
    path: (
      <g stroke="currentcolor" fill="none" strokeWidth={2}>
        <circle cx="12" cy="10" r="3"/>
        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/>
      </g>
    ),
  },
  drag: {
    viewBox: "0 0 24 24",
    path: (
      <path
        stroke="currentcolor"
        strokeWidth={2}
        fill="none"
        d="M5.2 9l-3 3 3 3M9 5.2l3-3 3 3M15 18.9l-3 3-3-3M18.9 9l3 3-3 3M3.3 12h17.4M12 3.2v17.6"/>
    ),
  },
  reload: {
    viewBox: "0 0 24 24",
    path: (
      <path
        stroke="currentcolor"
        strokeWidth={2}
        fill="none"
        d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
    ),
  },
  globe: {
    viewBox: "0 0 24 24",
    path: (
      <g stroke="currentcolor" fill="none" strokeWidth={2}>
      <path d="M6.294,4.787 c0.631,0.466,1.124,1.071,1.589,1.849c0.405,0.679,1.306,2.57,0.481,3.638C7.43,11.48,4.727,11.887,4.727,13c0,0.837,1.185,1.793,1.818,2.727c0.952,1.405,0.519,2.767,0,3.636c-0.269,0.451-0.727,0.811-1.203,1.097" />
      <path d="M21.8,11c0.131,0.646,0.2,1.315,0.2,2c0,5.523-4.477,10-10,10S2,18.523,2,13S6.477,3,12,3c0.494,0,0.98,0.036,1.455,0.105" />
      <path d="M21,5c0,2.469-4,6-4,6s-4-3.531-4-6c0-2.531,2.067-4,4-4S21,2.469,21,5z"/>
      </g>
    ),
  },
  info: {
    viewBox: "0 0 24 24",
    path: (
      <g stroke="currentcolor" fill="none" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="10" />
      </g>
    ),
  },
  arrows: {
    viewBox: "0 0 24 24",
    path: (
      <g stroke="currentcolor" fill="none" strokeWidth={2}>
        <path d="M8 16L4 12L8 8"/>
        <path d="M16 16L20 12L16 8"/>
      </g>
    ),
  },
  connectedArrows: {
    viewBox: "0 0 24 24",
    path: (
      <path 
        stroke="currentcolor"
        strokeWidth={2}
        fill="none" 
        d="M8 16L4 12L8 8M16 16L20 12L16 8M5 12H19"/>
    ),
  },
  list: {
    viewBox: "0 0 24 24",
    path: (
      <g stroke="currentcolor" fill="none" strokeWidth={2}>
        <circle cx="4" cy="4" r="2" />
        <circle cx="4" cy="12" r="2" />
        <circle cx="4" cy="20" r="2" />
        <line x1="10" y1="4" x2="22" y2="4" />
        <line x1="10" y1="12" x2="22" y2="12" />
        <line x1="10" y1="20" x2="22" y2="20" />
      </g>
    ),
  },
  github: {
    viewBox: "0 0 16 16",
    path: (
      <path
        fill="currentcolor"
        fillRule="evenodd"
        d="M8 .2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V14c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"
        clipRule="evenodd"
      />
    ),
  }
}
