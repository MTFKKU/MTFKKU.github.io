const eiVal = document.getElementById("EI");
const eitVal = document.getElementById("EIT");
const diVal = document.getElementById("DI");
const resNum = document.getElementById("resultNum");
const restext0 = document.getElementById("resultText0");
const restext1 = document.getElementById("resultText1");
let solution = [];

eiVal.addEventListener("keyup", () => {
  addSolution(0, eiVal.value);
  checkTwoVals();
});

eitVal.addEventListener("keyup", () => {
  addSolution(1, eitVal.value);
  checkTwoVals();
});

diVal.addEventListener("keyup", () => {
  addSolution(2, diVal.value);
  checkTwoVals();
});

const getValues = () => {
  let eiValue = parseFloat(eiVal.value);
  let eitValue = parseFloat(eitVal.value);
  let diValue = parseFloat(diVal.value);
  return [eiValue, eitValue, diValue];
};

const checkTwoVals = () => {
  let values = getValues();
  const count = values.filter((value) => !isNaN(value)).length;
  // have at least 2 values
  if (count >= 2) {
    let solutionNum = checkSolution();
    if (solutionNum == 1) {
      let res = calculateDI();
      updateRes(res);
    } else if (solutionNum == 2) {
      let res = calculateEIT();
      updateRes(res);
    } else if (solutionNum == 3) {
      let res = calculateEI();
      updateRes(res);
    }
  }
};

const addSolution = (solutionNum, value) => {
  if (isNaN(parseFloat(value))) {
    solution = solution.filter((item) => item !== solutionNum);
  } else {
    let lengthSolution = solution.length;
    let recentSolution = solution[lengthSolution - 1];
    if (solutionNum != recentSolution) {
      solution.push(solutionNum);
    }
  }
};

const checkSolution = () => {
  let lengthSolution = solution.length;
  let sol0 = solution[lengthSolution - 1];
  let sol1 = solution[lengthSolution - 2];
  return sol0 + sol1;
};

const calculateDI = () => {
  let [eiValue, eitValue, _] = getValues();
  let diValue = parseFloat((10 * Math.log10(eiValue / eitValue)).toFixed(2));
  let resText0 = `EI: ${eiValue}, EIT: ${eitValue}`;
  let [resText1, color] = checkExposure(diValue);
  if (diValue > 0) {
    diValue = "+" + diValue;
    console.log(diValue);
  }
  resText1 = `DI: ${diValue} - ${resText1}`;
  eiVal.style.color = color;
  eitVal.style.color = color;
  diVal.style.color = "white";
  resNum.style.color = color;
  return [diValue, resText0, resText1];
};

const calculateEIT = () => {
  let [eiValue, _, diValue] = getValues();
  let eitValue = parseFloat((eiValue / Math.pow(10, diValue / 10)).toFixed(2));
  let resText0 = `EI: ${eiValue}, DI: ${diValue}`;
  let [resText1, color] = checkExposure(diValue);
  resText1 = `EIT: ${eitValue} - ${resText1}`;
  eiVal.style.color = color;
  eitVal.style.color = "white";
  diVal.style.color = color;
  resNum.style.color = color;
  return [eitValue, resText0, resText1];
};

const calculateEI = () => {
  let [_, eitValue, diValue] = getValues();
  let eiValue = parseFloat((eitValue * Math.pow(10, diValue / 10)).toFixed(2));
  let resText0 = `EIT: ${eitValue}, DI: ${diValue}`;
  let [resText1, color] = checkExposure(diValue);
  resText1 = `EI: ${eiValue} - ${resText1}`;
  eiVal.style.color = "white";
  eitVal.style.color = color;
  diVal.style.color = color;
  resNum.style.color = color;
  return [eiValue, resText0, resText1];
};

const checkExposure = (diValue) => {
  if (Math.abs(diValue) <= 1) {
    return ["Optimal Exposure", "lightgreen"];
  } else if (Math.abs(diValue) <= 3) {
    // negative
    if (diValue < 0) {
      return ["Under Exposure", "blue"];
    } else {
      return ["Over Exposure", "red"];
    }
  } else {
    if (diValue < 0) {
      return ["Under Exposure need to repeat", "blue"];
    } else {
      return ["Over Exposure need to repeat", "red"];
    }
  }
};

const updateRes = (res) => {
  let [resN, res0, res1] = res;
  if (isNaN(resN)) {
    resN = "-";
  } else {
    if (resN >= 10000) {
      resN = "+10,000";
    }
    if (resN == Number.POSITIVE_INFINITY) {
      resN = "+Inf";
    }
    if (resN == Number.NEGATIVE_INFINITY) {
      resN = "-Inf";
    }
  }
  resNum.textContent = resN;
  restext0.textContent = res0;
  restext1.textContent = res1;
};
