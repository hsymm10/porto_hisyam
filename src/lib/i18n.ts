import { writable } from 'svelte/store';

export type Language = 'id' | 'en';

const STORAGE_KEY = 'porto_lang';

function getInitialLang(): Language {
	if (typeof window === 'undefined') return 'id';
	const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
	if (saved === 'id' || saved === 'en') return saved;
	return 'id';
}

export const currentLang = writable<Language>(getInitialLang());

export function setLanguage(lang: Language) {
	currentLang.set(lang);
	if (typeof window !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, lang);
		document.documentElement.lang = lang;
	}
}

export function toggleLanguage() {
	currentLang.update((cur) => {
		const next = cur === 'id' ? 'en' : 'id';
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, next);
			document.documentElement.lang = next;
		}
		return next;
	});
}

export const t = {
	id: {
		nav: {
			about: 'Tentang',
			projects: 'Proyek',
			craft: 'The Craft',
			certs: 'Sertifikat',
			snapshots: 'Kegiatan',
			contact: 'Kontak',
			contactMe: 'Hubungi Saya'
		},
		hero: {
			badge: 'Halo, Saya Hisyam — Software Developer',
			headlinePrefix: 'Software',
			headlineSuffix: 'Developer',
			bio: 'Hisyam Sayyid Alzam, siswa SMK jurusan Rekayasa Perangkat Lunak yang berfokus pada pengembangan website dan aplikasi. Berpengalaman sebagai Project Manager dan Developer dalam proyek pengembangan sistem. Memiliki kemampuan teknis, kepemimpinan, koordinasi tim, dan problem solving, serta berkomitmen untuk terus berkembang di bidang teknologi.',
			viewWork: 'Lihat Karya',
			downloadResume: 'Unduh CV',
			connect: 'Hubungi Saya',
			skillsMarquee: 'Tech Stack & Keahlian'
		},
		craft: {
			badge: 'How I Build • The Craft',
			scrollHint: 'Gulir untuk melihat cerita ↓',
			storiesLabel: 'Kategori',
			p1: {
				kicker: 'Arsitektur Web',
				title: 'Handal dari Frontend ke Backend.',
				caption: 'Membangun sistem yang terstruktur, aman, dan mudah dikembangkan.',
				tags: ['Full Stack', 'RESTful API', 'Clean Code']
			},
			p2: {
				kicker: 'Desain UI/UX',
				title: 'Fungsional, Estetik & Intuitif.',
				caption: 'Merancang alur pengguna dari wireframe Figma hingga antarmuka siap pakai.',
				tags: ['Figma', 'Design System', 'User-Centric']
			},
			p3: {
				kicker: 'Performa & Interaksi',
				title: 'Cepat dan Responsif.',
				caption: 'Pengalaman interaktif yang mulus tanpa mengorbankan kecepatan akses.',
				tags: ['Core Web Vitals', 'Responsive', 'Fluid Animation']
			},
			p4: {
				kicker: 'Manajemen Proyek',
				title: 'Kolaboratif dan Terarah.',
				caption:
					'Berpengalaman mengoordinasikan tim teknis untuk menyelesaikan produk tepat waktu.',
				tags: ['Problem Solving', 'Team Lead', 'Deliverable']
			}
		},
		projects: {
			badge: 'Karya Unggulan',
			title: 'FEATURED PROJECTS',
			viewRepo: 'Lihat Repository',
			openLive: 'Buka Sistem',
			openFigma: 'Buka Figma',
			modalHint: 'Klik gambar untuk melihat preview penuh',
			closeModal: 'Tutup'
		},
		snapshots: {
			badge: 'Dokumentasi Kegiatan • Snapshots',
			title: 'FIELD NOTES ON A LINE',
			hint: 'Klik foto untuk memperbesar tampilan',
			viewFull: 'Lihat Gambar Penuh ↗'
		},
		certs: {
			badge: 'Pencapaian',
			title: 'CERTIFICATIONS',
			viewCert: 'Lihat Sertifikat'
		},
		experiences: {
			badge: 'Pengalaman & Rekam Jejak',
			title: 'EXPERIENCE & ACHIEVEMENTS',
			org: 'Pengalaman Organisasi & Kepemimpinan',
			training: 'Pelatihan & Sertifikasi',
			awards: 'Prestasi'
		},
		contact: {
			badge: 'Mari Terhubung',
			title: "LET'S BUILD SOMETHING TOGETHER",
			subtitle:
				'Tertarik berkolaborasi atau ingin berdiskusi seputar proyek web & desain? Silakan kirim pesan atau hubungi saya langsung.',
			sendEmail: 'Kirim Email',
			chatWa: 'Chat WhatsApp',
			socials: 'Sosial Media'
		}
	},
	en: {
		nav: {
			about: 'About',
			projects: 'Projects',
			craft: 'The Craft',
			certs: 'Certifications',
			snapshots: 'Snapshots',
			contact: 'Contact',
			contactMe: 'Contact Me'
		},
		hero: {
			badge: "Hey, I'm Hisyam — Software Developer",
			headlinePrefix: 'Software',
			headlineSuffix: 'Developer',
			bio: 'Hisyam Sayyid Alzam, a vocational software engineering student focused on building modern websites and applications. Experienced as a Project Manager and Developer delivering production-ready web systems. Skilled in leadership, team coordination, problem solving, and committed to continuous technical growth.',
			viewWork: 'View My Work',
			downloadResume: 'Download Resume',
			connect: 'Connect With Me',
			skillsMarquee: 'Tech Stack & Skills'
		},
		craft: {
			badge: 'How I Build • The Craft',
			scrollHint: 'Keep scrolling to flip stories ↓',
			storiesLabel: 'Stories',
			p1: {
				kicker: 'Web Architecture',
				title: 'Reliable from Frontend to Backend.',
				caption: 'Engineering structured, secure, and easily maintainable web systems.',
				tags: ['Full Stack', 'RESTful API', 'Clean Code']
			},
			p2: {
				kicker: 'UI/UX Design',
				title: 'Functional, Aesthetic & Intuitive.',
				caption: 'Crafting user journeys from Figma wireframes to production-ready interfaces.',
				tags: ['Figma', 'Design System', 'User-Centric']
			},
			p3: {
				kicker: 'Speed & Interaction',
				title: 'Fast, Fluid & Accessible.',
				caption: 'Smooth interactive experiences without sacrificing lightning-fast speed.',
				tags: ['Core Web Vitals', 'Responsive', 'Fluid Animation']
			},
			p4: {
				kicker: 'Project Leadership',
				title: 'Collaborative & Goal-Driven.',
				caption: 'Leading technical teams with structured milestones and timely delivery.',
				tags: ['Problem Solving', 'Team Lead', 'Deliverable']
			}
		},
		projects: {
			badge: 'Featured Works',
			title: 'FEATURED PROJECTS',
			viewRepo: 'View Repository',
			openLive: 'Launch App',
			openFigma: 'Open Figma',
			modalHint: 'Click image for full preview',
			closeModal: 'Close'
		},
		snapshots: {
			badge: 'Activity Log • Snapshots',
			title: 'FIELD NOTES ON A LINE',
			hint: 'Click any photo to inspect details',
			viewFull: 'View Full Image ↗'
		},
		certs: {
			badge: 'Milestones',
			title: 'CERTIFICATIONS',
			viewCert: 'View Certificate'
		},
		experiences: {
			badge: 'Background & Track Record',
			title: 'EXPERIENCE & ACHIEVEMENTS',
			org: 'Organizational & Leadership Experience',
			training: 'Training & Certifications',
			awards: 'Awards & Honors'
		},
		contact: {
			badge: 'Get in Touch',
			title: "LET'S BUILD SOMETHING TOGETHER",
			subtitle:
				'Interested in collaborating or discussing web projects & UI/UX? Feel free to reach out directly.',
			sendEmail: 'Send Email',
			chatWa: 'Chat WhatsApp',
			socials: 'Social Media'
		}
	}
};

