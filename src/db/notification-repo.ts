import { Model } from "mongoose";

import { EntityRepository } from "./entity-repo";

import {
  NotificationModel,
  NotificationDocument,
} from "../models/notification";

class NotificationRepository extends EntityRepository<NotificationDocument> {
  constructor(readonly notificationModel: Model<NotificationDocument>) {
    super(notificationModel);
  }
}

export const notificationRepository = new NotificationRepository(
  NotificationModel
);
