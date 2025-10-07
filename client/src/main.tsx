import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { StrictMode } from "react";
import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import DragPiecePreview from "./components/drag-piece-preview/drag-piece-preview.tsx";
import ThemeProvider from "./components/theme-provider/theme-provider.tsx";
import "./index.css";
import "./reset.css";
import { store } from "./services/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Provider store={store}>
          <DragPiecePreview />
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </DndProvider>
    </BrowserRouter>
  </StrictMode>
);
