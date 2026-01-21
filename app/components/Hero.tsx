'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, useScroll, useTransform, useSpring } from '../lib/animations';

// Keyboard layout
const keyboardLayout = [
    ['Esc', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '⌫'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
    ['Ctrl', 'Alt', 'Cmd', 'Space', 'Cmd', 'Alt', 'Ctrl'],
];

const keyMap: Record<string, string> = {
    'Escape': 'Esc', 'Backspace': '⌫', 'Control': 'Ctrl', 'Meta': 'Cmd',
    ' ': 'Space', 'CapsLock': 'Caps',
};

// Real SVG Tech Logos
const TechLogos = {
    golang: (
        <svg viewBox="0 0 120 50" className="w-16 h-8">
            <path fill="#00ADD8" d="M19.5 23.5c-.4 0-.5-.2-.3-.5l.7-1c.2-.3.5-.4.9-.4h12c.4 0 .5.3.3.5l-.6.9c-.2.3-.5.5-.9.5l-12.1.1zM14 27c-.4 0-.5-.2-.3-.5l.7-1c.2-.3.5-.4.9-.4h15.4c.4 0 .5.2.4.5l-.3.8c0 .3-.4.5-.7.5L14 27zM23 30.5c-.4 0-.5-.3-.3-.6l.5-.9c.2-.3.4-.5.8-.5h6.7c.4 0 .5.3.5.6l-.1.8c0 .4-.3.6-.6.6H23z" />
            <path fill="#00ADD8" d="M72.5 22.5c-3.5.9-5.9 1.5-9.3 2.4-.8.2-.9.3-1.6-.5-.8-.9-1.4-1.5-2.6-2-3.5-1.6-6.9-.3-9.8 2-3.4 2.7-5.2 6.4-5.1 10.8.1 4.3 3 7.8 7.2 8.4 3.6.5 6.7-.6 9.3-3.1.5-.5 1-1.1 1.6-1.8H54c-1.1 0-1.4-.7-1-1.6.6-1.7 1.8-4.5 2.5-5.9.1-.3.5-.9 1.3-.9h15.6c-.1 1.2-.1 2.4-.3 3.6-.5 3.3-1.8 6.3-3.9 8.9-3.4 4.3-7.9 7-13.4 7.8-4.5.6-8.7-.2-12.3-2.9-3.3-2.5-5.1-5.8-5.4-9.9-.4-5.1 1.3-9.6 4.4-13.5 3.5-4.4 8-7.2 13.6-8 4.6-.6 8.9.1 12.6 2.9 1.6 1.2 2.8 2.7 3.8 4.5.2.4.1.6-.4.8z" />
            <path fill="#00ADD8" d="M89 43.2c-4.1-.1-7.8-1.3-10.9-4.1-2.6-2.4-4-5.3-4.2-8.8-.3-4.5 1.1-8.4 4-11.8 3.3-3.8 7.5-5.9 12.5-6.3 4.3-.3 8.3.5 11.7 3.1 3.1 2.4 4.9 5.5 5.2 9.3.4 5.1-1.2 9.4-4.6 13-3 3.2-6.8 5.1-11.2 5.5-1 .1-1.7.1-2.5.1zm11-16.8c-.1-.7-.1-1.2-.2-1.8-.8-3.6-3.9-5.6-7.7-5.1-3.7.5-6.3 2.5-7.7 6-.9 2.3-.8 4.6.3 6.8 1.2 2.4 3.3 3.6 5.9 3.8 2.8.2 5.2-.6 7.2-2.6 1.5-1.5 2.1-3.3 2.2-7.1z" />
        </svg>
    ),
    react: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
            <path fill="#61DAFB" d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 01-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 012.4-.36c.48-.67.99-1.31 1.51-1.9z" />
        </svg>
    ),
    docker: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
            <path fill="#2496ED" d="M13.983 11.078h2.119a.19.19 0 00.19-.192V9.01a.19.19 0 00-.19-.191h-2.119a.19.19 0 00-.19.191v1.876c0 .106.085.192.19.192zm-2.954-5.43h2.118a.19.19 0 00.19-.191V3.581a.19.19 0 00-.19-.191h-2.118a.19.19 0 00-.19.19v1.877c0 .106.085.191.19.191zm0 2.715h2.118a.19.19 0 00.19-.191V6.295a.19.19 0 00-.19-.19h-2.118a.19.19 0 00-.19.19v1.877c0 .106.085.191.19.191zm-2.955 0h2.119a.19.19 0 00.19-.191V6.295a.19.19 0 00-.19-.19H8.074a.19.19 0 00-.19.19v1.877c0 .106.085.191.19.191zm-2.954 0h2.119a.19.19 0 00.19-.191V6.295a.19.19 0 00-.19-.19H5.12a.19.19 0 00-.19.19v1.877c0 .106.085.191.19.191zm5.908 2.715h2.118a.19.19 0 00.19-.191V9.01a.19.19 0 00-.19-.191h-2.118a.19.19 0 00-.19.191v1.876c0 .106.085.192.19.192zm-2.954 0h2.119a.19.19 0 00.19-.191V9.01a.19.19 0 00-.19-.191H8.074a.19.19 0 00-.19.191v1.876c0 .106.085.192.19.192zm-2.954 0h2.119a.19.19 0 00.19-.191V9.01a.19.19 0 00-.09-.191H5.12a.19.19 0 00-.19.191v1.876c0 .106.085.192.19.192zm-2.954 0h2.119a.19.19 0 00.19-.192V9.01a.19.19 0 00-.19-.191H2.165a.19.19 0 00-.19.191v1.876c0 .106.085.192.19.192zM23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.75.75 0 00-.75.748 11.4 11.4 0 00.692 4.062c.545 1.428 1.355 2.483 2.409 3.137 1.182.734 3.108 1.153 5.319 1.153.984 0 1.969-.098 2.938-.29a13.1 13.1 0 003.644-1.298c1.04-.56 1.972-1.288 2.763-2.158 1.324-1.452 2.113-3.091 2.702-4.53h.235c1.454 0 2.349-.581 2.841-1.07a2.9 2.9 0 00.717-1.095l.098-.288-.146-.118z" />
        </svg>
    ),
    kubernetes: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
            <path fill="#326CE5" d="M10.204 14.35l.007.01-.999 2.413a5.2 5.2 0 01-2.024-2.023l2.412-1.004a.5.5 0 01.604.604zm3.59-3.59l-.01-.007 1.003-2.412a5.2 5.2 0 012.024 2.024l-2.413 1.004a.5.5 0 01-.604-.604zm-.007 4.19l.007-.01 2.413 1.003a5.2 5.2 0 01-2.024 2.024l-1.004-2.412a.5.5 0 01.608-.605zm-3.59-3.59l.01.007-1.003 2.412a5.2 5.2 0 01-2.024-2.024l2.412-1.003a.5.5 0 01.604.609zM12 5.5l-3 6.3-3 6.5c0 2.21 2.69 4 6 4s6-1.79 6-4l-3-6.5-3-6.3z" />
            <path fill="#326CE5" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.5c-5.238 0-9.5-4.262-9.5-9.5S6.762 2.5 12 2.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5z" />
        </svg>
    ),
    nodejs: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
            <path fill="#339933" d="M11.998 24c-.321 0-.637-.084-.919-.251l-2.919-1.729c-.437-.244-.223-.331-.08-.381.582-.203.699-.25 1.319-.603.065-.037.151-.023.218.017l2.244 1.33c.082.046.197.046.275 0l8.741-5.047c.082-.047.134-.14.134-.238V6.921c0-.1-.052-.192-.137-.241L12.137 1.64a.27.27 0 00-.273 0L3.128 6.68c-.087.049-.139.141-.139.241v10.098c0 .098.054.189.137.236l2.396 1.384c1.299.65 2.095-.115 2.095-.883V7.826c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v9.93c0 1.729-.942 2.722-2.58 2.722-.504 0-.9 0-2.007-.546L2.39 18.657a1.85 1.85 0 01-.919-1.599V6.921c0-.659.35-1.274.919-1.602L11.131.271a1.9 1.9 0 011.838 0l8.741 5.048c.57.328.919.943.919 1.602v10.137c0 .659-.349 1.272-.919 1.599l-8.741 5.048a1.85 1.85 0 01-.971.295z" />
        </svg>
    ),
    typescript: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
            <path fill="#3178C6" d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.4 6.4 0 011.306.34v2.458a4 4 0 00-.643-.361 5.1 5.1 0 00-.717-.26 5.8 5.8 0 00-1.54-.2c-.254 0-.493.02-.713.06a1.7 1.7 0 00-.562.174.9.9 0 00-.39.713c0 .254.077.47.231.655.156.186.367.349.636.49.27.142.574.271.91.388.338.117.683.244 1.034.381.636.254 1.18.517 1.63.79.45.271.819.58 1.104.924.285.344.495.737.629 1.178.134.442.2.95.2 1.527 0 .791-.153 1.46-.458 2.009-.306.548-.744.99-1.313 1.322a6.3 6.3 0 01-2.04.754 12 12 0 01-2.61.26 12 12 0 01-1.652-.096 7.8 7.8 0 01-1.395-.291 5.9 5.9 0 01-1.128-.454v-2.622c.385.254.797.482 1.235.684.439.203.892.363 1.36.48.468.118.94.177 1.416.177.36 0 .667-.033.92-.097a1.7 1.7 0 00.619-.281.9.9 0 00.354-.432c.074-.169.111-.37.111-.605 0-.257-.074-.483-.222-.678a2.3 2.3 0 00-.605-.525 7 7 0 00-.894-.447l-1.016-.393c-.62-.236-1.16-.505-1.62-.808a3.9 3.9 0 01-1.103-.999 4 4 0 01-.629-1.239 5.4 5.4 0 01-.2-1.539c0-.748.145-1.394.436-1.94.293-.544.697-.988 1.215-1.33.518-.344 1.126-.6 1.826-.768.7-.168 1.458-.254 2.274-.254zm-9.13.2h7.195v2.056h-2.401v8.154H11.78v-8.154H9.358z" />
        </svg>
    ),
    graphql: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
            <path fill="#E10098" d="M12.002 0a2.14 2.14 0 100 4.277 2.14 2.14 0 100-4.277zm-8.57 4.937a2.14 2.14 0 100 4.277 2.14 2.14 0 100-4.277zm17.14 0a2.14 2.14 0 100 4.277 2.14 2.14 0 100-4.277zM3.432 14.786a2.14 2.14 0 100 4.277 2.14 2.14 0 100-4.277zm17.14 0a2.14 2.14 0 100 4.277 2.14 2.14 0 100-4.277zm-8.572 4.937a2.14 2.14 0 100 4.277 2.14 2.14 0 100-4.277zM12 5.353l7.4 12.818H4.6zm0 1.93L5.938 17.095h12.124z" />
        </svg>
    ),
    postgresql: (
        <svg viewBox="0 0 24 24" className="w-10 h-10">
            <path fill="#4169E1" d="M17.128 0a10.1 10.1 0 00-2.626.352c-.754.164-1.528.39-2.082.614a9.5 9.5 0 00-.903.451 5.9 5.9 0 00-.728-.326c-.956-.357-1.95-.517-2.946-.49-1.18.03-2.303.313-3.175.93-.449.317-.842.742-1.137 1.254-.295.512-.49 1.12-.545 1.82-.073.69.015 1.524.263 2.512.245.987.645 2.11 1.195 3.374l.023.05a.5.5 0 00.018.037c.085.172.178.35.28.53.48.844.908 1.367 1.505 1.746a2.8 2.8 0 001.598.443c.387-.007.736-.082 1.052-.196.12.193.254.38.398.556.424.513.963.959 1.594 1.239.374.167.775.264 1.17.284a3.3 3.3 0 00-.012.35v.015c.006.56.05 1.108.127 1.649a10 10 0 00.476 1.776c.163.424.37.828.631 1.19.261.362.59.686 1.002.933.412.247.924.413 1.544.453h.123c.68 0 1.283-.15 1.794-.418.511-.27.929-.657 1.275-1.114.347-.457.625-.989.826-1.602.201-.614.325-1.282.36-2.065.013-.27.01-.545.007-.815a.8.8 0 01-.004-.142v-.013c-.002-.126-.006-.251-.007-.376 0-.185 0-.372.003-.56l.009-.012c.422-.586.8-1.212 1.126-1.874.555-1.129.958-2.355 1.14-3.668.134-.965.112-1.911-.04-2.826a6 6 0 00-.71-1.986 5.7 5.7 0 00-1.302-1.534 6.7 6.7 0 00-1.684-1.048 8 8 0 00-1.73-.558A10 10 0 0017.128 0z" />
        </svg>
    ),
};

