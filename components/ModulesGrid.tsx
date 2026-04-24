import DashboardCard from "./DashboardCard";

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface Props {
  menuItems: MenuItem[];
}

export default function ModulesGrid({ menuItems }: Props) {
  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-primary">Painel inicial</h2>
        <p className="text-gray-600 mt-2">
          Sistema de Instrução Processual (SIP+360º)
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.title}
            icon={item.icon}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
}
