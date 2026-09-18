import React, {useRef} from "react";
import PropTypes from "prop-types";
import CustomButton from "@/components/customButton/CustomButton";

export default function FileButton({onFileSelect, accept, multiple, disabled, ...rest}) {
  const fileInputRef = useRef(null);

  const handleButtonClick = e => {
    if (!disabled) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = event => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelect?.(multiple ? Array.from(files) : files[0]);
      event.target.value = null;
    }
  };

  return (
    <>
      <CustomButton onClick={handleButtonClick} disabled={disabled} {...rest} />
      <input
        type="file"
        ref={fileInputRef}
        style={{display: "none"}}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />
    </>
  );
}

FileButton.propTypes = {
  onFileSelect: PropTypes.func,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
};

FileButton.defaultProps = {
  multiple: false,
  disabled: false,
};
