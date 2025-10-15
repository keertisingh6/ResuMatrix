# ResuMatrix 📄

ResuMatrix is an intelligent resume optimization tool that helps you tailor your resume to specific job descriptions using LaTeX formatting and AI-powered content suggestions.

## Features 🚀

- **Real-time LaTeX Editing**: Edit your resume in LaTeX format with live preview
- **AI-Powered Optimization**: Automatically optimize your resume based on job descriptions
- **PDF Preview**: Instant preview of your compiled resume
- **Modern UI**: Clean, responsive interface with resizable panes
- **ATS-Friendly**: Ensures your resume is readable by Applicant Tracking Systems

## Tech Stack 💻

### Frontend
- React with Vite
- Tailwind CSS for styling
- Real-time PDF preview
- React components for modular design

### Backend
- Node.js with Express
- Google's Gemini AI for resume optimization
- LaTeX compilation service
- RESTful API architecture

## Getting Started 🏁

### Prerequisites

1. **Node.js**
   - Install Node.js v18 or higher from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **MiKTeX (LaTeX Compiler)**
   - Download MiKTeX from [miktex.org/download](https://miktex.org/download)
   - During installation:
     - Select "Install missing packages on the fly = Yes"
     - Choose "Preferred paper: A4" or "Letter" based on your needs
   - After installation, open MiKTeX Console and:
     - Check for updates: Updates → Check for updates
     - Install any available updates
   - Verify installation: `pdflatex --version`

3. **Google AI API Key**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Keep this key handy for the setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ZayedShahcode/ResuMatrix.git
cd ResuMatrix
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create a `.env` file in the backend directory with your Google AI API key:
```env
GEMINI_API_KEY=your_api_key_here
```

5. Start the development servers:

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

### Troubleshooting Common Setup Issues

1. **LaTeX Compilation Fails**
   ```
   Solution: Open MiKTeX Console and:
   1. Check 'Updates' for any pending package updates
   2. Go to 'Packages' and ensure basic packages are installed
   3. Try compiling again
   ```

2. **PDF Preview Not Working**
   ```
   1. Check if pdflatex is in your system PATH
   2. Verify tmp folder exists in backend directory
   3. Ensure proper file permissions
   ```

3. **Node.js Related Issues**
   ```
   1. Clear node_modules and package-lock.json
   2. Run npm install again
   3. Ensure compatible Node version (v18+)
   ```

For more detailed troubleshooting, check our [CONTRIBUTING.md](CONTRIBUTING.md) guide.

## Usage 📝

1. Paste your target job description in the left panel
2. Edit your LaTeX resume in the middle panel
3. Click "Optimize Resume" to automatically tailor your resume
4. Preview the compiled PDF in real-time in the right panel
5. Download the final PDF when satisfied

## API Endpoints 🛠️

### POST /api/compile
Compiles LaTeX code into PDF

### POST /api/optimize
Optimizes resume based on job description using AI

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📜

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments 🙏

- Google Gemini AI for powering the optimization engine
- LaTeX Project for the document preparation system
- Open source community for various tools and libraries used

## Contact 📬

- GitHub: [@ZayedShahcode](https://github.com/ZayedShahcode)

## Project Status 🔄

Active development - Contributions welcome!