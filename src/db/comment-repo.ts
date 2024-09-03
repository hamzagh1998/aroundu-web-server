import { EntityRepository } from "./entity-repo";

import { Model } from "mongoose";

import { CommentModel, CommentDocument } from "../models/comment";

class CommentRepository extends EntityRepository<CommentDocument> {
  constructor(readonly commentModel: Model<CommentDocument>) {
    super(commentModel);
  }
}

export const commentRepository = new CommentRepository(CommentModel);
