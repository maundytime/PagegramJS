declare const NativeModuleManager: {
  fetch(urlString: string, parameters?: Record<string, unknown>): Promise<string>;
  data(id: string): Promise<string>;
  deleteData(id: string): Promise<void>;
  saveData(id: string, value: unknown): Promise<void>;
};

export const NativeModule = NativeModuleManager;
