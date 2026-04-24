export default function WelcomeSection() {
  return (
    <div className="relative flex justify-start items-center">
      {/* Removed the blue gradient circles that were causing the blue dot */}
      <div className="relative space-y-6 max-w-xl">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 text-primary">
          <span className="w-2 h-2 rounded-full bg-primary mr-2" />
          Serviço de Investigação Criminal.
        </div>
        <h1 className="text-4xl font-bold text-primary leading-tight">
          Sistema de Instrução Processual
        </h1>
        <p className="text-gray-600 text-lg">
          Gestão estruturada de processos, diligências, documentos legais e
          fluxos auditáveis para perícias, instrução e secretaria.
        </p>
      </div>
    </div>
  );
}
