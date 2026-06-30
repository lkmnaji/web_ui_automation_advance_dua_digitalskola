const locators = {
    url: 'https://www.saucedemo.com/',
    login: {
        inputUsername: { type: 'css', value: '#user-name' },
        inputPassword: { type: 'css', value: '#password' },
        buttonLogin: { type: 'css', value: '#login-button' },
        errorMessage: { type: 'css', value: '[data-test="error"]' }
    },
    inventory: {
        addToCartBtn: { type: 'css', value: '[data-test="add-to-cart-sauce-labs-backpack"]' },
        cartLink: { type: 'css', value: '.shopping_cart_link' }
    },
    checkout: {
        checkoutBtn: { type: 'css', value: '#checkout' },
        firstNameInput: { type: 'css', value: '#first-name' },
        lastNameInput: { type: 'css', value: '#last-name' },
        postalCodeInput: { type: 'css', value: '#postal-code' },
        continueBtn: { type: 'css', value: '#continue' },
        finishBtn: { type: 'css', value: '#finish' },
        completeHeader: { type: 'css', value: '.complete-header' }
    }
};

module.exports = locators;