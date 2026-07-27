export const setAttributes = (element, args, attributes) => {
  attributes.forEach((attribute) => {
    const value = args[attribute];
    if (value === true) element.setAttribute(attribute, "");
    else if (value !== false && value !== undefined && value !== "") element.setAttribute(attribute, value);
  });
  return element;
};
