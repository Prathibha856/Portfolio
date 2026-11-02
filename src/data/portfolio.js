// Professional facts supplied by Prathibha. Add only verified URLs and credentials.

export const ALL_PROJECTS = 'All projects';

export const profile = {
  name: 'Prathibha D',
  focus: 'Full Stack Developer | AI/ML Engineer',
  direction: 'Applied Machine Learning / Data Science',
  introduction: "I'm a final-year Computer Science student. I build web applications and machine learning models. Right now, I'm focusing on getting better at full-stack development, solving LeetCode problems, and getting ready for placements.",
  email: 'prathibhaa2006@gmail.com',
  phone: '+91 80736 80408',
  location: 'Bengaluru, India',
  github: 'https://github.com/Prathibha856',
  linkedin: 'https://linkedin.com/in/prathibha',
  resumeUrl: '/Prathibha_D_Resume.pdf',
};

export const education = [
  {
    degree: 'B.E. Computer Science Engineering (AI/ML)',
    institution: 'East West College of Engineering',
    years: '2023–2027',
    location: 'Bengaluru, Karnataka',
    result: '9.18/10',
    resultLabel: 'Cumulative grade point average',
  },
];

export const currently = [
  'Bengaluru, India',
  'CSE @ East West College (2023–2027)',
  'CGPA 9.18 / 10',
  'Data Analyst Intern @ Bold Analytics',
  'AI/ML Certificate @ IIT Roorkee (In Progress)',
];

export const experience = [
  {
    role: 'AI Full Stack Intern',
    company: 'Indemy Tech Solutions',
    dates: 'July 2026 – Present',
    location: 'India',
    tags: ['Python', 'NLP', 'React.js', 'HTML', 'CSS'],
    summary: 'Building an end-to-end AI content workflow, from raw transcript processing to front-end delivery.',
    responsibilities: [
      'Developed an end-to-end AI automation workflow (YouTube Transcript-to-Blog Generator) using Python and NLP to convert raw video transcripts into structured, SEO-friendly blog content.',
      'Implemented text preprocessing, tokenization, and keyword extraction to streamline the content generation pipeline.',
      'Currently developing front-end web application features using React.js, HTML, and CSS, focusing on responsive UI design and component-based architecture.',
      'Collaborating with the technical team to support upcoming digital product and video content initiatives.',
    ],
  },
  {
    role: 'Junior Data Analyst (OJT)',
    company: 'IFAI Foundation (AI for Bharat Mission)',
    dates: 'October 2026 – Present',
    location: 'Remote',
    tags: ['Data Analysis', 'AI for Bharat Mission'],
    summary: 'Supporting data analysis, dataset management, and technical documentation for a national AI project.',
    responsibilities: [
      'Supporting data analysis, data validation, and management activities for the AIHR Bharat national project.',
      'Organizing and structuring project datasets to support research, reporting, and data-driven decision-making.',
      'Assisting in drafting Software Requirements Specifications (SRS) and technical documentation for the centralized recruitment system.',
      'Handling confidential project data in compliance with data protection policies.',
    ],
  },
  {
    role: 'Data Analyst Intern',
    company: 'Bold Analytics',
    dates: 'April 2026 – May 2026',
    location: 'Remote',
    tags: ['Startup India Registered'],
    summary: 'Working with data to move from exploration to actionable insights.',
    responsibilities: [
      'Cleaned and organized business datasets using Excel and Python, improving data quality for downstream analytics.',
      'Built Power BI dashboards and visualizations for business reporting, enabling faster stakeholder decision-making.',
      'Performed exploratory data analysis to identify trends and insights; applied statistical analysis techniques to support business decisions.',
    ],
  },
];

export const skillGroups = [
  { name: 'Programming', description: 'Core languages', items: ['Python', 'Java', 'C'] },
  { name: 'AI/ML', description: 'Models & evaluation', items: ['Scikit-learn', 'XGBoost', 'Random Forest', 'SVM', 'Supervised Learning', 'Feature Engineering', 'Model Evaluation'] },
  { name: 'NLP & Generative AI', description: 'Language models', items: ['Natural Language Processing (NLP)', 'Large Language Models (LLMs)', 'Retrieval-Augmented Generation (RAG)'] },
  { name: 'Web Development', description: 'Frontend & Backend', items: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Flask', 'REST APIs'] },
  { name: 'Data & Databases', description: 'Storage & processing', items: ['Pandas', 'NumPy', 'SQL', 'MySQL', 'MongoDB'] },
  { name: 'Tools', description: 'Daily workflow', items: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'Postman'] },
  { name: 'Core CS', description: 'Foundations', items: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'DBMS'] }
];

