
import { useState, useEffect } from "react"

// Default breakpoint for mobile devices (in pixels)
export const MOBILE_BREAKPOINT = 768

/**
 * A hook that returns true when the viewport width is less than the specified breakpoint
 * @param breakpoint - The maximum width in pixels to be considered mobile (defaults to MOBILE_BREAKPOINT)
 * @returns boolean indicating if the current viewport width is considered mobile
 */
export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
  // Initialize state with the current media query match
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // Handle SSR case where window is not available
    if (typeof window === 'undefined') return false
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches
  })

  useEffect(() => {
    // Skip effect during SSR
    if (typeof window === 'undefined') return

    // Create the media query
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    
    // Set the initial value
    setIsMobile(mediaQuery.matches)
    
    // Define the event handler
    const handleResize = (event: MediaQueryListEvent): void => {
      setIsMobile(event.matches)
    }
    
    // Add the event listener
    mediaQuery.addEventListener('change', handleResize)
    
    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleResize)
    }
  }, [breakpoint]) // Re-run the effect if breakpoint changes

  return isMobile
}
