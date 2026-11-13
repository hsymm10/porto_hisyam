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
			skills: 'Keahlian',
			projects: 'Proyek',
			craft: 'Metode Kerja',
			certs: 'Sertifikasi',
			experience: 'Pengalaman',
			snapshots: 'Kegiatan',
			contact: 'Kontak',
			contactMe: 'Hubungi Saya'
		},
		hero: {
			badge: 'Halo, Saya Hisyam — Pengembang Perangkat Lunak',
			headlinePrefix: 'Pengembang',
			headlineSuffix: 'Perangkat Lunak',
			bio: 'Hisyam Sayyid Alzam, siswa SMK jurusan Rekayasa Perangkat Lunak yang berfokus pada pengembangan website dan aplikasi. Berpengalaman sebagai Manajer Proyek dan Pengembang dalam proyek pengembangan sistem. Memiliki kemampuan teknis, kepemimpinan, koordinasi tim, dan pemecahan masalah, serta berkomitmen untuk terus berkembang di bidang teknologi.',
			viewWork: 'Lihat Karya',
			downloadResume: 'Unduh Resume',
			connect: 'Hubungi Saya',
			skillsMarquee: 'Keahlian & Tech Stack',
			lanyardBadge: 'Tarik • Klik untuk Membalik',
			skillsLabel: 'Keahlian',
			marqueePlay: 'Jalankan animasi keahlian',
			marqueePause: 'Jeda animasi keahlian'
		},
		craft: {
			badge: 'Cara Saya Membangun • Standar Kualitas',
			scrollHint: 'Gulir untuk melihat cerita ↓',
			storiesLabel: 'Kategori',
			scoreLabel: 'SKOR',
			motionEasing: 'Kecepatan Gerak',
			motionPlay: 'Jalankan',
			stageLabel: 'TAHAP',
			statusCompleted: 'Selesai',
			statusOnSchedule: 'Tepat Waktu',
			p1: {
				kicker: 'Arsitektur Web',
				title: 'Handal dari Frontend ke Backend.',
				caption: 'Membangun sistem yang terstruktur, aman, dan mudah dikembangkan.',
				tags: ['Frontend & Backend', 'RESTful API', 'Kode Bersih'],
				pipeline: [
					{
						step: '01',
						label: 'Antarmuka Pengguna',
						desc: 'SvelteKit / Nuxt / Tailwind',
						badge: 'Reaktif'
					},
					{
						step: '02',
						label: 'API RESTful',
						desc: 'Endpoint Laravel / Node.js',
						badge: 'Terproteksi'
					},
					{
						step: '03',
						label: 'Basis Data',
						desc: 'Skema PostgreSQL / MySQL',
						badge: 'Ternormalisasi'
					}
				]
			},
			p2: {
				kicker: 'Desain UI/UX',
				title: 'Fungsional, Estetik & Intuitif.',
				caption: 'Merancang alur pengguna dari wireframe Figma hingga antarmuka siap pakai.',
				tags: ['Figma', 'Sistem Desain', 'Fokus Pengguna'],
				stages: [
					{
						no: '01',
						name: 'Wireframe & Alur',
						desc: 'Memetakan alur interaksi dan struktur informasi pengguna.',
						tag: 'Figma'
					},
					{
						no: '02',
						name: 'Sistem Desain',
						desc: 'Komponen modular, skala tipografi, dan warna konsisten.',
						tag: 'Token'
					},
					{
						no: '03',
						name: 'Prototipe Interaktif',
						desc: 'Uji simulasi keterpakaian sebelum tahap implementasi kode.',
						tag: 'Keterpakaian'
					}
				]
			},
			p3: {
				kicker: 'Performa & Interaksi',
				title: 'Cepat dan Responsif.',
				caption: 'Pengalaman interaktif yang mulus tanpa mengorbankan kecepatan akses.',
				tags: ['Core Web Vitals', 'Responsif', 'Animasi Halus']
			},
			p4: {
				kicker: 'Manajemen Proyek',
				title: 'Kolaboratif dan Terarah.',
				caption:
					'Berpengalaman mengoordinasikan tim teknis untuk menyelesaikan produk tepat waktu.',
				tags: ['Pemecahan Masalah', 'Ketua Tim', 'Hasil Kerja'],
				sprint: [
					{
						task: 'Perencanaan Sprint & Pembagian Tugas',
						status: 'Selesai',
						owner: 'Ketua / PM'
					},
					{
						task: 'Pengembangan Fitur & Tinjauan Kode',
						status: 'Selesai',
						owner: 'Tim Pengembang'
					},
					{
						task: 'Jaminan Kualitas & Pengujian Pengguna',
						status: 'Selesai',
						owner: 'QA & Klien'
					},
					{
						task: 'Peluncuran Produksi & Penerapan',
						status: 'Tepat Waktu',
						owner: 'DevOps / Ketua'
					}
				]
			}
		},
		projects: {
			badge: 'Karya Unggulan',
			title: 'PROYEK UNGGULAN',
			viewRepo: 'Lihat Repositori',
			openLive: 'Buka Sistem',
			openFigma: 'Buka Figma',
			viewProject: 'Lihat Proyek',
			viewAll: 'Lihat Semua Proyek',
			backToCarousel: 'Kembali ke Korsel',
			preview: 'Pratinjau',
			previewComingSoon: 'Gambar Pratinjau Segera Hadir',
			seeFullPreview: 'Lihat pratinjau penuh',
			prevProject: 'Proyek sebelumnya',
			nextProject: 'Proyek berikutnya',
			modalHint: 'Klik gambar untuk melihat preview penuh',
			closeModal: 'Tutup'
		},
		snapshots: {
			badge: 'Dokumentasi Kegiatan • Rekaman Visual',
			title: 'CATATAN KEGIATAN & PERJALANAN',
			hint: 'Klik foto untuk memperbesar tampilan',
			viewFull: 'Lihat Gambar Penuh ↗',
			prevPhoto: 'Foto sebelumnya',
			nextPhoto: 'Foto berikutnya',
			closeModal: 'Tutup pratinjau foto'
		},
		certs: {
			badge: 'Pencapaian',
			title: 'SERTIFIKASI',
			viewCert: 'Lihat Sertifikat',
			viewAll: 'Lihat Semua Sertifikasi',
			prevCert: 'Sertifikat sebelumnya',
			nextCert: 'Sertifikat berikutnya',
			closeModal: 'Tutup pratinjau sertifikat'
		},
		experiences: {
			badge: 'Pengalaman & Rekam Jejak',
			title: 'PENGALAMAN & PRESTASI',
			sidebarLabel: 'PENGALAMAN',
			viewResume: 'Lihat Resume Lengkap',
			org: 'Pengalaman Organisasi & Kepemimpinan',
			training: 'Pelatihan & Sertifikasi',
			awards: 'Prestasi'
		},
		contact: {
			badge: 'Mari Terhubung',
			title: 'MARI MEMBANGUN SESUATU YANG LUAR BIASA BERSAMA',
			ctaHeadline1: 'Mari Buat',
			ctaHeadline2: 'Sesuatu Yang',
			ctaHeadline3: 'Luar Biasa',
			ctaHeadline4: 'Bersama.',
			ctaButton: 'Hubungi Saya',
			subtitle:
				'Tertarik berkolaborasi atau ingin berdiskusi seputar proyek web & desain? Silakan kirim pesan atau hubungi saya langsung.',
			sendEmail: 'Kirim Email',
			chatWa: 'Chat WhatsApp',
			socials: 'Media Sosial'
		},
		footer: {
			bio: '@hszam__ Membangun solusi digital yang terarah dan berdampak.'
		}
	},
	en: {
		nav: {
			skills: 'Skills',
			projects: 'Projects',
			craft: 'The Craft',
			certs: 'Certifications',
			experience: 'Experience',
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
			skillsMarquee: 'Tech Stack & Skills',
			lanyardBadge: 'Drag • Click to Flip',
			skillsLabel: 'Skills',
			marqueePlay: 'Play skills marquee',
			marqueePause: 'Pause skills marquee'
		},
		craft: {
			badge: 'How I Build • The Craft',
			scrollHint: 'Keep scrolling to flip stories ↓',
			storiesLabel: 'Stories',
			scoreLabel: 'SCORE',
			motionEasing: 'Motion Easing',
			motionPlay: 'Play',
			stageLabel: 'STAGE',
			statusCompleted: 'Completed',
			statusOnSchedule: 'On Schedule',
			p1: {
				kicker: 'Web Architecture',
				title: 'Reliable from Frontend to Backend.',
				caption: 'Engineering structured, secure, and easily maintainable web systems.',
				tags: ['Full Stack', 'RESTful API', 'Clean Code'],
				pipeline: [
					{
						step: '01',
						label: 'Frontend UI',
						desc: 'SvelteKit / Nuxt / Tailwind',
						badge: 'Reactive'
					},
					{
						step: '02',
						label: 'RESTful API',
						desc: 'Laravel / Node.js Endpoint',
						badge: 'Protected'
					},
					{
						step: '03',
						label: 'Database',
						desc: 'PostgreSQL / MySQL Schema',
						badge: 'Normalized'
					}
				]
			},
			p2: {
				kicker: 'UI/UX Design',
				title: 'Functional, Aesthetic & Intuitive.',
				caption: 'Crafting user journeys from Figma wireframes to production-ready interfaces.',
				tags: ['Figma', 'Design System', 'User-Centric'],
				stages: [
					{
						no: '01',
						name: 'Wireframe & Flow',
						desc: 'Mapping user interaction flows and information architecture.',
						tag: 'Figma'
					},
					{
						no: '02',
						name: 'Design System',
						desc: 'Modular components, typographic scale, and consistent palette.',
						tag: 'Tokens'
					},
					{
						no: '03',
						name: 'Interactive Prototype',
						desc: 'Simulating user experience before entering production code.',
						tag: 'Usability'
					}
				]
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
				tags: ['Problem Solving', 'Team Lead', 'Deliverable'],
				sprint: [
					{
						task: 'Sprint Planning & Task Breakdown',
						status: 'Completed',
						owner: 'Lead / PM'
					},
					{
						task: 'Feature Development & Code Review',
						status: 'Completed',
						owner: 'Dev Team'
					},
					{
						task: 'Quality Assurance & User Testing',
						status: 'Completed',
						owner: 'QA & Client'
					},
					{
						task: 'Production Release & Deployment',
						status: 'On Schedule',
						owner: 'DevOps / Lead'
					}
				]
			}
		},
		projects: {
			badge: 'Featured Works',
			title: 'FEATURED PROJECTS',
			viewRepo: 'View Repository',
			openLive: 'Launch App',
			openFigma: 'Open Figma',
			viewProject: 'View Project',
			viewAll: 'View All Projects',
			backToCarousel: 'Back to Carousel',
			preview: 'Preview',
			previewComingSoon: 'Preview Image Coming Soon',
			seeFullPreview: 'View full preview of',
			prevProject: 'Previous project',
			nextProject: 'Next project',
			modalHint: 'Click image for full preview',
			closeModal: 'Close'
		},
		snapshots: {
			badge: 'Activity Log • Snapshots',
			title: 'FIELD NOTES ON A LINE',
			hint: 'Click any photo to inspect details',
			viewFull: 'View Full Image ↗',
			prevPhoto: 'Previous photo',
			nextPhoto: 'Next photo',
			closeModal: 'Close photo preview'
		},
		certs: {
			badge: 'Milestones',
			title: 'CERTIFICATIONS',
			viewCert: 'View Certificate',
			viewAll: 'View All Certifications',
			prevCert: 'Previous certificate',
			nextCert: 'Next certificate',
			closeModal: 'Close certificate preview'
		},
		experiences: {
			badge: 'Background & Track Record',
			title: 'EXPERIENCE & ACHIEVEMENTS',
			sidebarLabel: 'EXPERIENCE',
			viewResume: 'View Full Resume',
			org: 'Organizational & Leadership Experience',
			training: 'Training & Certifications',
			awards: 'Awards & Honors'
		},
		contact: {
			badge: 'Get in Touch',
			title: "LET'S BUILD SOMETHING TOGETHER",
			ctaHeadline1: "Let's Build",
			ctaHeadline2: 'Something',
			ctaHeadline3: 'Amazing',
			ctaHeadline4: 'Together.',
			ctaButton: 'Get In Touch',
			subtitle:
				'Interested in collaborating or discussing web projects & UI/UX? Feel free to reach out directly.',
			sendEmail: 'Send Email',
			chatWa: 'Chat WhatsApp',
			socials: 'Social Media'
		},
		footer: {
			bio: '@hszam__ Building digital solutions with purpose.'
		}
	}
};

