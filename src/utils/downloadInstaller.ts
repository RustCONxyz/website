const downloadURL = "https://cdn.rustcon.xyz/installers/{os}/latest.{fileExtension}";

const fileExtensions = { android: "apk", windows: "msi", macos: "dmg", linux: "AppImage", debian: "deb" };

export default async function downloadInstaler(os: keyof typeof fileExtensions) {

    const fileExtension = fileExtensions[os];

    const url = downloadURL.replace("{os}", os).replace("{fileExtension}", fileExtension);

    try {

        const response = await fetch(url, { referrerPolicy: "no-referrer", cache: "no-cache" });

        if (!response.ok) throw new Error("Failed to download file");

        const blob = await response.blob();

        const fileName = `RustCON-Setup.${fileExtension}`;

        const file = new File([ blob ], fileName, { type: blob.type });

        const urlCreator = window.URL || window.webkitURL || window;

        const fileURL = urlCreator.createObjectURL(file);

        const aElement = document.createElement("a");

        aElement.href = fileURL;

        aElement.download = fileName;

        aElement.click();

        urlCreator.revokeObjectURL(fileURL);

    } catch (error) {

        console.error(error);

    }

}
