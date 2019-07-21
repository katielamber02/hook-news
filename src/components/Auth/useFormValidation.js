import React from "react";

function useFormValidation(initialState, validate, authenticate) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log("authenticated", values);
        authenticate();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]); //run this function only if errors changes in some way

  function handleChange(event) {
    event.persist(); //otherwise name will be null
    setValues(previousValues => ({
      ...previousValues,
      [event.target.name]: event.target.value
    }));
  }
  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
    console.log({ values });
  }
  return {
    handleChange,
    handleSubmit,
    values,
    handleBlur,
    errors,
    isSubmitting
  };
}

export default useFormValidation;