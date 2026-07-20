import { RouterProvider } from "react-router";
import { router } from "./routes";
import { BookingProvider } from "./BookingContext";

export default function App() {
  return (
    <BookingProvider>
      <RouterProvider router={router} />
    </BookingProvider>
  );
}
