import Job from '../models/Job.js';
import Application from '../models/Application.js';
import User from '../models/User.js';
import { Op } from 'sequelize';

export const getDashboardStats = async (req, res) => {
  try {
    const totalJobs = await Job.count({
      where: { employerId: req.user.id },
    });

    const activeJobs = await Job.count({
      where: { employerId: req.user.id, isActive: true },
    });

    const totalApplications = await Application.count({
      where: {
        jobId: {
          [Op.in]: await Job.findAll({
            attributes: ['id'],
            where: { employerId: req.user.id },
            raw: true,
          }).then((jobs) => jobs.map((j) => j.id)),
        },
      },
    });

    const workersHired = await Application.count({
      where: {
        jobId: {
          [Op.in]: await Job.findAll({
            attributes: ['id'],
            where: { employerId: req.user.id },
            raw: true,
          }).then((jobs) => jobs.map((j) => j.id)),
        },
        status: 'accepted',
      },
    });

    res.json({
      data: {
        totalJobs,
        activeJobs,
        totalApplications,
        workersHired,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApplicationsForEmployer = async (req, res) => {
  try {
    const employerJobs = await Job.findAll({
      where: { employerId: req.user.id },
      attributes: ['id'],
      raw: true,
    });

    const jobIds = employerJobs.map((job) => job.id);

    const applications = await Application.findAll({
      where: { jobId: { [Op.in]: jobIds } },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'skills', 'rating'],
          as: 'worker',
        },
        {
          model: Job,
          attributes: ['title', 'location'],
          as: 'job',
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

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const job = await Job.findByPk(application.jobId);
    if (job.employerId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await application.update({ status });

    res.json({ message: 'Application status updated', data: application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
