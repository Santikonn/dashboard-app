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

    g.expected += 1;

    if (a.match === 1) g.correct += 1;
    if (a.match === 0 && a.real_status !== null) g.wrong += 1;

    const status = a.real_status;

    if (["Voyce_support", "Available", "On Call"].includes(status)) {
      g.connected += 1;
    } else if (status === null) {
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
    ag.expected += 1;

    if (a.match === 1) ag.correct += 1;
    if (a.match === 0 && a.real_status !== null) ag.wrong += 1;

    if (["Voyce_support", "Available", "On Call"].includes(status)) {
      ag.connected += 1;
    } else if (status === null) {
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

    if (absentRate >= 0.25 || wrongRate >= 0.25) {
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

      if (absentRate >= 0.25 || wrongRate >= 0.25) {
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
    other: 0
  };

  agents.forEach((a) => {
    kpi.expected += 1;

    if (a.match === 1) kpi.correct += 1;

    const status = a.real_status;

    if (["Voyce_support", "Available", "On Call"].includes(status)) {
      kpi.connected += 1;
    } else if (status === null) {
      kpi.absent += 1;
    } else if (status === "Lunch Break") {
      kpi.LunchBreak += 1;
    } else if (status === "Class/Education") {
      kpi.ClassTraining += 1;
    } else {
      kpi.other += 1;
    }
  });
  
  const total = kpi.expected || 0;

  kpi.compliance = total
    ? ((kpi.correct / total) * 100).toFixed(1) + "%"
    : 0 + "%";

  return kpi;
};