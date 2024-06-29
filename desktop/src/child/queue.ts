import { logger } from "../main/logger";
import { QueueConfig, Queue } from "../main/queue";
import { WatcherMessage } from "../main/watcher";

interface QueueStartMessage {
  action: "start";
  data: QueueConfig;
}

interface QueueStopMessage {
  action: "stop";
  data: null;
}

interface QueuePushMessage {
  action: "push";
  data: WatcherMessage;
}

type QueueMessage = QueueStartMessage | QueueStopMessage | QueuePushMessage;

let queue: Queue<WatcherMessage>;

const PROCESS_BATCH_SIZE = 10;
const PROCESS_INTERVAL_MS = 500;
const handleFn = (message: WatcherMessage) => {
  logger.info("queue handleFn", message);
};

process.on("message", (message: QueueMessage) => {
  const { action, data } = message;

  switch (action) {
    case "start":
      logger.info("Queue started", data);
      const { queueFilePath } = data;
      queue = new Queue(
        queueFilePath,
        PROCESS_BATCH_SIZE,
        PROCESS_INTERVAL_MS,
        handleFn
      );
      break;
    case "stop":
      queue?.stopProcessing();
      break;
    case "push":
      queue?.push(data);
      break;
  }
});

process.on("disconnect", async () => {
  queue?.stopProcessing();
  await queue?.saveQueue();
});
