type IconFormat = "svg" | "png";

interface IconConfig {
  filename: string;
  format: IconFormat;
  size?: number;
}

const ICONS_REGISTRY: Record<string, IconConfig> = {
  "home": { filename: "icon-home", format: "svg", size: 24 },
  "user": { filename: "icon-user", format: "svg", size: 24 },
  "heart": { filename: "icon-heart", format: "svg", size: 24 },
  "settings": { filename: "icon-settings", format: "svg", size: 24 },
  "logout": { filename: "icon-logout", format: "svg", size: 20 },
  "checkmark": { filename: "icon-checkmark", format: "svg", size: 20 },
  "close": { filename: "icon-close", format: "svg", size: 20 },
  "arrow-right": { filename: "icon-arrow-right", format: "svg", size: 20 },
  "arrow-left": { filename: "icon-arrow-left", format: "svg", size: 20 },
  "progress": { filename: "icon-progress", format: "svg", size: 24 },
  "step": { filename: "icon-step", format: "svg", size: 16 },
  "success": { filename: "icon-success", format: "svg", size: 24 },
  "error": { filename: "icon-error", format: "svg", size: 24 },
  "warning": { filename: "icon-warning", format: "svg", size: 24 },
  "info": { filename: "icon-info", format: "svg", size: 24 },
};

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
