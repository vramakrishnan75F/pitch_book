import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import BookingLayout from "./BookingLayout";
import Landing from "../pages/Landing";
import Search from "../pages/Search";
import VenueDetail from "../pages/VenueDetail";
import SlotSelection from "../pages/SlotSelection";
import BookingSummary from "../pages/BookingSummary";
import Payment from "../pages/Payment";
import BookingSuccess from "../pages/BookingSuccess";
import MyBookings from "../pages/MyBookings";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Landing },
      { path: "search", Component: Search },
      { path: "venue/:id", Component: VenueDetail },
      { path: "bookings", Component: MyBookings },
      { path: "profile", Component: Profile },
    ],
  },
  {
    path: "/booking",
    Component: BookingLayout,
    children: [
      { path: "slots", Component: SlotSelection },
      { path: "summary", Component: BookingSummary },
      { path: "payment", Component: Payment },
      { path: "success", Component: BookingSuccess },
    ],
  },
]);
