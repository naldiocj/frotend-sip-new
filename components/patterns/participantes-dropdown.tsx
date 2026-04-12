"use client";

import { AddAdvogadoModal } from "@/app/(admin)/instrutor/processos/[id]/participantes/_modals/add-advogado-modal";
import { AddArguidoModal } from "@/app/(admin)/instrutor/processos/[id]/participantes/_modals/add-arguido-modal";
import { AddQueixosoModal } from "@/app/(admin)/instrutor/processos/[id]/participantes/_modals/add-queixoso-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BriefcaseBusiness,
  ChevronDown,
  CirclePlus,
  Eye,
  Gavel,
  Scale,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export function ParticipantesDropdown() {
  const [openQueixosoModal, setQueixosoModal] = useState(false);
  const [openArguidoModal, setArguidoModal] = useState(false);
  const [openAdvogadoModal, setAdvogadoModal] = useState(false);

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <CirclePlus />
            Registar <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-5" align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex items-center gap-2 py-2">
              Participantes
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem></DropdownMenuItem>
              <DropdownMenuItem onClick={() => setQueixosoModal(true)}>
                <UserRound aria-hidden="true" />
                Queixoso
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setArguidoModal(true)}>
                <Gavel aria-hidden="true" />
                Arguidos
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Scale aria-hidden="true" />
                Magistrados
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setAdvogadoModal(true)}>
                  <BriefcaseBusiness aria-hidden="true" />
                  Advogados
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye aria-hidden="true" />
                  Testemunhas
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modals */}
      <AddQueixosoModal open={openQueixosoModal} setOpen={setQueixosoModal} />
      <AddArguidoModal open={openArguidoModal} setOpen={setArguidoModal} />
      <AddAdvogadoModal open={openAdvogadoModal} setOpen={setAdvogadoModal} />
    </div>
  );
}
