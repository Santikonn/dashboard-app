export const buildLeaders = (agents) => {
  const grouped = {};

  agents.forEach((a) => {
    const leader = a.leader || "Unknown";

    if (!grouped[leader]) {
      grouped[leader] = {
        leader,
        expected: 0,
        correct: 0,
        wrong: 0,
        connected: 0,
        absent: 0,
        LunchBreak: 0,
        ClassTraining: 0,
        other: 0,
        agents: []
      };
    }

    const g = grouped[leader];

    if (a.scheduled_activity !== null && a.scheduled_activity !== 'Off' && a.scheduled_activity !== 'Closed') {
      g.expected += 1;
      
      if (a.match === 1) g.correct += 1;
      if (a.match === 0 && a.real_status !== null) g.wrong += 1;
    }


    const status = a.real_status;

    if (["Voyce_support", "Available", "On Call", "Other: I"].includes(status)) {
      g.connected += 1;
    } else if (status === null || status === "OffWork") {
      g.absent += 1;
    } else if (status === "Lunch Break") {
      g.LunchBreak += 1;
    } else if (status === "Class/Education") {
      g.ClassTraining += 1;
    } else {
      g.other += 1;
    }

    // 🔥 🔥 AGENT GROUPING
    const agentId = a.agent_id;

    if (!g.agents[agentId]) {
      g.agents[agentId] = {
        id: agentId,
        name: a.agent_name,
        expected: 0,
        correct: 0,
        wrong: 0,
        connected: 0,
        absent: 0,
        LunchBreak: 0,
        ClassTraining: 0,
        other: 0,
        bucket: a.scheduled_activity || "Review Schedule",
        needs_review: !a.scheduled_activity,
      };
    }

    const ag = g.agents[agentId];

    // 🔹 AGENT METRICS (MISMA LÓGICA)
    if (a.scheduled_activity !== null && a.scheduled_activity !== 'Off' && a.scheduled_activity !== 'Closed') {
      ag.expected += 1;

      if (a.match === 1) ag.correct += 1;
      if (a.match === 0 && a.real_status !== null) ag.wrong += 1;
    }
    // ag.expected += 1;

    if (["Voyce_support", "Available", "On Call", "Other: I"].includes(status)) {
      ag.connected += 1;
    } else if (status === null || status === "OffWork") {
      ag.absent += 1;
    } else if (status === "Lunch Break") {
      ag.LunchBreak += 1;
    } else if (status === "Class/Education") {
      ag.ClassTraining += 1;
    } else {
      ag.other += 1;
    }
  });

  return Object.values(grouped).map((g) => {
    const total = g.expected || 0;

    const absentRate = total ? g.absent / total : 0;
    const wrongRate = total ? g.wrong / total : 0;

    let severity = "HEALTHY";

    if (g.expected === 0) {
      severity = "UNEXPECTED";
    } else if (absentRate >= 0.25 || wrongRate >= 0.25) {
      severity = "CRITICAL";
    } else if (absentRate >= 0.10 || wrongRate >= 0.10) {
      severity = "WARNING";
    }

    // 🔥 AGENTS ARRAY + CALCULOS
    const agentsArray = Object.values(g.agents).map((ag) => {
      const total = ag.expected || 0;

      const absentRate = total ? ag.absent / total : 0;
      const wrongRate = total ? ag.wrong / total : 0;

      let severity = "HEALTHY";

      if (ag.correct === 0 && ag.wrong === 0 && ag.absent === 0) {
        severity = "UNEXPECTED";
      } else if (absentRate >= 0.25 || wrongRate >= 0.25) {
        severity = "CRITICAL";
      } else if (absentRate >= 0.10 || wrongRate >= 0.10) {
        severity = "WARNING";
      }

      return {
        ...ag,
        compliance: total
          ? ((ag.correct / total) * 100).toFixed(1)
          : 0,
        severity
      };
    });

    return {
      ...g,
      agents: agentsArray,
      compliance: total
        ? ((g.correct / total) * 100).toFixed(1)
        : 0,
      severity
    };
  });
};

export const buildKPIs = (agents) => {
  const kpi = {
    expected: 0,
    correct: 0,
    connected: 0,
    absent: 0,
    LunchBreak: 0,
    ClassTraining: 0,
    other: 0,
    compliance: 0,
    delta: 0,
    connect_sch: 0,
    absent_sch: 0,
    LunchBreak_sch: 0,
    ClassTraining_sch: 0,
    other_sch: 0,
    delta_connect: 0,
    delta_absent: 0,
    delta_LunchBreak: 0,
    delta_ClassTraining: 0,
    delta_other: 0,
    connect_ws: 0
  };

  agents.forEach((a) => {
    if (a.scheduled_activity !== null && a.scheduled_activity !== 'Off' && a.scheduled_activity !== 'Closed') {
      kpi.expected += 1;
    }

    if (a.match === 1) kpi.correct += 1;

    const status = a.real_status;
    const schedule = a.scheduled_activity;

    if ([null, 'Off', 'Closed'].includes(schedule)) {      
      kpi.compliance += 1;
      if (["Voyce_support", "Available", "On Call", "Other: I"].includes(status)) {
        kpi.connect_ws += 1;
      }
    } else if (["Voyce_support", "Available", "On Call", "Other: I"].includes(status)) {
      kpi.connected += 1;
    } else if (status === null || status === "OffWork") {
      kpi.absent += 1;
    } else if (status === "Lunch Break") {
      kpi.LunchBreak += 1;
    } else if (status === "Class/Education") {
      kpi.ClassTraining += 1;
    } else {
      kpi.other += 1;
    }

    kpi.delta = kpi.connected + kpi.LunchBreak + kpi.ClassTraining + kpi.other + kpi.compliance - kpi.expected;

    if (["Voyce Support", "BPO - Extra Hours", "Open", "Extra Hours"].includes(schedule)) {
      kpi.connect_sch += 1;
    } else if (["Absent without Coverage", "Time Off with Coverage"].includes(schedule)) {
      kpi.absent_sch += 1;
    } else if (["Lunch", "Break"].includes(schedule)) {
      kpi.LunchBreak_sch += 1;
    } else if (["Training", "Coaching"].includes(schedule)) {
      kpi.ClassTraining_sch += 1;
    } else if (["Team Meeting"].includes(schedule)) {
      kpi.other_sch += 1;
    }

    kpi.delta_connect = kpi.connected - kpi.connect_sch;
    kpi.delta_absent = kpi.absent - kpi.absent_sch;
    kpi.delta_LunchBreak = kpi.LunchBreak - kpi.LunchBreak_sch;
    kpi.delta_ClassTraining = kpi.ClassTraining - kpi.ClassTraining_sch;
    kpi.delta_other = kpi.other - kpi.other_sch;
    
  });
  
  // const total = kpi.expected || 0;

  // kpi.compliance = total
  //   ? ((kpi.correct / total) * 100).toFixed(1) + "%"
  //   : 0 + "%";

  return kpi;
};