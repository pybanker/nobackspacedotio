document.getElementById('writing-area').addEventListener('keydown', function(event) {
    const mode = document.getElementById('mode-selector').value;
    if (event.key === 'Backspace') {
        switch(mode) {
            case 'normal':
                event.preventDefault();
                break;
            case 'hard':
                alert('Backspace pressed!');
                event.preventDefault();
                break;
            case 'extrahard':
                // Append '#' to text
                this.value += '#';
                event.preventDefault();
                break;
            case 'suicide':
                this.value = '';
                break;
        }
    }
});

document.getElementById('copy').addEventListener('click', function() {
    const text = document.getElementById('writing-area').value;
    navigator.clipboard.writeText(text).then(() => {
        alert('Text copied to clipboard');
    });
});

document.getElementById('new-page').addEventListener('click', function() {
    window.open(location.href, '_blank');
});

let backspaceCount = 0;

document.getElementById('writing-area').addEventListener('keydown', function(event) {
    const mode = document.getElementById('mode-selector').value;
    if (event.key === 'Backspace') {
        backspaceCount++;
        document.getElementById('backspace-counter').textContent = `Backspaces: ${backspaceCount}`;

        // Existing switch case for modes...
    }
});

function appendBackspaceCount(text) {
    return text + "\n\nBackspaces: " + backspaceCount;
}

document.getElementById('export').addEventListener('click', function() {
    let text = document.getElementById('writing-area').value;
    text += "\n\nBackspaces: " + backspaceCount;

    // Get the current date in YYYY-mm-dd format
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + "-" + 
                          String(currentDate.getMonth() + 1).padStart(2, '0') + "-" + 
                          String(currentDate.getDate()).padStart(2, '0');

    // Create file name with the current date
    const fileName = `no_backspace_dot_io_${formattedDate}.txt`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; // Use the dynamically generated file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});



document.getElementById('copy').addEventListener('click', function() {
    let text = document.getElementById('writing-area').value;
    text = appendBackspaceCount(text);
    
    navigator.clipboard.writeText(text).then(() => {
        alert('Text copied to clipboard');
    });
});

// Markdown button functionality
document.querySelectorAll('.markdown-button').forEach(button => {
    button.addEventListener('click', function() {
        const syntax = this.getAttribute('data-syntax');
        const textarea = document.getElementById('writing-area');
        textarea.value += syntax;
    });
});
