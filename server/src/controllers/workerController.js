import User from '../models/User.js';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { validateUpdateProfile } from '../middleware/validators.js';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../config/constants.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    res.json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { error, value } = validateUpdateProfile(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    await user.update(value);

    res.json({
      message: SUCCESS_MESSAGES.PROFILE_UPDATED,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: ERROR_MESSAGES.JOB_NOT_FOUND });
    }

    const existingApplication = await Application.findOne({
      where: { jobId, workerId: req.user.id },
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    const application = await Application.create({
      jobId,
      workerId: req.user.id,
    });

    res.status(201).json({
      message: SUCCESS_MESSAGES.APPLICATION_SUBMITTED,
      data: application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { workerId: req.user.id },
      include: [
        {
          model: Job,
          attributes: ['title', 'location', 'salary'],
        },
      ],
      order: [['appliedAt', 'DESC']],
    });

    res.json({ data: applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
