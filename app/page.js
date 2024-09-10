"use client";

// import Login from "./login/page";
import FormLayout from "./components/readTask";
import Header from "./components/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header/>
      <FormLayout/>
    </QueryClientProvider>
  )
}
