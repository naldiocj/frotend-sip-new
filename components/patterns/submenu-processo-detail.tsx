"use client";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { INSTRUTOR_PATHS } from "@/lib/path";
import { toUrl } from "@/lib/utils";
import {
  ChevronRightIcon,
  CreditCardIcon,
  Files,
  LayoutDashboard,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { DocumentosDropdown } from "./documentos-dropdown";

export function SubmenuProcessoDetail() {
  const [dropdownParticipantes, setDropdownParticipantes] = useState(false);
  const [dropdownDocumentos, setDropdownDocumentos] = useState(false);

  const params = useParams();
  const id = String(params.id);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      <ItemGroup className="gap-0">
        <Item asChild size="xs">
          <Link href={toUrl(INSTRUTOR_PATHS.PROCESSOS_RESUMO, id)}>
            <ItemMedia variant="icon">
              <LayoutDashboard />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Resumo</ItemTitle>
            </ItemContent>
          </Link>
        </Item>
        <Separator />
        <Item asChild size="xs">
          <Link href={toUrl(INSTRUTOR_PATHS.PROCESSOS_DILIGENCIAS, id)}>
            <ItemMedia variant="icon">
              <CreditCardIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Diligências</ItemTitle>
            </ItemContent>
          </Link>
        </Item>
        <Separator />
        <Item asChild size="xs">
          <Link href={toUrl(INSTRUTOR_PATHS.PROCESSOS_PARTICIPANTES, id)}>
            <ItemMedia variant="icon">
              <UsersRound />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Participantes</ItemTitle>
            </ItemContent>
          </Link>
        </Item>
        <Separator />
        <Item asChild size="xs">
          <div onClick={() => setDropdownDocumentos(!dropdownDocumentos)}>
            <ItemMedia variant="icon">
              <Files />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Documentos</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="text-muted-foreground size-4" />
            </ItemActions>
            <DocumentosDropdown
              setOpen={setDropdownDocumentos}
              open={dropdownDocumentos}
            />
          </div>
        </Item>
      </ItemGroup>
    </div>
  );
}
