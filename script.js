document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Create brain visualization
    createBrainVisualization();
    
    // Populate exercises
    populateExercises('body');
    populateExercises('mind');
    
    // Tab navigation
    setupTabNavigation();
  });
  
  // Brain visualization 
  function createBrainVisualization() {
    const brainContainer = document.getElementById('brain-container');
    
    // Create SVG element for brain visualization
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "160");
    svg.setAttribute("height", "160");
    svg.setAttribute("viewBox", "0 0 160 160");
    svg.setAttribute("fill", "none");
    
    
    
    
    
    // Add stem
   
    
    // Add level info
    const levelInfo = document.createElement('div');
    levelInfo.className = 'level-info';
    levelInfo.innerHTML = `
      <p class="level-title">Newcomer</p>
      <p class="level-num">Level 1</p>
    `;
  }
  
  function addDot(parent, cx, cy, fill = null) {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", cx);
    dot.setAttribute("cy", cy);
    dot.setAttribute("r", "3");
    if (fill) {
      dot.setAttribute("fill", fill);
    }
    parent.appendChild(dot);
  }
  
 // Mapping object: Link exercise IDs to destination pages
const pageMapping = {
  'body-1': 'vim.html',
  'body-2': 'cool.html',
  'body-3': 'relax-eyes.html',
  'body-4': 'shoulders-neck.html',
  'body-5': 'lower-back.html',
  'body-6': 'inner-peace.html',
  'body-7': 'tired-eyes.html',
  'body-8': 'neck-relax.html',
  'body-9': 'wrist-loosening.html',
  'mind-1': 'wellbeing.html',
  'mind-2': 'better-sleep.html',
  'mind-3': 'serenity.html',
  'mind-4': 'emotion-distance.html',
  'mind-5': 'new-perspective.html',
  'mind-6': 'more-balance.html',
  'mind-7': 'inner-peace-mind.html',
  'mind-8': 'greater-awareness.html'
};

function populateExercises(category) {
  const grid = document.getElementById(`${category}-exercises-grid`);
  const categoryExercises = exercises.filter(ex => ex.category === category);

  categoryExercises.forEach(exercise => {
    // Create your card as before
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.innerHTML = `
      <div class="card-content">
        <h3 class="card-title">${exercise.title}</h3>
        <div class="card-icon-container">
          <img src="${exercise.icon}" alt="${exercise.title}" class="card-icon">
        </div>
      </div>
    `;

    // Wrap the card with an anchor tag using the mapping object
    const link = document.createElement('a');
    link.href = pageMapping[exercise.id] || '#'; // Fallback to '#' if mapping not found
    // Optionally remove default link styling:
    link.style.textDecoration = 'none';

    link.appendChild(card);
    grid.appendChild(link);
  });
}

  
  // Tab navigation
  function setupTabNavigation() {
    const bodyTab = document.getElementById('body-tab');
    const mindTab = document.getElementById('mind-tab');
    const bodyExercises = document.getElementById('body-exercises');
    const mindExercises = document.getElementById('mind-exercises');
    
    bodyTab.addEventListener('click', function() {
      // Update active tab
      bodyTab.classList.add('active');
      mindTab.classList.remove('active');
      
      // Show body exercises, hide mind exercises
      bodyExercises.classList.remove('hidden');
      mindExercises.classList.add('hidden');
    });
    
    mindTab.addEventListener('click', function() {
      // Update active tab
      mindTab.classList.add('active');
      bodyTab.classList.remove('active');
      
      // Show mind exercises, hide body exercises
      mindExercises.classList.remove('hidden');
      bodyExercises.classList.add('hidden');
    });
  }