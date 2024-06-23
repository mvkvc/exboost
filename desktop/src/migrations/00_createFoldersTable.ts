import { DataTypes } from "sequelize";
import type { Migration } from "../ipc/schema";

const name: string = "00_createFoldersTable";

const up: Migration = ({ context: queryInterface }) => {
  queryInterface.createTable("folders", {
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
};

const down: Migration = async ({ context: queryInterface }) => {
  queryInterface.dropTable("folders");
};

export default { name, up, down };
