/**
 * Icon Mapping System
 * Centralized icon management for the entire application
 * 
 * To add new icons:
 * 1. Create image files with naming convention: icon-{name}.{png/svg}
 * 2. Add them to src/assets/icons/
 * 3. Add the mapping below with the exact filename (without extension)
 * 
 * Example files to add to src/assets/icons/:
 * - icon-home.svg
 * - icon-user.png
 * - icon-heart.svg
 * - icon-settings.png
 * - icon-logout.svg
 * - icon-checkmark.svg
 * - icon-close.svg
 */

type IconFormat = "svg" | "png";

interface IconConfig {
  filename: string;
  format: IconFormat;
  size?: number; // default size in pixels
}

const ICONS_REGISTRY: Record<string, IconConfig> = {
  // Homepage & Navigation
  "home": { filename: "icon-home", format: "svg", size: 24 },
  "user": { filename: "icon-user", format: "svg", size: 24 },
  "heart": { filename: "icon-heart", format: "svg", size: 24 },
  "settings": { filename: "icon-settings", format: "svg", size: 24 },
  "logout": { filename: "icon-logout", format: "svg", size: 20 },
  
  // Forms & Actions
  "checkmark": { filename: "icon-checkmark", format: "svg", size: 20 },
  "close": { filename: "icon-close", format: "svg", size: 20 },
  "arrow-right": { filename: "icon-arrow-right", format: "svg", size: 20 },
  "arrow-left": { filename: "icon-arrow-left", format: "svg", size: 20 },
  
  // Questionnaire
  "progress": { filename: "icon-progress", format: "svg", size: 24 },
  "step": { filename: "icon-step", format: "svg", size: 16 },
  
  // Status
  "success": { filename: "icon-success", format: "svg", size: 24 },
  "error": { filename: "icon-error", format: "svg", size: 24 },
  "warning": { filename: "icon-warning", format: "svg", size: 24 },
  "info": { filename: "icon-info", format: "svg", size: 24 },
};

/**
 * Get icon URL from registry
 * Automatically resolves to /src/assets/icons/ folder
 */
export const getIconUrl = (iconName: string): string => {
  const config = ICONS_REGISTRY[iconName];

  if (!config) {
    console.warn(`Icon "${iconName}" not found in registry. Using fallback.`);
    return "/src/assets/icons/icon-default.svg";
  }

  return `/src/assets/icons/${config.filename}.${config.format}`;
};

/**
 * Get icon size from registry
 */
export const getIconSize = (iconName: string): number => {
  const config = ICONS_REGISTRY[iconName];
  return config?.size || 24;
};

/**
 * Icon component for use in React
 */
export const Icon = ({
  name,
  size = "auto",
  className = "",
  alt = name,
}: {
  name: string;
  size?: string | number;
  className?: string;
  alt?: string;
}) => {
  const url = getIconUrl(name);
  const sizeValue = typeof size === "number" ? `${size}px` : size;

  return (
    <img
      src={url}
      alt={alt}
      className={`icon icon-${name} ${className}`.trim()}
      style={{
        width: sizeValue,
        height: sizeValue,
        display: "inline-block",
      }}
      onError={(e) => {
        console.error(`Failed to load icon: ${name}`);
        e.currentTarget.style.display = "none";
      }}
    />
  );
};

/**
 * Get all available icons (for debugging/admin purposes)
 */
export const getAllIcons = (): string[] => {
  return Object.keys(ICONS_REGISTRY);
};

export default ICONS_REGISTRY;
