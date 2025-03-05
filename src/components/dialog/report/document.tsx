/** @format */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NotepadText } from "lucide-react";
import Link from "next/link";

export function DocumentDialog(props: { btn: any; orderId: string }) {
  const { btn, orderId } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{btn}</DialogTrigger>
      <DialogContent className="dialog-container dialog-md">
        <DialogHeader>
          <DialogTitle className="text-center">เอกสาร</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* content */}
        <section className="space-y-2">
          <Button className="w-full" asChild>
            <Link href={`/document/receipt/${orderId}`}>
              <NotepadText /> ใบเสนอราคา / ใบเสร็จรับเงิน
            </Link>
          </Button>
          <Button className="w-full" asChild>
            <Link href={`/document/delivery-note/${orderId}`}>
              <NotepadText /> ใบส่งของ
            </Link>
          </Button>
        </section>
        {/* end content */}
      </DialogContent>
    </Dialog>
  );
}
