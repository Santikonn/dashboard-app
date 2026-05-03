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
  Bot
} from "lucide-react";

export const navigation = [  
  // { key: "maturity", name: "Maturity & Health", icon: Target },
  { key: "workforce", name: "Workforce Intelligence", icon: Users,
    children: [
      { key: "wfm-realtime", name: "Real Time Report" },
      { key: "wfm-staff-status", name: "Staff Status" },
      { key: "wfm-adherence", name: "Adherence" },
      { key: "wfm-adherence-summary", name: "Adherence Summary" },
    ]
  },
  // { key: "overview", name: "Overview", icon: LayoutDashboard },
  // { key: "operations", name: "Operational Analytics", icon: BarChart3 },
  // { key: "financial", name: "Financial Intelligence", icon: DollarSign },
  // { key: "command", name: "Command Center", icon: Radio },
  // { key: "knowledge", name: "Knowledge & Guidance", icon: BookOpen },
  // { key: "coaching", name: "Coaching Effectiveness", icon: MessageSquare },
  // { key: "predictive", name: "Predictive Intelligence", icon: Brain },
  // { key: "ai", name: "AI Agents", icon: Bot },
];