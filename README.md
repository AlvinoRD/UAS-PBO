# Simple Point of Sale (POS) Application

Welcome to the repository for the Final Semester Exam (UAS) project for the Object-Oriented Programming (OOP) course. This project is a simple desktop Point of Sale (POS) application built using **Electron**, **Next.js**, **React**, and **TypeScript**.

This application is designed to manage products, handle sales transactions, and view invoice history. The application uses a `db.json` file as a local database to store product and transaction data.

## Application Demo

You can see how the application works and how to use it through a demo video on YouTube:

[Watch the Application Demo on YouTube](https://youtu.be/8ZtpMaRxa6M)

## Main Features

* **Product Management**: Add, view, edit, and delete products. Each product contains information such as name, price, and stock.
* **Shopping Cart**: Users can search for products and add them to the cart.
* **Transaction Processing**: The application will calculate the total purchase and manage payment processing.
* **Invoice History**: All successful transactions are saved and can be viewed again on the invoice page.
* **Local Storage**: Application data (products and invoices) are stored locally in JSON format, making it easy to manage.

## Technologies Used

* **Desktop Application Framework**: [Electron](https://www.electronjs.org/)
* **Frontend Framework**: [Next.js](https://nextjs.org/) (with [React](https://reactjs.org/))
* **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) (based on analysis of `tailwind.config.js`)
* **Database**: JSON-Server (simulated via `db.json`)

## Project Structure

* `main/`: Contains code for the main Electron process (`background.ts`), responsible for creating and managing the application window.
* `renderer/`: Contains code for the Electron renderer process, which is the Next.js application.
    * `renderer/app/`: Main directory for the application's pages and components.
        * `Products/`: Page for product management (CRUD).
        * `cart/`: Page for the shopping cart and checkout process.
        * `Invoices/`: Page for displaying transaction history.
* `db.json`: File that functions as a simple database to store product and invoice data.

## Installation and Running the Project

To run this project locally, follow these steps:

1.  **Clone this repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd [YOUR_PROJECT_FOLDER_NAME]
    ```

2.  **Install dependencies:**
    Make sure you have [Node.js](https://nodejs.org/) and pnpm installed.
    ```bash
    pnpm install
    ```

3.  **Run the application in development mode:**
    ```bash
    pnpm dev
    ```

4.  **To build the application:**
    ```bash
    pnpm build
    ```

## Contributor

* **Alvino Radyo Danisworo** - A11.2022.14600

* Created as part of the Final Semester Exam for Object-Oriented Programming.
