# Codeswear - Customizable E-commerce Platform

Welcome to codeswear, an advanced e-commerce platform that allows users to customize and purchase a variety of products such as t-shirts, zippers, mugs, and more. The platform ensures a secure shopping experience, incorporating features like bcrypt for password encryption using AES encryption and a seamless payment gateway friendly interface for commercial use.

## Features

- **Product Customization**: Customize your t-shirts, zippers, mugs, and more before making a purchase.

- **Secure Authentication**: Utilizes bcrypt for password encryption with AES encryption for enhanced security.

- **Admin Dashboard**: A separate dashboard for administrators to manage and update products available for sale.

- **Delivery Address Update**: Users have the option to easily update their delivery addresses for a streamlined shopping experience.

- **Forget Password Functionality**: Implements a forget password functionality with token-based, time, and usage-limited expiration (2 hours or one-time use).

- **Interactive Notifications**: Both forget password and order confirmation notifications are interactive for a user-friendly experience.

- **PDF Invoice Generation**: Generates a customer-specific PDF invoice for each new order, sent along with the order confirmation email.

- **Order Resend Option**: Users can request a resend of the order confirmation email, ensuring they have a copy readily available.

- **Order History**: Users, whether logged in or not, can check their previous orders through the confirmation email. When logged in, the order history is easily accessible within the platform.

- **Saved Addresses**: Save and manage multiple addresses for quicker and more convenient ordering.

- **Sale Feature**: Incorporates a SALE variable to start or stop sales on the platform. Currently set at a 30% discount.


## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   
* Open your terminal.

* Change the current working directory to the location where you want to clone the repository.

* Run the following command to clone the repository:
   ```bash
   git clone https://github.com/nmnarora600/codeswear.git
   ```
   
2. **Installing the Required Dependencies**

After cloning the repo run run following commands to install required node modules.

* check in to CloudCanvas
```bash
cd codeswear
```
* install node modules
```bash
npm install
```
OR
```bash
yarn install
```

3. **Create a '.env' file**

Create an environment file and add following entries to it.
```bash
MONGO_URI="Your MongoDB url"
SALE="1 for yes 0 for no"
HOST="server address"
NEXT_PUBLIC_HOST="server address"
NEXT_PUBLIC_ACTIVATION="activation code for first admin"
saltRounds="count of salts for encryption (e.g., 10)"
JWT_SECRET= "secret token for jwt"
NEXT_PUBLIC_JWT_SECRET= "secret token for jwt"
NODE_PASS="Password for nodemailer"
```

### How to Run

After following above steps just open the frontend folder in cmd, powershell etc.
```bash
cd Path/to/the/repo/Codeswear
```
* Run the following command to start app

```bash
npm run dev
```
OR
```bash
yarn dev
```

- Open your Browser and go to the  __[localhost:3000](http://localhost:3000)__. to see your app

- To add the first admin, visit  __[localhost:3000/firstadmin](http://localhost:3000/firstadmin)__ and enter the activation code from the .env file along with other credentials.

- The subsequent admins could be created by previously created admins only.

## Disclaimer

* This application is for educational purposes only and should not be used for commercial purposes. The information, code, and data provided are meant as educational examples and should not be integrated into any commercial application.

## Contributing
* If you'd like to contribute to codeswear, please follow the __[Contributing Guidelines](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors)__.
  
* Pull requests are welcome. For changes, please open an issue first
to discuss what you would like to change.

* Please make sure to update tests as appropriate.
