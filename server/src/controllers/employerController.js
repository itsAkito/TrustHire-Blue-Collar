import Job from '../models/Job.js';
import Application from '../models/Application.js';
import User from '../models/User.js';
import Employee from '../models/Employee.js';
import { Op } from 'sequelize';
import { validateUpdateProfile } from '../middleware/validators.js';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../config/constants.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { error, value } = validateUpdateProfile(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    await user.update(value);

    res.json({
      success: true,
      message: SUCCESS_MESSAGES.PROFILE_UPDATED,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

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
      success: true,
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

    res.json({ success: true, data: applications });
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
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const job = await Job.findByPk(application.jobId);
    if (job.employerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await application.update({ status });

    res.json({ success: true, message: 'Application status updated', data: application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ==================== EMPLOYEE MANAGEMENT ====================

// Add employee
export const addEmployee = async (req, res) => {
  try {
    const { name, email, phone, aadhaar, position, address, salary, joiningDate } = req.body;
    const profilePhoto = req.file ? req.file.path : null;

    // Validation
    if (!name || !email || !phone || !aadhaar) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and Aadhaar are required',
      });
    }

    // Check if Aadhaar already exists
    const existingEmployee = await Employee.findOne({ where: { aadhaar } });
    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: 'Employee with this Aadhaar already exists',
      });
    }

    // Create employee
    const employee = await Employee.create({
      employerId: req.user.id,
      name,
      email,
      phone,
      aadhaar,
      profilePhoto,
      position: position || null,
      address: address || null,
      salary: salary || null,
      joiningDate: joiningDate || new Date(),
      status: 'active',
    });

    res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      data: employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all employees for employer
export const getEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    const where = { employerId: req.user.id };
    if (status) {
      where.status = status;
    }

    const employees = await Employee.findAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const total = await Employee.count({ where });

    res.json({
      success: true,
      data: employees,
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

// Get employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findByPk(employeeId);

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    if (employee.employerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.json({ success: true, data: employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update employee
export const updateEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { name, email, phone, position, address, salary, joiningDate, status } = req.body;
    const profilePhoto = req.file ? req.file.path : null;

    const employee = await Employee.findByPk(employeeId);

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    if (employee.employerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (position) updateData.position = position;
    if (address) updateData.address = address;
    if (salary) updateData.salary = salary;
    if (joiningDate) updateData.joiningDate = joiningDate;
    if (status) updateData.status = status;
    if (profilePhoto) updateData.profilePhoto = profilePhoto;

    await employee.update(updateData);

    res.json({
      success: true,
      message: 'Employee updated successfully',
      data: employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findByPk(employeeId);

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    if (employee.employerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await employee.destroy();

    res.json({
      success: true,
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
