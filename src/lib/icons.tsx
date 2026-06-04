import {
  Award,
  BadgeDollarSign,
  Building2,
  Car,
  Clock,
  Cloud,
  Cpu,
  Factory,
  Globe,
  GraduationCap,
  Headphones,
  HeartPulse,
  Landmark,
  Layers,
  Moon,
  Package,
  Plane,
  Radio,
  Shield,
  ShoppingBag,
  Star,
  Stethoscope,
  Store,
  TrendingUp,
  Truck,
  UserCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Award,
  BadgeDollarSign,
  Building2,
  Car,
  Clock,
  Cloud,
  Cpu,
  Factory,
  Globe,
  GraduationCap,
  Headphones,
  HeartPulse,
  Landmark,
  Layers,
  Moon,
  Package,
  Plane,
  Radio,
  Shield,
  ShoppingBag,
  Star,
  Stethoscope,
  Store,
  TrendingUp,
  Truck,
  UserCheck,
  Users,
  Workflow,
};

export function DynamicIcon({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  const Icon = name ? iconMap[name] : null;
  if (!Icon) return null;
  return <Icon className={className} aria-hidden />;
}
