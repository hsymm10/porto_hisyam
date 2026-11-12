import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isRegistered = false;

/** Registers GSAP ScrollTrigger once on the client. */
export function registerGsap(): typeof gsap {
	if (typeof window !== 'undefined' && !isRegistered) {
		gsap.registerPlugin(ScrollTrigger);
		isRegistered = true;
	}
	return gsap;
}

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger };
