const config = {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://todo-v0.vercel.app/api/v1"
      : "http://localhost:8000/api/v1",
};

export default config;