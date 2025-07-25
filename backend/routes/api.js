import express from 'express';
import User from '../models/User.js';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get paginated users data
 */
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 50, 1000);
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    if (req.query.gender) filter.gender = req.query.gender;
    if (req.query.digitalInterest) filter.digitalInterest = req.query.digitalInterest;
    if (req.query.locationType) filter.locationType = req.query.locationType;
    if (req.query.brandDevice) filter.brandDevice = req.query.brandDevice;
    if (req.query.ageGroup) filter.ageGroup = req.query.ageGroup;
    
    const [users, total] = await Promise.all([
      User.find(filter).skip(skip).limit(limit).lean(),
      User.countDocuments(filter)
    ]);
    
    res.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /api/analytics/gender:
 *   get:
 *     summary: Get gender distribution analytics with filters
 */
router.get('/analytics/gender', async (req, res) => {
  try {
    // Build filter object from query parameters
    const filter = {};
    if (req.query.ageGroup) filter.ageGroup = req.query.ageGroup;
    if (req.query.brandDevice) filter.brandDevice = req.query.brandDevice;
    if (req.query.locationType) filter.locationType = req.query.locationType;
    if (req.query.digitalInterest) filter.digitalInterest = req.query.digitalInterest;
    // Note: Don't filter by gender for gender analytics

    console.log('Gender analytics filter:', filter);

    const genderStats = await User.aggregate([
      { $match: filter }, // Apply filters
      {
        $group: {
          _id: '$gender',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          gender: '$_id',
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ]);

    console.log('Gender stats result:', genderStats);

    res.json({
      success: true,
      data: genderStats
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /api/analytics/location:
 *   get:
 *     summary: Get location type distribution analytics with filters
 */
router.get('/analytics/location', async (req, res) => {
  try {
    // Build filter object from query parameters
    const filter = {};
    if (req.query.ageGroup) filter.ageGroup = req.query.ageGroup;
    if (req.query.brandDevice) filter.brandDevice = req.query.brandDevice;
    if (req.query.digitalInterest) filter.digitalInterest = req.query.digitalInterest;
    if (req.query.gender) filter.gender = req.query.gender;
    // Note: Don't filter by locationType for location analytics

    console.log('Location analytics filter:', filter);

    const locationStats = await User.aggregate([
      { $match: filter }, // Apply filters
      {
        $group: {
          _id: '$locationType',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          locationType: '$_id',
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: locationStats
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /api/analytics/age-groups:
 *   get:
 *     summary: Get age group distribution analytics with filters
 */
router.get('/analytics/age-groups', async (req, res) => {
  try {
    // Build filter object from query parameters
    const filter = {};
    if (req.query.brandDevice) filter.brandDevice = req.query.brandDevice;
    if (req.query.locationType) filter.locationType = req.query.locationType;
    if (req.query.digitalInterest) filter.digitalInterest = req.query.digitalInterest;
    if (req.query.gender) filter.gender = req.query.gender;
    // Note: Don't filter by ageGroup for age group analytics

    console.log('Age group analytics filter:', filter);

    // Use ageGroup field directly if it exists, otherwise calculate it
    const ageGroupStats = await User.aggregate([
      { $match: filter }, // Apply filters first
      {
        $addFields: {
          computedAgeGroup: {
            $cond: {
              if: { $ne: ['$ageGroup', null] },
              then: '$ageGroup', // Use existing ageGroup field
              else: {
                $switch: {
                  branches: [
                    { case: { $lte: ['$age', 25] }, then: '18-25' },
                    { case: { $lte: ['$age', 35] }, then: '26-35' },
                    { case: { $lte: ['$age', 45] }, then: '36-45' },
                    { case: { $lte: ['$age', 55] }, then: '46-55' },
                    { case: { $gt: ['$age', 55] }, then: '55+' }
                  ],
                  default: 'Unknown'
                }
              }
            }
          }
        }
      },
      {
        $group: {
          _id: '$computedAgeGroup',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          ageGroup: '$_id',
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: ageGroupStats
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /api/analytics/digital-interest:
 *   get:
 *     summary: Get digital interest distribution analytics with filters
 */
router.get('/analytics/digital-interest', async (req, res) => {
  try {
    // Build filter object from query parameters
    const filter = {};
    if (req.query.ageGroup) filter.ageGroup = req.query.ageGroup;
    if (req.query.brandDevice) filter.brandDevice = req.query.brandDevice;
    if (req.query.locationType) filter.locationType = req.query.locationType;
    if (req.query.gender) filter.gender = req.query.gender;
    // Note: Don't filter by digitalInterest for digital interest analytics

    const digitalInterestStats = await User.aggregate([
      { $match: filter }, // Apply filters
      {
        $group: {
          _id: '$digitalInterest',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          digitalInterest: '$_id',
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: digitalInterestStats
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /api/analytics/devices:
 *   get:
 *     summary: Get device brand distribution analytics with filters
 */
router.get('/analytics/devices', async (req, res) => {
  try {
    // Build filter object from query parameters
    const filter = {};
    if (req.query.ageGroup) filter.ageGroup = req.query.ageGroup;
    if (req.query.locationType) filter.locationType = req.query.locationType;
    if (req.query.digitalInterest) filter.digitalInterest = req.query.digitalInterest;
    if (req.query.gender) filter.gender = req.query.gender;
    // Note: Don't filter by brandDevice for device analytics

    const deviceStats = await User.aggregate([
      { $match: filter }, // Apply filters
      {
        $group: {
          _id: '$brandDevice',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          brandDevice: '$_id',
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: deviceStats
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /api/filter-options:
 *   get:
 *     summary: Get available filter options
 */
router.get('/filter-options', async (req, res) => {
  try {
    // Get all unique values for each filter field
    const [genders, deviceBrands, locationTypes, digitalInterests] = await Promise.all([
      User.distinct('gender'),
      User.distinct('brandDevice'),
      User.distinct('locationType'),
      User.distinct('digitalInterest')
    ]);

    // Age groups are calculated, so we'll provide the standard ranges
    const ageGroups = ['18-25', '26-35', '36-45', '46-55', '55+'];

    res.json({
      success: true,
      data: {
        genders: genders.filter(Boolean).sort(),
        deviceBrands: deviceBrands.filter(Boolean).sort(),
        locationTypes: locationTypes.filter(Boolean).sort(),
        digitalInterests: digitalInterests.filter(Boolean).sort(),
        ageGroups: ageGroups
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;