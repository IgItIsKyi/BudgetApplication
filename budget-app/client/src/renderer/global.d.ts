export {};

declare global {
  interface Window {
    api: {
      auth: {
        login: (
          email: string,
          password: string,
        ) => Promise<
          | {
              ok: true;
              user: { id: number; name: string; email: string };
              token: string;
            }
          | { ok: false; error: string }
        >;

        register: (
          name: string,
          email: string,
          password: string,
        ) => Promise<
          | { ok: true; user: { id: number; name: string; email: string } }
          | { ok: false; error: string }
        >;

        me: (
          token: string,
        ) => Promise<
          | { ok: true; user: { id: number; name: string; email: string } }
          | { ok: false; error: string }
        >;

        logout: (token: string) => Promise<{ ok: true }>;
      };
    };
  }
}
