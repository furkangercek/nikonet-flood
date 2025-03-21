import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const randomColors = [
  'bg-purple-600',
  'bg-purple-100',
  'bg-pink-500',
  'bg-pink-100',
  'bg-gray-500',
  'bg-gray-100',
];

const OneShotBoot = ({ onComplete }) => {
  const [bootPhase, setBootPhase] = useState(0);

  useEffect(() => {
    const initialLoadTimeout = setTimeout(() => {
      setBootPhase(1);
    }, 3750);
    return () => clearTimeout(initialLoadTimeout);
  }, []);

  // Main boot sequence timeline (starts after initial loading)
  useEffect(() => {
    const timeline = [
      { action: () => setBootPhase(2), delay: 4000 },
      { action: () => setBootPhase(3), delay: 1200 },
      { action: () => setBootPhase(4), delay: 1200 },
      { action: () => setBootPhase(5), delay: 1700 },
      { action: () => setBootPhase(6), delay: 3000 },
      { action: () => setBootPhase(7), delay: 1200 },
      { action: () => setBootPhase(8), delay: 1300 },
      { action: () => setBootPhase(9), delay: 3000 },
      { action: () => setBootPhase(10), delay: 1500 },
    ];

    // Execute each action in the timeline with the specified delay
    const timeoutIds = [] as number[];
    let cumulativeDelay = 0;

    timeline.forEach((item) => {
      cumulativeDelay += item.delay;
      const id = setTimeout(item.action, cumulativeDelay);
      timeoutIds.push(id);
    });

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, []);

  // TODO: maybe export this elsewhere later.
  const bootLines = [
    {
      phase: 1,
      text: '[ SYSTEM INITIALIZATION ]',
      className: 'text-purple-300',
    },
    {
      phase: 2,
      text: 'Booting NikoNet Flood v1.07...',
      className: 'text-purple-200',
    },
    {
      phase: 3,
      text: 'Loading system components...',
      className: 'text-gray-300',
    },
    {
      phase: 4,
      text: 'Scanning for available resources...',
      className: 'text-gray-300',
    },
    {
      phase: 5,
      text: 'Checking world integrity...',
      className: 'text-gray-300',
    },
    {
      phase: 6,
      text: 'Loading sun.exe... [ERROR]',
      className: 'text-red-400',
    },
    {
      phase: 7,
      text: 'CRITICAL: Light source not found',
      className: 'text-yellow-400',
    },
    {
      phase: 8,
      text: 'Searching for alternative solution...',
      className: 'text-gray-300',
    },
    { phase: 9, text: 'Connecting to User...', className: 'text-purple-200' },
    {
      phase: 10,
      text: 'World loaded. The savior is waiting.',
      className: 'text-green-400',
    },
  ];

  const handleEnterClick = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const terminalGlitches = useMemo(
    () =>
      [...Array(80)].map((_, i) => ({
        id: i, //uuid
        size: `${Math.random() * 15}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        color: randomColors[Math.floor(Math.random() * 6)],
        delay: 1,
      })),
    [],
  );
  // Generate square glitches for the terminal

  return (
    <div className="bg-gray-900 min-h-screen flex items-start justify-center font-terminus relative overflow-hidden pt-[30vh]">
      <AnimatePresence>
        {bootPhase === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 1, 0.2],
                filter: ['brightness(0.5)', 'brightness(2)', 'brightness(0.5)'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-yellow-300 z-10 relative"
            >
              <svg
                className="h-24 w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main terminal window */}
      <AnimatePresence>
        {bootPhase >= 2 && (
          <motion.div
            className="relative z-10 top-0 bg-black bg-opacity-80 p-6 rounded-md border border-purple-800 w-full max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            layout
          >
            {/* Need to make these glitches appear slower. Maybe not map over array.*/}
            {terminalGlitches.map((glitch) => (
              <motion.div
                key={`terminal-glitch-${glitch.id}`}
                className={`absolute ${glitch.color} z-20`}
                style={{
                  top: glitch.top,
                  left: glitch.left,
                  width: glitch.size,
                  height: glitch.size,
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  x: [0, Math.random() * 5 - 2.5],
                  y: [0, Math.random() * 5 - 2.5],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  repeatDelay: glitch.delay,
                }}
              />
            ))}

            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-500">WorldMachine.exe</div>
            </div>

            {/** These do not appear in random spots? */}
            <AnimatePresence>
              {bootPhase > 3 &&
                [...Array(5)].map((_, i) => (
                  <motion.div
                    key={`text-glitch-${i}`}
                    className="absolute text-pink-500 z-30 text-opacity-70 overflow-hidden whitespace-nowrap font-terminus"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      x: [0, Math.random() * 15 - 2.5],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.15,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 8 + 2,
                    }}
                  >
                    {Math.random() > 0.5
                      ? 'ERR://SYSTEM.FAULT'
                      : 'DATA://CORRUPT.0x8F'}
                  </motion.div>
                ))}
            </AnimatePresence>

            <div className="space-y-2 mb-6 relative">
              <AnimatePresence>
                {bootLines.map(
                  (line, index) =>
                    bootPhase >= line.phase && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`${line.className} relative z-10 font-terminus`}
                      >
                        {line.phase === 7 || line.phase === 6 ? (
                          <strong>{line.text}</strong>
                        ) : line.phase === 10 ? (
                          <em>{line.text}</em>
                        ) : (
                          line.text
                        )}
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </div>

            {/* Enter button */}
            {bootPhase === 10 && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 3 }}
                onClick={handleEnterClick}
                className="px-6 py-2 bg-purple-900 cursor-pointer hover:bg-purple-800 text-white border border-purple-600 rounded transition-colors duration-300 w-full font-terminus"
              >
                Enter the World
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OneShotBoot;
