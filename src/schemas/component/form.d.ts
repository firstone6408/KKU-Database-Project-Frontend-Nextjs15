/** @format */

export type FormContainerType = {
  children: React.ReactNode;
  action?: (
    prevState: any,
    formData: FormData
  ) => Promise<{ ok: boolean; message: string }>;
  className?: string;
  options?: {
    afterSubmit: () => any;
  };
};

export type FormInputType = {
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  defaultValue?: any;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  value?: any;
  onChange?: (params: any) => void;
  onBlur?: any;
  onWheel?: (params?: any) => void | any;
};

export type FormFileType = {
  className?: string;
  name?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
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
