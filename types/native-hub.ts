type DataRow = {
  id: string;
  value: unknown;
};

declare const NativeHubModuleManager: {
  table(tableId: string): DataRow[];
  dropTable(tableId: string): void;
  createTable(tableId: string): void;
  data(tableId: string, id: string): unknown;
  deleteData(tableId: string, id: string): void;
  saveData(tableId: string, id: string, value: unknown): void;
  saveBundle(id: string, value: string): void;
  deleteBundle(id: string): void;
  bundle(id: string): string;
  reloadWidgets(): void;
  copy(value: string): void;
};
export const TableIdGramInfo = 'gram_info';
export const NativeHubModule = NativeHubModuleManager;

export function makeGramId() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
