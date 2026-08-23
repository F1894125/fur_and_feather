import { RouterProvider } from "react-router-dom";
import "./App.css";
import "@fontsource/fredoka"; // Default 400 weight
import "@fontsource/fredoka/700.css"; // Optional: Bold weight
import "@fontsource/poppins/400.css"; // Regular
import "@fontsource/poppins/600.css"; // Semi-bold
import "@fontsource/poppins/700.css"; // Bold
import Routes from "./routing/Routes";

function App() {
  return (
    <>
      <RouterProvider router={Routes} />
    </>
  );
}

export default App;
