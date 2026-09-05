import path from "path";
import { extractText as unpdfExtractText, getDocumentProxy } from "unpdf";
import mammoth from "mammoth";

export const extractText = async (file) => {
    const extension = path
        .extname(file.originalname)
        .toLowerCase();

    if (extension === ".pdf") {
        const pdf = await getDocumentProxy(new Uint8Array(file.buffer));
        const { text } = await unpdfExtractText(pdf, { mergePages: true });
        return text;
    }

    if (extension === ".docx") {
        const result = await mammoth.extractRawText({
            buffer: file.buffer
        });
        return result.value;
    }

    throw new Error(`Unsupported file type: ${extension}`);
};