
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const AddBookButton: React.FC = () => {
  return (
    <Button className="gap-2 w-full lg:w-auto">
      <PlusCircle size={18} />
      <span>Ajouter un livre</span>
    </Button>
  );
};

export default AddBookButton;
