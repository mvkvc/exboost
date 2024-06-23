import { DataTypes, QueryInterface } from "sequelize";
import type { Migration } from "../ipc/schema";

const name = "02_createTagsTable";

const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable("tags", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  await queryInterface.createTable("folder_tags", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    folderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "folders",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tags",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });
};

const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("tags");
  await queryInterface.dropTable("folder_tags");
};

export default { name, up, down };
