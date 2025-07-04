import { FiFileText, FiTerminal, FiSettings, FiUser } from 'react-icons/fi';

export const mainApps = [
  { id: 'cv', label: 'Curriculum Vitae', icon: FiFileText, type: 'app' },
  { id: 'terminal', label: 'Terminal', icon: FiTerminal, type: 'app' },
  { id: 'about', label: 'About Me', icon: FiUser, type: 'app' },
];

export const utilityApps = [
  { id: 'settings', label: 'Settings', icon: FiSettings, type: 'app' },
];
