
import React, { ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { studentSchema, StudentFormValues } from "./validationSchema";

interface StudentFormProviderProps {
  children: ReactNode;
  onSubmit: (data: StudentFormValues) => void;
}

export interface FormContextValue {
  form: UseFormReturn<StudentFormValues>;
}

const StudentFormProvider: React.FC<StudentFormProviderProps> = ({ children, onSubmit }) => {
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      date_naissance: "",
      lieu_naissance: "",
      sexe: "",
      nationalite: "",
      email: "",
      telephone: "",
      adresse: "",
      filiere: "",
      niveau: "",
    },
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {children}
      </form>
    </Form>
  );
};

export default StudentFormProvider;
