var audio = document.getElementById("audioPlayer"),
	loader = document.getElementById("preloader");

// Audio Visualizer Setup
var audioContext, analyser, dataArray, canvas, canvasContext;
var isVisualizerInitialized = false;

function initializeVisualizer() {
	if (isVisualizerInitialized) return;
	
	canvas = document.getElementById("audioVisualizer");
	canvasContext = canvas.getContext("2d");
	
	// Set canvas size based on CSS computed size
	var rect = canvas.getBoundingClientRect();
	canvas.width = rect.width;
	canvas.height = rect.height;
	
	try {
		audioContext = new (window.AudioContext || window.webkitAudioContext)();
		analyser = audioContext.createAnalyser();
		
		var source = audioContext.createMediaElementSource(audio);
		source.connect(analyser);
		analyser.connect(audioContext.destination);
		
		analyser.fftSize = 256;
		var bufferLength = analyser.frequencyBinCount;
		dataArray = new Uint8Array(bufferLength);
		
		isVisualizerInitialized = true;
		animate();
	} catch (error) {
		console.log("Audio visualization not supported in this browser");
	}
}

function animate() {
	requestAnimationFrame(animate);
	
	if (!analyser || audio.paused) {
		// Draw static bars when not playing
		drawStaticBars();
		return;
	}
	
	analyser.getByteFrequencyData(dataArray);
	
	canvasContext.fillStyle = "rgba(0, 0, 0, 0.1)";
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	
	var barWidth = (canvas.width / dataArray.length) * 2.5;
	var barHeight;
	var x = 0;
	
	for (var i = 0; i < dataArray.length; i++) {
		barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
		
		// Create gradient colors based on frequency
		var r = (barHeight + 100) * 2;
		var g = 50 + (i * 2);
		var b = 255 - (barHeight / 2);
		
		canvasContext.fillStyle = `rgb(${r},${g},${b})`;
		canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
		
		x += barWidth + 1;
	}
}

function drawStaticBars() {
	canvasContext.fillStyle = "rgba(0, 0, 0, 0.1)";
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	
	var barWidth = (canvas.width / 128) * 2.5;
	var x = 0;
	
	for (var i = 0; i < 128; i++) {
		var barHeight = Math.random() * 30 + 10; // Static random bars
		
		canvasContext.fillStyle = `rgba(100, 100, 200, 0.3)`;
		canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
		
		x += barWidth + 1;
	}
}

function changeTrack() {
	var selector = document.getElementById("music-selector");
	var newSrc = selector.value;
	var wasPlaying = !audio.paused;
	
	audio.src = newSrc;
	
	if (wasPlaying && document.getElementById("switchforsound").checked) {
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
	} else {
		if (!isVisualizerInitialized) {
			initializeVisualizer();
		}
		if (audioContext && audioContext.state === 'suspended') {
			audioContext.resume();
		}
		audio.play();
	}
}

function visualmode() {
	document.body.classList.toggle("light-mode"), document.querySelectorAll(".needtobeinvert").forEach(function(e) {
		e.classList.toggle("invertapplied")
	})
}
window.addEventListener("load", function() {
	loader.style.display = "none", document.querySelector(".hey").classList.add("popup")
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
}), console.log("%c Designed and Developed by Steven Kiernan", "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;");

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
