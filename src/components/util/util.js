export const formSerialize = (frm) => {
  const formElement = frm;
  const inputElements = formElement.querySelectorAll("input,select,textarea");
  const jsonObject = {};
  for (let i = 0; i < inputElements.length; i++) {
    const inputElement = inputElements[i];
    if (/radio|checkbox/.test(inputElement.type)) {
      if (inputElement.checked)
        jsonObject[inputElement.name] = inputElement.value;
    } else jsonObject[inputElement.name] = inputElement.value;
  }
  return jsonObject;
};

export const toUpper = (val) => val.toString().toUpperCase();
export const toLower = (val) => val.toString().toLowerCase();
// export const toCapitalize = (val) => val.toString().toLowerCase().toCapitalize();
