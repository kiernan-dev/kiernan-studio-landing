var audio = document.getElementById("audioPlayer"),
	loader = document.getElementById("preloader");

// P5.js Audio Visualizer Variables - Exact Clone
const fftStartingPoint = 0; //Where we want to start at the FFT, I don't even know if this is a good idea.
const gradients = [
  {start: [16, 141, 199], end: [239, 142, 56]},
  {start: [247, 255, 0], end: [219, 54, 164]},
  {start: [33, 95, 0], end: [228, 228, 217]},
  {start: [222, 98, 98], end: [255, 184, 140]},
  {start: [251, 211, 233], end: [187, 55, 125]},
  {start: [67, 206, 162], end: [24, 90, 157]}
];

// Dark gradients for light mode
const darkGradients = [
  {start: [8, 70, 99], end: [119, 71, 28]},
  {start: [123, 127, 0], end: [109, 27, 82]},
  {start: [16, 47, 0], end: [114, 114, 108]},
  {start: [111, 49, 49], end: [127, 92, 70]},
  {start: [125, 105, 116], end: [93, 27, 62]},
  {start: [33, 103, 81], end: [12, 45, 78]}
];

let startColor;
let endColor;
let rotateAngle = 0;
let sound;
let fft;

// Function to check if we're in light mode
function isLightMode() {
  return document.body.classList.contains('light-mode');
}

// Function to get appropriate gradient colors based on theme
function getGradientColors() {
  const currentGradients = isLightMode() ? darkGradients : gradients;
  return currentGradients[Math.floor(Math.random() * currentGradients.length)];
}


// P5.js Audio Visualizer - Exact Clone
function setup() {
  const cnv = createCanvas(600, 600);
  cnv.parent('p5-visualizer-container');
  
  cnv.mouseClicked((event) => { 
    // Calculate distance from center to avoid interfering with play/pause button
    const centerX = width / 2;
    const centerY = height / 2;
    const distance = dist(mouseX, mouseY, centerX, centerY);
    
    // Only trigger if click is outside the center button area (radius > 30)
    if (distance > 30) {
      if (sound && sound.isPlaying()) {
        sound.pause();
      } else if (sound && !sound.isPlaying()) {
        sound.play();
      }
    }
  });
  
  fft = new p5.FFT(0.75);
  colorMode(RGB);
  startColor = color(0, 0, 0);
  endColor = color(0, 0, 0);
  
  // Initialize p5.js sound immediately with default track
  initializeAudioVisualizer();
}

function draw() {
  clear();
  translate(width / 2, height / 2);
  
  rotate(rotateAngle);
  rotateAngle += 0.001;
  
  noFill();
  stroke(isLightMode() ? 0 : 255);
  ellipse(0, 0, 100, 100);
  
  const spectrum = fft.analyze();
  const spectrumValues = [];
    
  for (let i = fftStartingPoint; i < ((PI * 100) + fftStartingPoint) * 3; i+=3) {
    //Maybe take the average of all 3 for a line? someone help me do this better please!
    spectrumValues.push((spectrum[i] + spectrum[i + 1], spectrum[i + 2]) / 3);
  }
    
  let count = 0;
  let angle = 0.0;
  let incrementPosRight = 0.0;
  let incrementPosLeft = 0.0;
  let increment =  0.0128;
  let lerpy;
  
  for (let i = 0; i < TWO_PI; i+= 0.04) {
    const x = sin(i) * 60;
    const y = cos(i) * 60;
    
    if (i < PI) {
      lerpy = lerpColor(startColor, endColor, incrementPosRight);
      incrementPosRight += increment;
    } else {
      lerpy = lerpColor(endColor, startColor, incrementPosLeft);
      incrementPosLeft += increment
    }
    
    stroke(lerpy);
    push();
    translate(x, y);
    rotate(-angle);
    rect(0, 0, 1, map(spectrumValues[count], 0, 70, 2, 128));
    pop();
    count++;
    angle += 0.04;
  }
}

function changeTrack() {
	var selector = document.getElementById("music-selector");
	var newSrc = selector.value;
	var wasPlaying = !audio.paused;
	
	// Stop current audio and p5.js sound
	audio.pause();
	if (sound && sound.isPlaying()) {
		sound.stop();
	}
	
	audio.src = newSrc;
	
	// Load the new track into p5.js sound and wait for it to be ready
	if (typeof loadSound !== 'undefined') {
		loadP5SoundAndPlay(wasPlaying && document.getElementById("switchforsound").checked);
	} else if (wasPlaying && document.getElementById("switchforsound").checked) {
		audio.play();
	}
}

function settingtoggle() {
	document.getElementById("setting-container").classList.toggle("settingactivate");
	document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
	document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow");
	document.getElementById("music-selector-container").classList.toggle("musicmodeshow");
}

function playpause() {
	if (!document.getElementById("switchforsound").checked) {
		audio.pause();
		if (sound && sound.isPlaying()) {
			sound.pause();
		}
		updatePlayPauseIcon(false);
	} else {
		// Load p5.js sound if not already loaded
		if (!sound && typeof loadSound !== 'undefined') {
			loadP5Sound();
		}
		audio.play();
		if (sound && !sound.isPlaying()) {
			sound.play();
		}
		updatePlayPauseIcon(true);
	}
}

function togglePlayPause() {
	const soundToggle = document.getElementById("switchforsound");
	soundToggle.checked = !soundToggle.checked;
	playpause();
}

