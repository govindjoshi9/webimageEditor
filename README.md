# **Unsplash Image Search App**

A React-based application that allows users to search for images from Unsplash, view search results, and add captions to selected images.

## **Features**
- Search images using the Unsplash API.
- View up to 4 images per query in a responsive grid layout.
- Add captions to selected images via a modal dialog.
- User-friendly interface with smooth transitions and intuitive design.

## **Technologies Used**
- **Frontend**: React (with Vite), TypeScript, Tailwind CSS
- **API**: Unsplash API
- **Icons**: Lucide React

## **Live Demo**
Check out the hosted version of the app here:  
[**View Live App**](https://[HOSTED_LINK])

## **Getting Started**

### **Prerequisites**
Ensure you have the following installed on your system:
- Node.js (v16+ recommended)
- npm or yarn

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/unsplash-image-search.git
   cd unsplash-image-search
2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### **Usage**
1. Create a `.env` file in the root directory and add your Unsplash API key:
    ```
    VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
    ```
2. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
3. Open your browser and navigate to `http://localhost:3000` to view the app.

### **Building for Production**
To create a production build, run:
```bash
npm run build
# or
yarn build
```
The optimized build will be output to the `dist` directory.

### **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

### **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
