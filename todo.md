Título: Desenvolvimento de DataGrid Avançado com TanStack Table v8 e Shadcn/UI

Contexto:
Preciso criar um componente de listagem completo para um sistema de gestão (SIP). O objetivo é ter uma tabela robusta, performática e com visual moderno (estilo Dashboard administrativo).

Tecnologias:

React com TypeScript

TanStack Table v8 (@tanstack/react-table)

Shadcn/UI (Componentes: Table, Button, Input, DropdownMenu, Checkbox, Badge, Skeleton)

Lucide React (Ícones)

Funcionalidades Obrigatórias:

Header Interativo:

Barra de busca global com ícone de lupa.

Botão de "Filtros" que abre um Popover com opções específicas.

Botão "View" (Data Table Column Visibility) para o usuário marcar/desmarcar quais colunas deseja ver.

Core DataGrid:

Ordenação: Clique no cabeçalho das colunas para ordenar (asc/desc).

Seleção: Checkbox na primeira coluna para seleção múltipla e checkbox no header para "Selecionar Tudo".

Estados de Célula: Uso de Badges coloridos para status (ex: "Pendente" em amarelo, "Concluído" em verde).

Coluna de Ações: Última coluna fixa com um DropdownMenu contendo: "Visualizar", "Editar" e "Eliminar" (este último com cor de destaque 'destructive').

Paginação Completa:

Controles de: Próximo, Anterior, Primeira e Última página.

Seletor de "Linhas por página" (ex: 10, 20, 50).

Indicador de "Página X de Y" e "N linhas selecionadas".

Layout e Estética:

Design limpo com bordas suaves e efeito de hover nas linhas.

Tratamento de Loading State usando Skeleton animado que simula o formato das linhas da tabela.

Mensagem customizada de "Nenhum resultado encontrado" com ícone de busca vazia.

Estrutura do Código:

Separe a definição das colunas (columns.tsx) do componente principal da tabela (data-table.tsx).

Garanta que o componente seja genérico (DataTableProps<TData, TValue>) para que eu possa reutilizá-lo em outras telas (Usuários, Processos, etc.).
