// Enhanced AI Service with Groq (Primary) + Hugging Face (Fallback) APIs
class AIService {
  constructor() {
    // API configurations
    this.groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
    this.hfToken = import.meta.env.VITE_HUGGING_FACE_TOKEN;
    
    // Groq API (primary - faster and better quality)
    this.groqBaseURL = 'https://api.groq.com/openai/v1/chat/completions';
    this.groqModel = 'llama3-8b-8192';
    
    // Hugging Face API (fallback)
    this.hfBaseURL = 'https://api-inference.huggingface.co/models';
    this.hfModel = 'microsoft/DialoGPT-medium';
    
    // Portfolio context for AI responses
    this.portfolioContext = {
      name: "Muhamad Zaki",
      nickname: "Zaki",
      internetHandle: "Feunix",
      role: "Full Stack Developer & Administrator",
      email: "feunixwork@gmail.com",
      phone: "(+62) 896-7775-0947",
      location: "Jakarta, Indonesia",
      skills: ["Next.js", "React.js", "Vue.js", "Node.js", "Express.js", "Fastify", "Nest.js", "MySQL", "PostgreSQL", "UI/UX Design"],
      experience: "5+ tahun pengalaman profesional di Performance Analysis (WOM Finance), Freelance Web Development, dan sebelumnya sebagai Administrator di PT. Perkebunan Nusantara VI. Saat ini sedang mencari pekerjaan dan siap bekerja secepatnya di Jakarta",
      workHistory: [
        {
          company: "PT. PERKEBUNAN NUSANTARA VI",
          position: "Administrator",
          period: "2023-2025",
          location: "Danau Kembar, Solok",
          responsibilities: "Administrasi perkantoran, pengelolaan data operasional produksi teh (35 ton/hari), laporan produksi"
        },
        {
          company: "Self Employed",
          position: "Freelancer (Web Developer & Graphic Designer)",
          period: "2022-2023",
          responsibilities: "Web development (Frontend & Backend), UI/UX Design, Logo & visual design"
        },
        {
          company: "WOM FINANCE",
          position: "Performance Analyst",
          period: "2020-2022",
          location: "Jakarta Utara",
          responsibilities: "Analisis kinerja penjualan, evaluasi target, pemantauan marketing & operasional"
        }
      ],
      projects: [
        {
          name: "Website Portfolio dengan interface macOS",
          tech: "React 19.1.0, Vite 7.0.0, CSS Modules, Groq API, Hugging Face API, React Context API, React Icons 5.5.0, re-resizable 6.11.2, react-draggable 4.5.0, react-pdf 10.0.1",
          description: "Portfolio interaktif dengan design macOS, terminal emulator, AI assistant, responsive design"
        },
        {
          name: "Sistem ERP (Nixia ERP)",
          tech: "Next.js, Node.js, Database management",
          description: "Enterprise Resource Planning system untuk manajemen bisnis"
        },
        {
          name: "Berbagai aplikasi React dan Vue.js",
          tech: "React.js, Vue.js, JavaScript, CSS",
          description: "Frontend applications dengan modern frameworks"
        },
        {
          name: "UI/UX Design projects",
          tech: "Figma, Adobe Creative Suite, Prototyping tools",
          description: "User interface dan user experience design untuk berbagai klien"
        },
        {
          name: "Graphic design untuk berbagai klien",
          tech: "Adobe Photoshop, Illustrator, InDesign",
          description: "Logo, brosur, poster, spanduk, kemasan produk, konten media sosial"
        }
      ],
      education: "Budi Luhur University - Bachelor of System Information (6th Semester)",
      languages: ["Bahasa Indonesia", "English"]
    };
    
    // AI Assistant identity
    this.aiName = "Nixia";
    
    // Complete knowledge base about the portfolio
    this.knowledgeBase = {
      terminal: {
        commands: {
          "ls": "Menampilkan daftar aplikasi/file di desktop",
          "open cv": "Membuka CV/Resume dalam format PDF",
          "open about": "Membuka aplikasi About Me dengan informasi detail",
          "neofetch": "Menampilkan informasi sistem dan profil developer",
          "projects": "Menampilkan daftar proyek utama dengan link",
          "socials": "Menampilkan link media sosial (GitHub, Instagram)",
          "email": "Menampilkan alamat email kontak",
          "whoami": "Menampilkan informasi singkat tentang user",
          "date": "Menampilkan tanggal dan waktu saat ini",
          "echo [text]": "Menampilkan teks yang diketik",
          "clear": "Membersihkan layar terminal",
          "exit": "Menutup terminal",
          "help": "Menampilkan daftar semua command yang tersedia",
          "sudo": "Easter egg - pesan lucu tentang permission"
        },
        features: [
          "Command history dengan arrow up/down",
          "Tab completion untuk command",
          "Auto-focus pada input",
          "Clickable links dalam output",
          "Smooth scrolling ke output terbaru",
          "Emulasi terminal Unix/Linux style"
        ],
        usage: "Terminal ini adalah emulasi terminal Unix dengan interface macOS. Ketik 'help' untuk melihat semua command atau langsung tanyakan sesuatu kepada AI."
      },
      portfolio: {
        design: "Interface macOS dengan dock, desktop icons, dan window management",
        components: {
          "Desktop": "Area utama dengan wallpaper dan desktop icons",
          "Dock": "Bar navigasi di bawah (mobile) atau kiri (desktop) dengan app icons",
          "TopBar": "Menu bar atas dengan waktu dan kontrol",
          "Windows": "Aplikasi yang dapat dibuka, dipindah, dan diubah ukurannya",
          "Terminal": "Aplikasi terminal interaktif dengan AI assistant",
          "About Me": "Aplikasi dengan informasi detail tentang developer",
          "CV Viewer": "Aplikasi untuk melihat CV dalam format PDF"
        },
        responsive: {
          "Mobile": "Single-click, full-screen windows, dock horizontal di bawah",
          "Desktop": "Double-click, resizable windows, dock vertikal di kiri",
          "Touch-friendly": "Ukuran target touch yang optimal untuk mobile"
        },
        navigation: "Klik icon di desktop atau dock untuk membuka aplikasi. Drag windows untuk memindah. Resize dari corner kanan bawah."
      },
      technology: {
        "Frontend": "React 19.1.0 dengan Vite 7.0.0 sebagai build tool",
        "Styling": "CSS Modules untuk component-scoped styling",
        "State Management": "React Context API untuk window management",
        "Icons": "React Icons 5.5.0",
        "Window Management": "re-resizable 6.11.2 untuk resize windows, react-draggable 4.5.0 untuk drag functionality",
        "PDF Viewer": "react-pdf 10.0.1 untuk CV viewer",
        "Analytics": "@vercel/analytics 1.5.0 untuk tracking",
        "AI Integration": "Groq API (primary) + Hugging Face (fallback)",
        "Responsive": "Mobile-first CSS dengan media queries",
        "Development": "ESLint 9.29.0, Prettier 3.6.2 untuk code quality",
        "Deployment": "Dapat di-deploy ke Vercel, Netlify, atau platform lain"
      },
      // Common questions from HR and visitors
      commonQuestions: {
        hr: {
          "gaji": "Ekspektasi gaji dapat didiskusikan berdasarkan scope project dan durasi. Terbuka untuk negosiasi sesuai standar industri.",
          "remote": "Tersedia untuk kerja remote, hybrid, maupun onsite. Fleksibel dengan timezone dan meeting schedule. Berpengalaman WFH sebagai freelancer 2022-2023.",
          "waktu": "Tersedia full-time, part-time, atau project-based. Saat ini bekerja sebagai Administrator di PTPN VI (2023-2025), dapat menyesuaikan dengan kebutuhan.",
          "mulai": "Dapat mulai bekerja sesuai kesepakatan. Saat ini masih bekerja di PTPN VI hingga 2025, tapi terbuka untuk diskusi timeline.",
          "lokasi": "Berbasis di Jakarta, Indonesia. Berpengalaman kerja di Jakarta (WOM Finance) dan Solok (PTPN VI). Terbuka untuk relokasi.",
          "tim": "Berpengalaman bekerja dalam tim di berbagai environment: corporate (WOM Finance), freelance collaboration, dan administrasi (PTPN VI).",
          "komunikasi": "Lancar berkomunikasi dalam Bahasa Indonesia dan English, baik verbal maupun written. Pengalaman reporting dan presentasi di corporate.",
          "overtime": "Fleksibel dengan deadline ketat. Pengalaman menangani target penjualan di WOM Finance dan deadline produksi di PTPN VI (35 ton/hari)."
        },
        visitor: {
          "siapa": "Muhamad Zaki (Feunix) adalah Full Stack Developer & Administrator dengan pengalaman profesional di Performance Analysis (WOM Finance), Freelance Web Development, dan sebelumnya sebagai Administrator di PT. Perkebunan Nusantara VI. Saat ini sedang mencari pekerjaan dan siap bekerja secepatnya di Jakarta",
          "portofolio": "Portfolio ini dibuat untuk showcase skills dan projects, menggunakan design macOS yang interaktif. Menampilkan kemampuan frontend, backend, dan UI/UX design.",
          "kontak": "Email: feunixwork@gmail.com, Phone: (+62) 896-7775-0947. Bisa juga ketik 'email' atau 'socials' di terminal, atau lihat CV lengkap dengan 'open cv'.",
          "teknologi": "Expert dalam Next.js, React.js, Vue.js, Node.js, Express.js, Fastify, Nest.js, MySQL, PostgreSQL. Juga berpengalaman UI/UX Design dan Graphic Design.",
          "layanan": "Menyediakan jasa: Web Development (Frontend & Backend), UI/UX Design, Graphic Design, System Analysis, dan konsultasi teknologi.",
          "harga": "Harga project disesuaikan dengan kompleksitas dan timeline. Konsultasi gratis untuk diskusi awal. Berpengalaman handle project freelance 2022-2023."
        },
        technical: {
          "react": "Expert dalam React 19.1.0, hooks, context API, dan ecosystem React modern termasuk Next.js. Portfolio ini menggunakan React 19.1.0 dengan Vite 7.0.0 sebagai build tool.",
          "backend": "Berpengalaman dengan Node.js, Express.js, Fastify, Nest.js, RESTful APIs, dan database design (MySQL, PostgreSQL, In-Memory DB, NewSQL).",
          "deployment": "Familiar dengan deployment ke Vercel, Netlify, AWS, dan setup CI/CD pipeline. Portfolio ini dapat di-deploy ke berbagai platform.",
          "testing": "Menggunakan Jest, React Testing Library, dan praktik TDD dalam development process.",
          "performance": "Fokus pada web performance optimization, lazy loading, code splitting, dan SEO best practices. Portfolio menggunakan CSS Modules untuk optimal performance.",
          "mobile": "Expert dalam responsive design dan progressive web apps (PWA) development. Portfolio ini fully responsive dengan mobile-first approach.",
          "ai": "Mengintegrasikan AI dalam aplikasi menggunakan Groq API (primary) dan Hugging Face API (fallback). Portfolio ini memiliki AI assistant yang dapat menjawab pertanyaan.",
          "design": "Berpengalaman UI/UX Design dan Graphic Design menggunakan Figma, Adobe Creative Suite. Portfolio menampilkan kemampuan design dengan interface macOS.",
          "libraries": "Menggunakan re-resizable 6.11.2 untuk window resizing, react-draggable 4.5.0 untuk drag functionality, react-pdf 10.0.1 untuk PDF viewer, @vercel/analytics 1.5.0 untuk tracking."
        }
      }
    };
  }

