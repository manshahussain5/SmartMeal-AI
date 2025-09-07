# 🍽️ SmartMeal AI - Free Recipe Generator & Meal Planner

A comprehensive, free-to-use web application that combines AI-powered recipe generation, meal planning, calorie tracking, and nutritional analysis. Built with vanilla HTML, CSS, and JavaScript - no frameworks required!

![SmartMeal AI](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![HTML5](https://img.shields.io/badge/HTML5-Latest-orange)
![CSS3](https://img.shields.io/badge/CSS3-Latest-blue)

## ✨ Features

### 🤖 AI Recipe Generator
- Generate personalized recipes based on available ingredients
- Support for multiple dietary restrictions (Vegetarian, Vegan, Gluten-Free, Dairy-Free, Keto, Low-Carb)
- Cuisine preference selection (Italian, Asian, Mexican, Indian, Mediterranean, American)
- Target calorie control per serving
- Detailed cooking instructions and nutritional information

### 📅 Meal Planner
- Weekly meal planning with customizable calorie goals
- Flexible meal structure (3-5 meals per day)
- Automatic meal generation based on preferences
- Export and print meal plans
- Smart ingredient categorization

### 📊 Calorie Tracker
- Daily food intake tracking
- Comprehensive nutrition database
- Visual progress indicators with circular progress rings
- Meal categorization (Breakfast, Lunch, Dinner, Snack)
- Real-time calorie and macro tracking

### 🥗 Nutrition Analysis
- Recipe nutrition calculation
- Per-serving and total recipe analysis
- Support for various measurement units
- Detailed macro breakdown (calories, protein, carbs, fat, fiber)

### 🛒 Smart Shopping Lists
- Auto-generated shopping lists from meal plans
- Categorized by food type (Proteins, Vegetables, Grains, Dairy, Pantry)
- Checkbox functionality for shopping
- Export and print capabilities

### 💾 Data Persistence
- Local storage for user preferences
- Favorite recipes system
- Meal history tracking
- Daily data persistence

### 📱 Progressive Web App
- Offline functionality with service worker
- Mobile-responsive design
- App-like experience on mobile devices
- Installable on home screen

## 🚀 Quick Start

### Option 1: Direct File Opening
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start using the app immediately!

### Option 2: Local Development Server
1. Install Node.js (if not already installed)
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser to `http://localhost:3000`

### Option 3: Live Server (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📁 Project Structure

```
Smart Recipe Generator/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for offline support
├── package.json       # Node.js dependencies and scripts
├── README.md          # This file
└── icons/             # PWA icons (optional)
    ├── icon-192.png
    └── icon-512.png
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern HTML features
- **CSS3**: Advanced styling with Flexbox, Grid, animations, and gradients
- **Vanilla JavaScript**: ES6+ features, local storage, service workers
- **Progressive Web App**: Offline support, installable, responsive
- **Local Storage**: Data persistence without backend

## 🎯 Key Features Explained

### AI Recipe Generation
The app uses a sophisticated algorithm that:
- Analyzes available ingredients
- Considers dietary restrictions
- Matches cuisine preferences
- Calculates nutritional content
- Generates step-by-step instructions

### Nutrition Database
Includes a comprehensive database of common foods with:
- Calorie information per 100g
- Macronutrient breakdown (protein, carbs, fat, fiber)
- Support for various food categories
- Easy expansion for new foods

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## 🔧 Customization

### Adding New Foods to Nutrition Database
Edit the `nutritionDB` object in `script.js`:

```javascript
const nutritionDB = {
    'new food': { 
        calories: 100, 
        protein: 10, 
        carbs: 20, 
        fat: 5, 
        fiber: 2 
    }
    // ... existing foods
};
```

### Modifying Meal Options
Update the `mealOptions` object in the `generateMeal` function:

```javascript
const mealOptions = {
    'Breakfast': [
        'Your custom breakfast option',
        // ... existing options
    ]
    // ... other meal types
};
```

### Styling Customization
All styles are in `styles.css`. Key sections:
- Color scheme: CSS custom properties
- Layout: Grid and Flexbox configurations
- Animations: Keyframe animations
- Responsive: Media queries

## 📱 Mobile Usage

The app is fully responsive and works great on mobile devices:
- Touch-friendly buttons and inputs
- Optimized layouts for small screens
- Progressive Web App features
- Offline functionality

## 🔒 Privacy & Data

- **No data collection**: All data stays on your device
- **Local storage only**: No external servers or databases
- **No tracking**: No analytics or user tracking
- **Offline capable**: Works without internet connection

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Areas for Contribution
- Additional nutrition database entries
- New recipe generation algorithms
- Enhanced UI/UX features
- Additional export formats
- More dietary restriction options
- Performance optimizations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- USDA Food Database for nutrition information
- Modern CSS techniques and best practices
- Progressive Web App standards
- Open source community

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/smartmeal-ai/issues) page
2. Create a new issue with detailed information
3. Include browser version and device information

## 🎉 Future Enhancements

Planned features for future versions:
- [ ] Recipe sharing functionality
- [ ] Advanced meal prep planning
- [ ] Integration with fitness trackers
- [ ] Barcode scanning for food items
- [ ] Social features and community recipes
- [ ] Advanced dietary goal tracking
- [ ] Recipe scaling and conversion tools
- [ ] Seasonal ingredient suggestions

---

**Made with ❤️ for food lovers and health enthusiasts**

*SmartMeal AI - Making healthy eating simple and enjoyable!*
