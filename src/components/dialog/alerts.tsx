/** @format */

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";

export function QuestionAlertDialog(props: {
  title: string;
  text: string;
  onSubmit: any;
}) {
  const { text, title, onSubmit } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {/* Make changes to your profile here. Click save when you're done. */}
          </DialogDescription>
        </DialogHeader>
        <p>{text}</p>
        <DialogFooter>
          <Button type="button" variant={"destructive"} asChild>
            <DialogClose>ยกเลิก</DialogClose>
          </Button>
          <Button onClick={() => onSubmit()}>ตกลง</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