function updatePlayPauseIcon(isPlaying) {
	const playIcon = document.getElementById("play-icon");
	const pauseIcon = document.getElementById("pause-icon");
	
	if (isPlaying) {
		playIcon.style.display = "none";
		pauseIcon.style.display = "block";
	} else {
		playIcon.style.display = "block";
		pauseIcon.style.display = "none";
	}
}

function visualmode() {
	document.body.classList.toggle("light-mode"), document.querySelectorAll(".needtobeinvert").forEach(function(e) {
		e.classList.toggle("invertapplied")
	});
	
	// Update visualizer colors when theme changes
	if (sound && typeof color !== 'undefined') {
		const { start, end } = getGradientColors();
		startColor = color(start[0], start[1], start[2]);
		endColor = color(end[0], end[1], end[2]);
	}
}
// Initialize audio visualizer immediately on setup
function initializeAudioVisualizer() {
  // Get the default audio source - use the src from the audio element or fallback
  const audioElement = document.getElementById("audioPlayer");
  let defaultSrc = audioElement.src;
  
  // If no src is set, use the source element's src
  if (!defaultSrc) {
    const sourceElement = audioElement.querySelector('source');
    defaultSrc = sourceElement ? sourceElement.src : "src/mp3/infinite-canvas.mp3";
    // Set the audio element src to match
    audioElement.src = defaultSrc;
  }
  
  console.log('Initializing p5.js sound:', defaultSrc);
  
  sound = loadSound(defaultSrc, () => {
    console.log('p5.js sound loaded successfully');
    // Connect the FFT to the sound
    if (fft && sound) {
      fft.setInput(sound);
    }
    const { start, end } = getGradientColors();
    startColor = color(start[0], start[1], start[2]);
    endColor = color(end[0], end[1], end[2]);
  }, (error) => {
    console.error('Error loading p5.js sound:', error);
  });
}

// Connect p5.js sound to the existing audio player
function loadP5Sound() {
  if (sound) {
    sound.stop();
    sound = null;
  }
  
  const currentSrc = audio.src;
  console.log('Loading p5.js sound:', currentSrc);
  
  sound = loadSound(currentSrc, () => {
    console.log('p5.js sound loaded successfully');
    // Connect the FFT to the sound
    if (fft && sound) {
      fft.setInput(sound);
    }
    const { start, end } = getGradientColors();
    startColor = color(start[0], start[1], start[2]);
    endColor = color(end[0], end[1], end[2]);
  }, (error) => {
    console.error('Error loading p5.js sound:', error);
  });
}

// Load p5.js sound and coordinate playback with regular audio
function loadP5SoundAndPlay(shouldPlay) {
  if (sound) {
    sound.stop();
    sound = null;
  }
  
  const currentSrc = audio.src;
  console.log('Loading p5.js sound for coordinated playback:', currentSrc);
  
  sound = loadSound(currentSrc, () => {
    console.log('p5.js sound loaded, starting coordinated playback');
    // Connect the FFT to the sound
    if (fft && sound) {
      fft.setInput(sound);
    }
    const { start, end } = getGradientColors();
    startColor = color(start[0], start[1], start[2]);
    endColor = color(end[0], end[1], end[2]);
    
    // Now that p5.js sound is ready, start both audio sources if needed
    if (shouldPlay) {
      audio.play();
      sound.play();
    }
  }, (error) => {
    console.error('Error loading p5.js sound:', error);
    // If p5.js sound fails, still play regular audio
    if (shouldPlay) {
      audio.play();
    }
  });
}

window.addEventListener("load", function() {
	loader.style.display = "none";
	
	// Add click event to the new play/pause button
	const playPauseBtn = document.getElementById("visualizer-play-pause");
	if (playPauseBtn) {
		playPauseBtn.addEventListener("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			togglePlayPause();
		});
	}
});

let emptyArea = document.getElementById("emptyarea"),
	mobileTogglemenu = document.getElementById("mobiletogglemenu");

function hamburgerMenu() {
	document.body.classList.toggle("stopscrolling"), document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu"), document.getElementById("burger-bar1").classList.toggle("hamburger-animation1"), document.getElementById("burger-bar2").classList.toggle("hamburger-animation2"), document.getElementById("burger-bar3").classList.toggle("hamburger-animation3")
}

function hidemenubyli() {
	document.body.classList.toggle("stopscrolling"), document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu"), document.getElementById("burger-bar1").classList.remove("hamburger-animation1"), document.getElementById("burger-bar2").classList.remove("hamburger-animation2"), document.getElementById("burger-bar3").classList.remove("hamburger-animation3")
}
const sections = document.querySelectorAll("section"),
	navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"),
	mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");
window.addEventListener("scroll", () => {
	let e = "";
	sections.forEach(t => {
		let o = t.offsetTop;
		t.clientHeight, pageYOffset >= o - 200 && (e = t.getAttribute("id"))
	}), mobilenavLi.forEach(t => {
		t.classList.remove("activeThismobiletab"), t.classList.contains(e) && t.classList.add("activeThismobiletab")
	}), navLi.forEach(t => {
		t.classList.remove("activeThistab"), t.classList.contains(e) && t.classList.add("activeThistab")
	})
}), console.log("%c Made in the USA by Steven Kiernan", "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;");

let backtop = document.getElementById("backtotopbutton");

function scrollFunction() {
	document.body.scrollTop > 400 || document.documentElement.scrollTop > 400 ? backtop.style.display = "block" : backtop.style.display = "none"
}
function scrolltoTopfunction() {
	document.body.scrollTop = 0, document.documentElement.scrollTop = 0
}
window.onscroll = function() {
	scrollFunction()
}, document.addEventListener("contextmenu", function(e) {
	"IMG" === e.target.nodeName && e.preventDefault()
}, !1);
