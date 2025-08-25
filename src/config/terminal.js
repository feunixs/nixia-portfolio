import aiService from '../services/aiService.js';

const getCommands = (dependencies) => {
  const {
    desktopIcons = [],
    onOpenCv,
    onOpenAbout,
    onClose,
    setHistory,
  } = dependencies;

  const commandMap = {
    ls: {
      description: 'List items on the desktop.',
      execute: () => desktopIcons.map((icon) => icon.label).join('   '),
    },
    open: {
      description: 'Open an application (e.g., open cv).',
      execute: (args) => {
        const app = args[0];
        if (app === 'cv') {
          onOpenCv();
          return 'Opening Curriculum Vitae...';
        } else if (app === 'about') {
          onOpenAbout();
          return 'Opening About Me...';
        }
        return `Error: Application '${app}' not found. Try 'cv' or 'about'.`;
      },
    },
    neofetch: {
      description: 'Display system information.',
      execute: () => ({
        environment: import.meta.env.MODE,
        browser: (() => {
          const userAgent = navigator.userAgent;
          if (userAgent.includes('Firefox/')) return 'Mozilla Firefox';
          if (userAgent.includes('Edg/')) return 'Microsoft Edge';
          if (userAgent.includes('Chrome/') && !userAgent.includes('Edg/'))
            return 'Google Chrome';
          if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/'))
            return 'Apple Safari';
          return 'Unknown Browser';
        })(),
        type: 'neofetch',
        info: {
          user: 'feunix@nixia',
          os: 'Nixia OS x86_64',
          host: 'Feunix',
          title: 'Developer',
          shell: 'zsh (emulated)',
          de: 'GNOME (Nixia Edition)',
          terminal: 'Nixia Terminal',
          skills: 'Jack of all trades',
          contact: 'feunixwork@gmail.com',
        },
      }),
    },
    projects: {
      description: 'View my key projects.',
      execute: () => [
        'Here are some of my key projects:',
        '  - Nixia ERP: An ERP Distribution System built with Next.js.',
        '    Link: https://nixia-erp.vercel.app/',
        '  - (More projects coming soon...)',
      ],
    },
    socials: {
      description: 'Display my social media links.',
      execute: () => [
        'Find me on the web:',
        '  - GitHub: https://github.com/feunixs',
        '  - Instagram: https://www.instagram.com/feunixs',
      ],
    },
    email: {
      description: 'Show my contact email.',
      execute: () => 'You can reach me at: feunixwork@gmail.com',
    },
    whoami: {
      description: 'Display user information.',
      execute: () =>
        'feunix (Muhamad Zaki) - A passionate Full-Stack Developer.',
    },
    date: {
      description: 'Show the current date.',
      execute: () => new Date().toLocaleString(),
    },
    echo: {
      description: 'Display a line of text.',
      execute: (args) => args.join(' '),
    },
    sudo: {
      description: 'Hmm...',
      execute: () =>
        'User is not in the sudoers file. This incident will be reported.',
    },
    clear: {
      description: 'Clear the terminal screen.',
      execute: () => {
        setHistory([]);
        return null; // No output
      },
    },
    exit: {
      description: 'Close the terminal.',
      execute: () => {
        onClose();
        return null; // No output
      },
    },
  };

  // Add help command separately to dynamically generate content
  commandMap.help = {
    description: 'Show this help message.',
    execute: () => {
      const commandList = Object.keys(commandMap)
        .sort()
        .map((cmd) => `  ${cmd.padEnd(15)} - ${commandMap[cmd].description}`);
      return ['Available commands:', ...commandList];
    },
  };

  return commandMap;
};

export const welcomeBanner = [
  '//=======================================\\',
  '//      N I X I A   T E R M I N A L      \\',
  '\\=======================================//',
  '',
  'Welcome to my interactive portfolio!',
  "Type 'help' to discover all the things you can do.",
  '',
  '🤖 AI Assistant: Ask me anything about Zaki or this portfolio!',
  '   Example: "Tell me about your experience" or "What technologies do you use?"',
];

export default getCommands;
