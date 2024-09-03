import { Model } from "mongoose";

import { EntityRepository } from "./entity-repo";

import { MessageModel, MessageDocument } from "../models/message";

class MessageRepository extends EntityRepository<MessageDocument> {
  constructor(readonly messageModel: Model<MessageDocument>) {
    super(messageModel);
  }
}

export const messageRepository = new MessageRepository(MessageModel);
