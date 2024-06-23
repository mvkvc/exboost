import { DataTypes } from "sequelize";
import type { Migration } from "../ipc/schema";

const name: string = "01_createFilesTable";

const up: Migration = ({ context: queryInterface }) => {
  queryInterface.createTable("files", {
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
};

const down: Migration = ({ context: queryInterface }) => {
  queryInterface.dropTable("files");
};

export default { name, up, down };
