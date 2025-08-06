document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary elements from the DOM
    const premiumUpgradeBtn = document.querySelector('.upgrade-btn');
    const premiumModal = document.getElementById('premiumModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const applyButtons = document.querySelectorAll('.apply-btn:not(.applied)');
    const applicationsCounter = document.querySelector('.applications-count');

    // Function to handle opening the premium modal
    function openPremiumModal() {
        premiumModal.style.display = 'flex';
    }

    // Function to handle closing the premium modal
    function closePremiumModal() {
        premiumModal.style.display = 'none';
    }

    // Add event listener to the upgrade button to open the modal
    premiumUpgradeBtn.addEventListener('click', openPremiumModal);

    // Add event listeners to close the modal
    closeModalBtn.addEventListener('click', closePremiumModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closePremiumModal();
        }
    });

    // Add event listeners to the apply buttons
    applyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update the button text and state
            btn.innerHTML = '<i class="fas fa-check"></i> Jelentkezve';
            btn.classList.add('applied');
            btn.disabled = true;

            // Update the daily application counter
            const currentCount = parseInt(applicationsCounter.textContent.split('/')[0]);
            const newCount = currentCount + 1;
            applicationsCounter.textContent = `${newCount}/3`;

            // If the user has reached the application limit, disable all other apply buttons
            if (newCount >= 3) {
                document.querySelectorAll('.apply-btn:not(.applied)').forEach(unappliedBtn => {
                    unappliedBtn.disabled = true;
                });
            }

            // In a real application, you would also send a request to the server here
            // to register the application, e.g., using fetch()
            // Example:
            // fetch('/api/apply-campaign', {
            //     method: 'POST',
            //     body: JSON.stringify({ campaignId: btn.dataset.campaignId }),
            //     headers: { 'Content-Type': 'application/json' }
            // });
        });
    });
});