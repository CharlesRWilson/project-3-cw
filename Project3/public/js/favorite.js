document.addEventListener('DOMContentLoaded', () => {
    const favoriteButtons = document.querySelectorAll('.favorite-button');
  
    favoriteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const cardId = event.target.getAttribute('data-id');
        console.log(cardId);
        
        try {
          const response = await fetch('/api/favorites', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cardId }),
          });
  
          if (response.ok) {
            alert('Card favorited successfully!');
          } else {
            alert('Failed to favorite card.');
          }
        } catch (error) {
          console.error('Error favoriting card:', error);
        }
      });
    });
  });