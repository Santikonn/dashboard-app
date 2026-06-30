import Sidebar from "./sidebar";
import { useState, useEffect } from "react";
import MaturityDashboard from "../../pages/MaturityDashboard";
import WfmDashboard from "../../pages/wfmDashboard";
import StaffStatus from "../../pages/StaffStatus";
import Adherence from "../../pages/Adherence";
import AdherenceSummary from "../../pages/AdherenceSummary";
import Header from "../header/header";
import { useMsal } from "@azure/msal-react";
import LoginButton from "../../auth/LoginButton";

import QAForms from "../../components/forms/QAForms"
import FormBuilder from "../../components/formcreation/FormBuilder";
import QAEvaluations from "../../components/evaluations/QAEvaluations";
import NewEvaluation from "../../components/evaluations/NewEvaluation";
import QADashboard from "../../components/quality/dashboard/QADashboard";

import { Toaster } from "sonner";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState("wfm-realtime");
  const [profile, setProfile] = useState(null);

  const { instance } = useMsal();

  const account =
    instance.getActiveAccount() ||
    instance.getAllAccounts()[0];

  // const [collapsed, setCollapsed] = useState(true);
  // const [activeItem, setActiveItem] = useState("qa-forms");
  const [currentView, setCurrentView] = useState("forms");
  const [builderState, setBuilderState] = useState({
    mode: "create",
    publicId: null
  });

  const [evaluationView, setEvaluationView] = useState("list");

  // 🔥 TRAER PERFIL DESDE MICROSOFT GRAPH (AQUÍ ESTÁ EL CARGO REAL)
  useEffect(() => {
    const fetchProfile = async () => {
      if (!account) return;

      const token = await instance.acquireTokenSilent({
        account,
        scopes: ["User.Read"],
      });

      const res = await fetch(
        "https://graph.microsoft.com/v1.0/me",
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        }
      );

      const data = await res.json();
      setProfile(data);
    };

    fetchProfile();
  }, [account, instance]);

  // 🔥 USER FINAL (YA CON CARGO REAL)
  const user = profile
    ? {
        name: profile.displayName,
        email: profile.mail || profile.userPrincipalName,
        tenantId: account?.tenantId,
        cargo: profile.jobTitle || "Sin cargo",
        empresa: profile.companyName || "Sin empresa",
      }
    : null;

  const renderContent = () => {
    switch (activeItem) {
      case "maturity":
        return <MaturityDashboard />;
      
        case "wfm-realtime":
        return <WfmDashboard />;

      case "wfm-staff-status":
        return <StaffStatus />;

      case "wfm-adherence":
        return <Adherence />;

      case "wfm-adherence-summary":
        return <AdherenceSummary />;

      case "qa-forms":

        if (currentView === "builder") {

          return (

            <FormBuilder
              collapsed={collapsed}
              mode={builderState.mode}
              publicId={builderState.publicId}

              onBack={() => {
                setBuilderState({
                  mode: "create",
                  publicId: null
                });
                setCurrentView("forms");
              }}
              onSaved={() => {
                  setBuilderState({
                      mode: "create",
                      publicId: null
                  });
                  setCurrentView("forms");
              }}
            />

          );

        }

        return (

          <QAForms
            onCreate={() => {
              setBuilderState({
                mode: "create",
                publicId: null
              });
              setCurrentView("builder");
            }}

            onEdit={(publicId) => {
              setBuilderState({
                mode: "edit",
                publicId
              });
              setCurrentView("builder");
            }}

            onDuplicate={(publicId)=>{
              setBuilderState({
                  mode: "duplicate",
                  publicId
              });
              setCurrentView("builder");

          }}
          />
        );

      case "qa-evaluations":

        if (evaluationView === "new") {
            return (
                <NewEvaluation
                    onBack={() => {
                        setEvaluationView("list");
                    }}
                />
            );
        }
        return (
            <QAEvaluations
                onCreate={() => {
                    setEvaluationView("new");
                }}
            />
        );

      case "qa-dashboard":
        return <QADashboard />;

      default:
        return <WfmDashboard />;
    }
  };

  // if (!user) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       <LoginButton />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-background">

      <Toaster
        richColors
        position="top-right"
        duration={3000}
      />

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      <div
        className={`
          flex flex-col min-h-screen
          transition-all duration-300 ease-in-out
          ${collapsed ? "ml-[72px]" : "ml-[256px]"}
        `}
      >
        {/* <Header user={user} /> */}

        <main className="p-3 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}