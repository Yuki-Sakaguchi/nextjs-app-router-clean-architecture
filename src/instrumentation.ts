import "reflect-metadata";

export async function register() {
  // if (process.env["NEXT_RUNTIME"] === "nodejs") {
  await import("./di/inversify.config");
  // }
}
