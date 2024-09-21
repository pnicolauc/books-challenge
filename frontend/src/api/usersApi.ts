const booksApiUrl = process.env.BOOKS_BACKEND_URL;

if(booksApiUrl === undefined) {
  throw new Error("BOOKS_BACKEND_URL is not set")
}
export const usersApi = {
  async login(username: string, password: string) {
    try {
      const encodedCredentials = btoa(`${username}:${password}`);
      const response = await fetch(`${booksApiUrl}/auth/login`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });
      return response;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};
