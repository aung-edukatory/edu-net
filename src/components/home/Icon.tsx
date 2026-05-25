import {
  ArrowRight,
  BriefcaseBusiness,
  BookOpen,
  Building2,
  Camera,
  Clock3,
  Globe2,
  LifeBuoy,
  Mail,
  MapPin,
  Phone,
  SearchCheck,
  TrendingUp,
  Users,
  UserPlus,
} from "lucide-react";

import type { IconKind } from "./types";

const iconMap = {
  arrow: ArrowRight,
  briefcase: BriefcaseBusiness,
  books: BookOpen,
  camera: Camera,
  campus: Building2,
  clock: Clock3,
  globe: Globe2,
  growth: TrendingUp,
  mail: Mail,
  phone: Phone,
  pin: MapPin,
  research: SearchCheck,
  support: LifeBuoy,
  users: Users,
  userPlus: UserPlus,
} as const satisfies Record<IconKind, typeof ArrowRight>;

export default function Icon({
  kind,
  className = "h-5 w-5",
}: {
  kind: IconKind;
  className?: string;
}) {
  const LucideIcon = iconMap[kind];

  return (
    <LucideIcon className={className} strokeWidth={1.8} aria-hidden="true" />
  );
}
