// Shared client-side navigation helper for the custom router used by App.
//
// The app uses a hand-rolled router (see `useRoute` in App.tsx) that listens
// for `popstate` events and reads `window.location.pathname`. Components that
// do not have direct access to the `navigate` callback (e.g. Navbar, which is
// mounted as a child of HeroSection) can still trigger a route change by using
// these helpers — they perform the same `pushState` + `popstate` dispatch that
// the in-app router already understands.
//
// Do NOT use `window.location.href` here — that would trigger a full page
// reload and break the SPA flow.

export function navigateTo(path: string): void {
  if (window.location.pathname === path) return
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
