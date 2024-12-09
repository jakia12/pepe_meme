let CA = "0x0000000000000000000000000";
const body = document.body;
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle-btn");
    const offCanvas = document.getElementById("off-canvas");
    const navbar = document.getElementById("navbar");

    toggleBtn.addEventListener("click", function (e) {
        e.preventDefault();
        toggleBtn.classList.toggle("active");
        offCanvas.classList.toggle("active");
        navbar.classList.toggle("active");
        body.style.overflow = offCanvas.classList.contains("active") ? "hidden" : "";
    });

    const imageLinks = [
        '/assets/img/blue-hat.png',
        '/assets/img/sli1.png',
        '/assets/img/sli2.png',
        '/assets/img/sli3.png',
    ];
    let lastImageIndex = 0;

    const preloadedImages0 = imageLinks.map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });
    
    const audio = document.getElementById('background-music');
    const playButton = document.getElementById('play-button');
    const svgPlay = document.getElementById("svgPlay");
    const pauseButton = document.getElementById('pause-button');

    // Update the image on click
    document.getElementById("clickMeHeader").addEventListener("click", function() {
        const image = document.querySelector('#capy-box img');
        let newImageIndex;
        do {
            newImageIndex = Math.floor(Math.random() * imageLinks.length);
        } while (newImageIndex === lastImageIndex);

        lastImageIndex = newImageIndex;
        document.getElementById("clickMeHeaderImage").src = preloadedImages0[newImageIndex].src;
        image.classList.add('rotateAnime');

        // Remove the animation class after it ends to allow re-triggering on click
        setTimeout(() => {
            image.classList.remove('rotateAnime');
        }, 500); // 500ms matches the duration of the animation
    });
    
    // Function to update the SVG color
    function setSVGColor(isPlaying) {
        if (isPlaying) {
            svgPlay.style.fill = "#ff0000";
            svgPlay.style.stroke = "#ff0000";
        } else {
            svgPlay.style.fill = ""; // Revert to default
            svgPlay.style.stroke = ""; // Revert to default
        }
    }

    // Play and pause functionality
    playButton.onclick = function() {
        audio.play().catch(function(error) {
            console.log('Playback failed:', error);
        });
    };
    
    pauseButton.onclick = function() {
        audio.pause();
    };

    // Listen for play and pause events to toggle SVG color
    audio.addEventListener("play", function() {
        setSVGColor(true);
    });
    
    audio.addEventListener("pause", function() {
        setSVGColor(false);
    });
    
    const colorShiftElement = document.getElementById('background-shift');
    const changeBGAnchor = document.getElementById('changeBGanchor');
    
    window.addEventListener('scroll', function() {
        const rect = changeBGAnchor.getBoundingClientRect();
    
        // Check if the top of the element has reached the bottom of the viewport
        if (rect.top <= window.innerHeight) {
            colorShiftElement.style.backgroundColor = '#549f4b';
        } else {
            colorShiftElement.style.backgroundColor = '#509248';
        }
    });



// Array with episode details, including background images
const episodes = [
    { id: 'epPlaceholder1', title: 'ep. 1', background: '/assets/video/thumb/sticker2.gif', video: '/assets/video/sticker2.webm' },
    { id: 'epPlaceholder2', title: 'ep. 2', background: '/assets/video/thumb/sticker3.gif', video: '/assets/video/sticker3.webm' },
    { id: 'epPlaceholder3', title: 'ep. 3', background: '/assets/video/thumb/sticker4.gif', video: '/assets/video/sticker4.webm' },
    { id: 'epPlaceholder4', title: 'ep. 4', background: '/assets/video/thumb/sticker5.gif', video: '/assets/video/sticker5.webm' },
    { id: 'epPlaceholder5', title: 'ep. 5', background: '/assets/video/thumb/sticker6.gif', video: '/assets/video/sticker6.webm' },
    { id: 'epPlaceholder6', title: 'ep. 6', background: '/assets/video/thumb/sticker7.gif', video: '/assets/video/sticker7.webm' }
];

const maxIndex = episodes.length - 1;
const preloadedImages = {};
const customPlayButton = document.getElementById('customPlayButton');
const playIcon = document.getElementById('playIcon');

episodes.forEach(episode => {
    const img = new Image();
    img.src = episode.background;
    preloadedImages[episode.id] = img;
});

// Get the video element and its source element
const mainVideoBig = document.getElementById('mainVideoBig');
const videoSource = mainVideoBig.querySelector('source');

let currentIndex = 0; // Start with epPlaceholder3 (ep. 1) at the center

// Function to update the visible episodes based on currentIndex
// Function to update the visible episodes based on currentIndex
function updateVisibleEpisodes() {
    // Get the DOM elements for each placeholder
    const placeholders = [
        document.getElementById('epPlaceholder1'),
        document.getElementById('epPlaceholder2'),
        document.getElementById('epPlaceholder3'), // Center placeholder
        document.getElementById('epPlaceholder4'),
        document.getElementById('epPlaceholder5')
    ];

    const episodeCards = [
        document.querySelector('.ep-1'),
        document.querySelector('.ep-2'),
        document.querySelector('.big'), // Center episode card
        document.querySelector('.ep-3'),
        document.querySelector('.ep-4')
    ];

    // Update text content for each placeholder based on currentIndex
    placeholders[0].textContent = episodes[(currentIndex - 2 + episodes.length) % episodes.length].title;
    placeholders[1].textContent = episodes[(currentIndex - 1 + episodes.length) % episodes.length].title;
    placeholders[2].textContent = episodes[currentIndex % episodes.length].title;
    placeholders[3].textContent = episodes[(currentIndex + 1) % episodes.length].title;
    placeholders[4].textContent = episodes[(currentIndex + 2) % episodes.length].title;

    // Update background images for each episode card
    episodeCards[0].style.backgroundImage = `url(${preloadedImages[episodes[(currentIndex - 2 + episodes.length) % episodes.length].id].src})`;
    episodeCards[1].style.backgroundImage = `url(${preloadedImages[episodes[(currentIndex - 1 + episodes.length) % episodes.length].id].src})`;
    episodeCards[2].style.backgroundImage = `url(${preloadedImages[episodes[currentIndex % episodes.length].id].src})`;
    episodeCards[3].style.backgroundImage = `url(${preloadedImages[episodes[(currentIndex + 1) % episodes.length].id].src})`;
    episodeCards[4].style.backgroundImage = `url(${preloadedImages[episodes[(currentIndex + 2) % episodes.length].id].src})`;

    // Update video poster and source
    const currentEpisode = episodes[currentIndex % episodes.length];
    mainVideoBig.poster = currentEpisode.background;
    videoSource.src = currentEpisode.video;
    mainVideoBig.load(); // Reload video with new source

    // Control visibility of left-side cards based on currentIndex
        document.getElementById('epPlaceholder2Card').style.display = currentIndex >= 1 ? 'block' : 'none'; // Show epPlaceholder2Card after the first click
        document.getElementById('epPlaceholder1Card').style.display = currentIndex >= 2 ? 'block' : 'none'; // Show epPlaceholder1Card after the second click
        document.getElementById('epPlaceholder2').style.display = currentIndex >= 1 ? 'block' : 'none'; // Show epPlaceholder2Card after the first click
        document.getElementById('epPlaceholder1').style.display = currentIndex >= 2 ? 'block' : 'none'; // Show epPlaceholder1Card after the second click

    // Control visibility of right-side cards based on whether the last episode is in the center
    document.getElementById('epPlaceholder4Card').style.display = currentIndex < maxIndex ? 'block' : 'none'; // Hide epPlaceholder4Card if last episode is centered
    document.getElementById('epPlaceholder5Card').style.display = currentIndex < maxIndex - 1 ? 'block' : 'none'; // Hide epPlaceholder5Card if last or second-to-last episode is centered
    document.getElementById('epPlaceholder4').style.display = currentIndex < maxIndex ? 'block' : 'none'; // Hide epPlaceholder4Card if last episode is centered
    document.getElementById('epPlaceholder5').style.display = currentIndex < maxIndex - 1 ? 'block' : 'none'; // Hide epPlaceholder5Card if last or second-to-last episode is 

    // document.querySelector('.big').style.backgroundImage = `url(${currentEpisode.background})`;
    document.querySelector('.big').style.background= ``;
}
// Function to toggle play/pause
function togglePlayPause() {
    if (mainVideoBig.paused) {
        mainVideoBig.play();
        playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>'; // Change to pause icon
        document.querySelector('.big').style.backgroundImage = 'none'; // Set background to black
    } else {
        mainVideoBig.pause();
        playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>'; // Change to play icon
    }
}
// Function to handle slide next action
function slideNext() {
    if (currentIndex < maxIndex) { // Only increment if not at max index
        currentIndex++;
        updateVisibleEpisodes();
        setTimeout(function () {
            document.querySelector('.big').style.backgroundImage = 'none'; // Set background to black
            mainVideoBig.play(); // Start playing the next episode
        }, 1000); // Delay in milliseconds (1000 ms = 1 second)
    }
}

// Function to handle slide previous action
function slidePrevious() {
    if (currentIndex > 0) { // Only decrement if not at min index
        currentIndex--;
        updateVisibleEpisodes();
        setTimeout(function () {
            document.querySelector('.big').style.backgroundImage = 'none'; // Set background to black
            mainVideoBig.play(); // Start playing the next episode
        }, 1000); // Delay in milliseconds (1000 ms = 1 second)
    }
}

// Event listeners for the slideNext and slidePrevious buttons
document.getElementById('slideNext').addEventListener('click', slideNext);
document.getElementById('slidePrevious').addEventListener('click', slidePrevious);
// Function to play a specific episode when clicked
function playEpisode(index) {
    currentIndex = index; // Set the current index to the clicked episode
    updateVisibleEpisodes(); // Update the visible episodes

    setTimeout(function () {
        document.querySelector('.big').style.backgroundImage = 'none'; // Set background to black
        mainVideoBig.play(); // Start playing the next episode
    }, 1000); // Delay in milliseconds (1000 ms = 1 second)
    playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>'; // Change to pause icon
}

