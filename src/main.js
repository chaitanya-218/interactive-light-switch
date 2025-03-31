document.addEventListener('DOMContentLoaded', function() {
    const lightSwitch = document.getElementById('lightSwitch');
    const body = document.body;
    const statusText = document.querySelector('.status');
    const container = document.querySelector('.container');
    
    // Add a subtle animation to the container on load
    setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
    
    // Set up audio
    const switchSound = new Audio('./public/lightswitch.mp3');
    switchSound.volume = 0.6; // Set appropriate volume
    
    // Function to play the switch sound
    function playSound() {
        try {
            // Reset the audio to the beginning
            switchSound.currentTime = 0;
            
            // Play the sound
            const playPromise = switchSound.play();
            
            // Handle the promise to suppress errors
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Error playing switch sound:", error);
                });
            }
        } catch (e) {
            console.error("Could not play sound:", e);
        }
    }
    
    let isLightOn = true; // Start with light mode
    
    // Function to toggle light/dark mode with animations
    function toggleLightMode() {
        // Play sound
        playSound();
        
        // Toggle switch state first for better visual feedback
        lightSwitch.classList.toggle('active');
        
        // Toggle light/dark mode with a bit of delay for better UX
        setTimeout(() => {
            if (lightSwitch.classList.contains('active')) {
                // Switch is in down position (OFF)
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                statusText.textContent = 'Lights are OFF';
                isLightOn = false;
            } else {
                // Switch is in up position (ON)
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                statusText.textContent = 'Lights are ON';
                isLightOn = true;
            }
            
            // Apply a subtle pulse effect to the container
            container.style.transform = 'scale(0.98)';
            setTimeout(() => {
                container.style.transform = 'translateY(0)';
            }, 150);
        }, 100);
    }
    
    // Handle switch click
    lightSwitch.addEventListener('click', toggleLightMode);
    
    // Handle keyboard accessibility
    lightSwitch.setAttribute('tabindex', '0');
    lightSwitch.setAttribute('role', 'switch');
    lightSwitch.setAttribute('aria-checked', isLightOn.toString());
    
    lightSwitch.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleLightMode();
            this.setAttribute('aria-checked', (!isLightOn).toString());
        }
    });
    
    // Add initial animation to the switch
    setTimeout(() => {
        lightSwitch.classList.add('initialized');
    }, 500);
}); 