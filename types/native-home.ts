type DataRow = {
  id: string;
  value: unknown;
};

declare const NativeHomeModuleManager: {
  table(tableId: string): Promise<DataRow[]>;
  dropTable(tableId: string): Promise<void>;
  createTable(tableId: string): Promise<void>;
  data(tableId: string, id: string): Promise<string>;
  deleteData(tableId: string, id: string): Promise<void>;
  saveData(tableId: string, id: string, value: unknown): Promise<void>;
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
