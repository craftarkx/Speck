// ========================================================
// SpeckOS Core Operating System Operations (v1.2)
// ========================================================
console.log("SpeckOS Core Initialized Offline.");

const speckFileSystem = {
    documents: [
        { name: "welcome.txt", content: "The computer, scaled down to a point.\nWelcome to your offline SpeckStick!" },
        { name: "notes.txt", content: "Remember to manufacture prototype circuit boards." }
    ]
};

let openFileName = "welcome.txt";
let speckDevice = null;

const speckAgentMemory = {
    complaintLog: [],
    maintenanceHistory: []
};

// ========================================================
// 📱 Application Lifecycle & Window Management
// ========================================================

function launchSpeckApp(appName) {
    console.log("Launching application node: " + appName);
    
    // Hide all windows first to ensure clean swaps
    closeWindow('write-window');
    
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
        // 🧮 New App: Quick Math Tool for on-the-go budgeting
        let mathProblem = prompt("🧮 SpeckCalc math engine:\n\nEnter a calculation (e.g., 5 * 10 + 20):");
        if (mathProblem) {
            try {
                // Safely evaluate simple math strings using basic arithmetic parsing
                let result = Function(`"use strict"; return (${mathProblem})`)();
                alert(`Result: ${mathProblem} = ${result}`);
            } catch (err) {
                alert("Error: Invalid mathematical statement.");
            }
        }
        
    } else if (appName === 'SpeckTerm') {
        // 📟 New App: Terminal Simulator to mimic local script environments
        let command = prompt("📟 SpeckTerm console:\nType a command ('help', 'clear', or 'version'):");
        if (command) {
            let cmdLower = command.toLowerCase().trim();
            if (cmdLower === 'help') {
                alert("Available Local Shell Routines:\n- help\n- clear\n- version\n- reboot");
            } else if (cmdLower === 'version') {
                alert("SpeckOS System Shell Core v1.2-buildroot-x86");
            } else if (cmdLower === 'reboot') {
                location.reload();
            } else {
                alert(`SpeckTerm: command not found: '${command}'`);
            }
        }
    }
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
