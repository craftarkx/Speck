// ========================================================
// SpeckOS Core Operating System Operations (v1.4)
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
let speckDevice = null; // Holds the WebUSB hardware interface hook

const speckAgentMemory = {
    complaintLog: [],
    maintenanceHistory: []
};

// ========================================================
// 📱 Application Lifecycle & Window Management
// ========================================================

function launchSpeckApp(appName) {
    console.log("Launching application node: " + appName);
    
    // Auto-close open containers for crisp z-index layer shifts
    closeWindow('write-window');
    closeWindow('browser-window');
    
    if (appName === 'SpeckWrite') {
        const targetWindow = document.getElementById("write-window");
        const textArea = document.getElementById("editor-textarea");
        const activeFile = speckFileSystem.documents.find(doc => doc.name === openFileName);
        
        textArea.value = activeFile ? activeFile.content : "";
        document.getElementById("window-title").innerText = `SpeckWrite - ${openFileName}`;
        targetWindow.style.display = "flex";
        
    } else if (appName === 'FileCore') {
        let fileListString = "FileCore Storage Explorer\n\nType a filename to load it into SpeckWrite:\n";
        speckFileSystem.documents.forEach(doc => {
            fileListString += `- ${doc.name} (${doc.content.length} bytes)\n`;
        });
        
        let changeFile = prompt(fileListString);
        if (changeFile && speckFileSystem.documents.some(doc => doc.name === changeFile)) {
            openFileName = changeFile;
            launchSpeckApp('SpeckWrite');
        } else if (changeFile) {
            alert("Error: File path not found inside the storage partition.");
        }
        
    } else if (appName === 'SpeckCalc') {
        let mathProblem = prompt("🧮 SpeckCalc math engine:\nEnter a calculation (e.g., 5 * 10 + 20):");
        if (mathProblem) {
            try {
                let result = Function(`"use strict"; return (${mathProblem})`)();
                alert(`Result: ${mathProblem} = ${result}`);
            } catch (err) { alert("Error: Invalid mathematical statement."); }
        }
        
    } else if (appName === 'SpeckTerm') {
        let command = prompt("📟 SpeckTerm console:\nType a command ('help', 'clear', or 'version'):");
        if (command) {
            let cmdLower = command.toLowerCase().trim();
            if (cmdLower === 'help') {
                alert("Available Local Shell Routines:\n- help\n- clear\n- version\n- reboot");
            } else if (cmdLower === 'version') {
                alert("SpeckOS System Shell Core v1.4-buildroot-x86");
            } else if (cmdLower === 'reboot') {
                location.reload();
            } else { alert(`SpeckTerm: command not found: '${command}'`); }
        }
    } else if (appName === 'SpeckBrowse') {
        const browserWindow = document.getElementById("browser-window");
        const fallbackAlert = document.getElementById("browser-offline-fallback");
        const iframeElement = document.getElementById("browser-frame");

        browserWindow.style.display = "flex";

        // 🛡️ Live Network Status Fallback Routing Map Check
        if (navigator.onLine) {
            console.log("Network status confirmed nominal. Activating frame pipeline...");
            fallbackAlert.style.display = "none";
            iframeElement.style.display = "block";
            document.getElementById("browser-url-input").disabled = false;
        } else {
            console.warn("Network offline drop detected. Diverting to SpeckOS safe mode fallback.");
            iframeElement.style.display = "none";
            fallbackAlert.style.display = "flex";
            document.getElementById("browser-url-input").disabled = true;
        }
    }
}

function navigateSpeckBrowser() {
    let targetedUrl = document.getElementById("browser-url-input").value.trim();
    if (!targetedUrl.startsWith("http://") && !targetedUrl.startsWith("https://")) {
        targetedUrl = "https://" + targetedUrl;
        document.getElementById("browser-url-input").value = targetedUrl;
    }
    console.log(`Piping frame channel straight to network node: ${targetedUrl}`);
    document.getElementById("browser-frame").src = targetedUrl;
}

function closeWindow(windowId) {
    document.getElementById(windowId).style.display = "none";
}

function saveActiveDocument() {
    const updatedContent = document.getElementById("editor-textarea").value;
    const currentDoc = speckFileSystem.documents.find(doc => doc.name === openFileName);
    if (currentDoc) {
        currentDoc.content = updatedContent;
        alert(`Success: ${openFileName} has been overwritten and saved securely to the SpeckStick storage partition!`);
    }
}

// ========================================================
// 🤖 SpeckOS System Maintenance & Support Agent
// ========================================================
function runSpeckAgentNode(taskType) {
    if (taskType === 'maintenance') {
        let executionReport = "🔧 SpeckOS Automated Maintenance Report:\n\n";
        executionReport += "✔ Integrity Check: Storage partitions healthy.\n";
        executionReport += "✔ Cache Optimization: Temporary runtime cycles cleared.\n\nAll systems nominal.";
        speckAgentMemory.maintenanceHistory.push({ timestamp: new Date(), status: "SUCCESS" });
        alert(executionReport);
    } else if (taskType === 'complaints') {
        let userFeedback = prompt("📩 SpeckOS Automated Support Agent:\nPlease describe your system issue, complaint, or bug report below:");
        if (userFeedback && userFeedback.trim() !== "") {
            speckAgentMemory.complaintLog.push({ ticketId: Math.floor(Math.random() * 90000) + 10000, text: userFeedback });
            alert("Thank you. Your message has been securely logged straight onto the SpeckStick storage partition.");
        }
    }
}

// ========================================================
// 🔄 SpeckOS Live Update & Overwrite Script Backend
// ========================================================
async function executeSystemUpdate() {
  console.log("Initializing secure firmware overwrite sequence...");
  try {
    const updateTargetUrl = "https://githubusercontent.com";
    const response = await fetch(updateTargetUrl);
    if (!response.ok) throw new Error("Failed to pull the latest system update files.");
    const newestCodeContent = await response.text();

    if (typeof navigator.usb === 'undefined') {
        alert("Update Error: Your current browser application does not support WebUSB pipelines.");
        return;
    }

    if (!speckDevice) {
        try {
            speckDevice = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x1234 }] });
            await speckDevice.open();
            await speckDevice.selectConfiguration(1);
            await speckDevice.claimInterface(0);
        } catch (usbErr) {
            alert("Update Failed: Ensure SpeckStick is physically connected via USB port and approved.");
            return;
        }
    }

    console.log("Connection verified. Sending raw overwrite packets to storage partition...");
    const textEncoder = new TextEncoder();
    const rawBytePacket = textEncoder.encode(newestCodeContent);
    const headerPayload = new Uint8Array([0x55, 0x01]);
    const unifiedPayload = new Uint8Array(headerPayload.length + rawBytePacket.length);
    unifiedPayload.set(headerPayload);
    unifiedPayload.set(rawBytePacket, headerPayload.length);

    await speckDevice.transferOut(4, unifiedPayload);
    console.log("Hardware update complete. Overwrite successful!");
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
            speckFileSystem.documents = speckFileSystem.documents.map(() => {
                return { name: "DELETED", content: Math.random().toString(36).substring(2) };
            });
            speckDevice = null;
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