export const projectTranslations: Record<
	string,
	{
		id: { role: string; title: string; description: string };
		en: { role: string; title: string; description: string };
	}
> = {
	'h2sn-photobooth': {
		id: {
			role: 'Full Stack Web Developer',
			title: 'H2SN Photobooth',
			description:
				'Membangun website photobooth untuk mendukung operasional bisnis. Website menyediakan informasi layanan, galeri, paket, serta pengelolaan data secara digital.'
		},
		en: {
			role: 'Full Stack Web Developer',
			title: 'H2SN Photobooth',
			description:
				'Engineered a photobooth web application to support business operations with package listings, gallery showcases, and digital booking management.'
		}
	},
	'uic-press': {
		id: {
			role: 'Project Manager',
			title: 'Website UIC Press Universitas Ibnu Chaldun',
			description:
				'Memimpin pembangunan website UIC Press mulai dari analisis kebutuhan hingga implementasi. Mengoordinasikan tim dalam membangun Dashboard Admin, manajemen buku dan penulis, unggah berkas, serta pengaturan website.'
		},
		en: {
			role: 'Project Manager',
			title: 'UIC Press Website — Ibnu Chaldun University',
			description:
				'Led the UIC Press website project from requirement analysis to deployment. Coordinated the engineering team building Admin Dashboards, manuscript and author management, file uploads, and CMS settings.'
		}
	},
	'e-presensi-sekolah': {
		id: {
			role: 'Full Stack Web Developer',
			title: 'E-Presensi Sekolah',
			description:
				'Membangun sistem presensi sekolah berbasis web dengan empat hak akses pengguna. Sistem dilengkapi fitur presensi melalui smartphone, manajemen pengguna, dan sinkronisasi data secara real-time.'
		},
		en: {
			role: 'Full Stack Web Developer',
			title: 'School E-Attendance System',
			description:
				'Built a multi-role school attendance platform with 4 access levels, featuring mobile-first attendance logging, user management, and real-time syncing.'
		}
	},
	'company-profile-gsc': {
		id: {
			role: 'Frontend Web Developer',
			title: 'Website Company Profile GSC',
			description:
				'Membangun website company profile yang responsif sebagai media promosi digital Bimbingan Belajar GSC.'
		},
		en: {
			role: 'Frontend Web Developer',
			title: 'GSC Learning Center Company Profile',
			description:
				'Designed and built a responsive company profile website as a digital promotion hub for GSC Learning Center.'
		}
	},
	'kedai-mie-mamaw': {
		id: {
			role: 'Frontend Web Developer',
			title: 'Website Kedai Mie Mamaw',
			description:
				'Membangun website menu digital yang terintegrasi dengan WhatsApp untuk memudahkan proses pemesanan pelanggan.'
		},
		en: {
			role: 'Frontend Web Developer',
			title: 'Kedai Mie Mamaw Digital Menu',
			description:
				'Built a responsive digital menu website integrated directly with WhatsApp to streamline customer food orders.'
		}
	},
	'indah-bakery': {
		id: {
			role: 'Frontend Web Developer',
			title: 'Website Indah Bakery',
			description:
				'Membangun website company profile dan katalog produk yang dilengkapi fitur keranjang belanja serta integrasi WhatsApp.'
		},
		en: {
			role: 'Frontend Web Developer',
			title: 'Indah Bakery Online Catalog',
			description:
				'Developed a bakery catalog website featuring shopping cart management and automated WhatsApp order checkout.'
		}
	},
	'93-printing': {
		id: {
			role: 'Frontend Web Developer',
			title: 'Website 93 Printing',
			description:
				'Membangun website company profile sebagai media branding dan promosi digital bagi bisnis percetakan.'
		},
		en: {
			role: 'Frontend Web Developer',
			title: '93 Printing Company Profile',
			description:
				'Created a professional branding website showcasing digital printing services, product portfolios, and inquiries.'
		}
	},
	'platform-game-kir': {
		id: {
			role: 'Game Developer',
			title: 'Platform Game Berbasis Web',
			description:
				'Membangun lebih dari sepuluh game edukatif berbasis HTML, CSS, dan JavaScript sebagai media pembelajaran untuk kegiatan ekstrakurikuler KIR.'
		},
		en: {
			role: 'Game Developer',
			title: 'Web-Based Educational Game Platform',
			description:
				'Developed 10+ interactive browser games using HTML, CSS, and JavaScript as interactive STEM learning tools.'
		}
	},
	'shortlink-linkku': {
		id: {
			role: 'Web Developer',
			title: 'Shortlink LinkKu',
			description: 'Layanan pemendek URL cepat dan mudah digunakan.'
		},
		en: {
			role: 'Web Developer',
			title: 'Shortlink LinkKu',
			description: 'Fast, lightweight URL shortener and link redirection web tool.'
		}
	},
	'putra-sunda-jaya': {
		id: {
			role: 'Web Developer',
			title: 'Putra Sunda Jaya',
			description: 'Website profil bisnis dan layanan konstruksi & pengadaan.'
		},
		en: {
			role: 'Web Developer',
			title: 'Putra Sunda Jaya',
			description: 'Corporate business profile highlighting construction and supply services.'
		}
	},
	'web-keuangan': {
		id: {
			role: 'Web Developer',
			title: 'Sistem Keuangan',
			description: 'Aplikasi pembukuan dan pelaporan kas keuangan digital.'
		},
		en: {
			role: 'Web Developer',
			title: 'Financial Cashflow System',
			description: 'Digital bookkeeping and cashflow management dashboard with report generation.'
		}
	},
	'web-kasir-custom': {
		id: {
			role: 'Web Developer',
			title: 'Kasir Custom',
			description: 'Aplikasi kasir (POS) fleksibel dengan pencatatan transaksi.'
		},
		en: {
			role: 'Web Developer',
			title: 'Custom Point of Sale (POS)',
			description: 'Flexible POS cash register web app supporting real-time transaction recording.'
		}
	},
	'web-undangan-organisasi': {
		id: {
			role: 'Web Developer',
			title: 'Undangan Organisasi',
			description: 'Website undangan digital formal untuk acara rapat dan musyawarah.'
		},
		en: {
			role: 'Web Developer',
			title: 'Organizational Digital Invitation',
			description: 'Digital event invitations with automated attendee confirmations and details.'
		}
	},
	'web-buku-tamu': {
		id: {
			role: 'Web Developer',
			title: 'Buku Tamu Digital',
			description: 'Sistem pencatatan tamu digital untuk event dan kunjungan resmi.'
		},
		en: {
			role: 'Web Developer',
			title: 'Digital Guestbook App',
			description: 'Digital visitor and event attendee recording system with search and export.'
		}
	}
};
