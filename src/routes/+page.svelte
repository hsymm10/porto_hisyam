<script lang="ts">
	import lanyardBack from '#lib/assets/lanyard-back.svg';
	import lanyardFront from '#lib/assets/lanyard-front.svg';
	import sertif1 from '#lib/assets/sertifikat/sertif-1.png';
	import sertif2 from '#lib/assets/sertifikat/sertif-2.png';
	import sertif3 from '#lib/assets/sertifikat/sertif-3.png.png';
	import sertif4 from '#lib/assets/sertifikat/sertif-4.png';
	import sertif5 from '#lib/assets/sertifikat/sertif-5.png';
	import imgBimbelGsc from '#lib/assets/tampilan_web/ Website Company Profile GSC.png';
	import imgBukuTamu from '#lib/assets/tampilan_web/buku tamu.png';
	import imgEPresensi from '#lib/assets/tampilan_web/E-Presensi Sekolah.png';
	import imgH2snPhotobooth from '#lib/assets/tampilan_web/H2SN Photobooth.png';
	import imgKasirCostom from '#lib/assets/tampilan_web/Kasir_costom.png';
	import imgKeuangan from '#lib/assets/tampilan_web/keuangan.png';
	import imgPlatformGame from '#lib/assets/tampilan_web/Platform Game Berbasis Web.png';
	import imgPutraSundaJaya from '#lib/assets/tampilan_web/Putra Sunda Jaya.png';
	import imgShortlinkLinkKu from '#lib/assets/tampilan_web/Shortlink LinkKu.png';
	import imgUndanganOrganisasi from '#lib/assets/tampilan_web/Undangan_organisasi.png';
	import img93Printing from '#lib/assets/tampilan_web/Website 93 Printing.png';
	import imgIndahBakery from '#lib/assets/tampilan_web/Website Indah Bakery.png';
	import imgKedaiMieMamaw from '#lib/assets/tampilan_web/Website Kedai Mie Mamaw.png';
	import imgUicPress from '#lib/assets/tampilan_web/Website UIC Press Universitas Ibnu Chaldun.png';
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
	import Icon from '@iconify/svelte';
	import { tick } from 'svelte';
	import {
		siCss,
		siFigma,
		siGit,
		siGithub,
		siGo,
		siHtml5,
		siJavascript,
		siLaravel,
		siMysql,
		siNodedotjs,
		siNuxt,
		siPhp,
		siPhpmyadmin,
		siPostgresql,
		siReact,
		siSvelte,
		siTailwindcss,
		siTypescript,
		siVuedotjs
	} from 'simple-icons';
	import {
		activityTranslations,
		certificationTranslations,
		currentLang,
		projectTranslations,
		t,
		toggleLanguage
	} from '#lib/i18n.js';
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
		{ name: 'HTML5', icon: siHtml5 },
		{ name: 'CSS', icon: siCss },
		{ name: 'JavaScript', icon: siJavascript },
		{ name: 'TypeScript', icon: siTypescript },
		{ name: 'PHP', icon: siPhp },
		{ name: 'Golang', icon: siGo },
		{ name: 'Laravel', icon: siLaravel },
		{ name: 'Vue.js', icon: siVuedotjs },
		{ name: 'Nuxt', icon: siNuxt },
		{ name: 'React', icon: siReact },
		{ name: 'Svelte', icon: siSvelte },
		{ name: 'Node.js', icon: siNodedotjs },
		{ name: 'Tailwind CSS', icon: siTailwindcss },
		{ name: 'PostgreSQL', icon: siPostgresql },
		{ name: 'MySQL', icon: siMysql },
		{ name: 'phpMyAdmin', icon: siPhpmyadmin },
		{ name: 'Figma', icon: siFigma },
		{ name: 'Git', icon: siGit },
		{ name: 'GitHub', icon: siGithub }
	];

	type Project = {
		id: string;
		role: string;
		title: string;
		description: string;
		tags: string[];
		url?: string;
		linkLabel?: string;
		image?: string;
		previewBg: string;
	};

	type DisplayProject = Project & {
		linkLabel: string | undefined;
	};

	const rawProjects: Project[] = [
		{
			id: 'h2sn-photobooth',
			role: 'Full Stack Web Developer',
			title: 'H2SN Photobooth',
			description:
				'Membangun website photobooth untuk mendukung operasional bisnis. Website menyediakan informasi layanan, galeri, paket, serta pengelolaan data secara digital.',
			tags: ['Full Stack', 'Web App', 'Gallery', 'Business Ops'],
			url: '/apps/photobooth/index.html',
			linkLabel: 'Buka Sistem',
			image: imgH2snPhotobooth,
			previewBg: 'bg-neo-canvas'
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
			image: imgUicPress,
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
			image: imgEPresensi,
			previewBg: 'bg-accent'
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
			image: imgBimbelGsc,
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
			image: imgKedaiMieMamaw,
			previewBg: 'bg-neo-canvas'
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
			image: imgIndahBakery,
			previewBg: 'bg-secondary'
		},
		{
			id: '93-printing',
			role: 'Frontend Web Developer',
			title: 'Website 93 Printing',
			description:
				'Membangun website company profile sebagai media branding dan promosi digital bagi bisnis percetakan.',
			tags: ['Frontend', 'Company Profile', 'Branding'],
			url: '/apps/93_printing/index.html',
			linkLabel: 'Buka Sistem',
			image: img93Printing,
			previewBg: 'bg-accent'
		},
		{
			id: 'platform-game-kir',
			role: 'Game Developer',
			title: 'Platform Game Berbasis Web',
			description:
				'Membangun lebih dari sepuluh game edukatif berbasis HTML, CSS, dan JavaScript sebagai media pembelajaran untuk kegiatan ekstrakurikuler KIR.',
			tags: ['Game Dev', 'HTML', 'CSS', 'JavaScript'],
			url: '/apps/game_hszam/index.html',
			linkLabel: 'Buka Sistem',
			image: imgPlatformGame,
			previewBg: 'bg-accent'
		},
		{
			id: 'shortlink-linkku',
			role: 'Web Developer',
			title: 'Shortlink LinkKu',
			description: 'Layanan pemendek URL cepat dan mudah digunakan.',
			tags: ['Web App', 'Shortlink'],
			image: imgShortlinkLinkKu,
			previewBg: 'bg-neo-canvas'
		},
		{
			id: 'putra-sunda-jaya',
			role: 'Web Developer',
			title: 'Putra Sunda Jaya',
			description: 'Website profil bisnis dan layanan konstruksi & pengadaan.',
			tags: ['Web App', 'Company Profile'],
			image: imgPutraSundaJaya,
			previewBg: 'bg-secondary'
		},
		{
			id: 'web-keuangan',
			role: 'Web Developer',
			title: 'Sistem Keuangan',
			description: 'Aplikasi pembukuan dan pelaporan kas keuangan digital.',
			tags: ['Web App', 'Finance'],
			image: imgKeuangan,
			previewBg: 'bg-accent'
		},
		{
			id: 'web-kasir-custom',
			role: 'Web Developer',
			title: 'Kasir Custom',
			description: 'Aplikasi kasir (POS) fleksibel dengan pencatatan transaksi.',
			tags: ['Web App', 'POS', 'Kasir'],
			image: imgKasirCostom,
			previewBg: 'bg-neo-canvas'
		},
		{
			id: 'web-undangan-organisasi',
			role: 'Web Developer',
			title: 'Undangan Organisasi',
			description: 'Website undangan digital formal untuk acara rapat dan musyawarah.',
			tags: ['Web App', 'Invitation'],
			image: imgUndanganOrganisasi,
			previewBg: 'bg-secondary'
		},
		{
			id: 'web-buku-tamu',
			role: 'Web Developer',
			title: 'Buku Tamu Digital',
			description: 'Sistem pencatatan tamu digital untuk event dan kunjungan resmi.',
			tags: ['Web App', 'Guestbook'],
			image: imgBukuTamu,
			previewBg: 'bg-accent'
		}
	];

	const projects = $derived<DisplayProject[]>(
		rawProjects.map((p) => {
			const trans = projectTranslations[p.id]?.[$currentLang];
			let label: string | undefined;
			if (p.url) {
				const isInternalLiveApp = p.url.startsWith('/apps/');
				label = isInternalLiveApp
					? t[$currentLang].projects.openLive
					: t[$currentLang].projects.viewRepo;
			}
			return {
				...p,
				role: trans?.role ?? p.role,
				title: trans?.title ?? p.title,
				description: trans?.description ?? p.description,
				tags: trans?.tags ?? p.tags,
				linkLabel: label
			};
		})
	);

	type Certification = {
		id: string;
		title: string;
		issuer: string;
		image: string;
	};

	const rawCertifications: { id: string; image: string }[] = [
		{ id: 'algonova-l8', image: sertif1 },
		{ id: 'algonova-l9', image: sertif2 },
		{ id: 'naspo-2021', image: sertif3 },
		{ id: 'kisef-2023', image: sertif4 },
		{ id: 'aiseef-2023', image: sertif5 }
	];

	const certifications = $derived<Certification[]>(
		rawCertifications.map((c) => {
			const trans = certificationTranslations[c.id]?.[$currentLang];
			return {
				id: c.id,
				title: trans?.title ?? c.id,
				issuer: trans?.issuer ?? '',
				image: c.image
			};
		})
	);

	type ExperienceEntry = {
		title: string;
		period?: string;
		description?: string;
	};

	type ExperienceGroup = {
		category: string;
		items: ExperienceEntry[];
	};

	const rawExperiences: ExperienceGroup[] = [
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

	const experiences = $derived(
		$currentLang === 'en'
			? [
					{
						category: t.en.experiences.org,
						items: [
							{
								title: 'Organizer of Robotics Collaboration Program',
								description:
									'Initiated and organized inter-student collaborative programs in robotics education and foundational web engineering. Coordinated participants, designed practical learning materials, and facilitated hands-on workshops.'
							}
						]
					},
					{
						category: t.en.experiences.training,
						items: [
							{
								title: 'Algorithmics.asia — Python Programming Track',
								period: 'October 2024 – January 2026'
							},
							{
								title: 'Ngoding Bareng Dea — React JS & Tailwind CSS',
								period: 'May 2025'
							},
							{
								title: 'Titik Nol English Course Pare',
								period: 'June 2026'
							}
						]
					},
					{
						category: t.en.experiences.awards,
						items: [
							{
								title:
									'NASPO Competition Winner — Cultural Preservation via Plastic Waste Innovation',
								period: '11–14 December 2021'
							},
							{
								title: 'AISEEF Competition Winner — Lato-Lato Ronin Detector',
								period: '10–14 February 2023'
							},
							{
								title: 'KISEF Competition Winner — Bottle Recycling into Ondel-Ondel Arts',
								period: '20–24 February 2023'
							}
						]
					}
				]
			: rawExperiences
	);

	// Set nomor WhatsApp format internasional tanpa tanda '+' (contoh: '6281234567890')
	const WHATSAPP_NUMBER = '6282111159144';
	const whatsappHref = $derived(
		WHATSAPP_NUMBER
			? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
					$currentLang === 'id'
						? 'Halo Hisyam, saya tertarik untuk berdiskusi mengenai proyek.'
						: 'Hello Hisyam, I am interested in discussing a project collaboration.'
				)}`
			: '#contact'
	);

	const activityPhotoModules = import.meta.glob<string>(
		'../lib/assets/Dokumentasi_Kegiatan/*.{jpeg,jpg,png,webp}',
		{
			eager: true,
			import: 'default'
		}
	);

	const PALETTES: NonNullable<Slide['palette']>[] = ['dawn', 'alpine', 'dusk', 'mist'];

	function filenameToSlideText(
		filename: string,
		lang: 'id' | 'en'
	): { title: string; caption: string } {
		const meta = activityTranslations[filename]?.[lang];
		if (meta) return meta;
		const clean = filename.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ');
		const title = clean.charAt(0).toUpperCase() + clean.slice(1);
		return {
			title,
			caption:
				lang === 'id'
					? 'Dokumentasi kegiatan dan kolaborasi.'
					: 'Field documentation and collaboration.'
		};
	}

	const polaroidSlides = $derived<Slide[]>(
		Object.entries(activityPhotoModules)
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([path, src], index) => {
				const filename = path.split('/').pop() ?? '';
				const { title, caption } = filenameToSlideText(filename, $currentLang);
				return {
					image: src,
					title,
					caption,
					alt: title,
					palette: PALETTES[index % PALETTES.length],
					seed: (index + 1) * 7
				};
			})
	);

	let pageRootEl: HTMLDivElement | undefined = $state();
	let projectCardWrapperEl: HTMLDivElement | undefined = $state();
	let certDialogEl: HTMLDialogElement | undefined = $state();
	let galleryDialogEl: HTMLDialogElement | undefined = $state();
	let projectDialogEl: HTMLDialogElement | undefined = $state();
	let activeSection = $state('');
	let activeProjectIndex = $state(0);
	let activeCertIndex = $state(0);
	let activeGalleryIndex = $state(0);
	let activeProjectModalIndex = $state(0);
	let showAllProjects = $state(false);
	const projectsWithImages = $derived(
		projects.filter((project): project is DisplayProject & { image: string } =>
			Boolean(project.image)
		)
	);
	const currentProject = $derived(projects[activeProjectIndex]);
	const currentCert = $derived(certifications[activeCertIndex]);
	const currentGallerySlide = $derived(polaroidSlides[activeGalleryIndex]);
	const currentModalProject = $derived(projectsWithImages[activeProjectModalIndex]);

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

	function openGalleryDialog(index: number) {
		activeGalleryIndex = index;
		galleryDialogEl?.showModal();
	}

	function closeGalleryDialog() {
		galleryDialogEl?.close();
	}

	function prevGallerySlide() {
		activeGalleryIndex = (activeGalleryIndex - 1 + polaroidSlides.length) % polaroidSlides.length;
	}

	function nextGallerySlide() {
		activeGalleryIndex = (activeGalleryIndex + 1) % polaroidSlides.length;
	}

	function handleGalleryDialogClose() {
		if (galleryDialogEl) {
			galleryDialogEl.returnValue = '';
		}
	}

	function openProjectDialog(projectId: string) {
		const idx = projectsWithImages.findIndex((p) => p.id === projectId);
		if (idx === -1) return;
		activeProjectModalIndex = idx;
		projectDialogEl?.showModal();
	}

	function closeProjectDialog() {
		projectDialogEl?.close();
	}

	function prevProjectModal() {
		activeProjectModalIndex =
			(activeProjectModalIndex - 1 + projectsWithImages.length) % projectsWithImages.length;
	}

	function nextProjectModal() {
		activeProjectModalIndex = (activeProjectModalIndex + 1) % projectsWithImages.length;
	}

	function handleProjectDialogClose() {
		if (projectDialogEl) {
			projectDialogEl.returnValue = '';
		}
	}

	function attachDialogBackdropClose(dialog: HTMLDialogElement | undefined) {
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
	}

	$effect(() => attachDialogBackdropClose(certDialogEl));
	$effect(() => attachDialogBackdropClose(galleryDialogEl));
	$effect(() => attachDialogBackdropClose(projectDialogEl));

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

	const NAV_LINKS = $derived([
		{ id: 'skills', label: t[$currentLang].nav.skills },
		{ id: 'projects', label: t[$currentLang].nav.projects },
		{ id: 'craft', label: t[$currentLang].nav.craft },
		{ id: 'experience', label: t[$currentLang].nav.experience },
		{ id: 'gallery', label: t[$currentLang].nav.snapshots },
		{ id: 'contact', label: t[$currentLang].nav.contact }
	]);

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

<div id="top" bind:this={pageRootEl} class="flex min-h-screen w-full flex-col bg-background">
	<!-- Full-Screen Sticky Header with max-w-7xl centered content -->
	<header class="sticky top-0 z-40 w-full border-b-2 border-border bg-card">
		<div
			class="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3.5 sm:px-8"
		>
			<a href="#top" class="inline-flex items-center">
				<Badge variant="lime" class="px-3 py-1.5 text-xs">
					<Code2 class="size-4" />
					hszam__
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
							? 'text-[var(--retro-green-text)] underline decoration-[var(--retro-tangerine)] decoration-2'
							: ''}"
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="flex items-center gap-2.5">
				<!-- Language Switcher Toggle -->
				<button
					type="button"
					onclick={toggleLanguage}
					aria-label={$currentLang === 'id'
						? 'Ganti bahasa ke English'
						: 'Switch language to Indonesian'}
					class="inline-flex items-center gap-1.5 border-2 border-border bg-card px-2.5 py-1.5 font-mono text-xs font-black text-foreground uppercase shadow-neo-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
				>
					<span class={$currentLang === 'id' ? 'text-primary underline' : 'text-muted-foreground'}
						>ID</span
					>
					<span class="text-muted-foreground/60">/</span>
					<span class={$currentLang === 'en' ? 'text-primary underline' : 'text-muted-foreground'}
						>EN</span
					>
				</button>

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
					{t[$currentLang].nav.contactMe}
					<ArrowRight class="size-3.5" />
				</Button>
			</div>
		</div>
		<!-- Global Scrollytelling Progress Indicator -->
		<div
			aria-hidden="true"
			class="h-1 w-full overflow-hidden border-t-2 border-border bg-neo-surface-subtle motion-reduce:hidden"
		>
			<div data-scroll-progress class="h-full w-full origin-left scale-x-0 bg-primary"></div>
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
						class="flex size-13 items-center justify-center rounded-xl border-2 border-border bg-secondary text-secondary-foreground shadow-neo"
					>
						<svg viewBox="0 0 24 24" class="size-7 fill-current">
							<path d={siSvelte.path} />
						</svg>
					</div>
				</div>

				<!-- Floating Dev Sticker: Crimson Circular Braces Stamp (Bottom-Left Open Space) -->
				<div
					aria-hidden="true"
					data-hero-sticker
					data-parallax-y="-22"
					data-parallax-rot="14"
					class="pointer-events-none absolute bottom-6 left-[36%] z-20 hidden -rotate-12 lg:flex"
				>
					<div
						data-hero-sticker-inner
						class="flex size-13 items-center justify-center rounded-full border-2 border-border bg-accent text-accent-foreground shadow-neo"
					>
						<Braces class="size-6 stroke-[2.25]" />
					</div>
				</div>

				<!-- Left Intro Content -->
				<div data-hero-copy class="relative z-10 space-y-6 lg:col-span-7">
					<div class="space-y-4">
						<div data-hero-stagger>
							<Badge variant="default">{t[$currentLang].hero.badge}</Badge>
						</div>

						<h1
							data-hero-stagger
							class="font-display text-5xl leading-[0.95] font-black tracking-tight uppercase sm:text-6xl lg:text-7xl"
						>
							{t[$currentLang].hero.headlinePrefix}<br />{t[$currentLang].hero.headlineSuffix}
						</h1>

						<p
							data-hero-stagger
							class="max-w-xl font-mono text-sm leading-relaxed text-muted-foreground sm:text-base"
						>
							{t[$currentLang].hero.bio}
						</p>
					</div>

					<div data-hero-stagger class="flex flex-wrap items-center gap-3.5">
						<Button href="#projects" size="lg" variant="default">
							{t[$currentLang].hero.viewWork}
							<ArrowUpRight class="size-4" />
						</Button>
						<Button href="#contact" size="lg" variant="outline">
							{t[$currentLang].hero.downloadResume}
							<Download class="size-4" />
						</Button>
					</div>

					<div data-hero-stagger class="space-y-2.5 pt-1">
						<p class="font-mono text-xs font-bold tracking-wider uppercase">
							{t[$currentLang].hero.connect}
						</p>
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
								class="mb-0.5 size-5 shrink-0 drop-shadow-[2px_2px_0px_var(--neo-shadow-color)]"
							>
								<polygon
									points="3,3 21,10 13,13 10,21"
									fill="var(--primary)"
									stroke="var(--neo-black)"
									stroke-width="2.2"
									stroke-linejoin="round"
								/>
							</svg>
							<div
								class="rounded-full border-2 border-border bg-secondary px-4 py-1 font-display text-sm font-black tracking-tight text-secondary-foreground shadow-neo sm:text-base"
							>
								hszamm
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
							class="relative flex size-12 items-center justify-center rounded-xl border-2 border-border bg-primary text-primary-foreground shadow-neo sm:size-13"
						>
							<Terminal class="size-6 stroke-[2.25]" />
							<span
								class="absolute -bottom-1.5 left-3 size-3 rotate-45 border-r-2 border-b-2 border-border bg-primary"
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
							class="flex size-12 items-center justify-center rounded-full border-2 border-border bg-card text-foreground shadow-neo sm:size-13"
						>
							<GitBranch class="size-6 stroke-[2.25]" />
						</div>
					</div>

					<div
						data-hero-lanyard
						class="relative h-[400px] w-full min-w-0 overflow-hidden border-2 border-border bg-secondary shadow-neo-lg sm:h-[450px] lg:h-[480px]"
					>
						<div class="absolute inset-0 h-full w-full overflow-hidden">
							<Lanyard
								frontImage={lanyardFront}
								backImage={lanyardBack}
								cardColor="#e9e8ca"
								strapColor="#0f2116"
								finish="glossy"
								metal="gold"
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
							<Badge variant="lime">{t[$currentLang].hero.lanyardBadge}</Badge>
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
						{t[$currentLang].hero.skillsLabel}
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
					aria-label={isMarqueePaused
						? t[$currentLang].hero.marqueePlay
						: t[$currentLang].hero.marqueePause}
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
								{t[$currentLang].projects.title}
							</h2>
							<Button
								variant="outline"
								size="sm"
								onclick={() => (showAllProjects = !showAllProjects)}
							>
								{#if showAllProjects}
									{t[$currentLang].projects.backToCarousel}
								{:else}
									{t[$currentLang].projects.viewAll} ({projects.length})
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
									aria-label={t[$currentLang].projects.prevProject}
								>
									<ChevronLeft class="size-4" />
								</Button>
								<Button
									variant="accent"
									size="icon-sm"
									onclick={nextProject}
									aria-label={t[$currentLang].projects.nextProject}
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
											{t[$currentLang].projects.preview}
										</Button>
										{#if project.url}
											<Button
												href={project.url}
												target="_blank"
												rel="noopener noreferrer"
												variant="secondary"
												size="sm"
											>
												{project.linkLabel ?? t[$currentLang].projects.viewProject}
												<ArrowUpRight class="size-3.5" />
											</Button>
										{/if}
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
											<button
												type="button"
												onclick={() => openProjectDialog(currentProject.id)}
												aria-label={`${t[$currentLang].projects.seeFullPreview} ${currentProject.title}`}
												class="group relative h-full w-full cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
											>
												<img
													src={currentProject.image}
													alt={currentProject.title}
													class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
												/>
											</button>
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
													{t[$currentLang].projects.previewComingSoon}
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
									{#if currentProject.url}
										<Button
											href={currentProject.url}
											target="_blank"
											rel="noopener noreferrer"
											variant="outline"
											size="sm"
										>
											{currentProject.linkLabel ?? t[$currentLang].projects.viewProject}
											<ArrowUpRight class="size-3.5" />
										</Button>
									{/if}
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

				<!-- Right: Certifications Tangerine Grid Panel -->
				<aside
					id="certifications"
					data-certs-aside
					class="neo-grid-accent-bg flex flex-col justify-between gap-5 border-2 border-border p-6 text-primary-foreground shadow-neo sm:p-8 lg:col-span-4"
				>
					<div class="flex items-center justify-between gap-2">
						<h2 class="font-display text-2xl font-black tracking-tight uppercase sm:text-3xl">
							{t[$currentLang].certs.title}
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
						<span>{t[$currentLang].certs.viewAll} ({certifications.length})</span>
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
					<!-- Tangerine EXPERIENCE Sidebar -->
					<div
						data-exp-sidebar
						class="neo-grid-accent-bg flex shrink-0 flex-col justify-center gap-2 border-b-2 border-border px-6 py-5 text-accent-foreground sm:w-44 sm:border-r-2 sm:border-b-0 sm:px-7 sm:py-8 md:w-48"
					>
						<h2 class="font-display text-xl font-black tracking-tight uppercase sm:text-2xl">
							{t[$currentLang].experiences.sidebarLabel}
						</h2>
						<ArrowRight class="size-5" aria-hidden="true" />
					</div>

					<!-- Timeline & View Full Resume CTA -->
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
											class="font-display text-sm font-black tracking-wide text-[var(--retro-green-text)] uppercase sm:text-base"
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
								class="border-border bg-card text-[var(--retro-green-text)] shadow-neo hover:bg-neo-surface-subtle"
							>
								{t[$currentLang].experiences.viewResume}
								<ArrowRight class="size-4" />
							</Button>
						</div>
					</div>
				</div>

				<!-- Right: Retro Green Grid Call To Action Card -->
				<aside
					id="contact"
					data-cta-card
					class="neo-grid-violet-bg relative flex min-h-80 flex-col justify-center overflow-hidden border-2 border-border p-8 text-secondary-foreground shadow-neo sm:p-10 lg:col-span-4"
				>
					<div class="relative z-10 max-w-xs space-y-6">
						<h2
							data-cta-stagger
							class="font-display text-2xl leading-[1.08] font-black tracking-tight uppercase sm:text-3xl"
						>
							{t[$currentLang].contact.ctaHeadline1}<br />{t[$currentLang].contact.ctaHeadline2}<br
							/>{t[$currentLang].contact.ctaHeadline3}<br />{t[$currentLang].contact.ctaHeadline4}
						</h2>
						<div data-cta-stagger>
							<Button
								href={whatsappHref}
								target={WHATSAPP_NUMBER ? '_blank' : undefined}
								rel={WHATSAPP_NUMBER ? 'noopener noreferrer' : undefined}
								variant="outline"
								size="lg"
								class="border-neo-black bg-neo-white text-neo-black shadow-neo hover:bg-neo-surface-subtle hover:text-foreground"
							>
								{t[$currentLang].contact.ctaButton}
								<ArrowRight class="size-4" />
							</Button>
						</div>
					</div>

					<!-- Bottom-Right Tangerine Starburst Accent -->
					<svg
						viewBox="0 0 120 120"
						aria-hidden="true"
						data-cta-starburst
						class="pointer-events-none absolute -right-10 -bottom-10 size-36 sm:size-40"
					>
						<polygon
							points="114,60 94.8,69.3 106.8,87 85.5,85.5 87,106.8 69.3,94.8 60,114 50.7,94.8 33,106.8 34.5,85.5 13.2,87 25.2,69.3 6,60 25.2,50.7 13.2,33 34.5,34.5 33,13.2 50.7,25.2 60,6 69.3,25.2 87,13.2 85.5,34.5 106.8,33 94.8,50.7"
							fill="#fe7a25"
							stroke="#0f2116"
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
						<Badge variant="pink">{t[$currentLang].snapshots.badge}</Badge>
						<h2 class="font-display text-2xl font-black tracking-tight uppercase sm:text-3xl">
							{t[$currentLang].snapshots.title}
						</h2>
					</div>
				</div>

				<div
					data-gallery-stage
					class="overflow-hidden border-2 border-border bg-background shadow-neo"
				>
					<PolaroidLineCarousel
						slides={polaroidSlides}
						height="520px"
						cardWidth={250}
						sag={42}
						onSelect={openGalleryDialog}
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
				hszamm__
			</Badge>
			<p class="font-mono text-xs text-muted-foreground">
				{t[$currentLang].footer.bio}
			</p>
			<div class="flex items-center gap-2">
				<Button
					href="mailto:hisyamsayyidalzam10@gmail.com"
					variant="outline"
					size="icon-sm"
					aria-label="Email hisyamsayyidalzam10@gmail.com"
					title="hisyamsayyidalzam10@gmail.com"
				>
					<Icon icon="mdi:email-outline" class="size-4" aria-hidden="true" />
				</Button>
				<Button
					href={whatsappHref}
					target="_blank"
					rel="noopener noreferrer"
					variant="outline"
					size="icon-sm"
					aria-label="Chat WhatsApp 0821-11159144"
					title="WhatsApp 0821-11159144"
				>
					<Icon icon="mdi:phone-outline" class="size-4" aria-hidden="true" />
				</Button>
				<Button
					href="https://www.instagram.com/hszamm__/"
					target="_blank"
					rel="noopener noreferrer"
					variant="outline"
					size="icon-sm"
					aria-label="Instagram @hszamm__"
					title="Instagram @hszamm__"
				>
					<Icon icon="mdi:instagram" class="size-4" aria-hidden="true" />
				</Button>
				<Button
					href="https://github.com/hsymm10"
					target="_blank"
					rel="noopener noreferrer"
					variant="outline"
					size="icon-sm"
					aria-label="GitHub hsymm10"
					title="GitHub hsymm10"
				>
					<Icon icon="mdi:github" class="size-4" aria-hidden="true" />
				</Button>
				<Button
					href="https://gitlab.com/hszamm"
					target="_blank"
					rel="noopener noreferrer"
					variant="outline"
					size="icon-sm"
					aria-label="GitLab Hisyam Sayyid Alzam (@hszamm)"
					title="GitLab @hszamm"
				>
					<Icon icon="mdi:gitlab" class="size-4" aria-hidden="true" />
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
					aria-label={t[$currentLang].certs.prevCert}
				>
					<ChevronLeft class="size-4" />
				</Button>
				<Button
					variant="outline"
					size="icon-sm"
					onclick={nextCert}
					aria-label={t[$currentLang].certs.nextCert}
				>
					<ChevronRight class="size-4" />
				</Button>
				<Button
					variant="secondary"
					size="icon-sm"
					autofocus
					onclick={closeCertDialog}
					aria-label={t[$currentLang].certs.closeModal}
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
				class="block h-auto max-h-[58svh] w-auto max-w-full border-2 border-border bg-neo-white object-contain shadow-neo"
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

<!-- Native Modal Dialog for Full Field Notes Photo Preview -->
<dialog
	bind:this={galleryDialogEl}
	closedby="any"
	aria-labelledby="gallery-dialog-title"
	onclose={handleGalleryDialogClose}
	onkeydown={(e) => {
		if (e.key === 'ArrowLeft') prevGallerySlide();
		else if (e.key === 'ArrowRight') nextGallerySlide();
	}}
	class="m-auto max-h-[92svh] w-[calc(100vw-2rem)] max-w-6xl overflow-hidden border-2 border-border bg-card p-0 text-card-foreground shadow-neo-lg"
>
	{#if currentGallerySlide}
		<div class="flex flex-col">
			<div
				class="flex items-center justify-between gap-4 border-b-2 border-border bg-primary px-5 py-3.5 text-primary-foreground"
			>
				<div class="min-w-0">
					<h2
						id="gallery-dialog-title"
						class="truncate font-display text-base font-black uppercase sm:text-lg"
					>
						{currentGallerySlide.title}
					</h2>
					<p class="truncate font-mono text-xs font-semibold opacity-85">
						{currentGallerySlide.caption} &bull; {activeGalleryIndex + 1} / {polaroidSlides.length}
					</p>
				</div>

				<div class="flex shrink-0 items-center gap-2">
					<Button
						variant="outline"
						size="icon-sm"
						onclick={prevGallerySlide}
						aria-label={t[$currentLang].snapshots.prevPhoto}
					>
						<ChevronLeft class="size-4" />
					</Button>
					<Button
						variant="outline"
						size="icon-sm"
						onclick={nextGallerySlide}
						aria-label={t[$currentLang].snapshots.nextPhoto}
					>
						<ChevronRight class="size-4" />
					</Button>
					<Button
						variant="secondary"
						size="icon-sm"
						autofocus
						onclick={closeGalleryDialog}
						aria-label={t[$currentLang].snapshots.closeModal}
					>
						<X class="size-4" />
					</Button>
				</div>
			</div>

			<div
				class="neo-grid-bg flex max-h-[70svh] items-center justify-center overflow-hidden p-3 sm:p-5"
			>
				<img
					src={currentGallerySlide.image}
					alt={currentGallerySlide.alt || currentGallerySlide.title}
					class="block h-auto max-h-[64svh] w-auto max-w-full border-2 border-border bg-neo-white object-contain shadow-neo"
				/>
			</div>

			<div
				class="flex items-center gap-2.5 overflow-x-auto border-t-2 border-border bg-neo-surface-subtle px-5 py-3"
			>
				{#each polaroidSlides as slide, i (slide.image ?? i)}
					<button
						type="button"
						onclick={() => (activeGalleryIndex = i)}
						aria-label={`Select ${slide.title}`}
						aria-current={activeGalleryIndex === i ? 'true' : undefined}
						class="h-12 w-16 shrink-0 overflow-hidden border-2 transition-transform {activeGalleryIndex ===
						i
							? '-translate-y-0.5 border-border ring-2 ring-secondary'
							: 'border-border/50 opacity-75 hover:opacity-100'}"
					>
						<img src={slide.image} alt="" class="h-full w-full object-cover" />
					</button>
				{/each}
			</div>
		</div>
	{/if}
</dialog>

<!-- Native Modal Dialog for Full Featured Project Preview -->
<dialog
	bind:this={projectDialogEl}
	closedby="any"
	aria-labelledby="project-dialog-title"
	onclose={handleProjectDialogClose}
	onkeydown={(e) => {
		if (e.key === 'ArrowLeft') prevProjectModal();
		else if (e.key === 'ArrowRight') nextProjectModal();
	}}
	class="m-auto max-h-[90svh] w-[calc(100vw-2rem)] max-w-5xl overflow-hidden border-2 border-border bg-card p-0 text-card-foreground shadow-neo-lg"
>
	{#if currentModalProject}
		<div class="flex flex-col">
			<div
				class="flex items-center justify-between gap-4 border-b-2 border-border bg-primary px-5 py-3.5 text-primary-foreground"
			>
				<div class="min-w-0">
					<h2
						id="project-dialog-title"
						class="truncate font-display text-base font-black uppercase sm:text-lg"
					>
						{currentModalProject.title}
					</h2>
					<p class="truncate font-mono text-xs font-semibold opacity-80">
						{currentModalProject.role} &bull; {activeProjectModalIndex + 1} /
						{projectsWithImages.length}
					</p>
				</div>

				<div class="flex shrink-0 items-center gap-2">
					<Button
						variant="outline"
						size="icon-sm"
						onclick={prevProjectModal}
						aria-label={t[$currentLang].projects.prevProject}
					>
						<ChevronLeft class="size-4" />
					</Button>
					<Button
						variant="outline"
						size="icon-sm"
						onclick={nextProjectModal}
						aria-label={t[$currentLang].projects.nextProject}
					>
						<ChevronRight class="size-4" />
					</Button>
					<Button
						variant="secondary"
						size="icon-sm"
						autofocus
						onclick={closeProjectDialog}
						aria-label={t[$currentLang].projects.closeModal}
					>
						<X class="size-4" />
					</Button>
				</div>
			</div>

			<div
				class="neo-grid-bg flex max-h-[65svh] items-center justify-center overflow-hidden p-4 sm:p-6"
			>
				<img
					src={currentModalProject.image}
					alt={currentModalProject.title}
					class="block h-auto max-h-[58svh] w-auto max-w-full border-2 border-border bg-neo-white object-contain shadow-neo"
				/>
			</div>

			<div
				class="flex items-center gap-2.5 overflow-x-auto border-t-2 border-border bg-neo-surface-subtle px-5 py-3"
			>
				{#each projectsWithImages as proj, i (proj.id)}
					<button
						type="button"
						onclick={() => (activeProjectModalIndex = i)}
						aria-label={`Select ${proj.title}`}
						aria-current={activeProjectModalIndex === i ? 'true' : undefined}
						class="h-12 w-18 shrink-0 overflow-hidden border-2 transition-transform {activeProjectModalIndex ===
						i
							? '-translate-y-0.5 border-border ring-2 ring-secondary'
							: 'border-border/50 opacity-75 hover:opacity-100'}"
					>
						<img src={proj.image} alt="" class="h-full w-full object-cover" />
					</button>
				{/each}
			</div>
		</div>
	{/if}
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
