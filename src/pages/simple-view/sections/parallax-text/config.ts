/**
 * Configuration for parallax text animations and transitions
 */

export const PARALLAX_CONFIG = {
  // Text offset spacing after "my work"
  TEXT_SPACING: 20, // px

  // Opacity values
  OPACITY: {
    BASE: 0.15,
  },

  // Hero section fade in
  HERO_FADE: {
    START_POINT: 0.4, // % of viewport height
    DURATION: 0.2, // % of viewport height
  },

  // Experience section
  EXPERIENCE: {
    SCROLL_IN_START_OFFSET: 200, // px from bottom of viewport
    FADE_IN_PROGRESS: 0.3, // progress value when fully faded in
    FADE_OUT_START: 1.0, // progress value when fade out starts (immediately when transition begins)
    FADE_OUT_DURATION: 1.0, // progress units (fade out during entire transition)
  },

  // Projects section
  PROJECTS: {
    FADE_IN_START: 1.0, // progress value (start fading in when experiences starts fading out)
    FADE_IN_DURATION: 1.0, // progress units (fade in during entire transition)
    FADE_OUT_START: 2.0, // progress value (immediately when transition begins)
    FADE_OUT_DURATION: 1.0, // progress units (fade out during entire transition)
  },

  // About section
  ABOUT: {
    FADE_IN_START: 2.0, // progress value (start fading in when projects starts fading out)
    FADE_IN_DURATION: 1.0, // progress units (fade in during entire transition)
    FADE_OUT_START: 3.5, // progress value (50% through about section)
    FADE_OUT_END: 3.6, // progress value (60% through about section)
    
    // Container position animation
    CONTAINER: {
      START_POSITION: 50, // % from top (centered)
      END_POSITION: 20, // % from top (higher up)
      SCROLL_DISTANCE: 0.5, // viewport heights to complete the movement
      SCROLL_SPEED: 0.8, // relative to normal scroll (1.0 = same speed)
    },
  },

  // Vertical offset for text movement
  VERTICAL_OFFSET: {
    OFF_SCREEN: 50, // vh units
    ON_SCREEN: 0, // vh units
    OFF_SCREEN_TOP: -50, // vh units
  },

  // Scroll speed for text animations (< 1.0 = slower than normal scroll)
  TEXT_SCROLL_SPEED: 0.6, // 60% of normal scroll speed
} as const;
