import Job from '../models/Job.js';
import Application from '../models/Application.js';
import User from '../models/User.js';
import { validateJobCreation } from '../middleware/validators.js';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../config/constants.js';

export const createJob = async (req, res) => {
  try {
    const { error, value } = validateJobCreation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const job = await Job.create({
      employerId: req.user.id,
      title: value.title,
      description: value.description,
      location: value.location,
      salary: value.salary,
      jobType: value.jobType,
      requirements: value.requirements,
    });

    res.status(201).json({
      message: SUCCESS_MESSAGES.JOB_CREATED,
      data: job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { search, location, jobType } = req.query;
    let where = { employerId: req.user.id };

    const jobs = await Job.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    const jobsWithApplicationCount = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await Application.count({
          where: { jobId: job.id },
        });
        return {
          ...job.dataValues,
          applicationsCount: applicationCount,
        };
      })
    );

    res.json({ data: jobsWithApplicationCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { error, value } = validateJobCreation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: ERROR_MESSAGES.JOB_NOT_FOUND });
    }

    if (job.employerId !== req.user.id) {
      return res.status(403).json({ message: ERROR_MESSAGES.FORBIDDEN });
    }

    await job.update(value);

    res.json({
      message: SUCCESS_MESSAGES.JOB_UPDATED,
      data: job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: ERROR_MESSAGES.JOB_NOT_FOUND });
    }

    if (job.employerId !== req.user.id) {
      return res.status(403).json({ message: ERROR_MESSAGES.FORBIDDEN });
    }

    await job.destroy();

    res.json({ message: SUCCESS_MESSAGES.JOB_DELETED });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAvailableJobs = async (req, res) => {
  try {
    const { search, location, jobType } = req.query;
    let where = { isActive: true };

    if (search) {
      where = {
        ...where,
        [require('sequelize').Op.or]: [
          { title: { [require('sequelize').Op.iLike]: `%${search}%` } },
          { description: { [require('sequelize').Op.iLike]: `%${search}%` } },
        ],
      };
    }

    if (location) {
      where.location = { [require('sequelize').Op.iLike]: `%${location}%` };
    }

    if (jobType) {
      where.jobType = jobType;
    }

    const jobs = await Job.findAll({
      where,
      include: [
        {
          model: User,
          attributes: ['name', 'rating'],
          as: 'employer',
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({ data: jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