export const projectTranslations: Record<
	string,
	{
		id: { role: string; title: string; description: string; tags: string[] };
		en: { role: string; title: string; description: string; tags: string[] };
	}
> = {
	'h2sn-photobooth': {
		id: {
			role: 'Pengembang Web Full Stack',
			title: 'H2SN Photobooth',
			description:
				'Membangun website photobooth untuk mendukung operasional bisnis. Website menyediakan informasi layanan, galeri, paket, serta pengelolaan data secara digital.',
			tags: ['Full Stack', 'Aplikasi Web', 'Galeri', 'Operasional Bisnis']
		},
		en: {
			role: 'Full Stack Web Developer',
			title: 'H2SN Photobooth',
			description:
				'Engineered a photobooth web application to support business operations with package listings, gallery showcases, and digital booking management.',
			tags: ['Full Stack', 'Web App', 'Gallery', 'Business Ops']
		}
	},
	'uic-press': {
		id: {
			role: 'Manajer Proyek',
			title: 'Website UIC Press Universitas Ibnu Chaldun',
			description:
				'Memimpin pembangunan website UIC Press mulai dari analisis kebutuhan hingga implementasi. Mengoordinasikan tim dalam membangun Dasbor Admin, manajemen buku dan penulis, unggah berkas, serta pengaturan website.',
			tags: ['Manajemen Proyek', 'Dasbor Admin', 'CMS']
		},
		en: {
			role: 'Project Manager',
			title: 'UIC Press Website — Ibnu Chaldun University',
			description:
				'Led the UIC Press website project from requirement analysis to deployment. Coordinated the engineering team building Admin Dashboards, manuscript and author management, file uploads, and CMS settings.',
			tags: ['Project Management', 'Admin Dashboard', 'CMS']
		}
	},
	'e-presensi-sekolah': {
		id: {
			role: 'Pengembang Web Full Stack',
			title: 'E-Presensi Sekolah',
			description:
				'Membangun sistem presensi sekolah berbasis web dengan empat hak akses pengguna. Sistem dilengkapi fitur presensi melalui smartphone, manajemen pengguna, dan sinkronisasi data secara real-time.',
			tags: ['Full Stack', 'Waktu Nyata', 'Multi Pengguna', 'Web Seluler']
		},
		en: {
			role: 'Full Stack Web Developer',
			title: 'School E-Attendance System',
			description:
				'Built a multi-role school attendance platform with 4 access levels, featuring mobile-first attendance logging, user management, and real-time syncing.',
			tags: ['Full Stack', 'Real-time', 'Multi-Role', 'Mobile Web']
		}
	},
	'company-profile-gsc': {
		id: {
			role: 'Pengembang Web Antarmuka',
			title: 'Website Profil Perusahaan GSC',
			description:
				'Membangun website company profile yang responsif sebagai media promosi digital Bimbingan Belajar GSC.',
			tags: ['Frontend', 'Profil Perusahaan', 'Edukasi']
		},
		en: {
			role: 'Frontend Web Developer',
			title: 'GSC Learning Center Company Profile',
			description:
				'Designed and built a responsive company profile website as a digital promotion hub for GSC Learning Center.',
			tags: ['Frontend', 'Company Profile', 'Education']
		}
	},
	'kedai-mie-mamaw': {
		id: {
			role: 'Pengembang Web Antarmuka',
			title: 'Website Kedai Mie Mamaw',
			description:
				'Membangun website menu digital yang terintegrasi dengan WhatsApp untuk memudahkan proses pemesanan pelanggan.',
			tags: ['Frontend', 'Menu Digital', 'WhatsApp']
		},
		en: {
			role: 'Frontend Web Developer',
			title: 'Kedai Mie Mamaw Digital Menu',
			description:
				'Built a responsive digital menu website integrated directly with WhatsApp to streamline customer food orders.',
			tags: ['Frontend', 'Digital Menu', 'WhatsApp']
		}
	},
	'indah-bakery': {
		id: {
			role: 'Pengembang Web Antarmuka',
			title: 'Website Indah Bakery',
			description:
				'Membangun website company profile dan katalog produk yang dilengkapi fitur keranjang belanja serta integrasi WhatsApp.',
			tags: ['Frontend', 'Katalog Produk', 'Keranjang Belanja', 'WhatsApp']
		},
		en: {
			role: 'Frontend Web Developer',
			title: 'Indah Bakery Online Catalog',
			description:
				'Developed a bakery catalog website featuring shopping cart management and automated WhatsApp order checkout.',
			tags: ['Frontend', 'Product Catalog', 'Cart', 'WhatsApp']
		}
	},
	'93-printing': {
		id: {
			role: 'Pengembang Web Antarmuka',
			title: 'Website 93 Printing',
			description:
				'Membangun website company profile sebagai media branding dan promosi digital bagi bisnis percetakan.',
			tags: ['Frontend', 'Profil Perusahaan', 'Branding Bisnis']
		},
		en: {
			role: 'Frontend Web Developer',
			title: '93 Printing Company Profile',
			description:
				'Created a professional branding website showcasing digital printing services, product portfolios, and inquiries.',
			tags: ['Frontend', 'Company Profile', 'Branding']
		}
	},
	'platform-game-kir': {
		id: {
			role: 'Pengembang Game',
			title: 'Platform Game Berbasis Web',
			description:
				'Membangun lebih dari sepuluh game edukatif berbasis HTML, CSS, dan JavaScript sebagai media pembelajaran untuk kegiatan ekstrakurikuler KIR.',
			tags: ['Game Edukasi', 'HTML', 'CSS', 'JavaScript']
		},
		en: {
			role: 'Game Developer',
			title: 'Web-Based Educational Game Platform',
			description:
				'Developed 10+ interactive browser games using HTML, CSS, and JavaScript as interactive STEM learning tools.',
			tags: ['Game Dev', 'HTML', 'CSS', 'JavaScript']
		}
	},
	'shortlink-linkku': {
		id: {
			role: 'Pengembang Web',
			title: 'Shortlink LinkKu',
			description: 'Layanan pemendek URL cepat dan mudah digunakan.',
			tags: ['Aplikasi Web', 'Penyingkat Tautan']
		},
		en: {
			role: 'Web Developer',
			title: 'Shortlink LinkKu',
			description: 'Fast, lightweight URL shortener and link redirection web tool.',
			tags: ['Web App', 'Shortlink']
		}
	},
	'putra-sunda-jaya': {
		id: {
			role: 'Pengembang Web',
			title: 'Putra Sunda Jaya',
			description: 'Website profil bisnis dan layanan konstruksi & pengadaan.',
			tags: ['Aplikasi Web', 'Profil Perusahaan', 'Konstruksi']
		},
		en: {
			role: 'Web Developer',
			title: 'Putra Sunda Jaya',
			description: 'Corporate business profile highlighting construction and supply services.',
			tags: ['Web App', 'Company Profile', 'Construction']
		}
	},
	'web-keuangan': {
		id: {
			role: 'Pengembang Web',
			title: 'Sistem Keuangan',
			description: 'Aplikasi pembukuan dan pelaporan kas keuangan digital.',
			tags: ['Aplikasi Web', 'Arus Kas', 'Keuangan']
		},
		en: {
			role: 'Web Developer',
			title: 'Financial Cashflow System',
			description: 'Digital bookkeeping and cashflow management dashboard with report generation.',
			tags: ['Web App', 'Cashflow', 'Finance']
		}
	},
	'web-kasir-custom': {
		id: {
			role: 'Pengembang Web',
			title: 'Kasir Custom',
			description: 'Aplikasi kasir (POS) fleksibel dengan pencatatan transaksi.',
			tags: ['Aplikasi Web', 'Sistem Kasir', 'Pencatatan Transaksi']
		},
		en: {
			role: 'Web Developer',
			title: 'Custom Point of Sale (POS)',
			description: 'Flexible POS cash register web app supporting real-time transaction recording.',
			tags: ['Web App', 'POS', 'Cashier']
		}
	},
	'web-undangan-organisasi': {
		id: {
			role: 'Pengembang Web',
			title: 'Undangan Organisasi',
			description: 'Website undangan digital formal untuk acara rapat dan musyawarah.',
			tags: ['Aplikasi Web', 'Undangan Digital']
		},
		en: {
			role: 'Web Developer',
			title: 'Organizational Digital Invitation',
			description: 'Digital event invitations with automated attendee confirmations and details.',
			tags: ['Web App', 'Digital Invitation']
		}
	},
	'web-buku-tamu': {
		id: {
			role: 'Pengembang Web',
			title: 'Buku Tamu Digital',
			description: 'Sistem pencatatan tamu digital untuk event dan kunjungan resmi.',
			tags: ['Aplikasi Web', 'Buku Tamu']
		},
		en: {
			role: 'Web Developer',
			title: 'Digital Guestbook App',
			description: 'Digital visitor and event attendee recording system with search and export.',
			tags: ['Web App', 'Guestbook']
		}
	}
};

