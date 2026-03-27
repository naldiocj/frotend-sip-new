import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCardIcon, UserIcon } from "lucide-react";

interface iAppProps {
  setOpen: (state: boolean) => void;
  open: boolean;
}

export function DocumentosDropdown({ setOpen, open }: iAppProps) {
  return (
    <div className="flex items-center justify-center">
      <DropdownMenu onOpenChange={setOpen} open={open}>
        <DropdownMenuTrigger></DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 absolute -top-6 left-4"
          align="start"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex items-center gap-2 py-2">
              Documentos
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserIcon aria-hidden="true" />
                Registar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <CreditCardIcon aria-hidden="true" />
                Carregar
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
