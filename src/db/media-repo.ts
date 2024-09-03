import { Model } from "mongoose";

import { EntityRepository } from "./entity-repo";

import { MediaModel, MediaDocument } from "../models/media";

class MediaRepository extends EntityRepository<MediaDocument> {
  constructor(readonly mediaModel: Model<MediaDocument>) {
    super(mediaModel);
  }
}

export const mediaRepository = new MediaRepository(MediaModel);
