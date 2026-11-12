<script lang="ts">
	import lanyardBack from '#lib/assets/lanyard-back.svg';
	import lanyardFront from '#lib/assets/lanyard-front.svg';
	import sertif1 from '#lib/assets/sertifikat/sertif-1.png';
	import sertif2 from '#lib/assets/sertifikat/sertif-2.png';
	import sertif3 from '#lib/assets/sertifikat/sertif-3.png.png';
	import sertif4 from '#lib/assets/sertifikat/sertif-4.png';
	import sertif5 from '#lib/assets/sertifikat/sertif-5.png';
	import CraftStory from '#lib/components/CraftStory.svelte';
	import Lanyard from '#lib/components/Lanyard.svelte';
	import { Badge } from '#lib/components/ui/badge/index.js';
	import { Button } from '#lib/components/ui/button/index.js';
	import * as Card from '#lib/components/ui/card/index.js';
	import {
		PolaroidLineCarousel,
		type Slide
	} from '#lib/components/ui/polaroid-line-carousel/index.js';
	import { Separator } from '#lib/components/ui/separator/index.js';
	import { gsap, REDUCED_MOTION_QUERY, registerGsap, ScrollTrigger } from '#lib/gsap.js';
	import { tick } from 'svelte';
	import {
		siGit,
		siMongodb,
		siNodedotjs,
		siReact,
		siSvelte,
		siTailwindcss,
		siTypescript
	} from 'simple-icons';
	import {
		ArrowRight,
		ArrowUpRight,
		Braces,
		ChevronLeft,
		ChevronRight,
		Code2,
		Download,
		GitBranch,
		Globe,
		Image as ImageIcon,
		Mail,
		Moon,
		Pause,
		Play,
		Sun,
		Terminal,
		X
	} from '@lucide/svelte';

	let isDark = $state(false);
	let isMarqueePaused = $state(false);

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
	}

	function toggleMarquee() {
		isMarqueePaused = !isMarqueePaused;
	}

	const skills = [
		{ name: 'React', icon: siReact },
		{ name: 'TypeScript', icon: siTypescript },
		{ name: 'Node.js', icon: siNodedotjs },
		{ name: 'Tailwind CSS', icon: siTailwindcss },
		{ name: 'MongoDB', icon: siMongodb },
		{ name: 'Git', icon: siGit },
		{ name: 'Svelte', icon: siSvelte }
	];

	type Project = {
		id: string;
		role: string;
		title: string;
		description: string;
		tags: string[];
		url: string;
		linkLabel: string;
		image?: string;
		previewBg: string;
	};

	const projects: Project[] = [
		{
			id: 'sistem-keuangan-gssi',
			role: 'Full Stack Web Developer',
			title: 'Sistem Keuangan GSSI',
			description:
				'Membangun sistem informasi keuangan berbasis web untuk pengelolaan kas organisasi. Sistem mendukung hak akses ketua, bendahara, dan anggota dalam mengelola pemasukan, pengeluaran, serta laporan keuangan.',
			tags: ['Full Stack', 'Web App', 'Role Access', 'Finance'],
			url: 'https://github.com/H2SN-Aksara-Kode/web-bendahara-gssi',
			linkLabel: 'View Repository',
			previewBg: 'bg-accent'
		},
		{
			id: 'h2sn-photobooth',
			role: 'Full Stack Web Developer',
			title: 'H2SN Photobooth',
			description:
				'Membangun website photobooth untuk mendukung operasional bisnis. Website menyediakan informasi layanan, galeri, paket, serta pengelolaan data secara digital.',
			tags: ['Full Stack', 'Web App', 'Gallery', 'Business Ops'],
			url: 'https://github.com/H2SN-Aksara-Kode/web_photoboth',
			linkLabel: 'View Repository',
			previewBg: 'bg-primary'
		},
		{
			id: 'uic-press',
			role: 'Project Manager',
			title: 'Website UIC Press Universitas Ibnu Chaldun',
			description:
				'Memimpin pembangunan website UIC Press mulai dari analisis kebutuhan hingga implementasi. Mengoordinasikan tim dalam membangun Dashboard Admin, manajemen buku dan penulis, unggah berkas, serta pengaturan website.',
			tags: ['Project Management', 'Admin Dashboard', 'CMS'],
			url: 'https://github.com/H2SN-Aksara-Kode/uic_press_ibnu_chaldun',
			linkLabel: 'View Repository',
			previewBg: 'bg-secondary'
		},
		{
			id: 'e-presensi-sekolah',
			role: 'Full Stack Web Developer',
			title: 'E-Presensi Sekolah',
			description:
				'Membangun sistem presensi sekolah berbasis web dengan empat hak akses pengguna. Sistem dilengkapi fitur presensi melalui smartphone, manajemen pengguna, dan sinkronisasi data secara real-time.',
			tags: ['Full Stack', 'Real-time', 'Multi-Role', 'Mobile Web'],
			url: 'https://github.com/hsymm10/sistem_e_presensi',
			linkLabel: 'View Repository',
			previewBg: 'bg-accent'
		},
		{
			id: 'aquabina-swim-club',
			role: 'Frontend Web Developer',
			title: 'Aquabina Swim Club',
			description:
				'Membangun website company profile berbasis Laravel dengan dashboard admin, manajemen konten, dan formulir pendaftaran online.',
			tags: ['Frontend', 'Laravel', 'Company Profile', 'Admin'],
			url: 'https://github.com/H2SN-Aksara-Kode/project-renang',
			linkLabel: 'View Repository',
			previewBg: 'bg-primary'
		},
		{
			id: 'sistem-booking-hotel',
			role: 'Full Stack Web Developer',
			title: 'Sistem Booking Hotel',
			description:
				'Membangun aplikasi reservasi hotel berbasis Laravel dan Nuxt.js. Sistem menyediakan fitur pencarian kamar, reservasi, dashboard admin, dan pengelolaan transaksi.',
			tags: ['Laravel', 'Nuxt.js', 'Full Stack', 'Booking'],
			url: 'https://github.com/hsymm10/web_booking_hotel',
			linkLabel: 'View Repository',
			previewBg: 'bg-secondary'
		},
		{
			id: 'company-profile-gsc',
			role: 'Frontend Web Developer',
			title: 'Website Company Profile GSC',
			description:
				'Membangun website company profile yang responsif sebagai media promosi digital Bimbingan Belajar GSC.',
			tags: ['Frontend', 'Responsive', 'Company Profile'],
			url: 'https://github.com/hsymm10/Bimbel-GSC',
			linkLabel: 'View Repository',
			previewBg: 'bg-accent'
		},
		{
			id: 'kedai-mie-mamaw',
			role: 'Frontend Web Developer',
			title: 'Website Kedai Mie Mamaw',
			description:
				'Membangun website menu digital yang terintegrasi dengan WhatsApp untuk memudahkan proses pemesanan pelanggan.',
			tags: ['Frontend', 'Digital Menu', 'WhatsApp Integration'],
			url: 'https://github.com/hsymm10/Kedai_MAMAW',
			linkLabel: 'View Repository',
			previewBg: 'bg-primary'
		},
		{
			id: 'indah-bakery',
			role: 'Frontend Web Developer',
			title: 'Website Indah Bakery',
			description:
				'Membangun website company profile dan katalog produk yang dilengkapi fitur keranjang belanja serta integrasi WhatsApp.',
			tags: ['Frontend', 'Product Catalog', 'Cart', 'WhatsApp'],
			url: 'https://github.com/hsymm10/Indah-Bakery',
			linkLabel: 'View Repository',
			previewBg: 'bg-secondary'
		},
		{
			id: '93-printing',
			role: 'Frontend Web Developer',
			title: 'Website 93 Printing',
			description:
				'Membangun website company profile sebagai media branding dan promosi digital bagi bisnis percetakan.',
			tags: ['Frontend', 'Company Profile', 'Branding'],
			url: 'https://github.com/hsymm10/web_93printing',
			linkLabel: 'View Repository',
			previewBg: 'bg-accent'
		},
		{
			id: 'gradis-and-co',
			role: 'Frontend Web Developer',
			title: 'Website Gradis & Co',
			description:
				'Membangun website company profile yang menampilkan profil usaha, menu, galeri, dan informasi kontak.',
			tags: ['Frontend', 'Company Profile', 'Menu & Gallery'],
			url: 'https://github.com/hsymm10/web_gradis_and_co',
			linkLabel: 'View Repository',
			previewBg: 'bg-primary'
		},
		{
			id: 'undangan-pernikahan-digital',
			role: 'Frontend Web Developer',
			title: 'Website Undangan Pernikahan Digital',
			description:
				'Membangun website undangan digital dengan fitur countdown, galeri, buku tamu, lokasi acara, dan informasi pernikahan.',
			tags: ['Frontend', 'Digital Invitation', 'Countdown', 'Guestbook'],
			url: 'https://github.com/hsymm10/web_undangan_digital',
			linkLabel: 'View Repository',
			previewBg: 'bg-secondary'
		},
		{
			id: 'platform-game-kir',
			role: 'Game Developer',
			title: 'Platform Game Berbasis Web',
			description:
				'Membangun lebih dari sepuluh game edukatif berbasis HTML, CSS, dan JavaScript sebagai media pembelajaran untuk kegiatan ekstrakurikuler KIR.',
			tags: ['Game Dev', 'HTML', 'CSS', 'JavaScript'],
			url: 'https://github.com/hsymm10/game_hszam',
			linkLabel: 'View Repository',
			previewBg: 'bg-accent'
		},
		{
			id: 'uiux-sistem-e-presensi',
			role: 'UI/UX Designer',
			title: 'Sistem E-Presensi (UI/UX)',
			description:
				'Merancang antarmuka dan prototype sistem E-Presensi menggunakan Figma sebagai acuan implementasi pada Laravel dan Nuxt.js.',
			tags: ['UI/UX', 'Figma', 'Prototype', 'Design System'],
			url: 'https://www.figma.com/design/4pSsp0XjwoO1AvIaYZOVBb/Untitled?node-id=0-1&p=f',
			linkLabel: 'Open Figma',
			previewBg: 'bg-primary'
		},
		{
			id: 'redesign-mytelkomsel',
			role: 'UI/UX Designer',
			title: 'Redesign MyTelkomsel',
			description:
				'Merancang ulang antarmuka aplikasi MyTelkomsel menggunakan Figma dengan menerapkan prinsip UI/UX modern.',
			tags: ['UI/UX', 'Figma', 'App Redesign', 'Prototype'],
			url: 'https://www.figma.com/proto/5W70YBYxcJDsxG8pObmGhY/MY-TELKOMSEL?contentscaling=fixed&kind=proto&node-id=57-41&page-id=0%3A1&scaling=scale-down&starting-point-nodeid=12%3A5&t=gLPdTfj08hAqDv2e-1&viewport=680%2C42%2C0.64',
			linkLabel: 'Open Figma',
			previewBg: 'bg-secondary'
		},
		{
			id: 'website-budaya-kalbar',
			role: 'UI/UX Designer',
			title: 'Website Budaya Kalimantan Barat',
			description:
				'Membantu membuat konsep desain dan antarmuka website bertema Budaya Kalimantan menggunakan Figma, mulai dari wireframe hingga desain akhir yang responsif dan mudah digunakan.',
			tags: ['UI/UX', 'Figma', 'Wireframe', 'Responsive'],
			url: 'https://www.figma.com/design/FRsb9eq5lZh6ahM9tXyPtM/kalimantan?node-id=0-1&p=f',
			linkLabel: 'Open Figma',
			previewBg: 'bg-accent'
		}
	];

	type Certification = {
		id: string;
		title: string;
		issuer: string;
		image: string;
	};

	const certifications: Certification[] = [
		{
			id: 'algonova-l8',
			title: 'Algonova Python Pro — 1st Year (IT HERO Level 8)',
			issuer: 'Algorithmics • Dec 2025',
			image: sertif1
		},
		{
			id: 'algonova-l9',
			title: 'Algonova Python Pro — 2nd Year (IT HERO Level 9)',
			issuer: 'Algorithmics • Jan 2026',
			image: sertif2
		},
		{
			id: 'naspo-2021',
			title: 'NASPO 2021 — Medali Perunggu',
			issuer: 'IYSA • Dec 2021',
			image: sertif3
		},
		{
			id: 'kisef-2023',
			title: 'KISEF 2023 — Bronze Medal',
			issuer: 'Karangturi • Feb 2023',
			image: sertif4
		},
		{
			id: 'aiseef-2023',
			title: 'AISEEF 2023 — Silver Medal',
			issuer: 'IYSA • Feb 2023',
			image: sertif5
		}
	];

	type ExperienceEntry = {
		title: string;
		period?: string;
		description?: string;
	};

	type ExperienceGroup = {
		category: string;
		items: ExperienceEntry[];
	};

	const experiences: ExperienceGroup[] = [
		{
			category: 'Pengalaman Organisasi & Kepemimpinan',
			items: [
				{
					title: 'Penyelenggara Kegiatan Kolaborasi Robotika',
					description:
						'Menginisiasi dan menyelenggarakan kegiatan kolaborasi antarpelajar dalam pembelajaran robotika serta dasar-dasar pengembangan website. Bertanggung jawab dalam koordinasi peserta, penyusunan materi, dan pelaksanaan kegiatan untuk meningkatkan keterampilan teknologi dan kerja sama tim.'
				}
			]
		},
		{
			category: 'Pelatihan & Sertifikasi',
			items: [
				{
					title: 'Algorithmics.asia — Course Python',
					period: 'Oktober 2024 – Januari 2026'
				},
				{
					title: 'Ngoding Bareng Dea — React JS & Tailwind CSS',
					period: 'Mei 2025'
				},
				{
					title: 'Titik Nol Pare — Kursus Bahasa Inggris',
					period: 'Juni 2026'
				}
			]
		},
		{
			category: 'Prestasi',
			items: [
				{
					title: 'Juara Lomba NASPO — Pelestarian Budaya Melalui Pemanfaatan Limbah Plastik',
					period: '11–14 Desember 2021'
				},
				{
					title: 'Juara Lomba AISEEF — Lato-Lato Ronin Detector',
					period: '10–14 Februari 2023'
				},
				{
					title: 'Juara Lomba KISEF — Daur Ulang Botol Menjadi Hasil Karya Ondel-Ondel',
					period: '20–24 Februari 2023'
				}
			]
		}
	];

	// Set nomor WhatsApp format internasional tanpa tanda '+' (contoh: '6281234567890')
	const WHATSAPP_NUMBER = '';
	const WHATSAPP_MESSAGE = 'Halo Hisyam, saya tertarik untuk berdiskusi mengenai proyek.';
	const whatsappHref = WHATSAPP_NUMBER
		? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
		: '#contact';

	const activityPhotoModules = import.meta.glob<string>(
		'../lib/assets/Dokumentasi_Kegiatan/*.{jpeg,jpg,png,webp}',
		{
			eager: true,
			import: 'default'
		}
	);

	const ACTIVITY_CAPTIONS: Record<string, { title: string; caption: string }> = {
		'Menyampaikan sambutan kepada peserta sebagai Ketua Pelaksana Acara.jpeg': {
			title: 'Sambutan Ketua Pelaksana',
			caption: 'Menyampaikan sambutan kepada peserta sebagai Ketua Pelaksana Acara.'
		},
		'Event acara youth science and education fair.jpeg': {
			title: 'Youth Science & Education Fair',
			caption: 'Dokumentasi keikutsertaan pada ajang Youth Science and Education Fair.'
		},
		'belajar bersama menggunakan arduino.jpeg': {
			title: 'Belajar Arduino Bersama',
			caption: 'Sesi praktik kolaborasi belajar elektronika dan pemrograman Arduino.'
		},
		'bermain game bersama.jpeg': {
			title: 'Bermain Game Bersama',
			caption: 'Sesi interaktif memainkan game edukasi berbasis web bersama peserta.'
		},
		'diskusi projek.jpeg': {
			title: 'Diskusi Projek',
			caption: 'Kolaborasi tim membahas perancangan fitur dan alur pengembangan aplikasi.'
		},
		'foto bersama anggota DPRD.jpeg': {
			title: 'Foto Bersama Anggota DPRD',
			caption: 'Momen foto bersama anggota DPRD dalam kegiatan kunjungan edukasi.'
		},
		'foto bersama.jpeg': {
			title: 'Foto Bersama',
			caption: 'Kebersamaan bersama peserta dan tim setelah rangkaian kegiatan.'
		},
		'foto di dalam gedung DPRD.jpeg': {
			title: 'Kunjungan Gedung DPRD',
			caption: 'Dokumentasi kegiatan di dalam Gedung DPRD.'
		},
		'foto panitia.jpeg': {
			title: 'Tim Panitia',
			caption: 'Kebersamaan panitia penyelenggara kegiatan kolaborasi.'
		},
		'graduation less python.jpeg': {
			title: 'Graduation Kelas Python',
			caption: 'Kelulusan program pelatihan pemrograman Python.'
		},
		'kegiatan belajar bersama KIR.jpeg': {
			title: 'Belajar Bersama KIR',
			caption: 'Kegiatan pembelajaran teknologi bersama ekstrakurikuler KIR.'
		},
		'mengenalkan cara jalannya sistem.jpeg': {
			title: 'Demo Cara Kerja Sistem',
			caption: 'Memperkenalkan alur dan cara kerja sistem kepada peserta.'
		},
		'pare kampung inggris.png': {
			title: 'Kampung Inggris Pare',
			caption: 'Dokumentasi program kursus Bahasa Inggris di Kampung Inggris Pare.'
		},
		'presentasi projek uic press.jpeg': {
			title: 'Presentasi Projek UIC Press',
			caption: 'Pemaparan hasil pengembangan website UIC Press Universitas Ibnu Chaldun.'
		},
		'presentasi tentang robotik.jpeg': {
			title: 'Presentasi Robotika',
			caption: 'Pemaparan materi pengenalan robotika di hadapan peserta.'
		},
		'testing game bersama.jpeg': {
			title: 'Testing Game Bersama',
			caption: 'Uji coba game edukatif berbasis HTML, CSS, dan JavaScript.'
		}
	};

	const PALETTES: NonNullable<Slide['palette']>[] = ['dawn', 'alpine', 'dusk', 'mist'];

	function filenameToSlideText(filename: string): { title: string; caption: string } {
		const meta = ACTIVITY_CAPTIONS[filename];
		if (meta) return meta;
		const clean = filename.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ');
		const title = clean.charAt(0).toUpperCase() + clean.slice(1);
		return { title, caption: 'Dokumentasi kegiatan dan kolaborasi.' };
	}

	const polaroidSlides: Slide[] = Object.entries(activityPhotoModules)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([path, src], index) => {
			const filename = path.split('/').pop() ?? '';
			const { title, caption } = filenameToSlideText(filename);
			return {
				image: src,
				title,
				caption,
				alt: title,
				palette: PALETTES[index % PALETTES.length],
				seed: (index + 1) * 7
			};
		});

	let pageRootEl: HTMLDivElement | undefined = $state();
	let projectCardWrapperEl: HTMLDivElement | undefined = $state();
	let certDialogEl: HTMLDialogElement | undefined = $state();
	let activeSection = $state('');
	let activeProjectIndex = $state(0);
	let activeCertIndex = $state(0);
	let showAllProjects = $state(false);
	const currentProject = $derived(projects[activeProjectIndex]);
	const currentCert = $derived(certifications[activeCertIndex]);

	function openCertDialog(index: number) {
		activeCertIndex = index;
		certDialogEl?.showModal();
	}

	function closeCertDialog() {
		certDialogEl?.close();
	}

	function prevCert() {
		activeCertIndex = (activeCertIndex - 1 + certifications.length) % certifications.length;
	}

	function nextCert() {
		activeCertIndex = (activeCertIndex + 1) % certifications.length;
	}

	function handleCertDialogClose() {
		if (certDialogEl) {
			certDialogEl.returnValue = '';
		}
	}

	$effect(() => {
		const dialog = certDialogEl;
		if (!dialog || 'closedBy' in HTMLDialogElement.prototype) return;

		const isOutside = (e: PointerEvent) => {
			const rect = dialog.getBoundingClientRect();
			return (
				e.clientX < rect.left ||
				e.clientX > rect.right ||
				e.clientY < rect.top ||
				e.clientY > rect.bottom
			);
		};

		let pressedOutside = false;
		const onPointerDown = (e: PointerEvent) => {
			pressedOutside = isOutside(e);
		};
		const onPointerUp = (e: PointerEvent) => {
			if (pressedOutside && isOutside(e)) dialog.close();
			pressedOutside = false;
		};

		dialog.addEventListener('pointerdown', onPointerDown);
		dialog.addEventListener('pointerup', onPointerUp);
		return () => {
			dialog.removeEventListener('pointerdown', onPointerDown);
			dialog.removeEventListener('pointerup', onPointerUp);
		};
	});

	function formatProjectNumber(index: number): string {
		return String(index + 1).padStart(2, '0');
	}

	async function animateProjectCard() {
		await tick();
		if (!projectCardWrapperEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}
		registerGsap();
		gsap.fromTo(
			projectCardWrapperEl,
			{ opacity: 0, y: 14, scale: 0.985 },
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.34,
				ease: 'power2.out',
				clearProps: 'transform'
			}
		);
	}

	function selectProject(index: number) {
		showAllProjects = false;
		if (index === activeProjectIndex) return;
		activeProjectIndex = index;
		animateProjectCard();
	}

	function prevProject() {
		activeProjectIndex = (activeProjectIndex - 1 + projects.length) % projects.length;
		animateProjectCard();
	}

	function nextProject() {
		activeProjectIndex = (activeProjectIndex + 1) % projects.length;
		animateProjectCard();
	}

	const NAV_LINKS = [
		{ id: 'skills', label: 'Skills' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'craft', label: 'Craft' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'gallery', label: 'Gallery' },
		{ id: 'contact', label: 'Contact' }
	];

	$effect(() => {
		const root = pageRootEl;
		if (!root) return;
		registerGsap();

		const navCtx = gsap.context(() => {
			for (const { id } of NAV_LINKS) {
				const target = document.getElementById(id);
				if (!target) continue;
				ScrollTrigger.create({
					trigger: target,
					start: 'top 45%',
					end: 'bottom 45%',
					onEnter: () => (activeSection = id),
					onEnterBack: () => (activeSection = id)
				});
			}
		}, root);

		const mm = gsap.matchMedia(root);
		mm.add(REDUCED_MOTION_QUERY, () => {
			// Global reading progress bar across the full page
			gsap.fromTo(
				'[data-scroll-progress]',
				{ scaleX: 0 },
				{
					scaleX: 1,
					ease: 'none',
					scrollTrigger: {
						trigger: root,
						start: 'top top',
						end: 'bottom bottom',
						scrub: true
					}
				}
			);

			// 1. Hero entrance choreography
			const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
			heroTl
				.from('[data-hero-stagger]', {
					y: 24,
					opacity: 0,
					duration: 0.6,
					stagger: 0.08,
					clearProps: 'transform'
				})
				.from(
					'[data-hero-lanyard]',
					{
						y: 26,
						scale: 0.95,
						opacity: 0,
						duration: 0.7,
						clearProps: 'transform'
					},
					'-=0.45'
				)
				.from(
					'[data-hero-sticker]',
					{
						scale: 0.45,
						opacity: 0,
						duration: 0.52,
						stagger: 0.07,
						ease: 'back.out(1.7)',
						clearProps: 'transform'
					},
					'-=0.45'
				);

			// Idle subtle float on inner sticker visuals
			root.querySelectorAll<HTMLElement>('[data-hero-sticker-inner]').forEach((el, idx) => {
				gsap.to(el, {
					y: -6,
					duration: 2.1 + idx * 0.28,
					repeat: -1,
					yoyo: true,
					ease: 'sine.inOut',
					delay: idx * 0.25
				});
			});

			// Hero scroll-out parallax depth
			root.querySelectorAll<HTMLElement>('[data-hero-sticker]').forEach((el) => {
				const py = Number(el.dataset.parallaxY ?? -28);
				const prot = Number(el.dataset.parallaxRot ?? 0);
				gsap.to(el, {
					y: py,
					rotation: prot,
					ease: 'none',
					scrollTrigger: {
						trigger: '[data-hero-section]',
						start: 'top top',
						end: 'bottom top',
						scrub: true
					}
				});
			});

			gsap.to('[data-hero-copy]', {
				y: -26,
				ease: 'none',
				scrollTrigger: {
					trigger: '[data-hero-section]',
					start: 'top top',
					end: 'bottom top',
					scrub: true
				}
			});

			// 2. Skills marquee band reveal + scroll arrow scrub
			const skillsTl = gsap.timeline({
				scrollTrigger: {
					trigger: '#skills',
					start: 'top 88%',
					once: true
				}
			});
			skillsTl
				.from('[data-skills-label]', {
					x: -28,
					opacity: 0,
					duration: 0.5,
					ease: 'power3.out',
					clearProps: 'transform'
				})
				.from(
					['[data-skills-track]', '[data-skills-toggle]'],
					{
						y: 16,
						opacity: 0,
						duration: 0.45,
						stagger: 0.08,
						ease: 'power2.out',
						clearProps: 'transform'
					},
					'-=0.3'
				);

			gsap.to('[data-skills-arrow]', {
				x: 8,
				ease: 'none',
				scrollTrigger: {
					trigger: '#skills',
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});

			// 3. Featured Projects + Certifications reveal
			const projectsTl = gsap.timeline({
				scrollTrigger: {
					trigger: '#projects',
					start: 'top 80%',
					once: true
				}
			});
			projectsTl
				.from('[data-projects-panel]', {
					y: 34,
					opacity: 0,
					duration: 0.65,
					ease: 'power3.out',
					clearProps: 'transform'
				})
				.from(
					'[data-certs-aside]',
					{
						y: 40,
						opacity: 0,
						duration: 0.65,
						ease: 'power3.out',
						clearProps: 'transform'
					},
					'-=0.45'
				)
				.from(
					'[data-cert-card]',
					{
						y: 18,
						scale: 0.96,
						opacity: 0,
						duration: 0.42,
						stagger: 0.1,
						ease: 'back.out(1.4)',
						clearProps: 'transform'
					},
					'-=0.35'
				);

			// 4. Experience timeline & Call To Action scrollytelling
			const expTl = gsap.timeline({
				scrollTrigger: {
					trigger: '#experience',
					start: 'top 78%',
					once: true
				}
			});
			expTl
				.from('[data-exp-sidebar]', {
					x: -24,
					opacity: 0,
					duration: 0.5,
					ease: 'power3.out',
					clearProps: 'transform'
				})
				.from(
					'[data-exp-line]',
					{
						scaleY: 0,
						transformOrigin: 'top center',
						duration: 0.75,
						ease: 'power2.out'
					},
					'-=0.25'
				)
				.from(
					'[data-exp-dot]',
					{
						scale: 0,
						duration: 0.35,
						stagger: 0.16,
						ease: 'back.out(2)',
						clearProps: 'transform'
					},
					'-=0.65'
				)
				.from(
					'[data-exp-item]',
					{
						x: -18,
						opacity: 0,
						duration: 0.48,
						stagger: 0.16,
						ease: 'power2.out',
						clearProps: 'transform'
					},
					'-=0.68'
				)
				.from(
					'[data-exp-resume]',
					{
						y: 16,
						opacity: 0,
						duration: 0.42,
						ease: 'power2.out',
						clearProps: 'transform'
					},
					'-=0.2'
				)
				.from(
					'[data-cta-card]',
					{
						y: 32,
						opacity: 0,
						duration: 0.6,
						ease: 'power3.out',
						clearProps: 'transform'
					},
					0.1
				)
				.from(
					'[data-cta-stagger]',
					{
						y: 18,
						opacity: 0,
						duration: 0.45,
						stagger: 0.1,
						ease: 'power2.out',
						clearProps: 'transform'
					},
					0.28
				);

			// Starburst rotates smoothly as user scrolls through Experience/CTA
			gsap.to('[data-cta-starburst]', {
				rotation: 135,
				ease: 'none',
				scrollTrigger: {
					trigger: '#experience',
					start: 'top bottom',
					end: 'bottom top',
					scrub: 0.5
				}
			});

			// 5. Polaroid Gallery section reveal
			const galleryTl = gsap.timeline({
				scrollTrigger: {
					trigger: '#gallery',
					start: 'top 82%',
					once: true
				}
			});
			galleryTl
				.from('[data-gallery-header]', {
					y: 24,
					opacity: 0,
					duration: 0.5,
					ease: 'power3.out',
					clearProps: 'transform'
				})
				.from(
					'[data-gallery-stage]',
					{
						y: 30,
						opacity: 0,
						duration: 0.6,
						ease: 'power3.out',
						clearProps: 'transform'
					},
					'-=0.3'
				);

			// 6. Footer reveal
			gsap.from('[data-footer-inner]', {
				y: 16,
				opacity: 0,
				duration: 0.48,
				ease: 'power2.out',
				clearProps: 'transform',
				scrollTrigger: {
					trigger: '[data-footer]',
					start: 'top 96%',
					once: true
				}
			});
		});

		return () => {
			mm.revert();
			navCtx.revert();
		};
	});
</script>

<svelte:head>
	<title>PORTO.DEV — SvelteKit × Neobrutalism UI</title>
</svelte:head>

<div id="top" bind:this={pageRootEl} class="flex min-h-screen w-full flex-col bg-background">
	<!-- Full-Screen Sticky Header with max-w-7xl centered content -->
	<header class="sticky top-0 z-40 w-full border-b-2 border-border bg-card">
		<div
			class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3.5 sm:px-8"
		>
			<a href="#top" class="inline-flex items-center">
				<Badge variant="lime" class="px-3 py-1.5 text-xs">
					<Code2 class="size-4" />
					PORTO.DEV
				</Badge>
			</a>

			<nav
				aria-label="Primary"
				class="hidden items-center gap-7 font-mono text-xs font-bold tracking-wider uppercase md:flex"
			>
				{#each NAV_LINKS as item (item.id)}
					<a
						href={`#${item.id}`}
						class="underline-offset-4 transition-colors hover:underline {activeSection === item.id
							? 'text-secondary underline decoration-2'
							: ''}"
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="flex items-center gap-2.5">
				<Button
					variant="outline"
					size="icon"
					onclick={toggleTheme}
					aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
				>
					{#if isDark}
						<Sun class="size-4" />
					{:else}
						<Moon class="size-4" />
					{/if}
				</Button>
				<Button href="#contact" variant="secondary">
					Contact Me
					<ArrowRight class="size-3.5" />
				</Button>
			</div>
		</div>
		<!-- Global Scrollytelling Progress Indicator -->
		<div
			aria-hidden="true"
			class="h-1 w-full overflow-hidden border-t-2 border-border bg-neo-surface-subtle motion-reduce:hidden"
		>
			<div data-scroll-progress class="h-full w-full origin-left scale-x-0 bg-secondary"></div>
		</div>
	</header>

	<main class="w-full flex-1">
		<!-- Full-Screen Hero Section -->
		<section
			data-hero-section
			class="neo-grid-bg relative w-full overflow-x-clip border-b-2 border-border"
		>
			<div
				class="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-6 pt-5 pb-10 sm:px-8 sm:pt-7 sm:pb-12 lg:grid-cols-12 lg:gap-10"
			>
				<!-- Floating Tech Sticker: Tilted Svelte Square (Top-Center, Desktop) -->
				<div
					aria-hidden="true"
					data-hero-sticker
					data-parallax-y="-42"
					data-parallax-rot="-16"
					class="pointer-events-none absolute top-4 left-[53%] z-20 hidden -translate-x-1/2 -rotate-12 lg:flex"
				>
					<div
						data-hero-sticker-inner
						class="flex size-13 items-center justify-center rounded-xl border-2 border-neo-black bg-secondary text-neo-white shadow-neo"
					>
						<svg viewBox="0 0 24 24" class="size-7 fill-current">
							<path d={siSvelte.path} />
						</svg>
					</div>
				</div>

				<!-- Floating Dev Sticker: Pink Circular Braces Stamp (Bottom-Left Open Space) -->
				<div
					aria-hidden="true"
					data-hero-sticker
					data-parallax-y="-22"
					data-parallax-rot="14"
					class="pointer-events-none absolute bottom-6 left-[36%] z-20 hidden -rotate-12 lg:flex"
				>
					<div
						data-hero-sticker-inner
						class="flex size-13 items-center justify-center rounded-full border-2 border-neo-black bg-accent text-neo-black shadow-neo"
					>
						<Braces class="size-6 stroke-[2.25]" />
					</div>
				</div>

				<!-- Left Intro Content -->
				<div data-hero-copy class="relative z-10 space-y-6 lg:col-span-7">
					<div class="space-y-4">
						<div data-hero-stagger>
							<Badge variant="default">Hey, I'm Hisyam — Software Developer</Badge>
						</div>

						<h1
							data-hero-stagger
							class="font-display text-5xl leading-[0.95] font-black tracking-tight uppercase sm:text-6xl lg:text-7xl"
						>
							Software<br />Developer
						</h1>

						<p
							data-hero-stagger
							class="max-w-xl font-mono text-sm leading-relaxed text-muted-foreground sm:text-base"
						>
							Saya membangun aplikasi web yang cepat, skalabel, dan berkarakter dengan SvelteKit,
							Tailwind CSS v4, dan komponen shadcn-svelte bergaya Neobrutalism.
						</p>
					</div>

					<div data-hero-stagger class="flex flex-wrap items-center gap-3.5">
						<Button href="#projects" size="lg" variant="default">
							View My Work
							<ArrowUpRight class="size-4" />
						</Button>
						<Button href="#contact" size="lg" variant="outline">
							Download Resume
							<Download class="size-4" />
						</Button>
					</div>

					<div data-hero-stagger class="space-y-2.5 pt-1">
						<p class="font-mono text-xs font-bold tracking-wider uppercase">Connect With Me</p>
						<div class="flex items-center gap-2.5">
							<Button variant="outline" size="icon" aria-label="Terminal">
								<Terminal class="size-4" />
							</Button>
							<Button variant="outline" size="icon" aria-label="Website">
								<Globe class="size-4" />
							</Button>
							<Button variant="outline" size="icon" aria-label="Email">
								<Mail class="size-4" />
							</Button>
						</div>
					</div>
				</div>

				<!-- Right 3D Lanyard Stage (bounded overflow-hidden + outer floating badges) -->
				<div class="relative lg:col-span-5">
					<!-- Floating Cursor + "Hisyam" Pill Badge (Top-Right) -->
					<div
						aria-hidden="true"
						data-hero-sticker
						data-parallax-y="-48"
						data-parallax-rot="-4"
						class="pointer-events-none absolute -top-4 right-2 z-20 flex items-end gap-1 sm:-top-5 sm:-right-3"
					>
						<div data-hero-sticker-inner class="flex items-end gap-1">
							<svg
								viewBox="0 0 24 24"
								class="mb-0.5 size-5 shrink-0 drop-shadow-[2px_2px_0px_#0d0d0d]"
							>
								<polygon
									points="3,3 21,10 13,13 10,21"
									fill="var(--neo-lime)"
									stroke="#0d0d0d"
									stroke-width="2.2"
									stroke-linejoin="round"
								/>
							</svg>
							<div
								class="rounded-full border-2 border-neo-black bg-secondary px-4 py-1 font-display text-sm font-black tracking-tight text-neo-white shadow-neo sm:text-base"
							>
								Hisyam
							</div>
						</div>
					</div>

					<!-- Floating Terminal Speech Bubble (Upper-Left Edge of Lanyard) -->
					<div
						aria-hidden="true"
						data-hero-sticker
						data-parallax-y="-34"
						data-parallax-rot="8"
						class="pointer-events-none absolute top-10 -left-3 z-20 hidden -rotate-6 sm:-left-6 sm:flex"
					>
						<div
							data-hero-sticker-inner
							class="relative flex size-12 items-center justify-center rounded-xl border-2 border-neo-black bg-primary text-neo-black shadow-neo sm:size-13"
						>
							<Terminal class="size-6 stroke-[2.25]" />
							<span
								class="absolute -bottom-1.5 left-3 size-3 rotate-45 border-r-2 border-b-2 border-neo-black bg-primary"
							></span>
						</div>
					</div>

					<!-- Floating Git Branch Circular Stamp (Lower-Right Edge of Lanyard) -->
					<div
						aria-hidden="true"
						data-hero-sticker
						data-parallax-y="-20"
						data-parallax-rot="-14"
						class="pointer-events-none absolute -right-3 bottom-20 z-20 hidden rotate-12 sm:-right-5 sm:flex"
					>
						<div
							data-hero-sticker-inner
							class="flex size-12 items-center justify-center rounded-full border-2 border-neo-black bg-neo-surface text-neo-black shadow-neo sm:size-13"
						>
							<GitBranch class="size-6 stroke-[2.25]" />
						</div>
					</div>

					<div
						data-hero-lanyard
						class="relative h-[400px] w-full min-w-0 overflow-hidden border-2 border-border bg-accent shadow-neo-lg sm:h-[450px] lg:h-[480px]"
					>
						<div class="absolute inset-0 h-full w-full overflow-hidden">
							<Lanyard
								frontImage={lanyardFront}
								backImage={lanyardBack}
								cardColor="#ffffff"
								strapColor="#0d0d0d"
								finish="glossy"
								metal="silver"
								cornerRadius={0.08}
								size={0.56}
								strapLength={0.38}
								strapWidth={0.62}
								breeze={0.45}
								interactive={true}
								intro={true}
							/>
						</div>

						<div class="pointer-events-none absolute right-4 bottom-4 z-10">
							<Badge variant="lime">Drag &bull; Click to Flip</Badge>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Full-Screen Skills Marquee Band (max-w-7xl centered) -->
		<section
			id="skills"
			aria-label="Skills"
			class="w-full border-b-2 border-border bg-neo-surface-subtle"
		>
			<div class="mx-auto flex w-full max-w-7xl items-stretch px-6 sm:px-8">
				<!-- Left Violet SKILLS -> Label Block -->
				<div
					data-skills-label
					class="flex shrink-0 flex-col justify-center gap-1.5 border-x-2 border-border bg-secondary px-6 py-5 text-secondary-foreground sm:min-w-44 sm:px-8 sm:py-6"
				>
					<span class="font-display text-base font-black tracking-wider uppercase sm:text-lg">
						Skills
					</span>
					<span data-skills-arrow class="inline-flex">
						<ArrowRight class="size-4" aria-hidden="true" />
					</span>
				</div>

				<!-- Infinite Tech Stack Marquee -->
				<div
					data-skills-track
					class="neo-marquee flex min-w-0 flex-1 items-center overflow-hidden"
					data-paused={isMarqueePaused}
				>
					<div class="neo-marquee-track">
						<ul class="flex items-center">
							{#each [...skills, ...skills] as skill, index (`a-${index}-${skill.name}`)}
								<li
									aria-hidden={index >= skills.length ? 'true' : undefined}
									class="flex shrink-0 flex-col items-center justify-center gap-2 px-8 py-4 sm:px-12"
								>
									<svg
										viewBox="0 0 24 24"
										class="size-8 fill-current text-foreground"
										aria-hidden="true"
									>
										<path d={skill.icon.path} />
									</svg>
									<span
										class="font-mono text-[0.6875rem] font-semibold whitespace-nowrap text-foreground"
									>
										{skill.name}
									</span>
								</li>
							{/each}
						</ul>
						<div class="flex items-center" aria-hidden="true">
							{#each [...skills, ...skills] as skill, index (`b-${index}-${skill.name}`)}
								<div
									class="flex shrink-0 flex-col items-center justify-center gap-2 px-8 py-4 sm:px-12"
								>
									<svg
										viewBox="0 0 24 24"
										class="size-8 fill-current text-foreground"
										aria-hidden="true"
									>
										<path d={skill.icon.path} />
									</svg>
									<span
										class="font-mono text-[0.6875rem] font-semibold whitespace-nowrap text-foreground"
									>
										{skill.name}
									</span>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<!-- Accessible Pause/Play Toggle -->
				<button
					type="button"
					data-skills-toggle
					onclick={toggleMarquee}
					aria-label={isMarqueePaused ? 'Play skills marquee' : 'Pause skills marquee'}
					class="flex shrink-0 items-center justify-center border-x-2 border-border bg-card px-3.5 text-foreground transition-colors hover:bg-neo-surface-subtle focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					{#if isMarqueePaused}
						<Play class="size-4" aria-hidden="true" />
					{:else}
						<Pause class="size-4" aria-hidden="true" />
					{/if}
				</button>
			</div>
		</section>

		<!-- Full-Screen Featured Projects (Carousel) + Certifications Section -->
		<section id="projects" class="w-full border-b-2 border-border bg-background py-16 sm:py-20">
			<div class="mx-auto grid w-full max-w-7xl items-stretch gap-8 px-6 sm:px-8 lg:grid-cols-12">
				<!-- Left: Featured Projects (1 item at a time with Prev/Next + All Projects view) -->
				<div
					data-projects-panel
					class="flex flex-col justify-between gap-6 border-2 border-border bg-card p-6 shadow-neo sm:p-8 lg:col-span-8"
				>
					<div class="flex flex-wrap items-start justify-between gap-4">
						<div class="space-y-3">
							<h2 class="font-display text-2xl font-black tracking-tight uppercase sm:text-3xl">
								Featured Projects
							</h2>
							<Button
								variant="outline"
								size="sm"
								onclick={() => (showAllProjects = !showAllProjects)}
							>
								{#if showAllProjects}
									Back to Carousel
								{:else}
									View All Projects ({projects.length})
								{/if}
								<ArrowRight class="size-3.5" />
							</Button>
						</div>

						{#if !showAllProjects}
							<div class="flex items-center gap-2">
								<span
									class="border-2 border-border bg-neo-surface-subtle px-2.5 py-1 font-mono text-xs font-bold shadow-neo-sm"
								>
									{formatProjectNumber(activeProjectIndex)} / {formatProjectNumber(projects.length)}
								</span>
								<Button
									variant="accent"
									size="icon-sm"
									onclick={prevProject}
									aria-label="Previous project"
								>
									<ChevronLeft class="size-4" />
								</Button>
								<Button
									variant="accent"
									size="icon-sm"
									onclick={nextProject}
									aria-label="Next project"
								>
									<ChevronRight class="size-4" />
								</Button>
							</div>
						{/if}
					</div>

					{#if showAllProjects}
						<div
							class="grid max-h-[450px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2"
							aria-label="All featured projects"
						>
							{#each projects as project, i (project.id)}
								<div
									class="flex flex-col justify-between gap-3 border-2 border-border bg-neo-surface-subtle p-4 shadow-neo-sm transition-colors hover:bg-card"
								>
									<div class="space-y-2">
										<div class="flex items-center justify-between gap-2">
											<span class="font-mono text-xs font-bold text-muted-foreground">
												#{formatProjectNumber(i)}
											</span>
											<Badge variant="outline" class="px-2 py-0.5 text-[0.65rem]">
												{project.role}
											</Badge>
										</div>
										<h3 class="font-display text-base leading-snug font-black uppercase">
											{project.title}
										</h3>
										<p class="line-clamp-2 font-mono text-xs text-muted-foreground">
											{project.description}
										</p>
									</div>
									<div class="flex items-center justify-between gap-2 pt-1">
										<Button variant="outline" size="sm" onclick={() => selectProject(i)}>
											Preview
										</Button>
										<Button
											href={project.url}
											target="_blank"
											rel="noopener noreferrer"
											variant="secondary"
											size="sm"
										>
											{project.linkLabel}
											<ArrowUpRight class="size-3.5" />
										</Button>
									</div>
								</div>
							{/each}
						</div>
					{:else}
						<div bind:this={projectCardWrapperEl} class="flex flex-1 flex-col">
							<Card.Root class="flex-1 justify-between">
								<div class="border-b-2 border-border p-4 {currentProject.previewBg}">
									<div
										class="neo-grid-bg relative flex h-52 items-center justify-center overflow-hidden border-2 border-border sm:h-64"
									>
										{#if currentProject.image}
											<img
												src={currentProject.image}
												alt={currentProject.title}
												class="h-full w-full object-cover"
											/>
										{:else}
											<div class="flex max-w-md flex-col items-center gap-3 p-6 text-center">
												<div class="flex flex-wrap items-center justify-center gap-2">
													<span
														class="border-2 border-border bg-foreground px-2.5 py-0.5 font-mono text-xs font-bold text-background shadow-neo-sm"
													>
														#{formatProjectNumber(activeProjectIndex)}
													</span>
													<Badge variant="lime">{currentProject.role}</Badge>
												</div>
												<p
													class="font-display text-xl leading-tight font-black text-foreground uppercase sm:text-2xl"
												>
													{currentProject.title}
												</p>
												<span
													class="inline-flex items-center gap-1.5 border-2 border-dashed border-border bg-card px-3 py-1 font-mono text-[0.6875rem] font-semibold text-muted-foreground"
												>
													<ImageIcon class="size-3.5" aria-hidden="true" />
													Preview Image Coming Soon
												</span>
											</div>
										{/if}
									</div>
								</div>

								<Card.Header class="space-y-2">
									<div>
										<Badge variant="outline">{currentProject.role}</Badge>
									</div>
									<Card.Title>{currentProject.title}</Card.Title>
									<Card.Description>{currentProject.description}</Card.Description>
								</Card.Header>

								<Card.Content class="space-y-4">
									<div class="flex flex-wrap gap-2">
										{#each currentProject.tags as tag (tag)}
											<Badge variant="outline">{tag}</Badge>
										{/each}
									</div>
									<Separator />
								</Card.Content>

								<Card.Footer class="flex flex-wrap items-center justify-between gap-3">
									<Button
										href={currentProject.url}
										target="_blank"
										rel="noopener noreferrer"
										variant="outline"
										size="sm"
									>
										{currentProject.linkLabel}
										<ArrowUpRight class="size-3.5" />
									</Button>
								</Card.Footer>
							</Card.Root>
						</div>

						<!-- Carousel Pagination Dots -->
						<div class="flex flex-wrap items-center justify-center gap-2 pt-1">
							{#each projects as project, i (project.id)}
								<button
									type="button"
									onclick={() => selectProject(i)}
									aria-label={`Show project ${project.title}`}
									aria-current={activeProjectIndex === i ? 'true' : undefined}
									class="size-3 rounded-full border-2 border-border transition-colors {activeProjectIndex ===
									i
										? 'bg-foreground'
										: 'bg-card hover:bg-neo-surface-subtle'}"
								></button>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Right: Certifications Lime Panel -->
				<aside
					id="certifications"
					data-certs-aside
					class="flex flex-col justify-between gap-5 border-2 border-border bg-primary p-6 text-primary-foreground shadow-neo sm:p-8 lg:col-span-4"
				>
					<div class="flex items-center justify-between gap-2">
						<h2 class="font-display text-2xl font-black tracking-tight uppercase sm:text-3xl">
							Certifications
						</h2>
						<span
							class="border-2 border-border bg-card px-2 py-0.5 font-mono text-xs font-bold text-foreground shadow-neo-sm"
						>
							{certifications.length}
						</span>
					</div>

					<div class="grid flex-1 grid-cols-2 gap-3">
						{#each certifications as cert, i (cert.id)}
							<button
								type="button"
								data-cert-card
								onclick={() => openCertDialog(i)}
								aria-label={`Preview ${cert.title}`}
								class="neo-press group relative overflow-hidden border-2 border-border bg-card text-left shadow-neo-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none {i ===
								0
									? 'col-span-2 aspect-[16/10]'
									: 'aspect-[4/3]'}"
							>
								<img
									src={cert.image}
									alt={cert.title}
									loading="lazy"
									class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
								/>
								<span
									class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t-2 border-border bg-card/95 px-2.5 py-1.5 font-mono text-[0.65rem] font-bold text-foreground"
								>
									<span class="truncate">{cert.title}</span>
									<ArrowUpRight class="size-3 shrink-0" aria-hidden="true" />
								</span>
							</button>
						{/each}
					</div>

					<Button
						variant="outline"
						class="w-full justify-between"
						onclick={() => openCertDialog(0)}
					>
						<span>View All Certifications ({certifications.length})</span>
						<ArrowRight class="size-4" />
					</Button>
				</aside>
			</div>
		</section>

		<!-- Sticky Scrollytelling Section: How I Build · The Craft -->
		<CraftStory />

		<!-- Full-Screen Experience (Left Pink + Timeline) & Call To Action (Right Violet Grid) -->
		<section id="experience" class="w-full border-b-2 border-border bg-background py-16 sm:py-20">
			<div class="mx-auto grid w-full max-w-7xl items-stretch gap-8 px-6 sm:px-8 lg:grid-cols-12">
				<!-- Left: Experience Panel (Pink label column + White timeline) -->
				<div
					class="flex flex-col overflow-hidden border-2 border-border bg-card shadow-neo sm:flex-row lg:col-span-8"
				>
					<!-- Pink EXPERIENCE Sidebar -->
					<div
						data-exp-sidebar
						class="flex shrink-0 flex-col justify-center gap-2 border-b-2 border-border bg-accent px-6 py-5 text-neo-black sm:w-44 sm:border-r-2 sm:border-b-0 sm:px-7 sm:py-8 md:w-48"
					>
						<h2 class="font-display text-xl font-black tracking-tight uppercase sm:text-2xl">
							Experience
						</h2>
						<ArrowRight class="size-5" aria-hidden="true" />
					</div>

					<!-- White Timeline & View Full Resume CTA -->
					<div class="flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-10">
						<div class="relative">
							<div
								aria-hidden="true"
								data-exp-line
								class="absolute top-2 bottom-2 left-[5px] w-0.5 bg-border"
							></div>
							<ol class="space-y-8 pl-8">
								{#each experiences as group (group.category)}
									<li data-exp-item class="relative space-y-3">
										<span
											aria-hidden="true"
											data-exp-dot
											class="absolute top-1.5 -left-8 size-3 rounded-full bg-foreground"
										></span>
										<h3
											class="font-display text-sm font-black tracking-wide text-secondary uppercase sm:text-base"
										>
											{group.category}
										</h3>

										<ul class="space-y-3">
											{#each group.items as item (item.title)}
												<li class="border-l-2 border-border/30 pl-3.5">
													<div
														class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
													>
														<p class="font-display text-sm font-bold text-foreground sm:text-base">
															{item.title}
														</p>
														{#if item.period}
															<span
																class="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase"
															>
																{item.period}
															</span>
														{/if}
													</div>
													{#if item.description}
														<p
															class="mt-1.5 font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm"
														>
															{item.description}
														</p>
													{/if}
												</li>
											{/each}
										</ul>
									</li>
								{/each}
							</ol>
						</div>

						<div data-exp-resume class="mt-8 pl-8">
							<Button
								href="#contact"
								variant="outline"
								size="lg"
								class="border-border bg-card text-secondary shadow-neo hover:bg-neo-surface-subtle"
							>
								View Full Resume
								<ArrowRight class="size-4" />
							</Button>
						</div>
					</div>
				</div>

				<!-- Right: Violet Grid Call To Action Card -->
				<aside
					id="contact"
					data-cta-card
					class="neo-grid-violet-bg relative flex min-h-80 flex-col justify-center overflow-hidden border-2 border-border p-8 text-neo-white shadow-neo sm:p-10 lg:col-span-4"
				>
					<div class="relative z-10 max-w-xs space-y-6">
						<h2
							data-cta-stagger
							class="font-display text-2xl leading-[1.08] font-black tracking-tight uppercase sm:text-3xl"
						>
							Let's Build<br />Something<br />Amazing<br />Together.
						</h2>
						<div data-cta-stagger>
							<Button
								href={whatsappHref}
								target={WHATSAPP_NUMBER ? '_blank' : undefined}
								rel={WHATSAPP_NUMBER ? 'noopener noreferrer' : undefined}
								variant="outline"
								size="lg"
								class="border-neo-black bg-neo-surface text-neo-black shadow-neo hover:bg-neo-surface-subtle"
							>
								Get In Touch
								<ArrowRight class="size-4" />
							</Button>
						</div>
					</div>

					<!-- Bottom-Right Pink Starburst Accent -->
					<svg
						viewBox="0 0 120 120"
						aria-hidden="true"
						data-cta-starburst
						class="pointer-events-none absolute -right-10 -bottom-10 size-36 sm:size-40"
					>
						<polygon
							points="114,60 94.8,69.3 106.8,87 85.5,85.5 87,106.8 69.3,94.8 60,114 50.7,94.8 33,106.8 34.5,85.5 13.2,87 25.2,69.3 6,60 25.2,50.7 13.2,33 34.5,34.5 33,13.2 50.7,25.2 60,6 69.3,25.2 87,13.2 85.5,34.5 106.8,33 94.8,50.7"
							fill="#ff6e9f"
							stroke="#0d0d0d"
							stroke-width="4"
							stroke-linejoin="miter"
						/>
					</svg>
				</aside>
			</div>
		</section>

		<!-- Polaroid Line Carousel Section (Placed After Experience) -->
		<section id="gallery" class="w-full border-b-2 border-border bg-card py-16 sm:py-20">
			<div class="mx-auto w-full max-w-7xl space-y-6 px-6 sm:px-8">
				<div data-gallery-header class="flex flex-wrap items-end justify-between gap-4">
					<div class="space-y-2.5">
						<Badge variant="pink">Dokumentasi Kegiatan &bull; Snapshots</Badge>
						<h2 class="font-display text-2xl font-black tracking-tight uppercase sm:text-3xl">
							Field Notes on a Line
						</h2>
					</div>
				</div>

				<div
					data-gallery-stage
					class="overflow-hidden border-2 border-border bg-neo-surface-subtle shadow-neo"
				>
					<PolaroidLineCarousel
						slides={polaroidSlides}
						height="520px"
						cardWidth={250}
						sag={42}
						ariaLabel="Polaroid photography gallery"
					/>
				</div>
			</div>
		</section>
	</main>

	<!-- Full-Screen Footer with max-w-7xl centered content -->
	<footer data-footer class="w-full bg-card py-6">
		<div
			data-footer-inner
			class="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 sm:px-8"
		>
			<Badge variant="lime">
				<Code2 class="size-3" />
				PORTO.DEV
			</Badge>
			<p class="font-mono text-xs text-muted-foreground">
				Neobrutalism Portfolio UI — SvelteKit &amp; shadcn-svelte
			</p>
			<div class="flex items-center gap-2">
				<Button variant="outline" size="icon-sm" aria-label="Terminal">
					<Terminal class="size-3.5" />
				</Button>
				<Button variant="outline" size="icon-sm" aria-label="Email">
					<Mail class="size-3.5" />
				</Button>
			</div>
		</div>
	</footer>
</div>

<!-- Native Modal Dialog for Full Certificate Preview -->
<dialog
	bind:this={certDialogEl}
	closedby="any"
	aria-labelledby="cert-dialog-title"
	onclose={handleCertDialogClose}
	class="m-auto max-h-[90svh] w-[calc(100vw-2rem)] max-w-4xl overflow-hidden border-2 border-border bg-card p-0 text-card-foreground shadow-neo-lg"
>
	<div class="flex flex-col">
		<div
			class="flex items-center justify-between gap-4 border-b-2 border-border bg-primary px-5 py-3.5 text-primary-foreground"
		>
			<div class="min-w-0">
				<h2
					id="cert-dialog-title"
					class="truncate font-display text-base font-black uppercase sm:text-lg"
				>
					{currentCert.title}
				</h2>
				<p class="font-mono text-xs font-semibold opacity-80">
					{currentCert.issuer} &bull; {activeCertIndex + 1} / {certifications.length}
				</p>
			</div>

			<div class="flex shrink-0 items-center gap-2">
				<Button
					variant="outline"
					size="icon-sm"
					onclick={prevCert}
					aria-label="Previous certificate"
				>
					<ChevronLeft class="size-4" />
				</Button>
				<Button variant="outline" size="icon-sm" onclick={nextCert} aria-label="Next certificate">
					<ChevronRight class="size-4" />
				</Button>
				<Button
					variant="secondary"
					size="icon-sm"
					autofocus
					onclick={closeCertDialog}
					aria-label="Close certificate preview"
				>
					<X class="size-4" />
				</Button>
			</div>
		</div>

		<div
			class="neo-grid-bg flex max-h-[65svh] items-center justify-center overflow-auto p-4 sm:p-6"
		>
			<img
				src={currentCert.image}
				alt={currentCert.title}
				class="max-h-[58svh] w-auto border-2 border-border bg-neo-white object-contain shadow-neo"
			/>
		</div>

		<div
			class="flex items-center gap-2.5 overflow-x-auto border-t-2 border-border bg-neo-surface-subtle px-5 py-3"
		>
			{#each certifications as cert, i (cert.id)}
				<button
					type="button"
					onclick={() => (activeCertIndex = i)}
					aria-label={`Select ${cert.title}`}
					aria-current={activeCertIndex === i ? 'true' : undefined}
					class="h-12 w-18 shrink-0 overflow-hidden border-2 transition-transform {activeCertIndex ===
					i
						? '-translate-y-0.5 border-border ring-2 ring-secondary'
						: 'border-border/50 opacity-75 hover:opacity-100'}"
				>
					<img src={cert.image} alt="" class="h-full w-full object-cover" />
				</button>
			{/each}
		</div>
	</div>
</dialog>

<style>
	dialog:modal {
		overscroll-behavior: contain;
	}

	dialog::backdrop {
		overflow: hidden;
		overscroll-behavior: contain;
		background-color: rgb(13 13 13 / 0.72);
		backdrop-filter: blur(3px);
	}
</style>
