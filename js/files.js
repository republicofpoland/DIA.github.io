const files = [
    "20260114 Internal Assessment on the SORA Operation",
    "20260126 Health Concerns Regarding Chinese State Chairman Fuzune"
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
