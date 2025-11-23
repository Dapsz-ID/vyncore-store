// Authentication functions
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (isLoggedIn === 'true') {
        if (userType === 'admin') {
            return { isLoggedIn: true, userType: 'admin' };
        } else {
            return { isLoggedIn: true, userType: 'user' };
        }
    }
    
    return { isLoggedIn: false, userType: null };
}

function requireAuth(userType = null) {
    const auth = checkAuth();
    
    if (!auth.isLoggedIn) {
        window.location.href = 'login.html';
        return false;
    }
    
    if (userType && auth.userType !== userType) {
        // Redirect to appropriate dashboard
        if (auth.userType === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'user-dashboard.html';
        }
        return false;
    }
    
    return true;
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
}

function updateLoginButton() {
    const auth = checkAuth();
    const loginButtons = document.querySelectorAll('.login-button');
    
    loginButtons.forEach(button => {
        if (auth.isLoggedIn) {
            if (auth.userType === 'admin') {
                button.textContent = 'Admin Dashboard';
                button.href = 'admin.html';
            } else {
                button.textContent = 'My Dashboard';
                button.href = 'user-dashboard.html';
            }
        } else {
            button.textContent = 'Login';
            button.href = 'login.html';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLoginButton();
});