  // Enhanced local responses with comprehensive knowledge
  getLocalResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // HR Questions - Salary, Work Arrangement, etc.
    if (lowerMessage.includes('gaji') || lowerMessage.includes('salary') || lowerMessage.includes('bayaran') || lowerMessage.includes('fee')) {
      return this.knowledgeBase.commonQuestions.hr.gaji;
    }
    
    if (lowerMessage.includes('remote') || lowerMessage.includes('wfh') || lowerMessage.includes('work from home') || lowerMessage.includes('hybrid')) {
      return this.knowledgeBase.commonQuestions.hr.remote;
    }
    
    if (lowerMessage.includes('waktu kerja') || lowerMessage.includes('jam kerja') || lowerMessage.includes('full time') || lowerMessage.includes('part time')) {
      return this.knowledgeBase.commonQuestions.hr.waktu;
    }
    
    if (lowerMessage.includes('kapan mulai') || lowerMessage.includes('start date') || lowerMessage.includes('available') || lowerMessage.includes('tersedia')) {
      return this.knowledgeBase.commonQuestions.hr.mulai;
    }
    
    if (lowerMessage.includes('lokasi') || lowerMessage.includes('domisili') || lowerMessage.includes('relokasi') || lowerMessage.includes('pindah')) {
      return this.knowledgeBase.commonQuestions.hr.lokasi;
    }
    
