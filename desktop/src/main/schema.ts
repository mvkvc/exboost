import { Sequelize, DataTypes } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";
import { getDBPath } from "./db";
import createFoldersTable from "../migrations/00_createFoldersTable";
import createFilesTable from "../migrations/01_createFilesTable";
import createTagsTable from "../migrations/02_createTagsTable";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: getDBPath(),
});

export const umzug: Umzug = new Umzug({
  migrations: [createFoldersTable, createFilesTable, createTagsTable],
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

export type Migration = typeof umzug._types.migration;

export const Folder = sequelize.define("folders", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export const File = sequelize.define("files", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: false,
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
});

export const Tag = sequelize.define("tags", {
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

export const FolderTag = sequelize.define("folder_tags", {
  folderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Folder,
      key: "id",
    },
  },
  tagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: "id",
    },
  },
});
