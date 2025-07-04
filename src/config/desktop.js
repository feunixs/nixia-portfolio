import { FiFileText, FiUser, FiTerminal, FiFolder } from 'react-icons/fi';

export const initialDesktopIcons = [
  {
    id: 'cv',
    label: 'Resume.pdf',
    position: { x: 20, y: 20 },
    type: 'app',
    component: 'CV',
  },
  {
    id: 'terminal',
    label: 'Terminal',
    position: { x: 20, y: 120 },
    type: 'app',
    component: 'Terminal',
  },
  {
    id: 'about',
    label: 'About Me',
    position: { x: 20, y: 220 },
    type: 'app',
    component: 'AboutMe',
  },
  {
    id: 'projects',
    label: 'Projects',
    position: { x: 20, y: 320 },
    type: 'folder',
    children: [
      {
        id: 'nixia-erp',
        label: 'Nixia-ERP',
        type: 'folder',
        children: [
          {
            id: 'nixia-erp-readme',
            label: 'Readme.txt',
            type: 'file',
            content:
              '# Nixia-ERP\n\n## A modern ERP Distribution System for a distribution company.\n\n**Tech Stack:**\n- Next.js 15\n- Prisma\n- MySQL\n- TailwindCSS v4\n- shadcn/ui\n- NextAuth v5\n\n**Features:**\n- Role-based Authentication (Admin, User)\n- Dashboard with charts (Recharts)\n- CRUD operations for products, orders, and customers\n- Light/Dark Theme & Layout control\n\n**Live Demo Credentials:**\n- Username: user\n- Password: user123',
          },
          {
            id: 'nixia-erp-screenshots',
            label: 'Screenshots',
            type: 'gallery',
            sources: [
              '/assets/nixia-erp/dashboard.png',
              '/assets/nixia-erp/dashboard2.png',
              '/assets/nixia-erp/pengirimanbarang.png',
              '/assets/nixia-erp/hakakses.png',
            ],
          },
          {
            id: 'nixia-erp-launch',
            label: 'Nixia ERP',
            type: 'image',
            src: '/assets/nixia-erp/loginpage.png',
            projectUrl: 'https://nixia-erp.vercel.app/',
          },
        ],
      },
    ],
  },
];

export const getIconComponent = (icon) => {
  switch (icon.id) {
    case 'cv':
      return FiFileText;
    case 'terminal':
      return FiTerminal;
    case 'about':
      return FiUser;
    case 'projects':
      return FiFolder;
    default:
      // Handle nested items like files in folders
      if (icon.type === 'file') return FiFileText;
      if (icon.type === 'gallery') return FiFolder;
      if (icon.type === 'image') return FiFileText;
      return FiFolder;
  }
};
