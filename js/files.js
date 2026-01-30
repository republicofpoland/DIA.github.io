const files = [
    "20260114_Internal_Assessment_on_the_SORA_Operation.pdf",
    "20260126_Health_Concerns_Regarding_Chinese_State_Chairman_Fuzune.pdf"
];

files.sort();

const fileList = document.getElementById("file-list");

files.forEach(file => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td data-label="文書名">${file}</td>
    <td data-label="閲覧"><a href="pdfs/${file}" target="_blank">閲覧</a></td>
    <td data-label="ダウンロード"><a href="pdfs/${file}" download>Download</a></td>
`;


    fileList.appendChild(row);
});
