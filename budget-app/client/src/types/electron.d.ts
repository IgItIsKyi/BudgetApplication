export {};

declare global {
  interface Window {
    api: {
      getUsers: () => Promise<any[]>;
      getUserById: (id: number) => Promise<any | null>;
      // add more methods here as you expose them
    };
  }
}
