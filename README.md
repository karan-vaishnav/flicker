# Flicker

This project is an anonymous chat web application built with React, TypeScript, **Vite**, Tailwind CSS, and WebSockets. It allows users to join as anonymous users and start chatting in real-time.

## Features

-   **Anonymous Chat:** Users join with dynamically generated usernames and can chat without revealing personal information.
-   **Real-time Communication:** Uses WebSockets for instant message delivery.
-   **Whisper Messages:** Users can send private "whisper" messages that disappear after a short time.
-   **Dark Mode:** Supports dark mode with a toggle button.
-   **Responsive Design:** Works seamlessly on various screen sizes.
-   **Ephemeral Chat:** Clears chat history on every refresh or new connection.

## Technologies Used

-   **Frontend:**
    -   React
    -   TypeScript
    -   **Vite**
    -   Tailwind CSS
    -   WebSockets
-   **Backend:**
    -   Node.js
    -   WebSocket (ws)
    -   unique-names-generator

## Getting Started

### Prerequisites

-   Node.js and npm (or yarn/pnpm) installed.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/karan-vaishnav/flicker.git
    cd flicker
    ```

2.  **Install dependencies:**

    ```bash
    # For npm
    npm install
    ```

3.  **Start the backend server:**

    ```bash
    cd flicker-be
    npm run dev
    ```

4.  **Start the frontend development server:**

    ```bash
    cd ../flicker-fe
    npm run dev
    ```

5.  **Open the application in your browser:**

    -   Navigate to `http://localhost:3000`.

## Configuration

-   **Backend Port:** The backend server runs on port `8080` by default. You can change this by setting the `PORT` environment variable.
-   **WebSocket URL:** The frontend connects to the WebSocket server at `ws://localhost:8080`. You can change this in `flicker-fe/src/services/websocketService.ts`.
-   **Dark Mode:** Dark mode preferences are stored in `localStorage`.

## Deployment

-   **Frontend:** The frontend can be deployed using platforms like Vercel, Netlify, or GitHub Pages.
-   **Backend:** The backend can be deployed on platforms like Heroku, AWS, GCP, or Vercel (using serverless functions or a Node.js runtime).

## Future Enhancements

-   **User Avatars:** Implement dynamic, generated avatars for users.
-   **Room-Based Chats:** Add support for multiple chat rooms.
-   **Message History:** Implement message persistence using a database.
-   **AI Chat Moderation:** Use AI to detect and filter inappropriate content.
-   **Shared Drawing Canvas:** Integrate a collaborative drawing canvas.
-   **Shared Media Player:** Allow users to share music or videos.
-   **Interactive Backgrounds:** Use dynamic backgrounds that respond to user interactions.
-   **Language Translation:** Integrate real-time language translation.
-   **User Presence Indicators:** Show when users are online or typing.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.
