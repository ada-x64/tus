const { Server } = require("@tus/server");
const { FileStore } = require("@tus/file-store");

const host = "127.0.0.1";
const port = 1080;
const server = new Server({
  path: "/files",
  datastore: new FileStore({ directory: "./files" }),
  onIncomingRequest: async (req, res, id) => {
    console.log("⬇️ Got request", req.method, "for", id);
  },
  onResponseError: async (req, res, err) => {
    console.log("❌ Error", err);
    return err;
  },
  onUploadCreate: async (req, res, upload) => {
    console.log("🪣 Upload create\n", upload);
    return res;
  },
  onUploadFinish: async (req, res, upload) => {
    console.log("✅ Upload finished\n", upload);
    return res;
  },
});

server.listen({ host, port });
console.log(`listening on ${host}:${port}`);