    if (lowerMessage.includes('tim') || lowerMessage.includes('team') || lowerMessage.includes('kolaborasi') || lowerMessage.includes('kerja sama')) {
      return this.knowledgeBase.commonQuestions.hr.tim;
    }
    
    if (lowerMessage.includes('komunikasi') || lowerMessage.includes('bahasa') || lowerMessage.includes('english')) {
      return this.knowledgeBase.commonQuestions.hr.komunikasi;
    }
    
    if (lowerMessage.includes('overtime') || lowerMessage.includes('lembur') || lowerMessage.includes('deadline') || lowerMessage.includes('urgent')) {
      return this.knowledgeBase.commonQuestions.hr.overtime;
    }
    
    // Technical Questions
    if (lowerMessage.includes('react') && (lowerMessage.includes('pengalaman') || lowerMessage.includes('skill') || lowerMessage.includes('expert'))) {
      return this.knowledgeBase.commonQuestions.technical.react;
    }
    
    if (lowerMessage.includes('backend') || lowerMessage.includes('server') || lowerMessage.includes('api')) {
      return this.knowledgeBase.commonQuestions.technical.backend;
    }
    
    if (lowerMessage.includes('deployment') || lowerMessage.includes('hosting') || lowerMessage.includes('deploy')) {
      return this.knowledgeBase.commonQuestions.technical.deployment;
    }
    
