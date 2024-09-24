type DataRow = {
  id: string;
  value: unknown;
};

declare const NativeHomeModuleManager: {
  table(tableId: string): DataRow[];
  dropTable(tableId: string): void;
  createTable(tableId: string): void;
  data(tableId: string, id: string): string;
  deleteData(tableId: string, id: string): void;
  saveData(tableId: string, id: string, value: unknown): void;
};

export const NativeHomeModule = NativeHomeModuleManager;

export function makeAppId() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 32; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
