import { useEffect } from "react";

const useInputFocus = () => {
  const handleFocus = function () {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  };

  const handleBlur = function () {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
      parent.classList.remove("focus");
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".form__input");

    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);

      return () => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      };
    });
  }, []);
};

export default useInputFocus;
