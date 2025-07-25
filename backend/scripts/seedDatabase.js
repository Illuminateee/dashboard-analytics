import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('=== Starting seed script ===');
console.log('Basic imports loaded successfully');

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Current directory:', __dirname);

// Age group calculation function
const getAgeGroup = (age) => {
  if (age <= 25) return '18-25';
  if (age <= 35) return '26-35';
  if (age <= 45) return '36-45';
  if (age <= 55) return '46-55';
  return '55+';
};

const seedDatabase = async () => {
  let connectDB, User;
  
  try {
    console.log('Starting database seeding...');
    
    // Dynamic imports with error handling
    console.log('Importing database connection...');
    connectDB = (await import('../config/database.js')).default;
    console.log('Database connection imported successfully');
    
    console.log('Importing User model...');
    User = (await import('../models/User.js')).default;
    console.log('User model imported successfully');
    
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected to MongoDB successfully');
    
    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    console.log('Cleared existing data');
    
    const users = [];
    const batchSize = 1000;
    let processedCount = 0;
    
    // Correct path: go up from scripts/ to backend/, then up to root/
    const csvPath = path.join(__dirname, '../../Dataset.csv');
    console.log(`Reading CSV file from: ${csvPath}`);
    
    // Check if file exists
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found at: ${csvPath}`);
    }
    console.log('CSV file found successfully');
    
    return new Promise((resolve, reject) => {
      console.log('Starting CSV parsing...');
      
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          // Skip first row if it's header
          if (row[''] === '0' || !row.Name) return;
          
          const age = parseInt(row.Age) || 0;
          
          const user = {
            number: parseInt(row.Number) || 0,
            nameOfLocation: row['Name of Location'],
            date: row.Date,
            loginHour: row['Login Hour'],
            name: row.Name,
            age: age,
            gender: row.gender,
            email: row.Email,
            noTelp: row['No Telp'],
            brandDevice: row['Brand Device'],
            digitalInterest: row['Digital Interest'],
            locationType: row['Location Type'],
            ageGroup: getAgeGroup(age) // Add ageGroup field
          };
          
          users.push(user);
          
          // Insert in batches
          if (users.length === batchSize) {
            insertBatch(users.splice(0, batchSize), User)
              .then(() => {
                processedCount += batchSize;
                console.log(`Processed ${processedCount} records`);
              })
              .catch(reject);
          }
        })
        .on('end', async () => {
          try {
            console.log('CSV parsing completed');
            
            // Insert remaining users
            if (users.length > 0) {
              console.log(`Inserting final batch of ${users.length} records`);
              await insertBatch(users, User);
              processedCount += users.length;
            }
            
            console.log(`Database seeding completed! Total records: ${processedCount}`);
            
            // Log some sample data to verify ageGroup is added
            const sampleUsers = await User.find({}).limit(5);
            console.log('Sample users with ageGroup:', sampleUsers.map(u => ({ 
              name: u.name, 
              age: u.age, 
              ageGroup: u.ageGroup 
            })));
            
            resolve();
          } catch (error) {
            console.error('Error in final batch:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('CSV parsing error:', error);
          reject(error);
        });
    });
    
  } catch (error) {
    console.error('Database seeding failed:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
};

const insertBatch = async (batch, User) => {
  try {
    await User.insertMany(batch, { ordered: false });
  } catch (error) {
    // Handle duplicate key errors gracefully
    if (error.code !== 11000) {
      console.error('Insert batch error:', error);
      throw error;
    }
  }
};

// Main execution
console.log('Checking if script is run directly...');
console.log('import.meta.url:', import.meta.url);
console.log('process.argv[1]:', process.argv[1]);

// Run seeding
console.log('Starting seedDatabase function...');
seedDatabase()
  .then(() => {
    console.log('Seeding completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });

export default seedDatabase;