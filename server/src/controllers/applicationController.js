import Application from '../models/Application.js';
import User from '../models/User.js';
import Job from '../models/Job.js';

export const submitApplication = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
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
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findByPk(applicationId, {
      include: [
        {
          model: Job,
          attributes: ['title', 'location'],
        },
      ],
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ data: application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const withdrawApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findByPk(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.workerId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await application.update({ status: 'withdrawn' });

    res.json({ message: 'Application withdrawn successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
