import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { JOB_TYPES } from '../config/constants.js';

const Job = sequelize.define(
  'Job',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobType: {
      type: DataTypes.ENUM(JOB_TYPES.FULL_TIME, JOB_TYPES.PART_TIME, JOB_TYPES.CONTRACT),
      defaultValue: JOB_TYPES.FULL_TIME,
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'jobs',
    timestamps: false,
  }
);

export default Job;
