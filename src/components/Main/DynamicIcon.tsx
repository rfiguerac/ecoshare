import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

// Filtramos el tipo: solo componentes de iconos
type IconComponent = ComponentType<LucideProps>;
type IconName = keyof typeof Icons;

// Componente para renderizar iconos dinámicos
interface DynamicIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const DynamicIcon = ({ name, size = 24, color = "currentColor" }: DynamicIconProps) => {
  const Icon = Icons[name] as IconComponent;
  if (!Icon) return null;
  return <Icon size={size} color={color} />;
};