    if (lowerMessage.includes('testing') || lowerMessage.includes('test') || lowerMessage.includes('quality')) {
      return this.knowledgeBase.commonQuestions.technical.testing;
    }
    
    if (lowerMessage.includes('performance') || lowerMessage.includes('optimasi') || lowerMessage.includes('speed')) {
      return this.knowledgeBase.commonQuestions.technical.performance;
    }
    
    if (lowerMessage.includes('mobile') && (lowerMessage.includes('app') || lowerMessage.includes('responsive'))) {
      return this.knowledgeBase.commonQuestions.technical.mobile;
    }
    
    // Visitor Questions
    if (lowerMessage.includes('siapa') || lowerMessage.includes('who') || lowerMessage.includes('tentang')) {
      return this.knowledgeBase.commonQuestions.visitor.siapa;
    }
    
    if (lowerMessage.includes('layanan') || lowerMessage.includes('service') || lowerMessage.includes('jasa')) {
      return this.knowledgeBase.commonQuestions.visitor.layanan;
    }
    
    if (lowerMessage.includes('harga') || lowerMessage.includes('biaya') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return this.knowledgeBase.commonQuestions.visitor.harga;
    }
    
    // Terminal and commands help
    if (lowerMessage.includes('terminal') || lowerMessage.includes('command') || lowerMessage.includes('cara pakai') || lowerMessage.includes('cara kerja')) {
      if (lowerMessage.includes('command') || lowerMessage.includes('perintah')) {
        const commandList = Object.entries(this.knowledgeBase.terminal.commands)
          .map(([cmd, desc]) => `• ${cmd}: ${desc}`)
          .join('\n');
        return `Terminal ini memiliki command berikut:\n\n${commandList}\n\nAnda juga bisa langsung bertanya kepada saya tanpa menggunakan command khusus!`;
      }
      return `${this.knowledgeBase.terminal.usage} Fitur terminal: ${this.knowledgeBase.terminal.features.join(', ')}. Ketik 'help' untuk melihat semua command.`;
    }
    
