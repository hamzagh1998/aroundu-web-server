import { Model } from "mongoose";

import { EntityRepository } from "./entity-repo";

import { GroupModel, GroupDocument } from "../models/group";

class GroupRepository extends EntityRepository<GroupDocument> {
  constructor(readonly groupModel: Model<GroupDocument>) {
    super(groupModel);
  }
}

export const groupRepository = new GroupRepository(GroupModel);
