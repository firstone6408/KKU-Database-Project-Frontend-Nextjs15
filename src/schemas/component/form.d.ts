/** @format */

export type FormContainerType = {
  children: React.ReactNode;
  action: (
    prevState: any,
    formData: FormData
  ) => Promise<{ ok: boolean; message: string }>;
  className?: string;
};

export type FormInputType = {
  name: string;
  type: React.HTMLInputTypeAttribute;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export type GoogleSignInButtonType = {
  className?: string;
  btnText?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
};
