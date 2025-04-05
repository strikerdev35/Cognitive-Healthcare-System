document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const characterImage = document.getElementById('character-image');
    const currentStepElement = document.getElementById('current-step');
    const allSteps = document.querySelectorAll('.instruction-step');
    const dots = document.querySelectorAll('.dot');
    const doneButton = document.getElementById('done-button');
    
    // Image paths for different breathing states
    const BREATHE_IN_IMAGE = 'sho1.png';
    const HOLD_BREATH_IMAGE = 'sho2.png';
    const BREATHE_OUT_IMAGE = 'sho3.png';
    const change_side_image = 'sho4.png';
    const slide5_image = 'sho5.png';
    const slide6_image = 'sho6.png';

    // Breathing timing constants
    const BREATHE_IN_TIME = 4;    // Breathe in for 4 seconds
    const HOLD_TIME = 4;          // Hold breath for 7 seconds
    const BREATHE_OUT_TIME = 4;   // Breathe out for 8 seconds
    const change_sides_time = 4;  
    const slide5_time = 4;       // Pause between cycles
    const slide6_time = 4;       // Pause between cycles
    
    // State variables
    let currentStep = 1;
    let isExerciseRunning = false;
    let timer = null;
    let countdownValue = 0;
    let repetitionCount = 0;
    const TOTAL_REPETITIONS = 4;  // Total breathing cycles to complete
    
    // Initialize the exercise
    initialize();
    
    function initialize() {
        highlightCurrentStep();
        updateDots();
        
        // Add click event for the done button
        doneButton.addEventListener('click', completeExercise);
        
        // Start the exercise automatically
        startExercise();
    }
    
    function startExercise() {
        if (isExerciseRunning) return;
        
        isExerciseRunning = true;
        repetitionCount = 0;
        currentStep = 1;
        highlightCurrentStep();
        updateDots();
        
        runBreathingCycle();
    }
    
    function runBreathingCycle() {
        // Step 1: Breathe In
        take_seat();
        
        // Schedule subsequent steps
        setTimeout(() => {
            // Step 2: Hold Breath
            left_arm();
            
            setTimeout(() => {
                // Step 3: Breathe Out
                pressure();
                
                setTimeout(() => {
                    // Step 3: Breathe Out
                    change_sides();

                    setTimeout(() => {
                        slide5();

                        setTimeout(() => {
                            slide6();
                            setTimeout(() => {
                                repetitionCount++;
                                
                                if (repetitionCount < TOTAL_REPETITIONS) {
                                    // Move to step 4 if not the last repetition
                                    if (repetitionCount === TOTAL_REPETITIONS - 1) {
                                        currentStep = 4;
                                        highlightCurrentStep();
                                        updateDots();
                                    }
                                    
                                    // Pause before starting the next cycle
                                    setTimeout(() => {
                                        currentStep = 1;
                                        highlightCurrentStep();
                                        updateDots();
                                        runBreathingCycle();
                                    }, slide6_time * 90);
                                } else {
                                    // Exercise completed
                                    isExerciseRunning = false;
                                    currentStep = 4;
                                    highlightCurrentStep();
                                    updateDots();
                                    doneButton.focus();
                                }
                            },slide6_time* 1000);
                        }, slide5_time * 1000);  
                    }, change_sides_time * 1000);
                }, BREATHE_OUT_TIME * 1000);
            }, HOLD_TIME * 1000);
        }, BREATHE_IN_TIME * 1000);
    }
    
    function take_seat() {
        currentStep = 1;
        highlightCurrentStep();
        updateDots();
        
        // Change to breathe in image
        characterImage.src = BREATHE_IN_IMAGE;
        
        startCountdown(BREATHE_IN_TIME);
    }
    
    function left_arm() {
        currentStep = 2;
        highlightCurrentStep();
        updateDots();
        
        // Change to hold breath image
        characterImage.src = HOLD_BREATH_IMAGE;
        
        startCountdown(HOLD_TIME);
    }
    
    function pressure() {
        currentStep = 3;
        highlightCurrentStep();
        updateDots();
        
        // Change to breathe out image
        characterImage.src = BREATHE_OUT_IMAGE;
        
        startCountdown(BREATHE_OUT_TIME);
    }
    function change_sides() {
        currentStep = 4;
        highlightCurrentStep();
        updateDots();
        
        // Change to breathe out image
        characterImage.src = change_side_image;
        
        startCountdown(change_sides_time);
    }
    function slide5(){
        currentStep = 4;
        highlightCurrentStep();
        updateDots();
        
        // Change to breathe out image
        characterImage.src = slide5_image;
        
        startCountdown(slide5_time);
    }
    function slide6() {
        currentStep = 4;
        highlightCurrentStep();
        updateDots();
        
        // Change to breathe out image
        characterImage.src = slide6_image;
        
        startCountdown(slide6_time);
    }
    
    function startCountdown(seconds) {
        // Clear any existing timer
        if (timer) {
            clearInterval(timer);
        }
        
        countdownValue = seconds;
        currentStepElement.textContent = countdownValue;
        
        timer = setInterval(() => {
            countdownValue--;
            
            if (countdownValue <= 0) {
                clearInterval(timer);
                timer = null;
            } else {
                currentStepElement.textContent = countdownValue;
            }
        }, 1000);
    }
    
    function highlightCurrentStep() {
        // Remove active class from all steps
        allSteps.forEach(step => step.classList.remove('active'));
        
        // Add active class to current step
        document.getElementById(`step${currentStep}`).classList.add('active');
    }
    
    function updateDots() {
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current dot
        dots[currentStep - 1].classList.add('active');
    }
    
    function completeExercise() {
        // Clear any running timers
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        
        // Reset the exercise state
        isExerciseRunning = false;
        characterImage.src = REST_IMAGE;
        
        // Show a completion message
        alert('Great job! Remember to carry this feeling of calm with you throughout your day.');
        
        // Reset and restart the exercise
        currentStep = 1;
        highlightCurrentStep();
        updateDots();
        startExercise();
    }
});