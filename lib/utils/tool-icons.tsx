import React from "react";
import { Bell, Info } from "lucide-react";

export interface IconProps {
  size?: number;
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
}

// Category-specific icons with colors
export interface IconConfig {
  icon: React.ComponentType<IconProps> | string;
  bgColor: string;
  iconColor: string;
  isImage?: boolean;
}

// Simplified icons from GAIA
export const CheckmarkCircle02Icon: React.FC<IconProps> = (props) => (
  <svg
    color={"#9b9b9b"}
    fill={"none"}
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 12.75C8 12.75 9.6 13.6625 10.4 15C10.4 15 12.8 9.75 16 8"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const FileEmpty02Icon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M20 12.1818V7.81818C20 6.12494 20 5.27832 19.732 4.60214C19.3012 3.5151 18.3902 2.65765 17.2352 2.2522C16.5168 2 15.6173 2 13.8182 2C10.6698 2 9.09563 2 7.83836 2.44135C5.81714 3.15089 4.22281 4.65142 3.46894 6.55375C3 7.73706 3 9.21865 3 12.1818V14.7273C3 17.7966 3 19.3313 3.8477 20.3971C3.99474 20.5885 4.15869 20.7657 4.33889 20.9263C5.36225 21.8537 6.93851 21.9814 10.0909 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 12C3 10.159 4.49238 8.66667 6.33333 8.66667C6.99912 8.66667 7.78404 8.78333 8.43137 8.60988C9.00652 8.45576 9.45576 8.00652 9.60988 7.43136C9.78333 6.78404 9.66667 5.99912 9.66667 5.33333C9.66667 3.49238 11.1591 2 13 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 19C13 17.1144 13 16.1716 13.5858 15.5858C14.1716 15 15.1144 15 17 15C18.8856 15 19.8284 15 20.4142 15.5858C21 16.1716 21 17.1144 21 19C21 20.8856 21 21.8284 20.4142 22.4142C19.8284 23 18.8856 23 17 23C15.1144 23 14.1716 23 13.5858 22.4142C13 21.8284 13 20.8856 13 19Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export const SourceCodeCircleIcon: React.FC<IconProps> = (props) => (
  <svg
    color={"#9b9b9b"}
    fill={"none"}
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M9 14L7 12L9 10M15 10L17 12L15 14M13 9L11 15"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const Brain02Icon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M7 14.5C5.5 14.5 4.4 13.4 4.4 12C4.4 10.6 5.5 9.5 7 9.5M7 14.5C8.5 14.5 9.6 13.4 9.6 12C9.6 10.6 8.5 9.5 7 9.5M7 14.5C7 17 7 19.5 7 20.8C7 21.4627 7.53726 22 8.2 22H8.6C9.26274 22 9.8 21.4627 9.8 20.8V20M7 9.5C7 7 7 4.5 7 3.2C7 2.53726 7.53726 2 8.2 2H8.6C9.26274 2 9.8 2.53726 9.8 3.2V4M17 14.5C18.5 14.5 19.6 13.4 19.6 12C19.6 10.6 18.5 9.5 17 9.5M17 14.5C15.5 14.5 14.4 13.4 14.4 12C14.4 10.6 15.5 9.5 17 9.5M17 14.5C17 17 17 19.5 17 20.8C17 21.4627 16.4627 22 15.8 22H15.4C14.7373 22 14.2 21.4627 14.2 20.8V20M17 9.5C17 7 17 4.5 17 3.2C17 2.53726 16.4627 2 15.8 2H15.4C14.7373 2 14.2 2.53726 14.2 3.2V4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.8 8C9.8 6.7 10.85 5.65 12.15 5.65C13.45 5.65 14.2 6.7 14.2 8M9.8 16C9.8 17.3 10.85 18.35 12.15 18.35C13.45 18.35 14.2 17.3 14.2 16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Image02Icon: React.FC<IconProps> = (props) => (
  <svg
    color={"#9b9b9b"}
    fill={"none"}
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13 3.00231C12.5299 3 12.0307 3 11.5 3C7.02166 3 4.78249 3 3.39124 4.39124C2 5.78249 2 8.02166 2 12.5C2 16.9783 2 19.2175 3.39124 20.6088C4.78249 22 7.02166 22 11.5 22C15.9783 22 18.2175 22 19.6088 20.6088C21 19.2175 21 16.9783 21 12.5C21 12.0307 21 11.5299 20.9977 11.0598"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
    <path
      d="M2 14.1354C2.61902 14.0455 3.24484 14.0011 3.87171 14.0027C6.52365 13.9466 9.11064 14.7729 11.1711 16.3342C13.082 17.7821 14.4247 19.7749 15 22"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M17 4.5C17.4915 3.9943 18.7998 2 19.5 2M22 4.5C21.5085 3.9943 20.2002 2 19.5 2M19.5 2V10"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const Target02Icon: React.FC<IconProps> = (props) => (
  <svg
    color={"#9b9b9b"}
    fill={"none"}
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M4 12C4 7.58172 7.58172 4 12 4M20 12C20 7.58172 16.4183 4 12 4M12 4V2M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

// Tool category icon configs
const iconConfigs: Record<string, IconConfig> = {
  productivity: {
    icon: CheckmarkCircle02Icon,
    bgColor: "bg-emerald-500/20 backdrop-blur",
    iconColor: "text-emerald-400",
  },
  documents: {
    icon: FileEmpty02Icon,
    bgColor: "bg-orange-500/20 backdrop-blur",
    iconColor: "text-orange-400",
  },
  development: {
    icon: SourceCodeCircleIcon,
    bgColor: "bg-cyan-500/20 backdrop-blur",
    iconColor: "text-cyan-400",
  },
  memory: {
    icon: Brain02Icon,
    bgColor: "bg-indigo-500/20 backdrop-blur",
    iconColor: "text-indigo-400",
  },
  creative: {
    icon: Image02Icon,
    bgColor: "bg-pink-500/20 backdrop-blur",
    iconColor: "text-pink-400",
  },
  goal_tracking: {
    icon: Target02Icon,
    bgColor: "bg-emerald-500/20 backdrop-blur",
    iconColor: "text-emerald-400",
  },
  notifications: {
    icon: Bell,
    bgColor: "bg-yellow-500/20 backdrop-blur",
    iconColor: "text-yellow-400",
  },
  support: {
    icon: Info,
    bgColor: "bg-blue-500/20 backdrop-blur",
    iconColor: "text-blue-400",
  },
  general: {
    icon: Info,
    bgColor: "bg-gray-500/20 backdrop-blur",
    iconColor: "text-gray-400",
  },
};

export const getToolCategoryIcon = (
  category: string,
  iconProps: Partial<IconProps> & { showBackground?: boolean } = {}
) => {
  const { showBackground = true, ...restProps } = iconProps;

  const defaultProps = {
    size: restProps.size || 16,
    width: restProps.width || 20,
    height: restProps.height || 20,
    strokeWidth: restProps.strokeWidth || 2,
    className: restProps.className,
  };

  const config = iconConfigs[category];
  if (!config) return null;

  const IconComponent = config.icon as React.ComponentType<IconProps>;
  const iconElement = (
    <IconComponent
      {...defaultProps}
      className={restProps.className || config.iconColor}
    />
  );

  // Return with or without background based on showBackground prop
  return showBackground ? (
    <div className={`rounded-lg p-1 ${config.bgColor}`}>{iconElement}</div>
  ) : (
    iconElement
  );
};

// Format tool names from snake_case to Title Case
export const formatToolName = (name: string): string => {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
