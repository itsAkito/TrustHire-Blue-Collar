import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { APPLICATION_STATUS } from '../config/constants.js';

const Application = sequelize.define(
  'Application',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'jobs',
        key: 'id',
      },
    },
    workerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM(
        APPLICATION_STATUS.PENDING,
        APPLICATION_STATUS.ACCEPTED,
        APPLICATION_STATUS.REJECTED,
        APPLICATION_STATUS.WITHDRAWN
      ),
      defaultValue: APPLICATION_STATUS.PENDING,
    },
    appliedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    respondedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'applications',
    timestamps: false,
  }
);

export default Application;
