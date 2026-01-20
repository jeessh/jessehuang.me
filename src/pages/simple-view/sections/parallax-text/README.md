# Parallax Text Configuration

All animation values and timing parameters are now centralized in `config.ts`.

## Quick Reference

### Modifying Animation Timing
- **Hero fade in**: `PARALLAX_CONFIG.HERO_FADE`
- **Experience transitions**: `PARALLAX_CONFIG.EXPERIENCE`
- **Projects transitions**: `PARALLAX_CONFIG.PROJECTS`
- **About transitions**: `PARALLAX_CONFIG.ABOUT`

### Adjusting Text Movement
- **Scroll speed in About section**: `ABOUT.CONTAINER.SCROLL_SPEED` (currently 0.8 = 80% speed)
- **Start/end positions**: `ABOUT.CONTAINER.START_POSITION` and `END_POSITION`
- **Distance to complete movement**: `ABOUT.CONTAINER.SCROLL_DISTANCE` (in viewport heights)

### Changing Opacity
- All text opacity is controlled by `PARALLAX_CONFIG.OPACITY.BASE` (currently 0.15)

### Text Offsets
- Vertical movement distances: `PARALLAX_CONFIG.VERTICAL_OFFSET`
- Horizontal spacing: `PARALLAX_CONFIG.TEXT_SPACING`
