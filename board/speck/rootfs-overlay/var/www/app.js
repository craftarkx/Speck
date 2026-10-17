// SpeckOS Core System Operations
console.log("SpeckOS Core Initialized Offline.");

// Mock File Management System running directly in system memory
const speckFileSystem = {
    documents: [
        { name: "welcome.txt", content: "The computer, scaled down to a point." },
        { name: "notes.txt", content: "Remember to buy 5 more prototype circuit boards from the factory." }
    ]
};

// Function to launch built-in Speck applications
function launchSpeckApp(appName) {
    console.log("Launching application node: " + appName);
    
    if (appName === 'SpeckWrite') {
        alert("SpeckWrite v1.0\n\nActive Document: welcome.txt\nContent: " + speckFileSystem.documents[0].content);
    } else if (appName === 'FileCore') {
        alert("FileCore Storage Explorer\n\nAvailable local files:\n- welcome.txt (64 bytes)\n- notes.txt (112 bytes)");
    }
}
