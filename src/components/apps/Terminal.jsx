import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from './Terminal.module.css';
import getCommands, { welcomeBanner } from '../../config/terminal';
import aiService from '../../services/aiService.js';

// Helper function to render text with clickable links
const renderWithLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = String(text).split(urlRegex);
  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
};

const Terminal = ({ onClose, desktopIcons = [], onOpenCv, onOpenAbout }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(() =>
    welcomeBanner.map((line) => ({ type: 'output', text: line })),
  );
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const endOfHistoryRef = useRef(null);
  const inputRef = useRef(null);

  const commands = useMemo(
    () =>
      getCommands({
        desktopIcons,
        onOpenCv,
        onOpenAbout,
        onClose,
        setHistory,
      }),
    [desktopIcons, onOpenCv, onOpenAbout, onClose, setHistory],
  );

  // Focus on input on initial render
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const processCommand = async (commandStr) => {
    const [cmd, ...args] = commandStr.trim().split(' ');
    const command = commands[cmd.toLowerCase()];

    let output;
    if (command) {
      output = await command.execute(args);
    } else if (cmd) {
      // If not a command, treat as AI question
      try {
        output = await aiService.chat(commandStr);
      } catch {
        output = `command not found: ${cmd}`;
      }
    }

    if (output !== null && output !== undefined) {
      const newHistoryEntry = {
        type: 'output',
        ...(typeof output === 'string' || Array.isArray(output)
          ? { text: output }
          : output),
      };
      setHistory((prev) => [...prev, newHistoryEntry]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = input.trim();
      setHistory((prev) => [...prev, { type: 'input', text: command }]);
      processCommand(command);
      if (command && command !== commandHistory[0]) {
        setCommandHistory((prev) => [command, ...prev]);
      }
      setHistoryIndex(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (
        commandHistory.length > 0 &&
        historyIndex < commandHistory.length - 1
      ) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const possibleCommands = Object.keys(commands).filter((c) =>
        c.startsWith(input.toLowerCase()),
      );
      if (possibleCommands.length === 1) {
        setInput(possibleCommands[0]);
      }
    }
  };

  const renderOutput = (output) => {
    if (output.type === 'neofetch') {
      return (
        <div className={styles.neofetchContainer}>
          <div className={styles.neofetchImage}></div>
          <div className={styles.neofetchInfo}>
            <div>
              <span>User</span>: <span>{output.info.user}</span>
            </div>
            <div>
              <span>OS</span>: <span>{output.info.os}</span>
            </div>
            <div>
              <span>Host</span>: <span>{output.info.host}</span>
            </div>
            <div>
              <span>Title</span>: <span>{output.info.title}</span>
            </div>
            <div>
              <span>Shell</span>: <span>{output.info.shell}</span>
            </div>
            <div>
              <span>DE</span>: <span>{output.info.de}</span>
            </div>
            <div>
              <span>Terminal</span>: <span>{output.info.terminal}</span>
            </div>
            <div>
              <span>Skills</span>: <span>{output.info.skills}</span>
            </div>
            <div>
              <span>Contact</span>: <span>{output.info.contact}</span>
            </div>
            <div>
              <span>Environment</span>: <span>{output.environment}</span>
            </div>
            <div>
              <span>Browser</span>: <span>{output.browser}</span>
            </div>
          </div>
        </div>
      );
    }

    const text = output.text;
    if (Array.isArray(text)) {
      return text.map((line, i) => <div key={i}>{renderWithLinks(line)}</div>);
    }
    return <div>{renderWithLinks(text)}</div>;
  };

  return (
    <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
      <div className={styles.history}>
        {history.map((item, index) => (
          <div key={index}>
            {item.type === 'input' ? (
              <div className={styles.inputLine}>
                <span className={styles.promptUser}>feunix@nixia</span>
                <span className={styles.promptSymbol}>:$ ~ </span>
                <span>{item.text}</span>
              </div>
            ) : (
              <div className={styles.output}>{renderOutput(item)}</div>
            )}
          </div>
        ))}
        <div ref={endOfHistoryRef} />
      </div>
      <div className={styles.inputLine}>
        <span className={styles.promptUser}>feunix@nixia</span>
        <span className={styles.promptSymbol}>:$ ~ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.input}
          autoComplete="off"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;
