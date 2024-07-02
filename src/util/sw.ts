import { ServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

let handler: ServiceWorkerMLCEngineHandler;

self.addEventListener("activate", function () {
  handler = new ServiceWorkerMLCEngineHandler();
  console.log("Web-LLM Service Worker Activated");
})