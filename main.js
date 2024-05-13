const mtfContainer = document.getElementById("mtfapp-container");
const mtfDetails = [
  ["Load DICOM files.", "images/mtfapp/0.png"],
  [
    "Automatic processing of values: max, min, contrast and modulation.",
    "images/mtfapp/1.png",
  ],
  ["Visualization of graphs and estimation of line pairs.", "images/mtfapp/2.png"],
  ["Provision of information sourced from the detector.", "images/mtfapp/3.png"],
  ["Export to .csv format for further analysis.", "images/mtfapp/4.png"],
  ["Don't need any preprocessing.", "images/mtfapp/5.png"],
];

// mtf details
for (let i = 0; i < mtfDetails.length; i++) {
  let text = mtfDetails[i][0];
  let imageUrl = mtfDetails[i][1];
  mtfContainer.innerHTML += `
    <div class="detail">
        <span
          ><p>
            ${text}
          </p></span
        >
        <img src="${imageUrl}" alt="" />
      </div>
    `;
}
