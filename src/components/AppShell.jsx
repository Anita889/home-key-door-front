import { Outlet, useLocation } from "react-router-dom";
import { NavSidebar } from "./NavSidebar.jsx";
import { PageHero } from "./PageHero.jsx";
import { ResultPanel } from "./ResultPanel.jsx";
import { useRequestRunner } from "../hooks/useRequestRunner.js";
import { ROUTE_META } from "../config/navigation.js";

export function AppShell() {
  const location = useLocation();
  const requestRunner = useRequestRunner();
  const routeMeta = ROUTE_META[location.pathname] || ROUTE_META.default;

  return (
    <div className="shell">
      <NavSidebar />

      <main className="main">
        <PageHero
          title={routeMeta.title}
          description={routeMeta.description}
          highlights={routeMeta.highlights}
          busy={requestRunner.busy}
        />

        <Outlet context={requestRunner} />
        <ResultPanel result={requestRunner.result} />
      </main>
    </div>
  );
}
