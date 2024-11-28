document.addEventListener("DOMContentLoaded", async () => {
    const textarea = document.getElementById("tabsTextarea");

    try {
        // Query all open tabs
        const tabs = await chrome.tabs.query({});
        if (tabs.length === 0) {
            textarea.value = "No open tabs found.";
            return;
        }

        // Query all tab groups and create a mapping of groupId to groupName
        const groupNames = {};
        const groups = await chrome.tabGroups.query({});
        groups.forEach(group => {
            groupNames[group.id] = group.title || "Unnamed Group";
        });

        // Group tabs by windowId
        const windows = {};
        tabs.forEach(tab => {
            if (!windows[tab.windowId]) {
                windows[tab.windowId] = [];
            }
            windows[tab.windowId].push(tab);
        });

        // Format tabs grouped by windows in Markdown
        const markdown = Object.keys(windows)
            .map(windowId => {
                const tabsInWindow = windows[windowId];
                const windowHeader = `# Window ${windowId}\n\n`;
                const tabsMarkdown = tabsInWindow
                    .map(tab => {
                        const groupName = tab.groupId > -1 ? `(${groupNames[tab.groupId]}) ` : "";
                        return `${groupName}[${tab.title}](${tab.url})`;
                    })
                    .join("\n\n");
                return `${windowHeader}${tabsMarkdown}`;
            })
            .join("\n\n");

        textarea.value = markdown;
    } catch (error) {
        console.error("Error fetching tabs or groups:", error);
        textarea.value = "Error loading tabs. Check the console for details.";
    }
});
