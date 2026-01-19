'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const keyboardLayout = [
    ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '⌫'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
    ['Ctrl', 'Alt', 'Cmd', 'Space', 'Cmd', 'Alt', 'Ctrl'],
];

// Map keyboard events to display keys
const keyMap: Record<string, string> = {
    'Escape': 'Esc',
    'Backspace': '⌫',
    'Control': 'Ctrl',
    'Meta': 'Cmd',
    ' ': 'Space',
    'CapsLock': 'Caps',
};

export default function Keyboard3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [typedText, setTypedText] = useState('');
    const [clickedKey, setClickedKey] = useState<string | null>(null);

    // Handle actual keyboard input
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const key = keyMap[e.key] || e.key.toUpperCase();
        setPressedKeys(prev => new Set(prev).add(key));

        // Add to typed text for display
        if (e.key.length === 1) {
            setTypedText(prev => (prev + e.key).slice(-30)); // Keep last 30 chars
        } else if (e.key === 'Backspace') {
            setTypedText(prev => prev.slice(0, -1));
        } else if (e.key === ' ') {
            setTypedText(prev => (prev + ' ').slice(-30));
        }
    }, []);

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        const key = keyMap[e.key] || e.key.toUpperCase();
        setPressedKeys(prev => {
            const newSet = new Set(prev);
            newSet.delete(key);
            return newSet;
        });
    }, []);

    // Handle click on virtual key
    const handleKeyClick = (key: string) => {
        setClickedKey(key);

        // Add visual feedback
        setPressedKeys(prev => new Set(prev).add(key));

        // Add to typed text
        if (key.length === 1) {
            setTypedText(prev => (prev + key.toLowerCase()).slice(-30));
        } else if (key === '⌫') {
            setTypedText(prev => prev.slice(0, -1));
        } else if (key === 'Space') {
            setTypedText(prev => (prev + ' ').slice(-30));
        }

        // Remove pressed state after animation
        setTimeout(() => {
            setPressedKeys(prev => {
                const newSet = new Set(prev);
                newSet.delete(key);
                return newSet;
            });
            setClickedKey(null);
        }, 150);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const start = windowHeight;
            const end = -rect.height;
            const current = rect.top;
            const progress = 1 - (current - end) / (start - end);

            setScrollProgress(Math.max(0, Math.min(1, progress)));
        };

        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMousePosition({ x, y });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    const rotateX = 60 - scrollProgress * 45 + mousePosition.y * 5;
    const rotateY = mousePosition.x * 10;
    const rotateZ = scrollProgress * 5 - 2.5;
    const translateZ = scrollProgress * 50;
    const translateY = (1 - scrollProgress) * 100;

    const getKeyStyle = (key: string, rowIndex: number, keyIndex: number) => {
        const wideKeys: Record<string, string> = {
            'Tab': 'w-16',
            'Caps': 'w-18',
            'Shift': 'w-24',
            'Enter': 'w-20',
            'Space': 'w-64',
            '⌫': 'w-16',
            'Ctrl': 'w-14',
            'Alt': 'w-12',
            'Cmd': 'w-14',
        };

        const isPressed = pressedKeys.has(key) || pressedKeys.has(key.toUpperCase());
        const isClicked = clickedKey === key;
        const delay = (rowIndex * 0.05 + keyIndex * 0.02) * scrollProgress;
        const keyTranslateZ = Math.sin((scrollProgress + delay) * Math.PI) * 10;

        return {
            width: wideKeys[key] || 'w-10',
            isPressed,
            isClicked,
            translateZ: isPressed ? -5 : keyTranslateZ,
            delay,
        };
    };

    return (
        <div
            ref={containerRef}
            className="relative py-32 overflow-hidden"
            style={{ perspective: '2000px' }}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

            {/* Instruction text */}
            <div className="text-center mb-8 relative z-10">
                <p className="text-muted text-sm animate-pulse">
                    💡 Try typing on your keyboard or click the keys!
                </p>
            </div>

            {/* Typed text display */}
            {typedText && (
                <div className="text-center mb-8 relative z-10">
                    <div
                        className="inline-block px-6 py-3 rounded-xl font-mono text-lg"
                        style={{
                            background: 'linear-gradient(145deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            boxShadow: '0 0 30px rgba(139, 92, 246, 0.2)',
                        }}
                    >
                        <span className="text-primary">{typedText}</span>
                        <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />
                    </div>
                </div>
            )}

            {/* 3D Keyboard Container */}
            <div
                className="relative mx-auto flex justify-center"
                style={{
                    transform: `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            rotateZ(${rotateZ}deg) 
            translateY(${translateY}px)
            translateZ(${translateZ}px)
          `,
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.1s ease-out',
                }}
            >
                {/* Keyboard body */}
                <div
                    className="relative rounded-2xl p-4 shadow-2xl"
                    style={{
                        background: 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)',
                        boxShadow: `
              0 50px 100px -20px rgba(0, 0, 0, 0.5),
              0 30px 60px -30px rgba(0, 0, 0, 0.6),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* LED strip effect */}
                    <div
                        className="absolute -bottom-1 left-4 right-4 h-1 rounded-full"
                        style={{
                            background: `linear-gradient(90deg, 
                #3b82f6 0%, 
                #8b5cf6 25%, 
                #ec4899 50%, 
                #8b5cf6 75%, 
                #3b82f6 100%
              )`,
                            opacity: 0.8 + scrollProgress * 0.2,
                            boxShadow: `0 0 20px ${pressedKeys.size > 0 ? '#ec4899' : '#8b5cf6'}`,
                            animation: 'pulse 2s ease-in-out infinite',
                        }}
                    />

                    {/* Keyboard rows */}
                    <div className="flex flex-col gap-1.5">
                        {keyboardLayout.map((row, rowIndex) => (
                            <div
                                key={rowIndex}
                                className="flex gap-1.5 justify-center"
                                style={{
                                    transform: `translateZ(${rowIndex * 2}px)`,
                                }}
                            >
                                {row.map((key, keyIndex) => {
                                    const { width, isPressed, isClicked, translateZ: keyZ, delay } = getKeyStyle(key, rowIndex, keyIndex);

                                    return (
                                        <button
                                            key={`${rowIndex}-${keyIndex}`}
                                            onClick={() => handleKeyClick(key)}
                                            className={`
                        ${width} h-10 rounded-lg flex items-center justify-center
                        text-xs font-medium select-none
                        transition-all duration-100
                        hover:brightness-125 active:scale-95
                        focus:outline-none focus:ring-2 focus:ring-primary/50
                      `}
                                            style={{
                                                background: isPressed
                                                    ? 'linear-gradient(145deg, #3b82f6 0%, #8b5cf6 100%)'
                                                    : 'linear-gradient(145deg, #2a2a3e 0%, #1a1a2e 100%)',
                                                color: isPressed ? '#fff' : '#888',
                                                boxShadow: isPressed
                                                    ? `0 0 20px rgba(139, 92, 246, 0.6), 
                             0 0 40px rgba(59, 130, 246, 0.3),
                             inset 0 -2px 0 rgba(0,0,0,0.3)`
                                                    : '0 4px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                                                transform: `translateZ(${keyZ}px) ${isPressed ? 'translateY(2px)' : ''}`,
                                                transitionDelay: isClicked ? '0s' : `${delay}s`,
                                            }}
                                        >
                                            {key}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Keyboard depth effect */}
                    <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                            background: 'linear-gradient(180deg, transparent 80%, rgba(0,0,0,0.5) 100%)',
                        }}
                    />
                </div>
            </div>

            {/* Floating code snippets */}
            <div
                className="absolute top-20 left-10 text-primary/30 font-mono text-sm hidden lg:block"
                style={{
                    transform: `translateY(${scrollProgress * 30}px) translateX(${-scrollProgress * 20}px)`,
                    opacity: 0.3 + scrollProgress * 0.4,
                }}
            >
                <pre>{`func main() {
  fmt.Println("Hello")
}`}</pre>
            </div>

            <div
                className="absolute bottom-20 right-10 text-purple-500/30 font-mono text-sm hidden lg:block"
                style={{
                    transform: `translateY(${-scrollProgress * 30}px) translateX(${scrollProgress * 20}px)`,
                    opacity: 0.3 + scrollProgress * 0.4,
                }}
            >
                <pre>{`const App = () => {
  return <div />
}`}</pre>
            </div>

            {/* Key press counter */}
            <div className="text-center mt-8 relative z-10">
                <p className="text-muted text-xs">
                    {pressedKeys.size > 0 && (
                        <span className="text-primary">
                            Pressing: {Array.from(pressedKeys).join(' + ')}
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
}