export const certificationTranslations: Record<
	string,
	{
		id: { title: string; issuer: string };
		en: { title: string; issuer: string };
	}
> = {
	'algonova-l8': {
		id: {
			title: 'Algonova Python Pro — Tahun ke-1 (IT HERO Level 8)',
			issuer: 'Algorithmics • Des 2025'
		},
		en: {
			title: 'Algonova Python Pro — 1st Year (IT HERO Level 8)',
			issuer: 'Algorithmics • Dec 2025'
		}
	},
	'algonova-l9': {
		id: {
			title: 'Algonova Python Pro — Tahun ke-2 (IT HERO Level 9)',
			issuer: 'Algorithmics • Jan 2026'
		},
		en: {
			title: 'Algonova Python Pro — 2nd Year (IT HERO Level 9)',
			issuer: 'Algorithmics • Jan 2026'
		}
	},
	'naspo-2021': {
		id: {
			title: 'Kompetisi NASPO 2021 — Medali Perunggu',
			issuer: 'IYSA • Des 2021'
		},
		en: {
			title: 'NASPO 2021 Competition — Bronze Medal',
			issuer: 'IYSA • Dec 2021'
		}
	},
	'kisef-2023': {
		id: {
			title: 'Kompetisi KISEF 2023 — Medali Perunggu',
			issuer: 'Karangturi • Feb 2023'
		},
		en: {
			title: 'KISEF 2023 Competition — Bronze Medal',
			issuer: 'Karangturi • Feb 2023'
		}
	},
	'aiseef-2023': {
		id: {
			title: 'Kompetisi AISEEF 2023 — Medali Perak',
			issuer: 'IYSA • Feb 2023'
		},
		en: {
			title: 'AISEEF 2023 Competition — Silver Medal',
			issuer: 'IYSA • Feb 2023'
		}
	}
};

