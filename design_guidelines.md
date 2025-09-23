# The Chola Citadel Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium data visualization platforms like Mapbox, premium weather applications, and ocean research interfaces. The design emphasizes sophisticated data presentation with a premium, professional aesthetic.

## Core Design Elements

### A. Color Palette
**Primary Colors (Dark Mode Focus)**:
- Deep Ocean Base: `220 25% 8%` (primary background)
- Ocean Depth: `215 30% 12%` (secondary backgrounds)
- Seafoam Accent: `180 45% 65%` (primary interactive elements)
- Coral Warning: `15 85% 60%` (alerts and critical data)
- Pearl White: `210 15% 95%` (primary text)
- Ocean Mist: `210 20% 70%` (secondary text)

**Gradient Treatments**:
- Hero gradients: Deep ocean blues transitioning to darker depths
- Card overlays: Subtle seafoam to transparent gradients
- Status indicators: Ocean to coral gradients for severity levels

### B. Typography
- **Primary**: Inter (Google Fonts) - Clean, technical readability
- **Accent**: Outfit (Google Fonts) - Modern geometric for headings
- **Hierarchy**: Bold headings (24-32px), body text (16px), captions (14px)

### C. Layout System
**Tailwind Spacing**: Primary units of 4, 8, 16, and 24 for consistent rhythm
- Container padding: `p-8`
- Component spacing: `gap-4` and `gap-8`
- Section margins: `mb-16` and `mt-24`

### D. Component Library

**Navigation**: 
- Animated CardNav with GSAP-powered transitions
- Semi-transparent background with blur effects
- Seafoam accent for active states

**Data Display**:
- Premium cards with subtle ocean-themed gradients
- Interactive map components with custom markers
- Status indicators using color-coded severity levels

**Forms**:
- Dark-themed inputs with seafoam focus states
- Multi-step reporting interface with progress indicators
- Floating labels and smooth transitions

**Interactive Elements**:
- Custom WebGL Silk background animation
- SplitText animations for dynamic content reveals
- VariableProximity effects for enhanced interactivity

### E. Visual Treatments

**Background Effects**:
- Custom WebGL shader for homepage Silk animation
- Subtle particle effects suggesting ocean movement
- Gradient overlays maintaining readability

**Card Design**:
- Frosted glass effects with subtle transparency
- Ocean-depth shadows and border treatments
- Hover states with gentle seafoam glows

**Data Visualization**:
- Ocean-themed color coding for hazard severity
- Interactive map markers with custom icons
- Smooth transitions between data states

## Special Considerations

**Premium Feel**: 
- Generous whitespace and breathing room
- Subtle micro-interactions throughout
- Professional color restraint avoiding garish combinations

**Accessibility**:
- High contrast ratios maintained in dark theme
- Color-blind friendly status indicators
- Clear focus states for all interactive elements

**Performance**:
- Optimized WebGL animations that don't interfere with usability
- Smooth transitions using GSAP for professional polish
- Efficient rendering of complex data visualizations

## Images
No large hero images are used. Instead, the homepage features a custom WebGL Silk animation background. Ocean-themed icons from Heroicons will be used throughout for hazard types, navigation, and status indicators. The focus is on data visualization and interactive elements rather than decorative imagery.