export const projects = [
  {
    slug: 'credit-card-fraud-detection', number: '01', title: 'Credit Card Fraud Detection', category: 'Machine Learning', featured: true,
    summary: 'Detecting fraud in 284K+ highly imbalanced transactions.',
    problem: 'Identify fraudulent transactions in a dataset where only 0.17% of records are fraud.',
    approach: 'Built a Scikit-learn pipeline using SMOTE-ENN resampling and class-weight balancing to improve minority-class sensitivity.',
    result: '98% ROC-AUC on 284K+ imbalanced transactions using SMOTE-ENN and class weighting.',
    metric: '98%', metricLabel: 'ROC-AUC',
    technologies: ['Python', 'Scikit-learn', 'SMOTE-ENN', 'Class weighting'],
    pipeline: ['Transaction data', 'SMOTE-ENN', 'Class weighting', 'Model training', 'Fraud detection'],
    github: null, demo: null,
  },
  {
    slug: 'customer-churn-prediction', number: '02', title: 'Customer Churn Prediction', category: 'Machine Learning', featured: true,
    summary: 'Predicting churn on 7K customer records and explaining the drivers.',
    problem: 'Identify which customers are likely to churn and understand why.',
    approach: 'Built an XGBoost ensemble model with SHAP explainability to surface the features driving churn.',
    result: '86% accuracy; tenure and contract type emerged as primary churn drivers, and the SHAP dashboard projected a 22% churn reduction.',
    metric: '86%', metricLabel: 'prediction accuracy',
    technologies: ['Python', 'XGBoost', 'SHAP', 'Ensemble learning'],
    pipeline: ['Customer data', 'XGBoost ensemble', 'SHAP analysis', 'Retention insights'],
    github: null, demo: null,
  },
  {
    slug: 'busflow', number: '03', title: 'BusFlow', subtitle: 'Real-Time Bus Tracking & Crowd Management', category: 'ML Applications', featured: true,
    summary: 'Real-time bus tracking and crowd prediction for 50+ buses.',
    problem: 'Track buses in real time and predict crowd density to improve the commuting experience.',
    approach: 'Combined a Flask backend with a React dashboard, using Random Forest crowd prediction with engineered weather and holiday features.',
    result: 'Crowd prediction accuracy improved from 55% to 72.4%, with real-time heatmaps and ETA for 50+ buses.',
    metric: '72.4%', metricLabel: 'crowd prediction accuracy',
    technologies: ['Python', 'Flask', 'React.js', 'Random Forest'],
    pipeline: ['GPS bus data', 'Feature engineering', 'Random Forest', 'Crowd prediction', 'React dashboard'],
    github: null, demo: null,
  },
  {
    slug: 'netflix-recommendation-engine', number: '04', title: 'Netflix Recommendation Engine', category: 'Machine Learning', featured: false,
    summary: 'Personalized movie recommendations using SVD and collaborative filtering.',
    problem: 'Recommend relevant movies at scale from 100M+ records.',
    approach: 'Used SVD-based collaborative filtering with scalable pipelines for dimensionality reduction and hyperparameter optimization.',
    result: '0.82 NDCG@10 on 100M+ records with a scalable recommendation pipeline.',
    metric: '0.82', metricLabel: 'NDCG@10',
    technologies: ['Python', 'Scikit-learn', 'SVD', 'Collaborative filtering'],
    pipeline: ['100M+ records', 'SVD', 'Collaborative filtering', 'Top-N recommendations'],
    github: null, demo: null,
  },
  {
    slug: 'stellar-stories', number: '05', title: 'Stellar Stories', subtitle: 'Space Weather Visualizer', category: 'Web & Data', featured: false,
    summary: 'Interactive space weather visualizer powered by 6+ NASA APIs.',
    problem: 'Make space weather data easier to explore through real-time visualization.',
    approach: 'Built a React.js visualizer consuming 6+ NASA APIs with real-time geomagnetic storm tracking and 3D visualization.',
    result: 'End-to-end prototype delivered for the NASA Space Apps Challenge 2025.',
    metric: '6+', metricLabel: 'NASA APIs integrated',
    technologies: ['React.js', 'NASA Open APIs', '3D visualization'],
    pipeline: ['NASA APIs', 'Space weather data', 'Real-time tracking', 'Visualization'],
    github: null, demo: null,
  },
  {
    slug: 'flight-booking-system', number: '06', title: 'Flight Booking System', category: 'Web & Data', featured: false,
    summary: 'Full-stack booking app backed by SQL analysis of 10K+ flight records.',
    problem: 'Manage flight search, bookings, and cancellations with fast, reliable queries.',
    approach: 'Built a Python and Flask application with secure authentication, plus Pandas analysis of 10K+ flight records for pricing trends.',
    result: 'SQL queries optimized from 1.2s to 180ms, with an end-to-end booking workflow implemented.',
    metric: '6.7×', metricLabel: 'faster SQL queries',
    technologies: ['Python', 'Flask', 'SQL', 'Pandas'],
    pipeline: ['Authentication', 'Flight search', 'Booking / cancellation', 'SQL optimization'],
    github: null, demo: null,
  },
  {
    slug: 'kidrove-workshop-portal', number: '07', title: 'Kidrove Workshop Portal', category: 'Web & Data', featured: false,
    summary: 'MERN workshop registration platform for 200+ concurrent users.',
    problem: 'Streamline workshop registration with real-time tracking.',
    approach: 'Built a full-stack MERN application with a RESTful API and MongoDB storage.',
    result: 'Supports 200+ concurrent users with real-time registration tracking.',
    metric: '200+', metricLabel: 'concurrent users',
    technologies: ['React.js', 'Express', 'MongoDB', 'REST APIs'],
    pipeline: ['Registration', 'REST API', 'MongoDB', 'Real-time tracking'],
    github: null, demo: null,
  },
  {
    slug: 'ai-timetable-generation', number: '08', title: 'AI Timetable Generation System', category: 'Web & Data', featured: false,
    summary: 'Constraint-based scheduler that cuts manual timetable effort by 70%.',
    problem: 'Generate conflict-free timetables automatically, aligned with NEP 2020.',
    approach: 'Built a constraint-based scheduling algorithm with a JavaScript interface.',
    result: 'Reduced manual scheduling effort by 70% with conflict-free timetable output.',
    metric: '70%', metricLabel: 'less manual effort',
    technologies: ['JavaScript', 'HTML/CSS', 'Constraint-based algorithms'],
    pipeline: ['Constraints', 'Scheduling algorithm', 'Conflict resolution', 'Timetable output'],
    github: null, demo: null,
  },
  {
    slug: 'ml-foundations', number: '09', title: 'Machine Learning Foundations', category: 'Machine Learning', featured: false,
    summary: 'Core ML algorithms implemented from scratch with NumPy.',
    problem: 'Build a robust ML foundation by implementing algorithms from first principles.',
    approach: 'Implemented Linear Regression, Decision Trees, and K-Means in NumPy, validated against Scikit-learn on Iris and Boston Housing datasets.',
    result: 'From-scratch implementations validated with k-fold cross-validation and evaluation metrics.',
    metric: 'From scratch', metricLabel: 'ML implementations',
    technologies: ['Python', 'NumPy', 'Scikit-learn', 'Cross-validation'],
    pipeline: ['NumPy', 'LR / Trees / K-Means', 'k-fold validation', 'Benchmark vs Scikit-learn'],
    github: null, demo: null,
  },
  {
    slug: 'covid-19-data-analysis', number: '10', title: 'COVID-19 Data Analysis', category: 'Data Analytics', featured: false,
    summary: 'Analyzing COVID-19 case trends and vaccination data across regions.',
    problem: 'Understand infection patterns and recovery rates from pandemic data.',
    approach: 'Used Pandas for cleaning and analysis, with Matplotlib visualizations across regions.',
    result: 'Identified infection patterns and recovery rates across multiple regions.',
    metric: 'Multi-region', metricLabel: 'trend analysis',
    technologies: ['Python', 'Pandas', 'Matplotlib'],
    pipeline: ['COVID-19 data', 'Cleaning', 'Trend analysis', 'Visualizations'],
    github: null, demo: null,
  },
];

