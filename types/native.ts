declare const NativeModuleManager: {
  date: Date;
  fetch(urlString: string, parameters?: Record<string, unknown>): Promise<string>;
  data(id: string): string;
  deleteData(id: string): void;
  saveData(id: string, value: unknown): void;
};

export const NativeModule = NativeModuleManager;
