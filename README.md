## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- **Node.js** (v14 or later)
- **npm**
- **MongoDB** instance (local or cloud-based, e.g., MongoDB Atlas)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/SuperiorGitTele/Maxhelp-Business-Unit
   cd Maxhelp-Business-Unit
   ```

2. **Install Dependencies**

   Using npm:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
# MongoDB Connection URI
localMONGO_URI=your_mongodb_connection_string
OR
atlasMONGO_URI=your_atlas_CONNECTION_URI

# NextAuth.js Secret
NEXTAUTH_SECRET=youR_secret_token

```

**Note**: Replace `your_mongodb_connection_string` and `your_secret_key` with your actual MongoDB URI and a secure secret key, respectively.

### Running the Application

Start the development server:

Using npm:

```bash
npm run dev
```

