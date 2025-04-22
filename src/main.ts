import app from "./app";

const port = 8787;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port.toString()}`);
});
