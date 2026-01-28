export {};

declare global {
  interface Window {
    api: {
      users: {
        getAll: () => Promise<Array<{ id: number; name: string }>>;
        add: (name: string) => Promise<{ id: number; name: string }>;
      };
    };
  }
}