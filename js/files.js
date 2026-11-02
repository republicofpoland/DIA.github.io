const fileList = document.getElementById("file-list");

function getDocumentDate(filename) {
    const match = filename.match(/^(\d{4})(\d{2})(\d{2})(?:[_-]|$)/);
    return match ? `${match[1]}.${match[2]}.${match[3]}` : "—";
}

function createDocumentItem(file) {
    const item = document.createElement("li");
    item.className = "document-list__item";

    const identity = document.createElement("div");
    identity.className = "document-list__identity";

    const title = document.createElement("span");
    title.className = "document-list__title";
    title.textContent = file.name;

    const kind = document.createElement("span");
    kind.className = "document-list__kind";
    kind.textContent = "PDF DOCUMENT";
    identity.append(title, kind);

    const dateLabel = document.createElement("span");
    dateLabel.className = "document-list__date";
    dateLabel.append(document.createTextNode(getDocumentDate(file.name)));

    const dateNote = document.createElement("small");
    dateNote.textContent = "ファイル名に含まれる日付";
    dateLabel.append(dateNote);

    const actions = document.createElement("div");
    actions.className = "document-list__actions";
    const href = `pdfs/${encodeURIComponent(file.name)}`;

    const viewLink = document.createElement("a");
    viewLink.href = href;
    viewLink.target = "_blank";
    viewLink.rel = "noopener noreferrer";
    viewLink.textContent = "閲覧";
    viewLink.setAttribute("aria-label", `${file.name} を新しいタブで閲覧`);

    const downloadLink = document.createElement("a");
    downloadLink.href = href;
    downloadLink.setAttribute("download", "");
    downloadLink.textContent = "保存";
    downloadLink.setAttribute("aria-label", `${file.name} を保存`);

    actions.append(viewLink, downloadLink);
    item.append(identity, dateLabel, actions);
    return item;
}

async function loadDocuments() {
    if (!fileList) {
        return;
    }

    try {
        const response = await fetch(
            "https://api.github.com/repos/republicofpoland/DIA.github.io/contents/pdfs?ref=main",
            { headers: { Accept: "application/vnd.github+json" } }
        );

        if (!response.ok) {
            throw new Error(`文書一覧の取得に失敗しました（HTTP ${response.status}）。`);
        }

        const entries = await response.json();
        if (!Array.isArray(entries)) {
            throw new Error("文書一覧の応答形式が正しくありません。");
        }

        const pdfFiles = entries
            .filter((entry) => entry.type === "file" && /\.pdf$/i.test(entry.name))
            .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));

        fileList.replaceChildren();

        if (pdfFiles.length === 0) {
            const emptyMessage = document.createElement("li");
            emptyMessage.className = "document-list__fallback";
            emptyMessage.textContent = "公開中のPDF文書はありません。";
            fileList.append(emptyMessage);
            return;
        }

        pdfFiles.forEach((file) => fileList.append(createDocumentItem(file)));
    } catch (error) {
        fileList.replaceChildren();
        const errorMessage = document.createElement("li");
        errorMessage.className = "document-list__fallback";
        errorMessage.textContent = error instanceof Error
            ? error.message
            : "文書一覧の取得中にエラーが発生しました。";
        fileList.append(errorMessage);
        console.error("文書一覧を読み込めませんでした。", error);
    }
}

loadDocuments();

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.getElementById("primary-navigation");

if (menuToggle && navigation) {
    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        navigation.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}