export const achievements = [
  { title: 'Academic Excellence', label: 'CGPA 9.18 / 10', description: 'Maintaining a strong academic record while building applied ML projects.' },
  { title: 'International Hackathons', label: 'NASA Space Apps · Bit & Build 2025', description: 'Delivered end-to-end prototypes under time pressure; shortlisted at HackZion V3 in the AI/ML domain.' },
  { title: 'Mentoring & Community', label: 'Peer contribution', description: 'Actively support junior students in building projects, understanding algorithms, and developing programming skills.' },
];

export const certifications = [
  { title: 'Professional Certificate Programme in Computer Science Engineering (PCP-CSE)', issuer: 'i-Hub Divyasampark, IIT Roorkee (via Intellipaat)', date: '2025–2026', description: 'Comprehensive certification covering Data Science, Machine Learning, Deep Learning, and emerging AI technologies with hands-on projects.', url: null },
  { title: 'Introduction to IoT', issuer: 'NPTEL, IIT Kharagpur', date: '2024 · Elite Grade', url: null },
  { title: 'Industry 4.0 & Industrial IoT', issuer: 'NPTEL', date: '2025 · Elite Grade', url: null },
  { title: 'Master AI Engineering: Problem Definition to Deployment', issuer: 'Udemy', date: '2026', url: null },
  { title: 'Python & Java: Master Backend & Frontend Web Dev', issuer: 'Udemy', date: '2026', url: null },
  { title: 'SQL (Basic) Skill Certification', issuer: 'HackerRank', date: '2025', url: null },
  { title: 'JavaScript Bootcamp', issuer: 'LetsUpgrade, NSDC & GDG MAD', date: '2025', url: null },
];

export function filterProjects(category) {
  return projects.filter((project) => category === ALL_PROJECTS || project.category === category);
}
