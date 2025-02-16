import Dexie from "dexie";

export const db = new Dexie("PDFDatabase");
db.version(1).stores({
  pdfs: "++id, name, data"
});