    // Portfolio features and navigation
    if (lowerMessage.includes('website') || lowerMessage.includes('portfolio') || lowerMessage.includes('fitur') || lowerMessage.includes('navigasi')) {
      return `Portfolio ini menggunakan ${this.knowledgeBase.portfolio.design}. Komponen utama: ${Object.keys(this.knowledgeBase.portfolio.components).join(', ')}. ${this.knowledgeBase.portfolio.navigation}`;
    }
    
    // Technology stack
    if (lowerMessage.includes('teknologi') || lowerMessage.includes('tech stack') || lowerMessage.includes('dibuat dengan')) {
      const techList = Object.entries(this.knowledgeBase.technology)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      return `Portfolio ini dibuat dengan: ${techList}`;
    }
    
    // Skills and expertise
    if (lowerMessage.includes('skill') || lowerMessage.includes('keahlian')) {
      return `Saya memiliki keahlian dalam: ${this.portfolioContext.skills.join(', ')}. Saya memiliki ${this.portfolioContext.experience} dengan fokus pada teknologi web modern.`;
    }
    
    // Projects
    if (lowerMessage.includes('project') || lowerMessage.includes('proyek') || lowerMessage.includes('karya')) {
      return `Beberapa proyek utama saya: ${this.portfolioContext.projects.map(p => p.name).join(', ')}. Setiap proyek menunjukkan berbagai aspek pengembangan full-stack. Ketik 'projects' di terminal untuk melihat detail dan link.`;
    }
    
