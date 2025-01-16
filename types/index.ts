export interface User {
    id: string
    email: string
    name: string
}


export interface FormState {
  errors?: {
    [key: string]: string[]
  }
  message?: string
}

 
export interface FormProps {

  children: React.ReactNode;

  action: (formData: any) => void;

  submitButton?: string;

  className?: string;

  [key: string]: any;

}
