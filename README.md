# GoDaddy Repositories Explorer 

> A weekend project that turned into something I'm actually proud of! This React app lets you explore GoDaddy's GitHub repositories in a clean, fast interface.

## What This Does

 This app fetches all their public repositories and presents them in a way that doesn't make your eyes bleed. You get a nice list view, detailed pages for each repo, and it's fast enough that you won't fall asleep waiting for it to load.

## Getting Started

### Quick Setup (5 minutes, I promise!)

```bash
# Grab the code
git clone https://github.com/Parag09/GoDaddyAssignment.git
cd GoDaddyAssignment

# Install the good stuff
npm install

# Fire it up!
npm start
```

Head to http://localhost:3000 and you should see the magic happen.

## Testing (Because Bugs Are Annoying)

I've included some tests because nobody likes broken code:

```bash
# Run the test suite
npm test

# See how much code is actually tested
npm run test:coverage


##  Shipping to Production

```bash
npm run build
```

This will give a `build/` folder that you can throw at any static host.

## Tech Stack

- **React 18** with Hooks  
- **React Router v6** for navigation  
- **React Virtualized** for efficient list rendering  
- **Jest + React Testing Library** for testing  
- **CSS3** for styling  
- **GitHub REST API** as backend  

---

## Features

- Browse GoDaddy repositories from GitHub  
- Responsive UI with clean design  
- Lazy-loaded detail pages  
- Error handling & retry  
- Loading states  
- Virtualized list for performance  
- Basic unit tests included  


## 📁 How I Organized:

```
src/
├── components/          # The building blocks
│   ├── RepositoryCard.js      # Individual repo cards
│   ├── RepositoryList.js      # The main list view
│   ├── RepositoryDetails.js   # Detailed repo pages
│   ├── LoadingSpinner.js      # Pretty loading animation
│   └── ErrorMessage.js        # Friendly error messages
├── services/
│   └── githubApi.js     # All the API magic
├── App.js               # The main show
├── App.css              # Making it pretty
└── index.js             # React entry point
```

## My Thought Process

### Why These Tools?

**React Router v6**: No more render props nonsense.

**React Virtualized**: I learned this the hard way - rendering 500+ DOM elements will make any browser sad. This library is a lifesaver for long lists.

**Vanilla CSS**: I almost went with Tailwind, but honestly? For a project this size, it felt like overkill. Sometimes less is more.

### What I Deliberately Skipped

- **GitHub OAuth** - This is just for public repos.
- **State Management Libraries** - React's built-in state was plenty for this scope
- **Fancy UI Libraries** - Material-UI and friends are great, but I wanted to keep it simple
- **Advanced Features** - No infinite pagination, contributor lists, or issue tracking.

##  Known Issues & Limitations

- Only shows public repositories (by design)
- Basic error handling (it works, but could be better)
- No dark mode

##  Future Ideas

If I ever get bored again, I might add:
- Dark mode toggle
- Repository search/filtering
- Star/fork counts with pretty charts
- Repository comparison feature
- Better mobile navigation