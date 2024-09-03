import { Model } from "mongoose";

import { EntityRepository } from "./entity-repo";

import { EventModel, EventDocument } from "../models/event";

class EventRepository extends EntityRepository<EventDocument> {
  constructor(readonly eventModel: Model<EventDocument>) {
    super(eventModel);
  }
}

export const eventRepository = new EventRepository(EventModel);