// Attach event listeners to episode placeholders for direct selection
document.getElementById('epPlaceholder1Card').addEventListener('click', function() {
    playEpisode((currentIndex - 2 + episodes.length) % episodes.length);
});
document.getElementById('epPlaceholder2Card').addEventListener('click', function() {
    playEpisode((currentIndex - 1 + episodes.length) % episodes.length);
});
document.getElementById('epPlaceholder4Card').addEventListener('click', function() {
    playEpisode((currentIndex + 1) % episodes.length);
});
document.getElementById('epPlaceholder5Card').addEventListener('click', function() {
    playEpisode((currentIndex + 2) % episodes.length);
});
// Event listeners for play button and video events
customPlayButton.addEventListener('click', togglePlayPause);
// Allow play/pause toggling by tapping on the video
mainVideoBig.addEventListener("play", function () {
    if (!audio.paused) { // Check if the music is playing
        audio.pause(); // Pause the music
    }
});
mainVideoBig.addEventListener('click', function () {
    if (mainVideoBig.paused) {
        mainVideoBig.play();
        document.querySelector('.big').style.backgroundImage = 'none'; // Set background to black
        playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>'; // Change to pause icon
    } else {
        mainVideoBig.pause();
        document.querySelector('.big').style.backgroundImage = 'none'; // Set background to black
        playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>'; // Change to play icon
    }
});
mainVideoBig.addEventListener('pause', function () {
    playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>'; // Change to play icon
});
mainVideoBig.addEventListener('ended', function () {
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateVisibleEpisodes(); // Update the visible episodes
        setTimeout(function () {
            mainVideoBig.play(); // Start playing the next episode
        }, 1000); // Delay in milliseconds (1000 ms = 1 second)
    }
    // Update play icon to play symbol in case the last video ends and can't play further
    playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
});

// Initial call to set the initial visible episodes with ep. 1 in the center
updateVisibleEpisodes();


// Object to store initial scroll positions when elements first enter viewport
const initialScrollPositions = {};

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Select each row element
    const row1 = document.getElementById('capyRow1');
    const row2 = document.getElementById('capyRow2'); // Mirrored
    const row3 = document.getElementById('capyRow3');
    const row4 = document.getElementById('capyRow4'); // Mirrored

    // Helper function to check if element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        //console.log(`${element.id} - top: ${rect.top}, bottom: ${rect.bottom}, viewport height: ${window.innerHeight}`);
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    }

    // Function to apply parallax effect based on initial scroll position
    function applyParallaxEffect(element, multiplier, isMirrored = false) {
        if (isInViewport(element)) {
            // Store initial scroll position if not already set
            if (!initialScrollPositions[element.id]) {
                initialScrollPositions[element.id] = scrollPosition;
                //console.log(`Setting initial scroll position for ${element.id}: ${scrollPosition}`);
            }

            // Calculate the relative scroll distance
            const relativeScroll = scrollPosition - initialScrollPositions[element.id];
            const directionMultiplier = isMirrored ? -multiplier : multiplier;
            element.style.transform = `translateX(${relativeScroll * directionMultiplier}px)`;
            //console.log(`Moving ${element.id} by ${relativeScroll * directionMultiplier}px`);
        }
    }

    // Apply transformations with respective multipliers, reversing for mirrored rows
    applyParallaxEffect(row1, 0.25);
    applyParallaxEffect(row2, 0.2, true);  // Reverse the direction for mirrored row
    applyParallaxEffect(row3, 0.14);
    applyParallaxEffect(row4, 0.1, true);  // Reverse the direction for mirrored row
});






const leftGallery = document.querySelectorAll("#leftgallery .img-container");
const rightGallery = document.querySelectorAll("#rightgallery .img-container");

const observerOptions = {
    threshold: 0.2, // Trigger animation when 20% of the element is in view
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.closest("#leftgallery")) {
                entry.target.classList.add("roll-in-left");
            } else if (entry.target.closest("#rightgallery")) {
                entry.target.classList.add("roll-in-right");
            }
            observer.unobserve(entry.target); // Stop observing once animated
        }
        
    });
}, observerOptions);

leftGallery.forEach(container => observer.observe(container));
rightGallery.forEach(container => observer.observe(container));

document.getElementById("copyCa").addEventListener("click", function() {
    navigator.clipboard.writeText(CA).then(function() {
        const copiedDiv = document.getElementById("copied");
        copiedDiv.style.display = "block";
        
        setTimeout(() => {
            copiedDiv.style.display = "none";
        }, 2000); // Hide after 2000ms (2 seconds)
    }).catch(function(error) {
        console.error("Failed to copy text: ", error);
    });
});
});
