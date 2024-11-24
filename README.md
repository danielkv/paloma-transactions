# Financial Transaction Monitoring Tool - Documentation

## Overview

This application provides a dynamic platform for monitoring real-time financial transactions. It focuses on usability and presentation to help users identify and filter suspicious activities effectively.

## Features

-   **Live Transaction Streaming**: Displays transactions as they occur.
-   **Search and Filters**: Refine transaction views with temporary filters.
-   **Interactive UI**: Intuitive design optimized for client demos.

## Installation Guide

### Requirements

-   Node.js (v18+ recommended)

### Setup Steps

1. Clone the repository
2. Install dependencies:
    ```
    yarn
    ```
3. Setup the env variables:
    ```
    VITE_API_BASE_URL=""
    VITE_WS_BASE_URL=""
    ```
4. Run the application on dev:
    ```
    yarn dev
    ```
5. Open the app at `localhost:5173`

## Development

This application was built using `React` and `vite`. The structure and folder organization follow a simpler variation of DDD (Domain Driven Design).

### Third party libraries

The libraries choosen in this project were picked because of their extensive usage around the community and their long term support. They are easy to implement. For a project this type is faster to go with ready to use solutions then reinveting the wheel.

#### Design libs

-   **MUI** - Design System
-   **material-react-table** - Table
-   **notistack** - User Feedback

#### Helper libs

-   **axios** - API connection
-   **libphonenumber-js** - phone number formating
-   **tanstack/react-query** - fetching and caching
-   **radash** - object handling
