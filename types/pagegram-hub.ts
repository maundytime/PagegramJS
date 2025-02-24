type DataRow = {
  id: string;
  value: unknown;
};

export const TableIdGramInfo = 'gram_info';

export function makeGramId() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

declare const PagegramHubManager: {
  table(tableId: string): DataRow[];
  dropTable(tableId: string): void;
  createTable(tableId: string): void;
  data(tableId: string, id: string): unknown;
  deleteData(tableId: string, id: string): void;
  saveData(tableId: string, id: string, value: unknown): void;
  bundle(id: string): string;
  deleteBundle(id: string): void;
  saveBundle(id: string, value: string): void;
  reloadWidgets(): void;
};

export const PagegramHub = PagegramHubManager;
