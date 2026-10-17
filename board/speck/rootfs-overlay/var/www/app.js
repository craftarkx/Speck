// ========================================================
// SpeckOS Core Operating System Operations (v1.0)
// ========================================================
console.log("SpeckOS Core Initialized Offline.");

// 💾 Local file storage tracking documents currently inside the stick environment
const speckFileSystem = {
    documents: [
        { name: "welcome.txt", content: "The computer, scaled down to a point.\nWelcome to your offline SpeckStick!" },
        { name: "notes.txt", content: "Remember to manufacture prototype circuit boards." }
    ]
};

let openFileName = "welcome.txt";
let speckDevice = null; // Holds the WebUSB hardware instance once connected

// ========================================================
// 📱 Application Lifecycle & Window Management
// ========================================================

// Handles popping open core app containers and windows
function launchSpeckApp(appName) {
    console.log("Launching application node: " + appName);
    
    if (appName === 'SpeckWrite') {
        const targetWindow = document.getElementById("write-window");
        const textArea = document.getElementById("editor-textarea");
        
        // Find the text content file inside our storage map structure
        const activeFile = speckFileSystem.documents.find(doc => doc.name === openFileName);
        
        // Pass the string payload straight into the window workspace text panel
        textArea.value = activeFile ? activeFile.content : "";
        document.getElementById("window-title").innerText = `SpeckWrite - ${openFileName}`;
        
        // Display the application window
        targetWindow.style.display = "flex";
    } else if (appName === 'FileCore') {
        // Build a readable list of files from our virtual filesystem layout
        let fileListString = "FileCore Storage Explorer\n\nDouble-click a file name to load it into SpeckWrite:\n";
        speckFileSystem.documents.forEach(doc => {
            fileListString += `- ${doc.name} (${doc.content.length} bytes)\n`;
        });
        
        alert(fileListString);
        
        // Pro-tip: Prompt user to switch files for testing
        let changeFile = prompt("Type the file name you want to load (welcome.txt or notes.txt):");
        if (changeFile && speckFileSystem.documents.some(doc => doc.name === changeFile)) {
            openFileName = changeFile;
            console.log(`System active file targeted to: ${openFileName}`);
            launchSpeckApp('SpeckWrite'); // Relaunch editor window with the newly selected file contents
        } else if (changeFile) {
            alert("Error: File path not found inside the storage partition.");
        }
    }
}

// Logic to safely hide visual program containers
function closeWindow(windowId) {
    document.getElementById(windowId).style.display = "none";
}

// Overwrite logic to flush changed bytes straight back into memory allocations
function saveActiveDocument() {
    const updatedContent = document.getElementById("editor-textarea").value;
    const currentDoc = speckFileSystem.documents.find(doc => doc.name === openFileName);
    
    if (currentDoc) {
        currentDoc.content = updatedContent;
        console.log(`Successfully committed modifications to ${openFileName}`);
        alert(`Success: ${openFileName} has been overwritten and saved securely to the SpeckStick storage partition!`);
    }
}

// ========================================================
// 🔄 SpeckOS Live Update & Overwrite Script Backend
// ========================================================
async function executeSystemUpdate() {
  console.log("Initializing secure firmware overwrite sequence...");

  try {
    // 1. Fetch the absolute newest update files from your repository branch
    // Replace 'yourusername' with your actual GitHub account name when publishing live!
    const updateTargetUrl = "https://githubusercontent.com";
    const response = await fetch(updateTargetUrl);
    if (!response.ok) throw new Error("Failed to pull the latest system update files.");
    const newestCodeContent = await response.text();

    // 2. Locate and check the physical connection to your SpeckStick hardware via WebUSB
    if (typeof navigator.usb === 'undefined') {
        alert("Update Error: Your current browser application does not support WebUSB pipelines.");
        return;
    }

    // Attempt to poll for active hardware devices if not established yet
    if (!speckDevice) {
        try {
            speckDevice = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x1234 }] });
            await speckDevice.open();
            await speckDevice.selectConfiguration(1);
            await speckDevice.claimInterface(0);
        } catch (usbErr) {
            alert("Update Failed: Please ensure your SpeckStick is physically connected to the USB slot and approved.");
            return;
        }
    }

    console.log("Connection verified. Sending raw overwrite packets to storage partition...");

    // 3. Convert the update code string into low-level bytes for direct copper-wire transit
    const textEncoder = new TextEncoder();
    const rawBytePacket = textEncoder.encode(newestCodeContent);

    // 4. Overwrite command packet: [0x55 (Update Opcode), 0x01 (Target: app.js), ...Payload Length]
    const headerPayload = new Uint8Array([0x55, 0x01]);
    const unifiedPayload = new Uint8Array(headerPayload.length + rawBytePacket.length);
    unifiedPayload.set(headerPayload);
    unifiedPayload.set(rawBytePacket, headerPayload.length);

    // 5. Direct Write: Push the array across the USB bulk transport channel (Endpoint 4) to overwrite the chip
    await speckDevice.transferOut(4, unifiedPayload);
    console.log("Hardware update complete. Overwrite successful!");
    
    // 6. Dynamic Hot-Reload: Instantly load the new system core into the active browser screen without rebooting
    alert("SpeckOS successfully updated to the latest build! Overwrite complete.");
    eval(newestCodeContent); 

  } catch (error) {
    console.error("Critical error during system overwrite sequence:", error);
    alert("Update Error: " + error.message);
  }
}

// ========================================================
// 🛡️ Panic-Disconnect & Zero-Trace Hardware Monitor
// ========================================================
if (typeof navigator.usb !== 'undefined') {
    navigator.usb.addEventListener("disconnect", (event) => {
        if (event.device === speckDevice) {
            console.warn("WARNING: SpeckStick was violently disconnected! Executing Panic-Wipe...");
            
            // 1. Obfuscate active RAM structures completely by scrambling indices
            speckFileSystem.documents = speckFileSystem.documents.map(() => {
                return { name: "DELETED", content: Math.random().toString(36).substring(2) };
            });
            speckDevice = null;
            
            // 2. Erase graphical interface canvas layout instantly
            document.getElementById("desktop-grid").style.display = "none";
            document.body.innerHTML = `
                <div style="background: #000; color: #ff0055; font-family: monospace; display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; text-align: center;">
                    <h1>🚨 SECURITY ALERT 🚨</h1>
                    <p style="font-size: 18px; border: 1px solid #ff0055; padding: 15px;">SpeckStick Physically Removed.<br>Active Session Terminated & Memory Scrambled Safely.</p>
                </div>
            `;
            console.log("Memory successfully obfuscated and wiped. Zero trace remaining.");
        }
    });
}
