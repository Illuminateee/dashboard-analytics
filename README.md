# Technical Test Dashboard

A modern data visualization dashboard built with Next.js and Express.js, featuring real-time analytics and interactive data tables.

## 🚀 Features

- **Interactive Data Visualizations**: Multiple chart types including pie charts, bar charts, and area charts
- **Real-time Updates**: Auto-refreshing data every 30 seconds
- **Advanced Data Table**: Sortable, filterable, and paginated table with 1M+ records
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **API Documentation**: Swagger/OpenAPI documentation
- **Performance Optimized**: Efficient data fetching and caching

## 📊 Data Visualizations

1. **Gender Distribution** - Pie chart showing male/female distribution
2. **Digital Interest Analysis** - Bar chart of user interests (Social Media, E-commerce, Gaming, etc.)
3. **Location Type Distribution** - Pie chart of location types (urban, suburban, etc.)
4. **Age Group Analysis** - Area chart of age demographics
5. **Device Brand Distribution** - Pie chart of device preferences

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Responsive chart library
- **TanStack Table** - Powerful data table
- **Axios** - HTTP client for API calls

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Swagger** - API documentation
- **CSV Parser** - Data import from CSV files

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB 4.4+
- npm or yarn

## 🚀 Quick Start

### 1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd technical-test-dash
\`\`\`

### 2. Setup Backend
\`\`\`bash
cd backend
npm install

# Start MongoDB service
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Seed the database with CSV data
npm run seed

# Start backend server
npm run dev
\`\`\`

### 3. Setup Frontend
\`\`\`bash
# In the root directory
npm install

# Start frontend development server
npm run dev
\`\`\`

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs

## 📚 API Endpoints

### User Data
- \`GET /api/users\` - Get paginated users with filters
- \`GET /api/users?page=1&limit=50&gender=Male\` - Get filtered users

### Analytics
- \`GET /api/analytics/gender\` - Gender distribution
- \`GET /api/analytics/digital-interest\` - Digital interest statistics
- \`GET /api/analytics/location\` - Location type distribution
- \`GET /api/analytics/age-groups\` - Age group analysis
- \`GET /api/analytics/devices\` - Device brand statistics

### Health Check
- \`GET /health\` - Server health status

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/technical_test_dash
NODE_ENV=development
\`\`\`

**Frontend (.env.local)**
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

## 📊 Data Structure

The application processes a CSV dataset with the following fields:
- Number, Name of Location, Date, Login Hour
- Name, Age, Gender, Email, Phone Number
- Brand Device, Digital Interest, Location Type

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Dashboard auto-refreshes every 30 seconds
- **Interactive Charts**: Hover effects and tooltips
- **Advanced Filtering**: Multi-field filtering in data table
- **Performance Optimized**: Lazy loading and efficient rendering

## 🚀 Performance Features

- **Database Indexing**: Optimized MongoDB indexes for fast queries
- **Pagination**: Efficient data loading with pagination
- **Caching**: Client-side caching for improved performance
- **Rate Limiting**: API rate limiting for security
- **Compression**: GZIP compression enabled

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin request handling
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Secure data handling

## 📱 Real-time Features

- Auto-refresh dashboard every 30 seconds
- Real-time data visualization updates
- Live statistics and counters
- Performance monitoring

## 🧪 Testing

\`\`\`bash
# Run frontend tests
npm run test

# Run backend tests
cd backend && npm test

# Run linting
npm run lint
\`\`\`

## 🚀 Deployment

### Production Build
\`\`\`bash
# Frontend
npm run build
npm start

# Backend
cd backend
npm start
\`\`\`

### Environment Setup
1. Set up MongoDB Atlas or local MongoDB
2. Configure production environment variables
3. Deploy frontend to Vercel/Netlify
4. Deploy backend to Heroku/DigitalOcean

## 📈 Performance Metrics

- **API Response Time**: < 30 seconds (as required)
- **Database Queries**: Optimized with indexes
- **Frontend Loading**: < 3 seconds initial load
- **Real-time Updates**: 30-second intervals

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
