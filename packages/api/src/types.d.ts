declare global {
  declare module 'express-session' {
    interface SessionData {
      user: number;
      charity: number;
    }
  }
}
