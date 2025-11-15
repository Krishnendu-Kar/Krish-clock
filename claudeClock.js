// DOM Elements
        const themeToggleBtn = document.getElementById('themeToggle');
        const navButtons = document.querySelectorAll('.nav-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        // Tab Navigation
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Deactivate all tabs
                navButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(tab => tab.classList.remove('active'));
                
                // Activate selected tab
                button.classList.add('active');
                document.getElementById(`${tabId}Tab`).classList.add('active');
            });
        });
        
        // Theme Toggle
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? '🌞' : '🎑';
        });
        
        /*** ANALOG CLOCK ***/
        const hourHand = document.querySelector('.hour-hand');
        const minuteHand = document.querySelector('.minute-hand');
        const secondHand = document.querySelector('.second-hand');
        const hourMarksContainer = document.querySelector('.hour-marks');
        const minuteMarksContainer = document.querySelector('.minute-marks');
        const hourNumbersContainer = document.querySelector('.hour-numbers');
        
        // Create hour marks
        for (let i = 0; i < 12; i++) {
            const hourMark = document.createElement('div');
            hourMark.classList.add('hour-mark');
            hourMark.style.transform = `rotate(${i * 30}deg)`;
            hourMarksContainer.appendChild(hourMark);
        }
        
        // Create minute marks
        for (let i = 0; i < 60; i++) {
            if (i % 5 !== 0) { // Skip hour positions
                const minuteMark = document.createElement('div');
                minuteMark.classList.add('minute-mark');
                minuteMark.style.transform = `rotate(${i * 6}deg)`;
                minuteMarksContainer.appendChild(minuteMark);
            }
        }
        
        // Create hour numbers
        for (let i = 1; i <= 12; i++) {
            const hourNumber = document.createElement('div');
            hourNumber.classList.add('hour-number');
            hourNumber.textContent = i;
            
            // Calculate position
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const radius = 85; // Distance from center
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            
            hourNumber.style.left = `calc(50% + ${x}px)`;
            hourNumber.style.top = `calc(50% + ${y}px)`;
            
            hourNumbersContainer.appendChild(hourNumber);
        }
