import User from '../models/User.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import Review from '../models/Review.js';
import { Op } from 'sequelize';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/constants.js';

// Get worker profile
export const getWorkerProfile = async (req, res) => {
  try {
    const worker = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password', 'otp', 'otpExpires'] },
    });

    if (!worker || worker.role !== 'worker') {
      return res.status(404).json({ success: false, message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    res.json({ success: true, data: worker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create worker profile with additional details
export const createWorkerProfile = async (req, res) => {
  try {
    const { phone, aadhaar, maritalStatus, skills, experience, bio, address } = req.body;
    const profilePhoto = req.file?.path;

    // Get current user
    const worker = await User.findByPk(req.user.id);
    if (!worker || worker.role !== 'worker') {
      return res.status(403).json({
        success: false,
        message: 'Only workers can create worker profiles',
      });
    }

    // Update worker profile with additional details
    const updateData = {
      phone: phone || worker.phone,
      aadhaar,
      maritalStatus,
      skills,
      experience: experience || 0,
      bio,
      address,
    };

    if (profilePhoto) {
      updateData.profilePhoto = profilePhoto;
    }

    await worker.update(updateData);

    res.status(201).json({
      success: true,
      message: 'Worker profile created successfully',
      data: worker,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update worker profile
export const updateWorkerProfile = async (req, res) => {
  try {
    const { phone, aadhaar, maritalStatus, skills, experience, bio, address } = req.body;
    const profilePhoto = req.file?.path;

    const worker = await User.findByPk(req.user.id);
    if (!worker || worker.role !== 'worker') {
      return res.status(403).json({
        success: false,
        message: 'Only workers can update worker profiles',
      });
    }

    const updateData = {};
    if (phone) updateData.phone = phone;
    if (aadhaar) updateData.aadhaar = aadhaar;
    if (maritalStatus) updateData.maritalStatus = maritalStatus;
    if (skills) updateData.skills = skills;
    if (experience !== undefined) updateData.experience = experience;
    if (bio) updateData.bio = bio;
    if (address) updateData.address = address;
    if (profilePhoto) updateData.profilePhoto = profilePhoto;

    await worker.update(updateData);

    res.json({
      success: true,
      message: 'Worker profile updated successfully',
      data: worker,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get available jobs for worker
export const getAvailableJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, location, jobType, search } = req.query;
    const offset = (page - 1) * limit;

    const where = { isActive: true };
    if (location) {
      where.location = { [Op.iLike]: `%${location}%` };
    }
    if (jobType) {
      where.jobType = jobType;
    }
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const jobs = await Job.findAll({
      where,
      include: [
        {
          model: User,
          as: 'employer',
          attributes: ['id', 'name', 'email'],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
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

// Search jobs
export const searchJobs = async (req, res) => {
  try {
    const { q, location, jobType } = req.query;

    const where = { isActive: true };
    if (q) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } },
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
          as: 'employer',
          attributes: ['id', 'name', 'email'],
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

// Apply for a job
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { message } = req.body;

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      where: {
        workerId: req.user.id,
        jobId,
      },
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job',
      });
    }

    const application = await Application.create({
      workerId: req.user.id,
      jobId,
      message,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get worker applications
export const getApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    const where = { workerId: req.user.id };
    if (status) {
      where.status = status;
    }

    const applications = await Application.findAll({
      where,
      include: [
        {
          model: Job,
          attributes: ['id', 'title', 'location', 'jobType'],
          as: 'job',
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['appliedAt', 'DESC']],
    });

    const total = await Application.count({ where });

    res.json({
      success: true,
      data: applications,
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

// Get worker reviews
export const getWorkerReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { revieweeId: req.user.id },
      include: [
        {
          model: User,
          as: 'reviewer',
          attributes: ['id', 'name', 'profilePhoto'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
