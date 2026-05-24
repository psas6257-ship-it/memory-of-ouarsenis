import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

export function ConfirmDelete({ onConfirm, trigger, title, body }: {
  onConfirm: () => void;
  trigger?: ReactNode;
  title?: string;
  body?: string;
}) {
  const { t } = useTranslation();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger ?? (
          <button className="h-7 w-7 rounded-lg bg-red-500/10 text-red-300 grid place-items-center hover:bg-red-500/20">
            <Trash2 className="h-3 w-3" />
          </button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || t("admin.confirmDeleteTitle")}</AlertDialogTitle>
          <AlertDialogDescription>{body || t("admin.confirmDeleteBody")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-500 text-white hover:bg-red-600">
            {t("common.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
