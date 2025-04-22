import React, {useState} from "react";

export default function ContactForm(){
  const [formData, setFormData] = useState({
    email:  "",
    telefone:  "",
  });
}

const [errors, setErrors] = useState({});

const handleChange = (e) => {