import React from "react";
import Select from "react-select";

export default function SelectContainer(props) {
  return (
    <Select
      styles={{
        container: (base) => ({
          ...base,
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "16px",
          margin: "5px",
          width: "85%",
          transition: "all 0.5s ease-in-out",
          borderRadius: "5px 5px 5px 5px",
        }),
        control: (base) => ({
          ...base,
          borderRadius: 5,
          border: "none",
          backgroundColor: "hsl(0deg 0% 96%)",
        }),
        placeholder: (base) => ({
          ...base,
          padding: "15px 25px",
        }),
        singleValue: (base) => ({
          ...base,
          padding: "15px 25px",
        }),
      }}
      {...props}
    />
  );
}
