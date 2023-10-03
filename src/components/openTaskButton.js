const setupSvg = (iconSvg, iconRect, iconLine, iconPath) => {
  iconSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  iconSvg.setAttribute("x", "0px");
  iconSvg.setAttribute("y", "0px");
  iconSvg.setAttribute("width", "20px");
  iconSvg.setAttribute("height", "20px");
  iconSvg.setAttribute("viewBox", "0 0 20 20");
  iconSvg.setAttribute("fill", "none");

  iconRect.setAttribute("x", "0.5");
  iconRect.setAttribute("y", "0.5");
  iconRect.setAttribute("width", "19");
  iconRect.setAttribute("height", "19");
  iconRect.setAttribute("rx", "1.5");
  iconRect.setAttribute("stroke", "#808080");

  iconLine.setAttribute("x1", "3");
  iconLine.setAttribute("y1", "5.5");
  iconLine.setAttribute("x2", "17");
  iconLine.setAttribute("y2", "5.5");
  iconLine.setAttribute("stroke", "#808080");

  iconPath.setAttribute(
    "d",
    "M10.9028 15.56C10.7401 15.3973 10.7265 15.1419 10.8621 14.9637L10.9028 14.9172L15.1388 10.6817L11.0648 10.69C10.8138 10.6905 10.6098 10.4875 10.6093 10.2364C10.6088 10.0082 10.7766 9.81891 10.9957 9.78598L11.0628 9.7809L16.2372 9.76976C16.2702 9.76969 16.3025 9.77316 16.3336 9.7798C16.3427 9.78203 16.3521 9.78433 16.3613 9.78692C16.3695 9.78894 16.3775 9.79144 16.3855 9.79416C16.3969 9.7983 16.4084 9.80277 16.4198 9.80773C16.4287 9.81143 16.4371 9.81538 16.4452 9.81957C16.4553 9.82487 16.4657 9.83074 16.476 9.83706C16.4833 9.84138 16.49 9.84579 16.4966 9.85037C16.5064 9.85727 16.5162 9.86467 16.5258 9.87252C16.5332 9.87842 16.5402 9.88456 16.5471 9.8909C16.5512 9.89484 16.5554 9.89895 16.5596 9.90315L16.5719 9.91576C16.578 9.92232 16.5839 9.92905 16.5895 9.93595L16.5596 9.90315C16.5799 9.92343 16.5979 9.94516 16.6135 9.96799C16.6173 9.97342 16.621 9.97913 16.6246 9.98493C16.632 9.99688 16.6387 10.0088 16.6448 10.021C16.6478 10.027 16.6509 10.0336 16.6539 10.0403C16.6598 10.0537 16.6649 10.067 16.6694 10.0805C16.6716 10.0868 16.6737 10.0936 16.6756 10.1004C16.6787 10.1115 16.6814 10.1225 16.6836 10.1335C16.6852 10.1412 16.6866 10.1495 16.6879 10.1579L16.6888 10.1644C16.6914 10.1843 16.6928 10.2044 16.6928 10.2246L16.682 15.4C16.6814 15.651 16.4775 15.8541 16.2265 15.8536C15.9983 15.8531 15.8097 15.6845 15.7777 15.4653L15.7729 15.3981L15.7808 11.3253L11.5456 15.56C11.3681 15.7375 11.0803 15.7375 10.9028 15.56Z"
  );

  iconPath.setAttribute("fill", "#808080");

  iconSvg.append(iconRect, iconLine, iconPath);

  return iconSvg;
};

const setButtonStyles = (button) => {
  button.className = "button-href";
  button.style.height = "24px";
  button.style.width = "24px";
  button.style.marginTop = "-1px";
};

const createOpenTaskButton = (taskId) => {
  const button = document.createElement("button");
  const svgPath = "http://www.w3.org/2000/svg";

  const iconSvg = document.createElementNS(svgPath, "svg");
  const iconRect = document.createElementNS(svgPath, "rect");
  const iconLine = document.createElementNS(svgPath, "line");
  const iconPath = document.createElementNS(svgPath, "path");

  button.appendChild(setupSvg(iconSvg, iconRect, iconLine, iconPath));

  setButtonStyles(button);

  button.addEventListener("click", () => {
    window.open(`https://todoist.com/app/task/${taskId}`, "_blank").focus();
  });

  return button;
};

export default createOpenTaskButton;
