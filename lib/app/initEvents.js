export default function initializeEvents() {
    const form = document.getElementById('new-event-form');
    const imgInput = document.getElementById('imageUpload');
    const descriptionInput = document.getElementById('index-create-events-listing-description');
    const titleInput = document.getElementById('index-create-events-listing-title');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        form.reset();
        try {
            const response = await fetch('/upload-event', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('Image uploaded successfully');
                alert('Event Created.');
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
//# sourceMappingURL=initEvents.js.map