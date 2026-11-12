import type Lenis from 'lenis';

let activeLenis: Lenis | null = null;

/** Registers the active client-side Lenis instance from the root layout. */
export function setLenisInstance(instance: Lenis | null): void {
	activeLenis = instance;
}

/** Returns the active client-side Lenis instance, if initialized. */
export function getLenisInstance(): Lenis | null {
	return activeLenis;
}
