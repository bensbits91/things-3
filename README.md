# Things 3

This is a [Next.js](https://nextjs.org) project designed to manage and display "Things" in a structured and interactive way. The application is built with modern web technologies and optimized for performance, accessibility, and scalability.

The Things app is a personal tracker and rating system for all the things you do, watch, read, play, listen to, and so on.

## Live Demo

It's a work in progress, but it's live here: https://things-3.vercel.app

## Track, Rate & Discover

Track anything. Kind of like Goodreads but for everything. See what you've done, what you're currently doing, and what you want to do. Track how many times you've watched a movie, read a book, played a game, and so forth.

Rate anything. See your favorite things across different categories. View all of your favorite things in fun, engaging ways.

Discover new things in all-kindsa ways. Get recommondations on books you might like based on movies you've seen. Find new podcasts based on the video games you play. See what your friends are into. Find things by genre, tags, language, country, decade, and whatnot.

### Supported "Thing" Types

Add anything just by typing a name. Then add ratings, indicate your status, add a review, add notes and tags, and more.

Currently supported things with search results include books, movies, TV shows and video games. If you add a thing that is a supported type, see search results and select the thing you want to track. When you add a thing that supports search results, you can see the cover art, description, related people, and more.

#### More Types on the Way!

Search results coming soon for podcasts, bands, albums, songs, board and card games, actors and stand-up comics, athletes and teams, and comic books.

I designed and developed the backend to support adding search results for new types of things in the future. The backend also normalizes any data needed by the frontend, so client apps aren't affected by the addition of new types. We can always add "unsupported" things (without search results).

## Features

- **Dynamic Grid and Table Views**: Display "Things" in responsive grids and tables.
- **Authentication**: Secure user authentication and session management using [Auth0](https://auth0.com/).
- **Responsive Design**: Fully responsive layouts for mobile, tablet, and desktop.
- **Custom Animations**: Smooth animations using Tailwind CSS and custom keyframes.
- **TypeScript Support**: Strongly typed codebase for better developer experience.
- **Vercel Deployment**: Optimized for deployment on Vercel.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org) (App Router) with  with [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: 
    - Custom components and design system
    - Some components built with [Radix UI](https://www.radix-ui.com)
    - [TanStack Table](https://tanstack.com/table)
    - A few simple charts built with [Recharts](https://recharts.org/en-US)
- **State Management**: Simple state managed with custom hooks
- **Search and Caching**: 
    - APIs: The app integrates with third-party APIs to fetch data for supported "Thing" types (e.g., books, movies, TV shows, and video games). These APIs provide metadata such as descriptions, cover art, and related information.
    - Backend Caching: API responses are cached using server-side caching strategies to improve performance and reduce redundant API calls. This ensures faster load times and minimizes API rate limits. Results are also cached in the database with a longer TTL.
    - Client-side Caching: uses [TanStack React Query](https://tanstack.com/query) for efficient client-side data fetching and caching.
- **Database CRUD**:
    - The app uses [Mongoose](https://mongoosejs.com/) as an Object Data Modeling (ODM) library to manage interactions with [MongoDB](https://www.mongodb.com/), including schema, indexing, aggregating and pre- and post-save hooks to normalize data.
- **Utilities**: 
  - [clsx](https://github.com/lukeed/clsx) for conditional class names
  - [dayjs](https://day.js.org) for date manipulation
- **Media Management**
    - Icons as react components to support dynamic styling
    - Images optimized using Next.js
- **Testing**:
  - [Jest](https://jestjs.io) for unit testing
  - [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) for component testing
  - [Cypress](https://www.cypress.io) for end-to-end testing
- **Deployment**: [Vercel](https://vercel.com)

### Key Data Models
- Thing documents contain minimial information, inclding information about the user that saved the thing, their rating and experience, and a reference to the Detail document stored in the Details collection.
- Detail documents contain the information fetched from a third-party API. When a user saves a Thing that hasn't been saved by other users yet, the thing's Details are stored and referenced in the Thing. When saving a Thing that other users have already saved, the Details already exist and are referenced in the Thing. When viewing Things, mongoose aggregates relevant Details to each Thing. Detail data is normalized. Detail data has a TTL to periodically refetch data from third-parties.
- Search documents store cached search results, so if multiple users search for the same term, we don't have to send requests to third-party APIs. Search results cached in the database have a relatively short TTL.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/things-3.git
   cd things-3
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Development Server

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```env
NEXT_PUBLIC_AUTH0_DOMAIN=your-auth0-domain
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id
NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000
```

Replace the placeholders with your Auth0 credentials.

## Project Structure

```plaintext
.
├── app/                # Next.js app directory
├── components/         # Reusable React components
│   ├── nav/            # Navigation components
│   ├── things/         # Components for displaying "Things"
│   └── loading/        # Loading animations
├── lib/                # Utility libraries (e.g., Auth0 integration)
├── public/             # Static assets
├── styles/             # Global and component-specific styles
├── types/              # TypeScript type definitions
├── .eslintrc.js        # ESLint configuration
├── tailwind.config.mjs # Tailwind CSS configuration
└── README.md           # Project documentation
```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint to check for code issues.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). To deploy:

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Set up the required environment variables in the Vercel dashboard.
4. Deploy your application.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Auth0](https://auth0.com/)
- [Vercel](https://vercel.com/)

---

## More Information

### More Key Features

#### User Management & Auth

Auth0 for user management, authentication (login/logout), session management and authorization for protected pages and API routes.

####  Multi-Tiered Caching

To minimize how many request users make to third-party APIs, I cache search results:

In my database, with a long-ish TTL
Using in-memory cache on the server, with a medium-ish TTL. I'll replace this in-memory cache with Redis soon. Pretty excited about that :)
In the client app/browser, facilitated by TanStack React-Query
... and to minimize requests to my own database, I cache user and community data as needed, using the same strategy described for search results above.

#### Centralized Logging

Logging using Winston in both the frontend and backend, including a transport to send logs to a Loggly cloud instance for centralized logging (e.g. follow a user's request from button click to DB and back).

#### Error Handling

Scalable error handling with custom error classes and middleware to catch and handle errors in a consistent way. Also added a custom error boundary with fallback UI to handle uncaught errors in the frontend.

### In Progress

#### Tags

- Community tags shared by all users (e.g. Nostalgia, Chill, Background, Dance, Workout)
- User-defined tags for personal use (e.g. "Songs Kyle Might Like" or "Rom-Coms for Pat")
- Enables virtual lists
- Facilitates discovery & organization

#### User-Curated Lists

- Manually curated, sorted lists, like playlists
- Shareable, public or private
- If public, other users can "like" the list

#### Community Lists & Stats

- Top 10 Scary Movies Right Now
- Recently Added Podcasts
- Most Added Fiction Books Last Month
- Highest Rated Racing Video Games...
- Most rewatched TV Shows
- Probably include some cute li'l charts and graphs
- Will have a cron job that refreshes stats by periodically running queries

### Coming Soon

- Image gallery for things with multiple images
- Visualization (charts and graphs). Your things by decade, by type, by number of times repeating, by when you first experienced them... Community wide charts and graphs, too.
- People engine (find works and collaborations by people)
- Social features. Find, follow and connect with people with similar interests. See a user's things (if they made their profile public).
- News feeds related to your things, popular things, new things...
- Export my things to CSV (already working) or to pretty formatted PDFs (or images). Make visually appealing displays of your things to share, frame, gift...
- Feedback mechanism to encourage the user community to help decide what features to add or improve next.
- Discovery features. If you like that TV Show, you might like this book and that podcast. People involved in this also worked on that. Other people who like this also like these. Explore things by genre, tags, language, country, decade, etc.
- Distraction mode. Scroll through new things, popular things, things from the 90s...
- iOS app and widget.

#### AI-Powered Recommendations

I'm planning to integrate AI into the app to provide smarter, more personalized recommendations. By leveraging machine learning models, the app will analyze user preferences, ratings, and activity to suggest new "Things" you might enjoy. For example:

- Cross-Media Recommendations: Suggest books based on movies you've rated highly, or podcasts based on your favorite video games.
- Collaborative Filtering: Use data from other users with similar tastes to recommend new "Things" you might not have discovered otherwise.
- Natural Language Processing: Analyze reviews, tags, and descriptions to find patterns and suggest related content.
- Trend Analysis: Highlight trending "Things" in the community or within specific categories, such as "Most Added Fiction Books This Month" or "Top-Rated TV Shows of the Year."

These AI-driven features will enhance discovery, making it easier to find new favorites across all categories.

### Maybe Someday

- Import things from other services, such as Goodreads. Connect your existing trackers, such as Goodreads, to sync your ratings and lists/shelves.
- Android app.
- Browser plugins.
- API for other developers to build on top of.
- Integration with other services, such as Spotify, Letterboxd, Steam, and so on.
- Machine learning to make recommendations.
- Voice commands.
