const form = document.querySelector("#brief-form");
const result = document.querySelector("#result");
const brief = document.querySelector("#brief");
const measures = {
  "Reuse and redistribution": "Return rate, share redistributed, and cost per item redistributed.",
  "Repair and refurbishment": "Repair success rate, repair time, and cost per usable item.",
  "Material recovery": "Weight collected, usable recovery yield, and processing cost per kilogram."
};
const materialActions = {
  Textiles: "Sort by condition and fiber when known. Record who can accept items that cannot be repaired.",
  Packaging: "Choose one packaging format. Check how it can be collected, cleaned, and used again or recovered.",
  Furniture: "Inspect condition and repairability. Confirm space for storage and safe handling.",
  "Another material": "Define what you will accept and check where it can be safely processed."
};
const leads = {
  "NGO or community organization": "Ask local staff and participants to agree on collection hours and responsibilities.",
  "Design studio or business": "Assign a design lead and confirm who will operate the return process.",
  "Funder or investment partner": "Agree with the local operator on the pilot budget, evidence, and expansion criteria."
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const {team, material, goal} = Object.fromEntries(new FormData(form));
  brief.textContent = [
    `${material} · ${goal}\nLead: ${team}`,
    `Set up one collection site and record what currently happens to the material. ${materialActions[material]}`,
    leads[team],
    `Track: ${measures[goal]}`,
    "Review after four weeks. Use the baseline, costs, and participant feedback to decide whether to repeat, change, or stop the pilot."
  ].join("\n\n");
  form.hidden = true;
  result.hidden = false;
  document.querySelector("#result-title").focus();
});

document.querySelector("#edit").addEventListener("click", () => {
  result.hidden = true;
  form.hidden = false;
  document.querySelector("#team").focus();
});

document.querySelector("#download").addEventListener("click", () => {
  const file = new Blob(["Smart8 Pilot Brief\n\n", brief.textContent], {type: "text/plain"});
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "smart8-pilot-brief.txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
