
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/students/directory");
  }, [navigate]);

  return null;
};

export default StudentsPage;
