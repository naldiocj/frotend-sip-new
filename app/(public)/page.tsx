import { HeaderNav } from "@/components/header-nav";
import WelcomeLayout from "@/components/layouts/welcome-layout";
import { menuItems } from "@/components/menuData";
import ModulesGrid from "@/components/ModulesGrid";
import WelcomeSection from "@/components/WelcomeSection";

export default function page() {
  return (
    <>
      <HeaderNav />
      <WelcomeLayout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <WelcomeSection />
          <ModulesGrid menuItems={menuItems} />
        </div>
      </WelcomeLayout>
    </>
  );
}