// VS Code-like syntax highlighting - returns React elements
const CodeBlock = ({ code }: { code: string }) => {
    const keywords = ['func', 'const', 'let', 'var', 'type', 'interface', 'struct', 'return', 'if', 'else', 'for', 'range', 'import', 'export', 'from', 'async', 'await', 'try', 'catch', 'throw', 'new', 'class', 'service', 'rpc', 'returns', 'apiVersion', 'kind', 'metadata', 'spec', 'FROM', 'WORKDIR', 'COPY', 'RUN', 'EXPOSE', 'CMD', 'SELECT', 'JOIN', 'ON', 'WHERE', 'INSERT', 'INTO', 'mutation', 'query', 'replicas', 'name'];
    const types = ['string', 'int', 'int64', 'bool', 'error', 'context', 'Context', 'User', 'Server', 'Request', 'Response', 'Promise', 'void', 'number', 'boolean', 'React', 'FC', 'NextRequest', 'NextResponse', 'Props', 'Deployment', 'UserService', 'UserInput', 'Repository'];
    const functions = ['HandleFunc', 'ListenAndServe', 'GetUser', 'FindByID', 'Create', 'fetch', 'json', 'useState', 'useEffect', 'setInterval', 'clearInterval', 'map', 'filter', 'log', 'error', 'set', 'get', 'apply', 'build', 'createUser', 'main', 'http', 'db', 'cache', 'logger', 'handler', 'refresh', 'process'];

    // Tokenize and colorize
    const tokenize = (text: string) => {
        const tokens: { text: string; color: string }[] = [];
        const words = text.split(/(\s+|[{}()\[\]:;,.<>=!&|"'`\/\-+*])/);

        words.forEach((word) => {
            if (!word) return;

            let color = '#9cdcfe'; // default light blue

            if (keywords.includes(word)) {
                color = '#c586c0'; // purple/pink for keywords
            } else if (types.includes(word)) {
                color = '#4ec9b0'; // cyan for types
            } else if (functions.includes(word)) {
                color = '#dcdcaa'; // yellow for functions
            } else if (/^\d+$/.test(word)) {
                color = '#b5cea8'; // light green for numbers
            } else if (/^["'`].*["'`]$/.test(word) || word.startsWith('"') || word.startsWith("'")) {
                color = '#ce9178'; // orange for strings
            } else if (/^[{}()\[\]]$/.test(word)) {
                color = '#ffd700'; // gold for brackets
            } else if (/^[=<>!&|:;,.]$/.test(word) || word === '=>' || word === ':=') {
                color = '#569cd6'; // blue for operators
            } else if (/^\s+$/.test(word)) {
                color = 'inherit'; // whitespace
            }

            tokens.push({ text: word, color });
        });

        return tokens;
    };

    const lines = code.split('\n');

    return (
        <>
            {lines.map((line, lineIndex) => (
                <div key={lineIndex}>
                    {tokenize(line).map((token, tokenIndex) => (
                        <span key={tokenIndex} style={{ color: token.color }}>
                            {token.text}
                        </span>
                    ))}
                </div>
            ))}
        </>
    );
};


// Background colors based on key press

const bgColors = [
    'from-slate-950 via-slate-900 to-indigo-950',
    'from-indigo-950 via-purple-950 to-slate-950',
    'from-purple-950 via-pink-950 to-slate-950',
    'from-cyan-950 via-blue-950 to-slate-950',
    'from-emerald-950 via-teal-950 to-slate-950',
];

// Code snippets for background - full coverage
const codeSnippets = [
    // Left side
    { code: `func main() {\n  http.HandleFunc("/", handler)\n  http.ListenAndServe(":8080", nil)\n}`, x: '2%', y: '5%' },
    { code: `type User struct {\n  ID    int64  \`json:"id"\`\n  Name  string \`json:"name"\`\n  Email string \`json:"email"\`\n}`, x: '3%', y: '25%' },
    { code: `func (s *Server) GetUser(ctx context.Context,\n  req *pb.GetUserRequest) (*pb.User, error) {\n  return s.db.FindByID(req.Id)\n}`, x: '2%', y: '45%' },
    { code: `SELECT u.id, u.name, p.title\nFROM users u\nJOIN posts p ON u.id = p.user_id\nWHERE u.active = true;`, x: '3%', y: '65%' },
    { code: `docker build -t app:latest .\ndocker push registry/app:latest\nkubectl apply -f deploy.yaml`, x: '2%', y: '85%' },

    // Center-left
    { code: `const fetchData = async () => {\n  const res = await fetch('/api')\n  return res.json()\n}`, x: '25%', y: '8%' },
    { code: `interface Props {\n  data: User[]\n  onSelect: (id: number) => void\n  loading?: boolean\n}`, x: '28%', y: '35%' },
    { code: `useEffect(() => {\n  const timer = setInterval(() => {\n    refresh()\n  }, 5000)\n  return () => clearInterval(timer)\n}, [])`, x: '26%', y: '55%' },
    { code: `export const handler = async (\n  req: NextRequest\n): Promise<NextResponse> => {\n  return NextResponse.json(data)\n}`, x: '25%', y: '78%' },

    // Center-right  
    { code: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: api-server\nspec:\n  replicas: 3`, x: '50%', y: '12%' },
    { code: `service UserService {\n  rpc GetUser(Request)\n    returns (User) {}\n  rpc ListUsers(Empty)\n    returns (stream User) {}\n}`, x: '52%', y: '38%' },
    { code: `const App: React.FC = () => {\n  const [state, setState] = useState()\n  return (\n    <Layout>\n      <Component />\n    </Layout>\n  )\n}`, x: '48%', y: '62%' },
    { code: `mutation CreateUser($input: UserInput!) {\n  createUser(input: $input) {\n    id\n    name\n    email\n  }\n}`, x: '50%', y: '88%' },

    // Right side
    { code: `func (r *Repository) Create(\n  ctx context.Context,\n  user *User,\n) error {\n  return r.db.Create(user).Error\n}`, x: '75%', y: '6%' },
    { code: `const config = {\n  api: process.env.API_URL,\n  timeout: 5000,\n  retries: 3,\n  headers: { 'Content-Type': 'application/json' }\n}`, x: '72%', y: '28%' },
    { code: `FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]`, x: '75%', y: '48%' },
    { code: `try {\n  const data = await service.process()\n  cache.set(key, data, TTL)\n  return data\n} catch (err) {\n  logger.error(err)\n  throw new AppError(500)\n}`, x: '73%', y: '72%' },
];


// Code fragments that appear on keypress - Extended version
const codeFragments = [
    // JavaScript/TypeScript
    'const', 'let', 'var', 'function', 'return', 'async', 'await', 'import', 'export',
    'interface', 'type', 'class', 'extends', 'implements', 'if', 'else', 'for', 'while',
    '() => {}', 'useState()', 'useEffect()', 'useCallback()', 'useMemo()', 'useRef()',
    'Promise.all()', '.then()', '.catch()', '.finally()', 'async/await',
    'console.log()', 'console.error()', 'fetch()', 'JSON.parse()', 'JSON.stringify()',
    '<Component />', '<div></div>', 'React.FC', 'NextPage', 'NextResponse',
    'props.children', 'event.target', 'e.preventDefault()', 'onClick={}',
    'module.exports', 'require()', 'export default', 'import from',

    // Golang
    'func', 'package', 'import', 'struct', 'interface', 'return',
    'range', 'defer', 'go', 'chan', 'select', 'case',
    'fmt.Println()', 'fmt.Sprintf()', 'http.HandleFunc()', 'http.Get()',
    'json.Marshal()', 'json.Unmarshal()', 'ioutil.ReadAll()',
    'context.Background()', 'context.WithTimeout()',
    'errors.New()', 'log.Fatal()', 'time.Now()',
    'make(map[string]int)', 'make(chan int)', 'make([]int, 0)',

    // SQL
    'SELECT * FROM', 'INSERT INTO', 'UPDATE SET', 'DELETE FROM',
    'WHERE', 'JOIN ON', 'LEFT JOIN', 'INNER JOIN', 'GROUP BY',
    'ORDER BY DESC', 'LIMIT 10', 'OFFSET 0', 'CREATE TABLE',
    'ALTER TABLE', 'DROP INDEX', 'CREATE INDEX ON',

    // Docker/Kubernetes
    'docker build -t', 'docker run -d', 'docker push', 'docker pull',
    'FROM node:18', 'WORKDIR /app', 'COPY . .', 'RUN npm install',
    'EXPOSE 3000', 'CMD ["node"]', 'ENV NODE_ENV=production',
    'kubectl apply -f', 'kubectl get pods', 'kubectl logs',
    'apiVersion: v1', 'kind: Deployment', 'replicas: 3',

    // gRPC/Protobuf
    'gRPC.Server', 'service', 'rpc', 'message', 'returns',
    'proto.Marshal()', 'grpc.Dial()', 'stream', 'unary',

    // Operators & Symbols
    '{ }', '[ ]', '( )', '=>', ':=', '!=', '===', '!==',
    '&&', '||', '...', '??', '?:', '++', '--', '+=', '-=',
    '@decorator', '#define', '/* */', '// comment', '/** */',

    // More React/Next.js
    'getServerSideProps', 'getStaticProps', 'getStaticPaths',
    'useRouter()', 'usePathname()', 'useSearchParams()',
    'cookies()', 'headers()', 'redirect()',
    '<Suspense>', '<ErrorBoundary>', 'loading.tsx',

    // Database/ORM
    'prisma.user.findMany()', 'db.query()', 'mongoose.connect()',
    'redis.get()', 'cache.set()', 'transaction.commit()',

    // Testing
    'describe()', 'it()', 'expect()', 'test()', 'beforeEach()',
    'jest.mock()', 'vi.fn()', 'render()', 'fireEvent.click()',

    // API
    'res.json()', 'req.body', 'req.params', 'req.query',
    'status(200)', 'headers: {}', 'Authorization: Bearer',
    'Content-Type: application/json', 'CORS', 'middleware',
];

const roles = ['Full Stack Engineer', 'Tech Lead', 'Backend Architect', 'Problem Solver'];

export default function Hero() {
    const { theme } = useTheme();
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [keyboardMousePos, setKeyboardMousePos] = useState({ x: 0, y: 0 });
    const [bgColorIndex, setBgColorIndex] = useState(0);
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
    const [keyPressCount, setKeyPressCount] = useState(0);
    const [floatingCode, setFloatingCode] = useState<{ id: number; x: number; y: number; code: string; color: string; size: number; rotation: number }[]>([]);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isKeyboardHovered, setIsKeyboardHovered] = useState(false);
    const [keyboardSpotlight, setKeyboardSpotlight] = useState({ x: 50, y: 50 });
    const [keyboardRipples, setKeyboardRipples] = useState<{ id: number; x: number; y: number }[]>([]);
    const [scrollTilt, setScrollTilt] = useState(0);
    const [lastClickedKey, setLastClickedKey] = useState<{ key: string; time: number } | null>(null);
    const keyboardRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const isDark = theme === 'dark';

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const key = keyMap[e.key] || e.key.toUpperCase();
        setPressedKeys(prev => new Set(prev).add(key));

        // Change background color on every 3 key presses
        setKeyPressCount(prev => {
            const newCount = prev + 1;
            if (newCount % 3 === 0) {
                setBgColorIndex(prevIndex => (prevIndex + 1) % bgColors.length);
            }
            return newCount;
        });

        // Add ripple effect
        const rippleId = Date.now();
        setRipples(prev => [...prev, { id: rippleId, x: Math.random() * 100, y: Math.random() * 100 }]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== rippleId));
        }, 1000);

        // Add multiple floating code snippets (3-5 per keypress)
        const colors = ['#61DAFB', '#00ADD8', '#3178C6', '#E10098', '#339933', '#ec4899', '#f59e0b', '#10b981'];
        const numCodes = Math.floor(Math.random() * 3) + 3; // 3-5 codes per keypress

        for (let i = 0; i < numCodes; i++) {
            const codeId = Date.now() + Math.random() + i;
            const randomCode = codeFragments[Math.floor(Math.random() * codeFragments.length)];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            setTimeout(() => {
                setFloatingCode(prev => [...prev, {
                    id: codeId,
                    x: Math.random() * 90 + 5,
                    y: Math.random() * 90 + 5,
                    code: randomCode,
                    color: randomColor,
                    size: Math.random() * 0.5 + 0.8, // Random size 0.8-1.3x
                    rotation: Math.random() * 20 - 10, // Random rotation -10 to 10 degrees
                }]);
                setTimeout(() => {
                    setFloatingCode(prev => prev.filter(c => c.id !== codeId));
                }, 4000); // Extended display time
            }, i * 50); // Stagger the appearance
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

    const handleKeyClick = (key: string, event: React.MouseEvent<HTMLButtonElement>) => {
        setPressedKeys(prev => new Set(prev).add(key));
        setLastClickedKey({ key, time: Date.now() });

        // Get click position relative to keyboard for ripple
        if (keyboardRef.current) {
            const rect = keyboardRef.current.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            // Add keyboard ripple
            const rippleId = Date.now();
            setKeyboardRipples(prev => [...prev, { id: rippleId, x, y }]);
            setTimeout(() => setKeyboardRipples(prev => prev.filter(r => r.id !== rippleId)), 800);
        }

        // Change background
        setKeyPressCount(prev => {
            const newCount = prev + 1;
            if (newCount % 2 === 0) {
                setBgColorIndex(prevIndex => (prevIndex + 1) % bgColors.length);
            }
            return newCount;
        });

        // Add ripple to background
        const rippleId = Date.now();
        setRipples(prev => [...prev, { id: rippleId, x: Math.random() * 100, y: Math.random() * 100 }]);
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== rippleId)), 1000);

        // Add multiple floating code snippets (3-5 per click)
        const colors = ['#61DAFB', '#00ADD8', '#3178C6', '#E10098', '#339933', '#ec4899', '#f59e0b', '#10b981'];
        const numCodes = Math.floor(Math.random() * 3) + 3;

        for (let i = 0; i < numCodes; i++) {
            const codeId = Date.now() + Math.random() + i;
            const randomCode = codeFragments[Math.floor(Math.random() * codeFragments.length)];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            setTimeout(() => {
                setFloatingCode(prev => [...prev, {
                    id: codeId,
                    x: Math.random() * 90 + 5,
                    y: Math.random() * 90 + 5,
                    code: randomCode,
                    color: randomColor,
                    size: Math.random() * 0.5 + 0.8,
                    rotation: Math.random() * 20 - 10,
                }]);
                setTimeout(() => {
                    setFloatingCode(prev => prev.filter(c => c.id !== codeId));
                }, 4000);
            }, i * 50);
        }

        setTimeout(() => {
            setPressedKeys(prev => {
                const newSet = new Set(prev);
                newSet.delete(key);
                return newSet;
            });
        }, 150);
    };

    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        const typeSpeed = isDeleting ? 50 : 100;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (displayedText.length < currentRole.length) {
                    setDisplayedText(currentRole.slice(0, displayedText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (displayedText.length > 0) {
                    setDisplayedText(displayedText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                }
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentRoleIndex]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            });

            // Track mouse position relative to keyboard for 3D effect and spotlight
            if (keyboardRef.current) {
                const rect = keyboardRef.current.getBoundingClientRect();
                const relX = (e.clientX - rect.left) / rect.width;
                const relY = (e.clientY - rect.top) / rect.height;

                setKeyboardMousePos({
                    x: (relX - 0.5) * 2,
                    y: (relY - 0.5) * 2,
                });

                // Update spotlight position (0-100%)
                setKeyboardSpotlight({
                    x: relX * 100,
                    y: relY * 100,
                });
            }
        };

        // Scroll-triggered effects
        const handleScroll = () => {
            setIsScrolling(true);

            // Update scroll-based tilt for keyboard
            const scrollY = window.scrollY;
            setScrollTilt(Math.sin(scrollY * 0.01) * 5); // Oscillating tilt

            // Clear previous timeout
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            // Generate floating code on scroll
            const colors = ['#61DAFB', '#00ADD8', '#3178C6', '#E10098', '#339933', '#ec4899', '#f59e0b', '#10b981', '#6366f1', '#14b8a6'];
            const numCodes = Math.floor(Math.random() * 2) + 2; // 2-3 codes per scroll event

            for (let i = 0; i < numCodes; i++) {
                const codeId = Date.now() + Math.random() + i;
                const randomCode = codeFragments[Math.floor(Math.random() * codeFragments.length)];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                setTimeout(() => {
                    setFloatingCode(prev => [...prev, {
                        id: codeId,
                        x: Math.random() * 85 + 5,
                        y: Math.random() * 85 + 5,
                        code: randomCode,
                        color: randomColor,
                        size: Math.random() * 0.6 + 0.7,
                        rotation: Math.random() * 30 - 15,
                    }]);
                    setTimeout(() => {
                        setFloatingCode(prev => prev.filter(c => c.id !== codeId));
                    }, 5000);
                }, i * 100);
            }

            // Reset scrolling state after delay
            scrollTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
            }, 200);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [handleKeyDown, handleKeyUp]);

    const getKeyWidth = (key: string) => {
        const wideKeys: Record<string, string> = {
            'Tab': 'w-14', 'Caps': 'w-16', 'Shift': 'w-20', 'Enter': 'w-18',
            'Space': 'w-48', '⌫': 'w-14', 'Ctrl': 'w-12', 'Alt': 'w-10', 'Cmd': 'w-12',
        };
        return wideKeys[key] || 'w-9';
    };

    // Parallax scroll effects
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start']
    });

    // Different parallax speeds for depth
    const orb1Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), { stiffness: 50, damping: 20 });
    const orb2Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), { stiffness: 50, damping: 20 });
    const orb3Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), { stiffness: 50, damping: 20 });
    const orb4Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 180]), { stiffness: 50, damping: 20 });
    const orb5Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), { stiffness: 50, damping: 20 });
    const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), { stiffness: 100, damping: 30 });
    const gridY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 50]), { stiffness: 100, damping: 30 });
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

    // Keyboard parallax - fixed position that moves down as user scrolls through sections
    const keyboardY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 500]), { stiffness: 60, damping: 25 });
    const keyboardRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [12, 18, 22, 28]);
    const keyboardRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, -3]);
    const keyboardScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 0.95]);
    const keyboardOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.7]);

    return (
        <section ref={sectionRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Dynamic Background - changes on keypress */}
            <div className={`absolute inset-0 bg-gradient-to-br ${bgColors[bgColorIndex]} transition-all duration-700`} />

            {/* Animated grid overlay with parallax */}
            <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                    y: gridY,
                    backgroundImage: `
                        linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Multiple glowing orbs with parallax */}
            <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ y: orb1Y }} />
            <motion.div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ y: orb2Y, animationDelay: '1s' }} />
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl" style={{ y: orb3Y }} />
            <motion.div className="absolute top-10 right-1/4 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl animate-float" style={{ y: orb4Y, animationDelay: '2s' }} />
            <motion.div className="absolute bottom-20 left-1/3 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl animate-float" style={{ y: orb5Y, animationDelay: '1.5s' }} />

            {/* Star particles - fixed positions to avoid hydration mismatch */}
            {[
                { left: '10%', top: '15%', opacity: 0.4, delay: '0s', duration: '3s' },
                { left: '25%', top: '8%', opacity: 0.6, delay: '0.5s', duration: '2.5s' },
                { left: '40%', top: '22%', opacity: 0.35, delay: '1s', duration: '3.5s' },
                { left: '55%', top: '12%', opacity: 0.5, delay: '1.5s', duration: '2.8s' },
                { left: '70%', top: '18%', opacity: 0.45, delay: '2s', duration: '3.2s' },
                { left: '85%', top: '10%', opacity: 0.55, delay: '0.3s', duration: '2.6s' },
                { left: '15%', top: '45%', opacity: 0.4, delay: '0.8s', duration: '3.1s' },
                { left: '30%', top: '55%', opacity: 0.5, delay: '1.2s', duration: '2.7s' },
                { left: '75%', top: '48%', opacity: 0.45, delay: '1.8s', duration: '3.3s' },
                { left: '90%', top: '52%', opacity: 0.35, delay: '2.2s', duration: '2.9s' },
                { left: '5%', top: '75%', opacity: 0.5, delay: '0.4s', duration: '3s' },
                { left: '20%', top: '82%', opacity: 0.4, delay: '1.1s', duration: '2.5s' },
                { left: '45%', top: '78%', opacity: 0.55, delay: '1.6s', duration: '3.4s' },
                { left: '60%', top: '85%', opacity: 0.45, delay: '2.1s', duration: '2.8s' },
                { left: '80%', top: '72%', opacity: 0.5, delay: '0.7s', duration: '3.2s' },
                { left: '95%', top: '88%', opacity: 0.35, delay: '1.4s', duration: '2.6s' },
                { left: '35%', top: '35%', opacity: 0.4, delay: '1.9s', duration: '3.1s' },
                { left: '65%', top: '32%', opacity: 0.5, delay: '0.2s', duration: '2.7s' },
                { left: '50%', top: '65%', opacity: 0.45, delay: '2.5s', duration: '3.5s' },
                { left: '12%', top: '92%', opacity: 0.55, delay: '0.9s', duration: '2.9s' },
            ].map((star, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                        left: star.left,
                        top: star.top,
                        opacity: star.opacity,
                        animationDelay: star.delay,
                        animationDuration: star.duration,
                    }}
                />
            ))}

            {/* Gradient lines */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />

            {/* Ripple effects on keypress */}
            {ripples.map(ripple => (
                <div
                    key={ripple.id}
                    className="absolute w-40 h-40 rounded-full pointer-events-none animate-ping"
                    style={{
                        left: `${ripple.x}%`,
                        top: `${ripple.y}%`,
                        background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                    }}
                />
            ))}

            {/* Floating code on keypress - hidden on mobile */}
            <div className="hidden md:block">
                {floatingCode.map(code => (
                    <div
                        key={code.id}
                        className="absolute pointer-events-none font-mono font-bold"
                        style={{
                            left: `${code.x}%`,
                            top: `${code.y}%`,
                            color: code.color,
                            fontSize: `${code.size * 14}px`,
                            textShadow: `0 0 10px ${code.color}, 0 0 20px ${code.color}, 0 0 40px ${code.color}`,
                            animation: 'floatUp 4s ease-out forwards',
                            opacity: 0.9,
                            transform: `rotate(${code.rotation}deg) scale(${code.size})`,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {code.code}
                    </div>
                ))}
            </div>


            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text */}
                    <div className="text-center lg:text-left">
                        <p className="text-primary font-mono text-sm md:text-base mb-4 animate-fade-in-down">
                            👋 Hi there, I&apos;m
                        </p>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white animate-fade-in-up">
                            Reza Julian
                        </h1>

                        <div className="h-12 md:h-14 mb-8">
                            <p className="text-xl md:text-2xl lg:text-3xl text-slate-300">
                                <span className="gradient-text font-semibold">{displayedText}</span>
                                <span className="inline-block w-0.5 h-6 md:h-8 bg-primary ml-1 animate-pulse" />
                            </p>
                        </div>

                        <p className="text-base md:text-lg text-slate-400 max-w-xl mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            Crafting scalable software solutions for <strong className="text-white">7+ years</strong>.
                            I transform complex business challenges into elegant applications.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                            <a href="#contact" className="btn-primary text-base px-8 py-4">
                                Let&apos;s Connect
                            </a>
                            <a href="#projects" className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium rounded-full border border-white/20 text-white hover:bg-white/10 transition-all">
                                View My Work
                            </a>
                        </div>
                    </div>

                    {/* Right side - Interactive 3D Keyboard */}
                    <div
                        className="hidden lg:block"
                        style={{ perspective: '1500px' }}
                        ref={keyboardRef}
                        onMouseEnter={() => setIsKeyboardHovered(true)}
                        onMouseLeave={() => setIsKeyboardHovered(false)}
                    >
                        <div
                            style={{
                                transform: `rotateX(${15 + mousePosition.y * 5 + scrollTilt}deg) rotateY(${mousePosition.x * 10}deg) scale(${isKeyboardHovered ? 1.02 : 1})`,
                                transformStyle: 'preserve-3d',
                                transition: 'transform 0.15s ease-out',
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        transform: `rotateX(${keyboardMousePos.y * 8}deg) rotateY(${keyboardMousePos.x * 12}deg)`,
                                        transformStyle: 'preserve-3d',
                                        transition: 'transform 0.1s ease-out',
                                    }}
                                >
                                    <div
                                        className="rounded-2xl p-3 shadow-2xl transition-all duration-500 relative overflow-hidden"
                                        style={{
                                            background: isDark
                                                ? 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)'
                                                : 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
                                            boxShadow: isDark
                                                ? `0 50px 100px -20px rgba(0, 0, 0, 0.7), 0 0 ${pressedKeys.size * 20 + (hoveredKey ? 15 : 0) + (isKeyboardHovered ? 20 : 0)}px rgba(139, 92, 246, 0.3)`
                                                : `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 ${pressedKeys.size * 20 + (hoveredKey ? 15 : 0) + (isKeyboardHovered ? 20 : 0)}px rgba(59, 130, 246, 0.2)`,
                                        }}
                                    >
                                        {/* Cursor spotlight effect */}
                                        {isKeyboardHovered && (
                                            <div
                                                className="absolute pointer-events-none transition-all duration-75"
                                                style={{
                                                    left: `${keyboardSpotlight.x}%`,
                                                    top: `${keyboardSpotlight.y}%`,
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '200px',
                                                    height: '200px',
                                                    background: `radial-gradient(circle, ${isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(99, 102, 241, 0.2)'} 0%, transparent 70%)`,
                                                    borderRadius: '50%',
                                                }}
                                            />
                                        )}

                                        {/* Click ripple effects on keyboard */}
                                        {keyboardRipples.map(ripple => (
                                            <div
                                                key={ripple.id}
                                                className="absolute pointer-events-none animate-ping"
                                                style={{
                                                    left: `${ripple.x}%`,
                                                    top: `${ripple.y}%`,
                                                    transform: 'translate(-50%, -50%)',
                                                    width: '100px',
                                                    height: '100px',
                                                    background: `radial-gradient(circle, ${isDark ? 'rgba(236, 72, 153, 0.4)' : 'rgba(99, 102, 241, 0.3)'} 0%, transparent 70%)`,
                                                    borderRadius: '50%',
                                                }}
                                            />
                                        ))}

                                        {/* LED strip */}
                                        <div
                                            className="absolute -bottom-1 left-4 right-4 h-1 rounded-full transition-all duration-300"
                                            style={{
                                                background: `linear-gradient(90deg, ${pressedKeys.size > 0 || hoveredKey || isKeyboardHovered ? '#ec4899' : '#3b82f6'}, #8b5cf6, ${pressedKeys.size > 0 || hoveredKey || isKeyboardHovered ? '#3b82f6' : '#ec4899'})`,
                                                boxShadow: `0 0 ${20 + pressedKeys.size * 10 + (hoveredKey ? 10 : 0) + (isKeyboardHovered ? 15 : 0)}px ${pressedKeys.size > 0 || hoveredKey || isKeyboardHovered ? '#ec4899' : '#8b5cf6'}`,
                                            }}
                                        />

                                        <div className="flex flex-col gap-1 relative z-10">
                                            {keyboardLayout.map((row, rowIndex) => (
                                                <div key={rowIndex} className="flex gap-1 justify-center">
                                                    {row.map((key, keyIndex) => {
                                                        const isPressed = pressedKeys.has(key) || pressedKeys.has(key.toUpperCase());
                                                        const isHovered = hoveredKey === key;
                                                        const wasRecentlyClicked = lastClickedKey?.key === key && Date.now() - lastClickedKey.time < 300;
                                                        return (
                                                            <button
                                                                key={`${rowIndex}-${keyIndex}`}
                                                                onClick={(e) => handleKeyClick(key, e)}
                                                                onMouseEnter={() => setHoveredKey(key)}
                                                                onMouseLeave={() => setHoveredKey(null)}
                                                                className={`${getKeyWidth(key)} h-8 rounded-md flex items-center justify-center text-[10px] font-medium select-none transition-all duration-150`}
                                                                style={{
                                                                    background: isPressed || wasRecentlyClicked
                                                                        ? 'linear-gradient(145deg, #3b82f6, #8b5cf6)'
                                                                        : isHovered
                                                                            ? isDark
                                                                                ? 'linear-gradient(145deg, #3a3a5e, #2a2a4e)'
                                                                                : 'linear-gradient(145deg, #e0e7ff, #c7d2fe)'
                                                                            : isDark
                                                                                ? 'linear-gradient(145deg, #2a2a3e, #1a1a2e)'
                                                                                : 'linear-gradient(145deg, #f8fafc, #e2e8f0)',
                                                                    color: isPressed || wasRecentlyClicked ? '#fff' : isHovered ? (isDark ? '#a5b4fc' : '#4f46e5') : isDark ? '#888' : '#374151',
                                                                    boxShadow: isPressed || wasRecentlyClicked
                                                                        ? '0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)'
                                                                        : isHovered
                                                                            ? isDark
                                                                                ? '0 0 15px rgba(139, 92, 246, 0.5), 0 6px 12px rgba(0,0,0,0.5)'
                                                                                : '0 0 15px rgba(99, 102, 241, 0.4), 0 6px 12px rgba(0,0,0,0.2)'
                                                                            : isDark
                                                                                ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.3)'
                                                                                : 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.1)',
                                                                    transform: isPressed || wasRecentlyClicked
                                                                        ? 'translateY(3px) scale(0.92)'
                                                                        : isHovered
                                                                            ? 'translateY(-3px) scale(1.08)'
                                                                            : '',
                                                                    border: isDark ? 'none' : isHovered ? '1px solid #c7d2fe' : '1px solid #e2e8f0',
                                                                }}
                                                            >
                                                                {key}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-center text-xs text-slate-500 mt-4">
                                        ✨ Hover, click, scroll, or type to interact!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
