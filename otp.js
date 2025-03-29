(function () {
  let otpState = [];
  let button = document.getElementById("submit-btn");

  const createInputBoxes = (boxes) => {
    // otpState = Array.from({ length: boxes }, (val, index) => {
    //   return "";
    // });
    otpState = Array.from({ length: boxes }).fill("");

    const otpBoxesContainer = document.getElementById("otp-boxes-container");
    otpState.map((inputBoxes) => {
      inputBoxes = document.createElement("input", "text");
      inputBoxes.className = "otp-boxes";
      otpBoxesContainer.appendChild(inputBoxes);
    });

    button.disabled = true;
  };

  createInputBoxes(4);

  const otpInputBoxes = document.getElementsByClassName("otp-boxes");
  otpInputBoxes[0].focus();
  for (let i = 0; i < otpInputBoxes.length; i++) {
    otpInputBoxes[i].addEventListener("input", (e) => {
      const { value } = e.target;
      // do not allow other than numbers "1234" => 1234 "ssdgg" => NaN
      const trimmedValue = value.trim();
      if (isNaN(value) || trimmedValue === "") {
        otpState[i] = "";
        otpInputBoxes[i].value = otpState[i];
        return;
      }
      // trim value  "87890"

      // allow only last value
      if (trimmedValue) {
        otpState[i] = trimmedValue.slice(-1);
        otpInputBoxes[i].value = otpState[i];
        console.log(
          "statettt",
          otpState.some((val) => val === "")
        );
      }

      // focus shift on next input
      setTimeout(() => {
        if (i + 1 < otpInputBoxes.length) {
          otpInputBoxes[i + 1].setSelectionRange(
            otpInputBoxes[i + 1].value.length,
            otpInputBoxes[i + 1].value.length
          );
          otpInputBoxes[i + 1].focus();
        }
        button.disabled = otpState.some((val) => val === "");
      }, 100);
    });

    otpInputBoxes[i].addEventListener("keydown", (e) => {
      const inputKey = e.key;

      if (inputKey === "ArrowRight" && otpInputBoxes[i].value !== "") {
        if (i + 1 < otpInputBoxes.length) {
          const length = otpInputBoxes[i + 1].value.length;
          otpInputBoxes[i + 1].setSelectionRange(length, length);
          otpInputBoxes[i + 1].focus();
        }
      } else if (inputKey === "ArrowLeft") {
        if (i - 1 >= 0) {
          setTimeout(() => {
            const length = otpInputBoxes[i - 1].value.length;
            console.log(length);
            otpInputBoxes[i - 1].setSelectionRange(
              otpInputBoxes[i - 1].value.length,
              otpInputBoxes[i - 1].value.length
            );
            otpInputBoxes[i - 1].focus();
          }, 50);
        }
      } else if (inputKey === "Backspace") {
        otpInputBoxes[i].value = "";
        otpState[i] = "";
        button.disabled = otpState.some((val) => val === "");
        setTimeout(() => {
          if (i - 1 >= 0) {
            const length = otpInputBoxes[i - 1].value.length;
            otpInputBoxes[i - 1].setSelectionRange(length, length);
            otpInputBoxes[i - 1].focus();
          }
        }, 100);
      }
    });
  }

  const submitOtp = () => {
    alert(`Your OTP is ${otpState.join("")}`);
  };

  document.getElementById("submit-btn").addEventListener("click", submitOtp);
})();
