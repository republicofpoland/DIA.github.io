const files = [
    "20260114_Internal_Assessment_on_the_SORA_Operation.pdf",
    "20260126_Health_Concerns_Regarding_Chinese_State_Chairman_Fuzune.pdf"
];

files.sort();

const fileList = document.getElementById("file-list");

files.forEach(file => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${file}</td>
        <td><a href="pdfs/${file}" target="_blank">閲覧</a></td>
        <td><a href="pdfs/${file}" download>Download</a></td>
    `;

    fileList.appendChild(row);
});
