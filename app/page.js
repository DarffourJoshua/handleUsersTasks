"use client";

import Login from "./login/page";
import Header from "./components/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Login />
    </QueryClientProvider>
  )
}
