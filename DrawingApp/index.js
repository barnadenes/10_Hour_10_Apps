window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const plus = document.querySelector('.plus');
    const minus = document.querySelector('.minus');
    const size = document.querySelector('.size')
    const color = document.querySelector('.color');

    let painting = false;
    let width = 10;
    size.textContent = width;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if(!painting) {
            return;
        }

        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.strokeStyle = color.value;

        ctx.startPosition
        ctx.lineTo(e.clientX-canvas.getBoundingClientRect().x, e.clientY-canvas.getBoundingClientRect().y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX-canvas.getBoundingClientRect().x, e.clientY-canvas.getBoundingClientRect().y)
    }

    // Event Listeners
    // Brush - Mouse events
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    // Brush Size
    plus.addEventListener('click', () => {
        width += 5;
        size.textContent = width;

        if(width >= 50) {
            width = 50;
            size.textContent = 50;
            ctx.linewidth = width;
        }
    });

    minus.addEventListener('click', () => {
        width -= 5;
        size.textContent = width;

        if(width <= 5) {
            width = 5;
            size.textContent = 5;
            ctx.lineWidth = width;
        }
    });
})   
