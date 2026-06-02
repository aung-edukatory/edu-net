import {
  ArrowRight,
  BriefcaseBusiness,
  BookOpen,
  Building2,
  Camera,
  CalendarCheck,
  CalendarDays,
  Clock3,
  Globe2,
  Landmark,
  LifeBuoy,
  Mail,
  MapPin,
  MessageCircleQuestionMark,
  Phone,
  SearchCheck,
  Send,
  TrendingUp,
  UserRound,
  Users,
  UsersRound,
  UserPlus,
} from "lucide-react";

import type { IconKind } from "./types";

const iconMap = {
  arrow: ArrowRight,
  briefcase: BriefcaseBusiness,
  books: BookOpen,
  camera: Camera,
  calendar: CalendarDays,
  calendarCheck: CalendarCheck,
  campus: Building2,
  clock: Clock3,
  faq: MessageCircleQuestionMark,
  globe: Globe2,
  growth: TrendingUp,
  institution: Landmark,
  mail: Mail,
  phone: Phone,
  pin: MapPin,
  research: SearchCheck,
  send: Send,
  support: LifeBuoy,
  user: UserRound,
  users: Users,
  usersRound: UsersRound,
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
