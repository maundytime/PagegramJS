declare const PagegramManager: {
  fetch(urlString: string, parameters?: Record<string, unknown>): Promise<string>;
  data(id: string): string;
  deleteData(id: string): void;
  saveData(id: string, value: unknown): void;
  copy(value: string): void;
  present(value: any): any;
};

export const Pagegram = PagegramManager;
