// accountModule.ts
export default function initializeAccountCreation() {
    const accountCreationForm = document.getElementById('account-creation-form') as HTMLFormElement;

    accountCreationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(accountCreationForm);
        const { name, username, password, accountType } = Object.fromEntries(formData);

        console.log(`name: ${name} username:${username} password:${password} accountType:${accountType}`);

        accountCreationForm.reset();

        try {
            const response = await fetch('/account-creation', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    username,
                    password,
                    accountType,
                }),
            });

            if (response.ok) {
                console.log('Account Created');
                alert('Account Created.');
            } else {
                console.log('Failed to create account.');
            }
        } catch (error) {
            console.log(error);
            alert('Error saving account.');
        }
    });
}