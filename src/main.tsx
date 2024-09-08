import "./polyfills";
import "./index.css";
import "@animxyz/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ClientProvider from "./contexts/ClientContext.tsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { findConversation } from "./model/conversations";
import ConversationViewWithLoader from "./views/ConversationViewWithLoader.tsx";
import GroupConversationView from "./views/GroupConversationView.tsx";
import NewConversationView from "./views/NewConversationView.tsx";
import NewGroupView from "./views/NewGroupView.tsx";
import GroupView from "./views/GroupView.tsx";
import WalletContext from "./contexts/WalletContext.tsx";

async function conversationLoader({ params }: any) {
  const conversation = await findConversation(params.conversationTopic);
  return { conversation };
}
// async function groupConversationLoader({ params }: any) {
//   const conversation = await findConversation(params.conversationTopic);
//   return { conversation };
// }

const router = createHashRouter([
  {
    path: "*",
    element: <App />,
  },
  {
    path: "c/:conversationTopic",
    element: <ConversationViewWithLoader />,
    loader: conversationLoader,
  },
  {
    path: "new",
    element: <NewConversationView />,
  },
  {
    path: "groups/new",
    element: <NewGroupView />,
  },
  // GroupView is For testing purpose
  {
    path: "groups",
    element: <GroupView />,
  },
  {
    path: "group/:groupId",
    element: <GroupConversationView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClientProvider>
      <WalletContext>
        <RouterProvider router={router} />
      </WalletContext>
    </ClientProvider>
  </React.StrictMode>
);