    // Name and identity - respond as Muhamad Zaki
    if (lowerMessage.includes('nama') || lowerMessage.includes('siapa') || lowerMessage.includes('name') || lowerMessage.includes('who')) {
      const responses = [
        `Saya ${this.portfolioContext.name}, tapi teman-teman biasa panggil ${this.portfolioContext.nickname} 😊 Saya passionate developer yang suka explore teknologi baru!`,
        `Nama saya ${this.portfolioContext.name}, atau ${this.portfolioContext.nickname} aja. Seorang ${this.portfolioContext.role} yang selalu excited dengan project-project challenging! 💻`,
        `${this.portfolioContext.name} here! Biasa dipanggil ${this.portfolioContext.nickname}. ${this.portfolioContext.experience} dan masih terus belajar setiap hari 🚀`
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Experience
    if (lowerMessage.includes('experience') || lowerMessage.includes('pengalaman') || lowerMessage.includes('background')) {
      const experiences = [
        `${this.portfolioContext.experience} 💼 Yang menarik, saya punya background unik dari performance analyst ke developer - jadi saya paham bisnis dan teknis!`,
        `Perjalanan saya cukup diverse! ${this.portfolioContext.experience} Dari analisis data di WOM Finance, freelancing, sampai administrasi di perkebunan teh 🍃 Sekarang fokus full-stack development!`,
        `Saya memiliki ${this.portfolioContext.experience} ⚡ Background analytics saya membantu banget dalam problem-solving dan optimasi code!`
      ];
      return experiences[Math.floor(Math.random() * experiences.length)];
    }
    
    // Contact and hiring
    if (lowerMessage.includes('contact') || lowerMessage.includes('kontak') || lowerMessage.includes('hire') || lowerMessage.includes('kerja')) {
      return `Saya tersedia untuk proyek freelance dan kesempatan kerja full-time! Ketik 'email' untuk melihat kontak atau 'socials' untuk media sosial. Anda juga bisa buka CV dengan 'open cv'.`;
    }
    
    // Education
    if (lowerMessage.includes('education') || lowerMessage.includes('pendidikan') || lowerMessage.includes('kuliah')) {
      return `Saya memiliki ${this.portfolioContext.education} dan terus belajar teknologi baru untuk mengikuti tren industri.`;
    }
    
    // Greeting - introduce as Nixia assistant
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('halo') || lowerMessage.includes('hai')) {
      const greetings = [
        `Halo! 👋 Saya ${this.aiName}, asisten AI ${this.portfolioContext.name}. Senang bertemu dengan Anda! Ada yang ingin ditanyakan tentang Zaki atau portfolio ini?`,
        `Hi there! ⚡ Saya ${this.aiName}, yang membantu menjawab pertanyaan tentang ${this.portfolioContext.name}. Mau tahu tentang pengalaman coding, proyek-proyek, atau hal lainnya?`,
        `Halo! 🚀 ${this.aiName} di sini, asisten ${this.portfolioContext.name}. Siap membantu Anda explore portfolio ini dan mengenal lebih jauh tentang Zaki!`
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Help and guidance
    if (lowerMessage.includes('help') || lowerMessage.includes('bantuan') || lowerMessage.includes('apa yang bisa')) {
      return `Saya bisa membantu menjelaskan:\n• Keahlian dan pengalaman ${this.portfolioContext.name}\n• Pertanyaan HRD (gaji, remote work, timeline, dll)\n• Cara kerja terminal dan semua commandnya\n• Fitur-fitur portfolio dan navigasi\n• Teknologi yang digunakan\n• Layanan dan harga project\n\nTanyakan apa saja yang ingin Anda ketahui!`;
    }
    
    return null; // No local response found, will try AI APIs
  }

  // Enhanced fallback responses when all APIs fail
  getFallbackResponse(message = '') {
    // Try to provide intelligent responses even when API fails
    const lowerMessage = message.toLowerCase();
    
    // Date and time questions - with real-time data
    if (lowerMessage.includes('hari') || lowerMessage.includes('tanggal') || lowerMessage.includes('waktu') || lowerMessage.includes('jam')) {
      const now = new Date();
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      
      const dayName = days[now.getDay()];
      const date = now.getDate();
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      
      return `Hari ini adalah hari ${dayName}, ${date} ${month} ${year}. Waktu sekarang pukul ${time} WIB. Semoga harimu menyenangkan! 😊`;
    }
    
    // Weather and general day questions
    if (lowerMessage.includes('cuaca') || lowerMessage.includes('cerah') || lowerMessage.includes('hujan')) {
      const now = new Date();
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const dayName = days[now.getDay()];
      return `Hari ${dayName} ini semoga cerah dan produktif! ☀️ Saya tidak bisa cek cuaca real-time, tapi semoga cuacanya mendukung aktivitas Anda hari ini!`;
    }

    // Programming and technical questions
    if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
      return "JavaScript adalah bahasa pemrograman yang sangat powerful! 🚀 Zaki sering menggunakannya untuk frontend (React, Vue) dan backend (Node.js). Portfolio ini juga dibangun dengan JavaScript modern. Ada yang spesifik ingin ditanyakan tentang JS?";
    }
    
    if (lowerMessage.includes('react') || lowerMessage.includes('frontend')) {
      return "React adalah salah satu framework favorit Zaki! ⚛️ Sangat bagus untuk membangun UI yang interaktif dan scalable. Portfolio ini juga dibuat dengan React 19.1.0 terbaru. Mau tahu lebih detail tentang implementasinya?";
    }
    
    if (lowerMessage.includes('backend') || lowerMessage.includes('server')) {
      return "Backend development itu passion Zaki! 💻 Dia berpengalaman dengan Node.js, Express.js, Nest.js, Fastify, dan berbagai database. Penting untuk memahami arsitektur yang scalable dan secure.";
    }
    
    if (lowerMessage.includes('database') || lowerMessage.includes('sql')) {
      return "Database adalah jantung dari aplikasi! 🗄️ Zaki familiar dengan MySQL, PostgreSQL, dan teknologi database modern lainnya. Desain schema yang baik sangat crucial untuk performa aplikasi.";
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('proyek')) {
      return "Zaki sudah mengerjakan berbagai proyek menarik! 🎯 Dari Nixia ERP (sistem distribusi), portfolio interaktif ini, sampai berbagai aplikasi web. Ketik 'projects' di terminal untuk melihat detail lengkap!";
    }
    
    // Career and professional questions
    if (lowerMessage.includes('gaji') || lowerMessage.includes('salary')) {
      return "Untuk diskusi gaji, Zaki biasanya sesuaikan dengan kompleksitas proyek dan timeline. 💰 Dia terbuka untuk negosiasi sesuai standar industri dan value yang diberikan. Mau diskusi lebih detail?";
    }
    
    if (lowerMessage.includes('remote') || lowerMessage.includes('wfh')) {
      return "Remote work? Absolutely! 🏠 Zaki sudah terbiasa kerja remote dan punya setup yang mendukung produktivitas. Pengalaman freelance 2022-2023 membuktikan kemampuan kerja remote yang baik.";
    }
    
    // General fallbacks with enhanced intelligence and real-time context
    const now = new Date();
    const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = days[now.getDay()];
    
    const fallbacks = [
      `Maaf, koneksi AI sedang bermasalah 🤔 Tapi saya tetap bisa membantu dengan pertanyaan tentang Zaki, teknologi, atau portfolio ini. Sekarang hari ${dayName} pukul ${time} WIB. Silakan tanya apa saja!`,
      `Oops! API sedang maintenance 😅 Tapi jangan khawatir, saya masih bisa diskusi tentang programming, pengalaman Zaki, atau topik lainnya. Ada yang ingin dibahas?`,
      `Sistem AI utama sedang loading 🔄 Namun saya tetap siap membantu dengan pengetahuan tentang Zaki dan teknologi. Mau tanya tentang web development, proyek-proyeknya, atau hal lain?`,
      `Ada kendala teknis sementara 🛠️ Tapi saya masih aktif untuk menjawab pertanyaan tentang Zaki, coding, teknologi, atau apapun yang ingin Anda ketahui!`,
      `Koneksi ke server AI terganggu 🌐 Tapi saya tetap di sini siap membantu. Silakan tanya tentang pengalaman Zaki, programming, atau topik apapun!`
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Primary AI response using Groq API (faster and better quality)
  async getGroqResponse(message) {
    try {
      if (!this.groqApiKey) {
        return null;
      }

      const systemPrompt = `Anda adalah ${this.aiName}, AI assistant yang sangat cerdas dan berpengetahuan luas tentang ${this.portfolioContext.name}, seorang ${this.portfolioContext.role} dari ${this.portfolioContext.location}.

INFORMASI LENGKAP TENTANG ${this.portfolioContext.name}:
- Keahlian: ${this.portfolioContext.skills.join(', ')}
- Pengalaman: ${this.portfolioContext.experience}
- Proyek: ${this.portfolioContext.projects.join(', ')}
- Pendidikan: ${this.portfolioContext.education}
- GitHub: https://github.com/feunixs
- LinkedIn: https://www.linkedin.com/in/feunix
- Instagram: https://www.instagram.com/feunixs
- Email: feunixwork@gmail.com
- Phone: (+62) 896-7775-0947

ADVANCED AI CAPABILITIES:
- Anda adalah AI yang sangat cerdas dan berpengetahuan luas seperti ChatGPT atau Claude
- Bisa menjawab SEMUA jenis pertanyaan: teknologi, bisnis, sains, budaya, sejarah, dll
- Gunakan pengetahuan umum yang mendalam untuk diskusi apapun
- Berikan analisis yang tajam, saran praktis, dan solusi kreatif
- Adaptasi gaya komunikasi dari casual hingga formal sesuai konteks
- Jangan terbatas pada template responses - be genuinely intelligent and helpful

PERSONALITY & INTELLIGENCE:
- Sangat cerdas dengan expertise mendalam di berbagai bidang
- Natural, friendly, dan engaging - seperti berbicara dengan teman ahli
- Gunakan emoji strategis untuk memperkaya komunikasi
- Tunjukkan insight yang valuable dan perspektif unik
- Bisa menjelaskan konsep kompleks dengan mudah dipahami
- Proaktif memberikan informasi tambahan yang relevan

RESPONSE GUIDELINES:
- Jawab dalam Bahasa Indonesia yang natural, cerdas, dan engaging
- Untuk pertanyaan personal tentang ${this.portfolioContext.name}, jawab sebagai dirinya (gunakan "Saya")
- Untuk pertanyaan umum/teknis, jawab sebagai AI assistant yang sangat knowledgeable
- Berikan jawaban yang comprehensive, insightful, dan actionable
- Jangan ragu memberikan context, analisis mendalam, atau saran tambahan
- Adaptasi panjang dan detail jawaban sesuai kompleksitas pertanyaan
- Selalu helpful dan informatif, hindari jawaban generic atau template

KNOWLEDGE BASE PORTFOLIO:
Terminal Commands: ${Object.entries(this.knowledgeBase.terminal.commands).map(([cmd, desc]) => `${cmd} (${desc})`).join(', ')}
Portfolio Components: ${Object.entries(this.knowledgeBase.portfolio.components).map(([comp, desc]) => `${comp} (${desc})`).join(', ')}
Technology Stack: ${Object.entries(this.knowledgeBase.technology).map(([tech, desc]) => `${tech}: ${desc}`).join(', ')}

COMMON QUESTIONS & ANSWERS:
HR Questions: ${Object.entries(this.knowledgeBase.commonQuestions.hr).map(([q, a]) => `${q}: ${a}`).join(' | ')}
Technical Questions: ${Object.entries(this.knowledgeBase.commonQuestions.technical).map(([q, a]) => `${q}: ${a}`).join(' | ')}
Visitor Questions: ${Object.entries(this.knowledgeBase.commonQuestions.visitor).map(([q, a]) => `${q}: ${a}`).join(' | ')}

Anda sangat pintar dan fleksibel. Bisa menjawab SEMUA pertanyaan:
1. Pertanyaan HRD (gaji, remote work, timeline, komunikasi, dll)
2. Pertanyaan teknis (React, backend, deployment, testing, dll)
3. Pertanyaan pengunjung (layanan, harga, kontak, dll)
4. Semua tentang ${this.portfolioContext.name} (keahlian, proyek, pengalaman)
5. Cara kerja terminal dan semua commandnya
6. Fitur-fitur portfolio dan navigasi
7. Teknologi yang digunakan

Jawab dalam bahasa Indonesia dengan profesional, informatif, dan membantu. Jawaban singkat tapi komprehensif (2-4 kalimat). Anda adalah ${this.aiName}, bukan ${this.portfolioContext.name}.`;

      const response = await fetch(this.groqBaseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.groqApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.groqModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      if (response.ok) {
        const result = await response.json();
        const aiResponse = result.choices?.[0]?.message?.content?.trim();
        
        if (aiResponse && aiResponse.length > 10) {
          return aiResponse;
        }
      }
      
      return null;
      
    } catch {
      // Silent error handling for production
      return null;
    }
  }

  // Fallback AI response using Hugging Face API
  async getHuggingFaceResponse(message) {
    try {
      if (!this.hfToken) {
        return null;
      }

      const prompt = `Context: You are an AI assistant for ${this.portfolioContext.name}, a ${this.portfolioContext.role}.
Skills: ${this.portfolioContext.skills.join(', ')}
Experience: ${this.portfolioContext.experience}
Projects: ${this.portfolioContext.projects.join(', ')}

Question: ${message}
Answer:`;

      const response = await fetch(`${this.hfBaseURL}/${this.hfModel}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.hfToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 200,
            temperature: 0.7,
            do_sample: true,
            return_full_text: false
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        const aiResponse = result[0]?.generated_text?.trim();
        
        if (aiResponse && aiResponse.length > 10) {
          return aiResponse;
        }
      }
      
      return null;
      
    } catch {
      // Silent error handling for production
      return null;
    }
  }

  // Main chat method - enhanced with better fallback handling
  async chat(message) {
    if (!message.trim()) {
      return "Silakan tanyakan sesuatu tentang portfolio Zaki!";
    }

    try {
      // First try local knowledge base for quick responses
      const localResponse = this.getLocalResponse(message);
      if (localResponse) {
        return localResponse;
      }

      // Try Groq API first (faster and better quality)
      const groqResponse = await this.getGroqResponse(message);
      if (groqResponse) {
        return groqResponse;
      }

      // Fallback to Hugging Face API
      const hfResponse = await this.getHuggingFaceResponse(message);
      if (hfResponse) {
        return hfResponse;
      }

      // If all APIs fail, return enhanced fallback with intelligent routing
      return this.getFallbackResponse(message);
    } catch {
      // Silent error handling for production
      return this.getFallbackResponse(message);
    }
  }
}

export default new AIService();