/*** DIGITAL CLOCK ***/
        const digitalTimeDisplay = document.getElementById('digitalTime');
        const digitalDateDisplay = document.getElementById('digitalDate');
        const hoursValueDisplay = document.getElementById('hoursValue');
        const minutesValueDisplay = document.getElementById('minutesValue');
        const secondsValueDisplay = document.getElementById('secondsValue');
        
        function updateClock() {
            const now = new Date();
            
            // Update analog clock
            const seconds = now.getSeconds();
            const minutes = now.getMinutes();
            const hours = now.getHours();
            
            // Calculate rotation angles
            const secondsAngle = (seconds / 60) * 360;
            const minutesAngle = ((minutes + seconds / 60) / 60) * 360;
            const hoursAngle = ((hours % 12 + minutes / 60) / 12) * 360;
            
            // Apply rotations with smooth transitions
            secondHand.style.transform = `translateX(-50%) rotate(${secondsAngle}deg)`;
            minuteHand.style.transform = `translateX(-50%) rotate(${minutesAngle}deg)`;
            hourHand.style.transform = `translateX(-50%) rotate(${hoursAngle}deg)`;
            
            // Update digital clock
            const timeString = now.toLocaleTimeString([], { hour12: true });
            digitalTimeDisplay.textContent = timeString;
            
            // Update date display
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            digitalDateDisplay.textContent = now.toLocaleDateString(undefined, options);
            
            // Update individual time sections
            hoursValueDisplay.textContent = hours.toString().padStart(2, '0');
            minutesValueDisplay.textContent = minutes.toString().padStart(2, '0');
            secondsValueDisplay.textContent = seconds.toString().padStart(2, '0');
        }
        
        // Initial update and set interval
        updateClock();
        setInterval(updateClock, 1000);
        
        /*** STOPWATCH ***/
        const stopwatchDisplay = document.getElementById('stopwatchDisplay');
        const startStopwatchBtn = document.getElementById('startStopwatch');
        const stopStopwatchBtn = document.getElementById('stopStopwatch');
        const resetStopwatchBtn = document.getElementById('resetStopwatch');
        const lapStopwatchBtn = document.getElementById('lapStopwatch');
        const lapsContainer = document.getElementById('lapsContainer');
        
        let stopwatchInterval;
        let stopwatchRunning = false;
        let stopwatchStartTime = 0;
        let stopwatchElapsedTime = 0;
        let stopwatchLaps = [];
        
        function startStopwatch() {
            if (!stopwatchRunning) {
                stopwatchRunning = true;
                
                // If reset, set start time
                if (stopwatchElapsedTime === 0) {
                    stopwatchStartTime = Date.now();
                } else {
                    // If resuming, adjust start time to account for elapsed time
                    stopwatchStartTime = Date.now() - stopwatchElapsedTime;
                }
                
                // Update UI
                startStopwatchBtn.disabled = true;
                stopStopwatchBtn.disabled = false;
                lapStopwatchBtn.disabled = false;
                
                // Start interval
                stopwatchInterval = setInterval(updateStopwatch, 10);
            }
        }
        
        function stopStopwatch() {
            if (stopwatchRunning) {
                stopwatchRunning = false;
                
                // Save elapsed time
                stopwatchElapsedTime = Date.now() - stopwatchStartTime;
                
                // Update UI
                startStopwatchBtn.disabled = false;
                stopStopwatchBtn.disabled = true;
                lapStopwatchBtn.disabled = true;
                
              // Clear interval
                clearInterval(stopwatchInterval);
            }
        }
        
        function resetStopwatch() {
            stopStopwatch();
            
            // Reset values
            stopwatchElapsedTime = 0;
            stopwatchLaps = [];
            
            // Update UI
            stopwatchDisplay.innerHTML = '00:00:00<span class="milliseconds">.000</span>';
            lapsContainer.innerHTML = '';
            startStopwatchBtn.disabled = false;
            resetStopwatchBtn.disabled = false;
        }
        
        function updateStopwatch() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - stopwatchStartTime;
            
            // Calculate time components
            const milliseconds = elapsedTime % 1000;
            const seconds = Math.floor((elapsedTime / 1000) % 60);
            const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
            const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
            
            // Format time string
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}<span class="milliseconds">.${milliseconds.toString().padStart(3, '0')}</span>`;
            
            // Update display
            stopwatchDisplay.innerHTML = timeString;
        }
        
        function lapStopwatch() {
            if (stopwatchRunning) {
                const currentTime = Date.now();
                const lapTime = currentTime - stopwatchStartTime;
                
                // Calculate lap time components
                const ms = lapTime % 1000;
                const s = Math.floor((lapTime / 1000) % 60);
                const m = Math.floor((lapTime / (1000 * 60)) % 60);
                const h = Math.
                floor((lapTime / (1000 * 60 * 60)) % 24);

// Format lap time string
            const lapTimeString = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;

            // Add lap to list
            const lapItem = document.createElement('div');
            lapItem.classList.add('lap-item');
            lapItem.textContent = `Lap ${stopwatchLaps.length + 1}: ${lapTimeString}`;
            lapsContainer.appendChild(lapItem);

            // Store lap time
            stopwatchLaps.push(lapTime);
        }
    }

    /*** TIMER ***/
    const timerDisplay = document.getElementById('timerDisplay');
    const startTimerBtn = document.getElementById('startTimer');
    const stopTimerBtn = document.getElementById('stopTimer');
    const resetTimerBtn = document.getElementById('resetTimer');
    const timerProgressBar = document.getElementById('timerProgressBar');
    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');
    const secondsInput = document.getElementById('secondsInput');

    let timerInterval;
    let timerRunning = false;
    let timerEndTime = 0;
    let timerTotalTime = 0;

    function startTimer() {
        if (!timerRunning) {
            const hours = parseInt(hoursInput.value) || 0;
            const minutes = parseInt(minutesInput.value) || 0;
            const seconds = parseInt(secondsInput.value) || 0;

            timerTotalTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

            if (timerTotalTime > 0) {
                timerRunning = true;
                timerEndTime = Date.now() + timerTotalTime;

                startTimerBtn.disabled = true;
                stopTimerBtn.disabled = false;
                resetTimerBtn.disabled = false;

                timerInterval = setInterval(updateTimer, 100);
            }
        }
    }

    function stopTimer() {
        if (timerRunning) {
            timerRunning = false;
            timerTotalTime = timerEndTime - Date.now();
            clearInterval(timerInterval);

            startTimerBtn.disabled = false;
            stopTimerBtn.disabled = true;
        }
    }

function resetTimer() {
        stopTimer();
        timerTotalTime = 0;
        timerDisplay.textContent = '00:00:00';
        timerProgressBar.style.width = '0%';
        startTimerBtn.disabled = false;
        stopTimerBtn.disabled = true;
        resetTimerBtn.disabled = true;
    }

    let audio = new Audio("timer.mp3");

function updateTimer() {
    const remainingTime = timerEndTime - Date.now();

    if (remainingTime <= 0) {
        resetTimer();

        // Play audio AFTER a short delay to allow reset
        setTimeout(() => {
            audio.play().catch((e) => console.log("Audio play failed:", e));
        }, 100); // small delay helps on some browsers

        // Optional: show alert after audio plays
        setTimeout(() => {
            alert('Time is up, so stop your work');
        }, 500); // wait a bit for the audio to begin

        return;
    }

    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const seconds = Math.floor((remainingTime / 1000) % 60);

    timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const progress = ((timerTotalTime - remainingTime) / timerTotalTime) * 100;
    timerProgressBar.style.width = `${progress}%`;
}

    // Event Listeners
    startStopwatchBtn.addEventListener('click', startStopwatch);
    stopStopwatchBtn.addEventListener('click', stopStopwatch);
    resetStopwatchBtn.addEventListener('click', resetStopwatch);
    lapStopwatchBtn.addEventListener('click', lapStopwatch);

    startTimerBtn.addEventListener('click', startTimer);
    stopTimerBtn.addEventListener('click', stopTimer);
    resetTimerBtn.addEventListener('click', resetTimer);


    // Wake Lock API handler
    let wakeLock = null;

    async function requestWakeLock() {
        try {
            if ('wakeLock' in navigator) {
                wakeLock = await navigator.wakeLock.request('screen');
                console.log('Screen Wake Lock is active');
            }
        } catch (err) {
            console.error(`Wake Lock failed: ${err}`);
        }
    }

    async function releaseWakeLock() {
        if (wakeLock !== null) {
            await wakeLock.release();
            wakeLock = null;
            console.log('Screen Wake Lock released');
        }
    }