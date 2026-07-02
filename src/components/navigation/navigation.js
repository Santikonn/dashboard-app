// components/navigation/navigation.js

import {
  LayoutDashboard,
  Target,
  Users,
  BarChart3,
  DollarSign,
  Radio,
  BookOpen,
  MessageSquare,
  Brain,
  Bot,
  BadgeCheck
} from "lucide-react";

export const navigation = [  
  { key: "maturity", name: "Maturity & Health", icon: Target },
  
  { key: "workforce", name: "Workforce Intelligence", icon: Users,
    children: [
      { key: "wfm-realtime", name: "Real Time Report" },
      { key: "wfm-staff-status", name: "Staff Status" },
      { key: "wfm-adherence", name: "Adherence" },
      { key: "wfm-adherence-summary", name: "Adherence Summary" },
    ]
  },

  // { key: "quality", name: "Quality Assurance", icon: BadgeCheck,
  //   children: [
  //     { key: "qa-forms", name: "QA Forms" },
  //     { key: "qa-evaluations", name: "Evaluations" },
  //     { key: "qa-dashboard", name: "QA Dashboard" }
  //   ]
  // }
];