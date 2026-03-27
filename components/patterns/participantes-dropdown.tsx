"use client";

import { AddQueixoModal } from "@/app/(admin)/instrutor/processos/[id]/participantes/_modals/add-queixoso-modal";
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

  return (
    <div className="flex items-center justify-center mb-4">
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
              <DropdownMenuItem>
                <Gavel aria-hidden="true" />
                Arguidos
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Scale aria-hidden="true" />
                Magistrados
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
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
      <AddQueixoModal open={openQueixosoModal} setOpen={setQueixosoModal} />
    </div>
  );
}