export const activityTranslations: Record<
	string,
	{
		id: { title: string; caption: string };
		en: { title: string; caption: string };
	}
> = {
	'Menyampaikan sambutan kepada peserta sebagai Ketua Pelaksana Acara.jpeg': {
		id: {
			title: 'Menyampaikan Sambutan sebagai Ketua Pelaksana',
			caption: 'Menyampaikan sambutan kepada peserta sebagai Ketua Pelaksana Acara.'
		},
		en: {
			title: 'Opening Remarks as Event Committee Chair',
			caption: 'Delivering welcome remarks to participants as Event Committee Chair.'
		}
	},
	'Event acara youth science and education fair.jpeg': {
		id: {
			title: 'Acara Youth Science and Education Fair',
			caption: 'Dokumentasi kegiatan di Youth Science and Education Fair.'
		},
		en: {
			title: 'Youth Science & Education Fair',
			caption: 'Field photo at Youth Science and Education Fair.'
		}
	},
	'belajar bersama menggunakan arduino.jpeg': {
		id: {
			title: 'Belajar Bersama Menggunakan Arduino',
			caption: 'Dokumentasi kegiatan belajar bersama menggunakan Arduino.'
		},
		en: {
			title: 'Hands-on Learning with Arduino',
			caption: 'Collaborative robotics learning workshop with Arduino sensors.'
		}
	},
	'bermain game bersama.jpeg': {
		id: {
			title: 'Bermain Game Bersama',
			caption: 'Dokumentasi kegiatan bermain game bersama.'
		},
		en: {
			title: 'Interactive Gaming Session',
			caption: 'Multiplayer gaming and playtesting with peers.'
		}
	},
	'diskusi projek.jpeg': {
		id: {
			title: 'Diskusi Projek Tim',
			caption: 'Dokumentasi kegiatan diskusi dan perencanaan proyek.'
		},
		en: {
			title: 'Project Architecture Discussion',
			caption: 'Team planning and technical architecture discussion.'
		}
	},
	'Dokumentasi Google Meet Saat Magang di PT Traspac.png': {
		id: {
			title: 'Rapat Online Selama Magang di PT Traspac',
			caption: 'Dokumentasi Google Meet saat magang di PT Traspac.'
		},
		en: {
			title: 'Virtual Sync During PT Traspac Internship',
			caption: 'Google Meet coordination session during internship at PT Traspac.'
		}
	},
	'foto bersama anggota DPRD.jpeg': {
		id: {
			title: 'Foto Bersama Anggota DPRD',
			caption: 'Dokumentasi audiensi dan foto bersama anggota DPRD.'
		},
		en: {
			title: 'Assembly with Regional Council Members',
			caption: 'Group photo alongside Regional Council representatives.'
		}
	},
	'foto bersama.jpeg': {
		id: {
			title: 'Foto Bersama Tim',
			caption: 'Dokumentasi kebersamaan tim kerja.'
		},
		en: {
			title: 'Team Group Photo',
			caption: 'Group portrait commemorating project milestone.'
		}
	},
	'foto di dalam gedung DPRD.jpeg': {
		id: {
			title: 'Kunjungan di Gedung DPRD',
			caption: 'Dokumentasi kunjungan di dalam gedung DPRD.'
		},
		en: {
			title: 'Session Inside Regional Council Chambers',
			caption: 'Documentation inside the Regional Council building.'
		}
	},
	'foto panitia.jpeg': {
		id: {
			title: 'Foto Bersama Panitia Acara',
			caption: 'Dokumentasi seluruh panitia pelaksana kegiatan.'
		},
		en: {
			title: 'Organizing Committee Portrait',
			caption: 'Portrait of the event organizing committee team.'
		}
	},
	'graduation less python.jpeg': {
		id: {
			title: 'Kelulusan Kursus Pemrograman Python',
			caption: 'Dokumentasi perayaan kelulusan kursus pemrograman Python.'
		},
		en: {
			title: 'Python Programming Course Graduation',
			caption: 'Celebrating completion of advanced Python track.'
		}
	},
	'kegiatan belajar bersama KIR.jpeg': {
		id: {
			title: 'Belajar Bersama Ekstrakurikuler KIR',
			caption: 'Dokumentasi sesi belajar ekstrakurikuler KIR.'
		},
		en: {
			title: 'KIR Science Club Workshop',
			caption: 'Peer learning and research session with school science club.'
		}
	},
	'mengenalkan cara jalannya sistem.jpeg': {
		id: {
			title: 'Demo & Edukasi Alur Kerja Sistem',
			caption: 'Mengenalkan dan menjelaskan cara berjalannya sistem kepada pengguna.'
		},
		en: {
			title: 'System Workflow Demonstration',
			caption: 'Live demo explaining system operation to users.'
		}
	},
	'pare kampung inggris.png': {
		id: {
			title: 'Program Bahasa di Pare Kampung Inggris',
			caption: 'Dokumentasi pembelajaran intensif di Pare Kampung Inggris.'
		},
		en: {
			title: 'Language Immersion in Kampung Inggris Pare',
			caption: 'Intensive language study program in Pare, Kediri.'
		}
	},
	'presentasi projek uic press.jpeg': {
		id: {
			title: 'Presentasi Proyek UIC Press',
			caption: 'Dokumentasi presentasi progres proyek sistem UIC Press.'
		},
		en: {
			title: 'UIC Press Project Presentation',
			caption: 'Presenting system progress and architecture for UIC Press.'
		}
	},
	'presentasi tentang robotik.jpeg': {
		id: {
			title: 'Presentasi Edukasi Robotika',
			caption: 'Memberikan materi dan demonstrasi tentang dasar robotika.'
		},
		en: {
			title: 'Robotics Educational Presentation',
			caption: 'Delivering workshop presentation on robotics fundamentals.'
		}
	},
	'Presentasi kepada Dosen UIC Mengenai Pengembangan Sistem Pemesanan Buku.png': {
		id: {
			title: 'Presentasi Sistem Pemesanan Buku UIC',
			caption: 'Presentasi kepada dosen UIC mengenai pengembangan sistem pemesanan buku.'
		},
		en: {
			title: 'UIC Book Ordering System Presentation',
			caption: 'Delivering book ordering system demo to UIC university lecturers.'
		}
	},
	'Presentasi kepada Klien Mengenai Website Company Profile.png': {
		id: {
			title: 'Presentasi Website Profil ke Klien',
			caption: 'Presentasi hasil pembuatan website company profile kepada klien.'
		},
		en: {
			title: 'Client Company Profile Website Showcase',
			caption: 'Showcasing completed company profile website directly to client.'
		}
	},
	'Presentasi Proyek E-Presensi Kelas Industri.png': {
		id: {
			title: 'Presentasi E-Presensi Kelas Industri',
			caption: 'Dokumentasi presentasi proyek sistem E-Presensi di hadapan penguji industri.'
		},
		en: {
			title: 'Industry Class E-Attendance Presentation',
			caption: 'Presenting school attendance system to industrial partners.'
		}
	},
	'testing game bersama.jpeg': {
		id: {
			title: 'Uji Coba Game Edukasi Bersama',
			caption: 'Dokumentasi sesi pengujian permainan edukatif bersama teman-teman.'
		},
		en: {
			title: 'Educational Game Playtesting Session',
			caption: 'Collaborative playtesting session for web educational games.'
		}
	}
};
