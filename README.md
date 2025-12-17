# AI Disease Progression Predictor

A modern, responsive web application for predicting patient health progression using AI technology.

## Features

- 🏥 **Hospital Management**: Complete dashboard for medical institutions
- 👤 **Individual Health Tracking**: Personal health monitoring and predictions
- 🤖 **AI-Powered Predictions**: Advanced disease progression analysis
- 📊 **Analytics Dashboard**: Comprehensive health data visualization
- 🌙 **Dark Mode Support**: Full theme switching capability
- 📱 **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Charts**: Recharts
- **UI Components**: Radix UI

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd G-Project-Frontend-master
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional):
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Quick Deploy

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in [Vercel](https://vercel.com)
3. Configure environment variables (if needed):
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
   - `NEXT_PUBLIC_SITE_URL`: Your site URL
4. Deploy!

### Manual Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to configure your deployment

### Environment Variables

Create environment variables in Vercel dashboard:

- `NEXT_PUBLIC_API_URL`: Backend API endpoint (optional)
- `NEXT_PUBLIC_SITE_URL`: Your production site URL

## Project Structure

```
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (business)/     # Business dashboard pages
│   ├── (individual)/    # Individual user pages
│   └── layout.tsx       # Root layout
├── components/          # Reusable components
├── context/             # React contexts
├── lib/                 # Utility functions
├── public/              # Static assets
└── styles/              # Global styles
```

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (lg, xl)

## Build

```bash
npm run build
```

## Production

```bash
npm start
```

## Features by User Type

### Individual Users
- Health data input
- Disease progression predictions
- Personal dashboard
- Settings management

### Business Users
- Patient management
- Analytics dashboard
- AI explanations
- Report generation
- Data upload

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved

## Support

For issues and questions, please contact the development team.
