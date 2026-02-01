import Job from '../models/Job.js';
import Application from '../models/Application.js';
import User from '../models/User.js';
import { Op } from 'sequelize';
import { validateJobCreation } from '../middleware/validators.js';
import { SUCCESS_MESSAGES, ERROR_MESSAGES, JOB_TYPES } from '../config/constants.js';

// Create a new job
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
      success: true,
      message: SUCCESS_MESSAGES.JOB_CREATED,
      data: job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all jobs (public endpoint)
export const getAllJobs = async (req, res) => {
  try {
    const { search, location, jobType, salary, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const where = { isActive: true };

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (location) {
      where.location = { [Op.iLike]: `%${location}%` };
    }

    if (jobType) {
      where.jobType = jobType;
    }

    if (salary) {
      where.salary = { [Op.gte]: salary };
    }

    const jobs = await Job.findAll({
      where,
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'profilePhoto', 'rating'],
          as: 'employer',
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const total = await Job.count({ where });

    res.json({
      success: true,
      data: jobs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get employer's jobs
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

    res.json({ success: true, data: jobsWithApplicationCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'profilePhoto', 'rating'],
          as: 'employer',
        },
      ],
    });

    if (!job) {
      return res.status(404).json({ success: false, message: ERROR_MESSAGES.JOB_NOT_FOUND });
    }

    res.json({ success: true, data: job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update job
export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { error, value } = validateJobCreation(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: ERROR_MESSAGES.JOB_NOT_FOUND });
    }

    if (job.employerId !== req.user.id) {
      return res.status(403).json({ success: false, message: ERROR_MESSAGES.FORBIDDEN });
    }

    await job.update(value);

    res.json({
      success: true,
      message: SUCCESS_MESSAGES.JOB_UPDATED,
      data: job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: ERROR_MESSAGES.JOB_NOT_FOUND });
    }

    if (job.employerId !== req.user.id) {
      return res.status(403).json({ success: false, message: ERROR_MESSAGES.FORBIDDEN });
    }

    await job.destroy();

    res.json({ success: true, message: SUCCESS_MESSAGES.JOB_DELETED });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get available jobs (public - for workers)
export const getAvailableJobs = async (req, res) => {
  try {
    const { search, location, jobType } = req.query;
    let where = { isActive: true };

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (location) {
      where.location = { [Op.iLike]: `%${location}%` };
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

    res.json({ success: true, data: jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get job applications
export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: ERROR_MESSAGES.JOB_NOT_FOUND });
    }

    if (job.employerId !== req.user.id) {
      return res.status(403).json({ success: false, message: ERROR_MESSAGES.FORBIDDEN });
    }

    const applications = await Application.findAll({
      where: { jobId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'phone', 'skills', 'rating', 'profilePhoto'],
          as: 'worker',
        },
      ],
      order: [['appliedAt', 'DESC']],
    });

    res.json({ success: true, data: applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
